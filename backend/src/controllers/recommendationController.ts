import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { db } from '../config/database';
import { RecommendationEngine } from '../recommendation/engine';
import { SkillGapAnalyzer } from '../recommendation/skillGap';
import { RoadmapGenerator } from '../recommendation/roadmaps';

export const getRecommendations = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const profile = await db.getProfileByUserId(req.user.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    const allInternships = await db.getAllInternships();
    const limit = req.query.limit ? Number(req.query.limit) : 5;

    const recommendations = RecommendationEngine.recommend(profile, allInternships, limit);

    return res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations
    });
  } catch (error: any) {
    console.error('Recommendations error:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate recommendations.' });
  }
};

export const getSkillGapAnalysis = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const profile = await db.getProfileByUserId(req.user.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    const allInternships = await db.getAllInternships();
    const gaps = SkillGapAnalyzer.analyze(profile, allInternships);

    return res.status(200).json({
      success: true,
      currentSkills: profile.skills || [],
      skillGaps: gaps,
      summary: {
        totalSkillsHave: (profile.skills || []).length,
        totalGapsIdentified: gaps.length,
        highPriorityCount: gaps.filter(g => g.priority === 'High').length
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to perform skill gap analysis.' });
  }
};

export const getLearningRoadmap = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { role } = req.query;
    let profile = null;

    if (req.user && req.user.role === 'student') {
      profile = await db.getProfileByUserId(req.user.id);
    }

    // Default dummy profile if guest or none
    const effectiveProfile = profile || {
      id: 'default',
      userId: 'default',
      fullName: 'Student',
      email: '',
      highestQualification: 'B.Tech',
      college: '',
      course: '',
      branch: 'Computer Science',
      currentYear: '3rd Year',
      skills: ['React', 'JavaScript', 'HTML5', 'CSS3'],
      interests: ['Software Development'],
      preferredRoles: ['Frontend Developer'],
      preferredLocation: 'Any',
      workPreference: 'Any',
      onboardingCompleted: true,
      updatedAt: ''
    };

    const roadmap = RoadmapGenerator.getRoadmapForStudent(effectiveProfile, role ? String(role) : undefined);
    const allRoadmaps = RoadmapGenerator.getAllRoadmaps().map(r => ({ id: r.id, role: r.role, sector: r.sector }));

    return res.status(200).json({
      success: true,
      roadmap,
      availableRoles: allRoadmaps
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to generate learning roadmap.' });
  }
};
