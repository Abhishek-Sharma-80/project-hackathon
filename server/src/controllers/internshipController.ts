import { Response } from 'express';
import prisma from '../config/prisma';
import { recommendationEngine } from '../services/recommendationEngine';

export const getInternships = async (req: any, res: Response): Promise<void> => {
  try {
    const {
      search,
      category,
      workMode,
      location,
      minMatch,
      tab = 'all', // all, recommended, high_match, saved
    } = req.query;

    let studentProfile: any = null;
    if (req.user && req.user.userId) {
      studentProfile = await prisma.studentProfile.findUnique({
        where: { userId: req.user.userId },
        include: {
          skills: { include: { skill: true } },
          projects: true,
          certifications: true,
          careerGoals: true,
          user: true,
        },
      });
    }

    const whereClause: any = { active: true };
    if (category && category !== 'all') {
      whereClause.careerCategory = { contains: String(category) };
    }
    if (workMode && workMode !== 'all') {
      whereClause.workMode = String(workMode);
    }
    if (location && location !== 'all') {
      whereClause.location = { contains: String(location) };
    }
    if (search) {
      whereClause.OR = [
        { title: { contains: String(search) } },
        { description: { contains: String(search) } },
        { company: { name: { contains: String(search) } } },
      ];
    }

    const internships = await prisma.internship.findMany({
      where: whereClause,
      include: {
        company: true,
        requiredSkills: { include: { skill: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    let savedInternshipIds = new Set<string>();
    if (studentProfile) {
      const savedApps = await prisma.application.findMany({
        where: { studentId: studentProfile.id },
        select: { internshipId: true, status: true },
      });
      savedInternshipIds = new Set(savedApps.map((a) => a.internshipId));
    }

    let results = internships.map((internship) => {
      let matchScore = 75;
      let matchingSkills: string[] = [];
      let missingSkills: string[] = [];
      let explanation = '';

      if (studentProfile) {
        const matchResult = recommendationEngine.calculateMatch(studentProfile, internship);
        matchScore = matchResult.matchScore;
        matchingSkills = matchResult.matchingSkills;
        missingSkills = matchResult.missingSkills;
        explanation = matchResult.explanation;
      }

      const isSaved = savedInternshipIds.has(internship.id);

      return {
        ...internship,
        matchScore,
        matchingSkills,
        missingSkills,
        explanation,
        isSaved,
      };
    });

    // Handle tabs & filters
    if (tab === 'recommended' || tab === 'high_match') {
      results = results.filter((r) => r.matchScore >= 80);
    } else if (tab === 'saved') {
      results = results.filter((r) => r.isSaved);
    }

    if (minMatch) {
      results = results.filter((r) => r.matchScore >= parseInt(String(minMatch)));
    }

    // Sort by matchScore descending by default
    results.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      total: results.length,
      internships: results,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch internships. ' + error.message });
  }
};

export const getInternshipById = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const internship = await prisma.internship.findUnique({
      where: { id },
      include: {
        company: true,
        requiredSkills: { include: { skill: true } },
      },
    });

    if (!internship) {
      res.status(404).json({ error: 'Internship not found.' });
      return;
    }

    let matchAnalysis: any = null;
    if (req.user && req.user.userId) {
      const studentProfile = await prisma.studentProfile.findUnique({
        where: { userId: req.user.userId },
        include: {
          skills: { include: { skill: true } },
          projects: true,
          certifications: true,
          careerGoals: true,
          user: true,
        },
      });

      if (studentProfile) {
        matchAnalysis = recommendationEngine.calculateMatch(studentProfile, internship);
      }
    }

    res.json({
      internship,
      matchAnalysis,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch internship details. ' + error.message });
  }
};
