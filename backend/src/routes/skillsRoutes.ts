import { Router, Request, Response } from 'express';
import { db } from '../config/database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const skills = await db.getAllSkills();
    return res.status(200).json({ success: true, count: skills.length, skills });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch skills' });
  }
});

export default router;
