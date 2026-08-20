import { Router } from 'express';
import { getSavedInternships, saveInternship, removeSavedInternship } from '../controllers/savedController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, getSavedInternships);
router.post('/', requireAuth, saveInternship);
router.delete('/:id', requireAuth, removeSavedInternship);

export default router;
