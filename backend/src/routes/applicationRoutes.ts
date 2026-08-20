import { Router } from 'express';
import { getMyApplications, applyInternship, updateApplicationStatus } from '../controllers/applicationController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, getMyApplications);
router.post('/', requireAuth, applyInternship);
router.patch('/:id/status', requireAuth, updateApplicationStatus);

export default router;
