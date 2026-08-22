import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { calculateProfileScore } from '@/services/profile-score-engine';

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
      include: { skills: true },
    });

    if (!studentProfile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const { skillId, answers } = await req.json();
    if (!skillId || !answers) {
      return NextResponse.json({ message: 'skillId and answers are required' }, { status: 400 });
    }

    const questions = await prisma.assessmentQuestion.findMany({
      where: { skillId },
    });

    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const totalQuestions = questions.length || 1;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    const existingStudentSkill = await prisma.studentSkill.findUnique({
      where: {
        studentId_skillId: {
          studentId: studentProfile.id,
          skillId,
        },
      },
    });

    const previousLevel = existingStudentSkill ? existingStudentSkill.level : 50;
    const updatedLevel = Math.max(previousLevel, Math.min(98, Math.round(previousLevel * 0.4 + scorePercentage * 0.6)));

    await prisma.studentSkill.upsert({
      where: {
        studentId_skillId: {
          studentId: studentProfile.id,
          skillId,
        },
      },
      update: {
        level: updatedLevel,
        verifiedLevel: updatedLevel,
        isVerified: scorePercentage >= 60,
      },
      create: {
        studentId: studentProfile.id,
        skillId,
        level: updatedLevel,
        verifiedLevel: updatedLevel,
        isVerified: scorePercentage >= 60,
      },
    });

    const assessment = await prisma.skillAssessment.create({
      data: {
        studentId: studentProfile.id,
        skillId,
        score: correctCount,
        totalQuestions,
        previousLevel,
        updatedLevel,
        feedback:
          scorePercentage >= 80
            ? 'Exceptional mastery! Your verified proficiency has updated and elevated your internship match ratings.'
            : 'Good effort! Review the missed core topics and retake the test to boost your verified score.',
      },
    });

    // Update student profile score
    const updatedProfile = await prisma.studentProfile.findUnique({
      where: { id: studentProfile.id },
      include: { skills: true, projects: true, certifications: true, careerGoals: true, assessments: true },
    });

    if (updatedProfile) {
      const breakdown = calculateProfileScore(updatedProfile);
      await prisma.studentProfile.update({
        where: { id: studentProfile.id },
        data: {
          profileScore: breakdown.totalScore,
          careerReadiness: breakdown.careerReadiness,
        },
      });
    }

    return NextResponse.json({
      message: 'Assessment evaluated successfully',
      score: correctCount,
      totalQuestions,
      percentage: scorePercentage,
      previousLevel,
      updatedLevel,
      feedback: assessment.feedback,
      nextRecommendations: [
        'Apply for top matched internships with your verified skill badge.',
        'Continue to the next module on your personalized learning roadmap.',
      ],
    });
  } catch (error: any) {
    console.error('Submit assessment error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
