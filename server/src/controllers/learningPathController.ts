import { Response } from 'express';
import prisma from '../config/prisma';
import { learningPathService } from '../services/learningPathService';

export const getLearningPath = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!studentProfile) {
      res.status(404).json({ error: 'Student profile not found.' });
      return;
    }

    const path = await learningPathService.getOrCreateLearningPath(
      studentProfile.id,
      studentProfile.targetRole
    );

    res.json({
      learningPath: path,
      targetRole: studentProfile.targetRole,
      overallProgress: path.overallProgress,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch learning path. ' + error.message });
  }
};

export const completeLesson = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const { lessonId } = req.body;

    if (!lessonId) {
      res.status(400).json({ error: 'lessonId is required.' });
      return;
    }

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!studentProfile) {
      res.status(404).json({ error: 'Student profile not found.' });
      return;
    }

    const result = await learningPathService.completeLesson(lessonId, studentProfile.id);

    // Fetch updated learning path
    const updatedPath = await learningPathService.getOrCreateLearningPath(
      studentProfile.id,
      studentProfile.targetRole
    );

    // Fetch updated profile
    const updatedProfile = await prisma.studentProfile.findUnique({
      where: { id: studentProfile.id },
      include: { skills: { include: { skill: true } } },
    });

    res.json({
      ...result,
      learningPath: updatedPath,
      profile: updatedProfile,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to complete lesson. ' + error.message });
  }
};
