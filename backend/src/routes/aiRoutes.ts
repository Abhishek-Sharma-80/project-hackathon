import { Router } from 'express';
import { chatWithDishaAI, scanResumeAI } from '../controllers/aiController';

const router = Router();

router.post('/chat', chatWithDishaAI);
router.post('/resume-scan', scanResumeAI);

export default router;
