import { Router } from 'express';
import { 
  getDashboardStats, 
  createInternship, 
  updateInternship, 
  deleteInternship, 
  getAllStudents,
  getAllApplicationsAdmin
} from '../controllers/adminController';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

// Protect all admin routes with authentication and admin role
router.use(requireAuth, requireAdmin);

router.get('/stats', getDashboardStats);
router.post('/internships', createInternship);
router.put('/internships/:id', updateInternship);
router.delete('/internships/:id', deleteInternship);
router.get('/students', getAllStudents);
router.get('/applications', getAllApplicationsAdmin);

export default router;
