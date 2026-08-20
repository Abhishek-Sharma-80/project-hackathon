import { Router } from 'express';
import { getAllInternships, getInternshipById } from '../controllers/internshipController';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types';

const router = Router();

// Optional auth middleware so guests can browse, and logged in students get dynamic match scores
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

router.get('/', optionalAuth, getAllInternships);
router.get('/:id', optionalAuth, getInternshipById);

export default router;
