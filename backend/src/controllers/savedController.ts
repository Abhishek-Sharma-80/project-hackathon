import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { db } from '../config/database';
import { SavedInternship } from '../types';

export const getSavedInternships = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const saved = await db.getSavedByUser(req.user.id);
    return res.status(200).json({ success: true, saved });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve saved internships.' });
  }
};

export const saveInternship = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { internshipId } = req.body;
    if (!internshipId) {
      return res.status(400).json({ success: false, message: 'Internship ID is required.' });
    }

    const internship = await db.getInternshipById(internshipId);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found.' });
    }

    const item: SavedInternship = {
      id: `saved-${Date.now()}`,
      userId: req.user.id,
      internshipId,
      internship,
      savedAt: new Date().toISOString()
    };

    const saved = await db.saveInternship(item);

    return res.status(201).json({
      success: true,
      message: 'Internship saved to your bookmarks!',
      saved
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to save internship.' });
  }
};

export const removeSavedInternship = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { id } = req.params;
    await db.removeSavedInternship(req.user.id, id);

    return res.status(200).json({
      success: true,
      message: 'Internship removed from saved.'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to remove saved internship.' });
  }
};
