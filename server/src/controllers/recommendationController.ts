import { Response } from 'express';
import prisma from '../config/prisma';
import { recommendationEngine } from '../services/recommendationEngine';

export const getRecommendations = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: {
        skills: { include: { skill: true } },
        projects: true,
        certifications: true,
        careerGoals: true,
        user: true,
      },
    });

    if (!studentProfile) {
      res.status(404).json({ error: 'Student profile not found.' });
      return;
    }

    const allInternships = await prisma.internship.findMany({
      where: { active: true },
      include: {
        company: true,
        requiredSkills: { include: { skill: true } },
      },
    });

    const recommendations = allInternships.map((internship) => {
      const matchResult = recommendationEngine.calculateMatch(studentProfile, internship);
      return {
        ...matchResult,
        internship,
      };
    });

    // Sort by match score descending
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    const topRecommendations = recommendations.slice(0, 10);
    const bestMatch = topRecommendations[0] || null;

    res.json({
      bestMatch,
      recommendations: topRecommendations,
      studentProfile: {
        id: studentProfile.id,
        name: studentProfile.user.name,
        targetRole: studentProfile.targetRole,
        profileScore: studentProfile.profileScore,
        careerReadiness: studentProfile.careerReadiness,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to generate recommendations. ' + error.message });
  }
};

export const getRecommendationExplanation = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const { internshipId } = req.params;

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: {
        skills: { include: { skill: true } },
        projects: true,
        certifications: true,
        careerGoals: true,
        user: true,
      },
    });

    if (!studentProfile) {
      res.status(404).json({ error: 'Student profile not found.' });
      return;
    }

    const internship = await prisma.internship.findUnique({
      where: { id: internshipId },
      include: {
        company: true,
        requiredSkills: { include: { skill: true } },
      },
    });

    if (!internship) {
      res.status(404).json({ error: 'Internship not found.' });
      return;
    }

    const matchAnalysis = recommendationEngine.calculateMatch(studentProfile, internship);

    res.json({
      internship,
      studentProfile: {
        id: studentProfile.id,
        name: studentProfile.user.name,
        cgpa: studentProfile.cgpa,
        profileScore: studentProfile.profileScore,
        careerReadiness: studentProfile.careerReadiness,
      },
      matchAnalysis,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to explain recommendation. ' + error.message });
  }
};
