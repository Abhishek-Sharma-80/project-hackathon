import { Response } from 'express';
import prisma from '../config/prisma';
import { calculateProfileScore } from '../services/profileScoreEngine';

export const getAssessmentSkills = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: {
        skills: { include: { skill: true } },
        assessments: { include: { skill: true } },
      },
    });

    const targetSkills = ['Java', 'Python', 'SQL', 'Data Structures & Algorithms', 'React', 'Spring Boot', 'Cloud & AWS'];
    const skillList = await prisma.skill.findMany({
      where: {
        name: { in: targetSkills },
      },
      include: {
        _count: { select: { questions: true } },
      },
    });

    const results = skillList.map((skill) => {
      const studentSkill = studentProfile?.skills.find((s) => s.skillId === skill.id);
      const pastAssessment = studentProfile?.assessments.find((a) => a.skillId === skill.id);

      return {
        skillId: skill.id,
        name: skill.name,
        category: skill.category,
        questionCount: skill._count.questions || 5,
        currentLevel: studentSkill ? studentSkill.level : 50,
        isVerified: studentSkill?.isVerified || false,
        lastScore: pastAssessment ? pastAssessment.score : null,
        totalQuestions: pastAssessment ? pastAssessment.totalQuestions : 10,
        completedAt: pastAssessment ? pastAssessment.completedAt : null,
      };
    });

    res.json({ assessments: results });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch assessments. ' + error.message });
  }
};

export const getQuestionsForSkill = async (req: any, res: Response): Promise<void> => {
  try {
    const { skillName } = req.params;
    const skill = await prisma.skill.findFirst({
      where: {
        OR: [
          { name: { contains: skillName } },
          { id: skillName },
        ],
      },
      include: {
        questions: true,
      },
    });

    if (!skill) {
      res.status(404).json({ error: `Assessment skill "${skillName}" not found.` });
      return;
    }

    // Parse options for client
    const sanitizedQuestions = skill.questions.map((q) => {
      let parsedOptions: string[] = [];
      try {
        parsedOptions = JSON.parse(q.options);
      } catch {
        parsedOptions = q.options.split(',');
      }
      return {
        id: q.id,
        question: q.question,
        options: parsedOptions,
        difficulty: q.difficulty,
        // do not send correctAnswer or correctIndex here to prevent cheating
      };
    });

    res.json({
      skillId: skill.id,
      skillName: skill.name,
      totalQuestions: sanitizedQuestions.length,
      timeLimitMinutes: Math.max(5, sanitizedQuestions.length * 1.5),
      questions: sanitizedQuestions,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch questions. ' + error.message });
  }
};

export const submitAssessment = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const { skillId, answers } = req.body; // answers: { [questionId]: selectedIndex }

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: { skills: true },
    });

    if (!studentProfile) {
      res.status(404).json({ error: 'Student profile not found.' });
      return;
    }

    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
      include: { questions: true },
    });

    if (!skill) {
      res.status(404).json({ error: 'Skill not found.' });
      return;
    }

    const questions = skill.questions;
    let correctCount = 0;
    const reviewDetails: any[] = [];

    questions.forEach((q) => {
      const selectedIndex = answers[q.id];
      const isCorrect = selectedIndex === q.correctIndex;
      if (isCorrect) correctCount++;

      let parsedOptions = [];
      try {
        parsedOptions = JSON.parse(q.options);
      } catch {
        parsedOptions = q.options.split(',');
      }

      reviewDetails.push({
        id: q.id,
        question: q.question,
        options: parsedOptions,
        selectedIndex,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
      });
    });

    const totalQuestions = questions.length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    const existingStudentSkill = await prisma.studentSkill.findUnique({
      where: {
        studentId_skillId: {
          studentId: studentProfile.id,
          skillId: skill.id,
        },
      },
    });

    const previousLevel = existingStudentSkill ? existingStudentSkill.level : 60;
    // Calculation: new level moves closer to score percentage
    const levelDelta = Math.round((scorePercentage - previousLevel) * 0.4);
    const updatedLevel = Math.max(30, Math.min(98, previousLevel + levelDelta));

    // Save skill assessment
    const assessment = await prisma.skillAssessment.create({
      data: {
        studentId: studentProfile.id,
        skillId: skill.id,
        score: correctCount,
        totalQuestions,
        previousLevel,
        updatedLevel,
        feedback:
          correctCount >= 8
            ? `Exceptional mastery in ${skill.name}! Verified at level ${updatedLevel}%.`
            : correctCount >= 5
            ? `Solid understanding of ${skill.name}. Review advanced topics to reach master level.`
            : `Foundational skills in ${skill.name} need reinforcement. Follow the recommended roadmap.`,
      },
    });

    // Update student skill record
    await prisma.studentSkill.upsert({
      where: {
        studentId_skillId: {
          studentId: studentProfile.id,
          skillId: skill.id,
        },
      },
      update: {
        level: updatedLevel,
        verifiedLevel: updatedLevel,
        isVerified: true,
      },
      create: {
        studentId: studentProfile.id,
        skillId: skill.id,
        level: updatedLevel,
        verifiedLevel: updatedLevel,
        isVerified: true,
      },
    });

    // Recalculate profile score
    const updatedProfile = await prisma.studentProfile.findUnique({
      where: { id: studentProfile.id },
      include: {
        skills: { include: { skill: true } },
        projects: true,
        certifications: true,
        careerGoals: true,
        assessments: true,
      },
    });

    if (updatedProfile) {
      const score = calculateProfileScore(updatedProfile);
      await prisma.studentProfile.update({
        where: { id: studentProfile.id },
        data: {
          profileScore: score.totalScore,
          careerReadiness: score.careerReadiness,
        },
      });
    }

    res.json({
      message: `Assessment completed for ${skill.name}!`,
      score: correctCount,
      totalQuestions,
      percentage: scorePercentage,
      previousLevel,
      updatedLevel,
      feedback: assessment.feedback,
      nextRecommendations:
        updatedLevel >= 80
          ? [`Advanced ${skill.name} Patterns`, 'Spring Boot Microservices Architecture']
          : [`Foundations of ${skill.name}`, 'Hands-on Practice Exercises'],
      reviewDetails,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to submit assessment. ' + error.message });
  }
};
