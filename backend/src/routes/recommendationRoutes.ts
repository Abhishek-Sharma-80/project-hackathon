import { Router } from 'express';
import { getRecommendations, getSkillGapAnalysis, getLearningRoadmap } from '../controllers/recommendationController';
import { requireAuth } from '../middleware/auth';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types';

const router = Router();

const optionalAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'interndisha_super_secret_jwt_key_2025_empowerment') as { id: string; email: string; role: UserRole };
      req.user = decoded;
    } catch (e) {
      // ignore
    }
  }
  next();
};

router.get('/', requireAuth, getRecommendations);
router.post('/generate', requireAuth, getRecommendations);
router.get('/skill-gap', requireAuth, getSkillGapAnalysis);
router.get('/learning-path', optionalAuth, getLearningRoadmap);

export default router;
