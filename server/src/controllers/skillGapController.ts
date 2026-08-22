import { Response } from 'express';
import prisma from '../config/prisma';
import { skillGapEngine } from '../services/skillGapEngine';

export const getSkillGaps = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: {
        skills: { include: { skill: true } },
      },
    });

    if (!studentProfile) {
      res.status(404).json({ error: 'Student profile not found.' });
      return;
    }

    const allSkills = await prisma.skill.findMany();
    const studentSkills = studentProfile.skills.map((s) => ({
      skillId: s.skillId,
      skillName: s.skill.name,
      level: s.level,
      category: s.skill.category,
      industryDemand: s.skill.industryDemand,
    }));

    const analysis = skillGapEngine.analyzeSkillGaps(
      studentSkills,
      allSkills,
      studentProfile.targetRole
    );

    res.json({
      targetRole: studentProfile.targetRole,
      strongSkills: analysis.strongSkills,
      developingSkills: analysis.developingSkills,
      priorityGaps: analysis.priorityGaps,
      stats: {
        strongCount: analysis.strongSkills.length,
        developingCount: analysis.developingSkills.length,
        priorityCount: analysis.priorityGaps.length,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to analyze skill gaps. ' + error.message });
  }
};
