import { Request, Response } from 'express';
import { db } from '../config/database';
import { AuthenticatedRequest } from '../middleware/auth';
import { RecommendationEngine } from '../recommendation/engine';

export const getAllInternships = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { search, sector, workMode, minStipend, skill, sort } = req.query;

    const filters = {
      search: search ? String(search) : undefined,
      sector: sector ? String(sector) : undefined,
      workMode: workMode ? String(workMode) : undefined,
      minStipend: minStipend ? Number(minStipend) : undefined,
      skill: skill ? String(skill) : undefined
    };

    let internships = await db.getAllInternships(filters);

    // If student is logged in, optionally calculate live compatibility match score
    let studentProfile = null;
    if (req.user && req.user.role === 'student') {
      studentProfile = await db.getProfileByUserId(req.user.id);
    }

    let results = internships.map(internship => {
      let breakdown = null;
      if (studentProfile) {
        breakdown = RecommendationEngine.calculateMatch(studentProfile, internship);
      }
      return {
        ...internship,
        matchScore: breakdown?.finalMatchScore || null,
        selectionProbability: breakdown?.selectionProbability || null,
        probabilityLevel: breakdown?.probabilityLevel || null,
        breakdown
      };
    });

    // Apply sorting
    if (sort === 'highest-stipend') {
      results.sort((a, b) => b.stipendAmount - a.stipendAmount);
    } else if (sort === 'best-match' && studentProfile) {
      results.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else if (sort === 'selection-prob' && studentProfile) {
      results.sort((a, b) => (b.selectionProbability || 0) - (a.selectionProbability || 0));
    } else {
      // Default: newest
      results.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      internships: results
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Error fetching internships.' });
  }
};

export const getInternshipById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const internship = await db.getInternshipById(id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found.' });
    }

    let breakdown = null;
    if (req.user && req.user.role === 'student') {
      const studentProfile = await db.getProfileByUserId(req.user.id);
      if (studentProfile) {
        breakdown = RecommendationEngine.calculateMatch(studentProfile, internship);
      }
    }

    return res.status(200).json({
      success: true,
      internship: {
        ...internship,
        matchScore: breakdown?.finalMatchScore || null,
        selectionProbability: breakdown?.selectionProbability || null,
        breakdown
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Error retrieving internship.' });
  }
};
