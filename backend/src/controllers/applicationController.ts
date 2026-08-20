import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { db } from '../config/database';
import { Application } from '../types';

export const getMyApplications = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const applications = await db.getApplicationsByUser(req.user.id);
    return res.status(200).json({ success: true, applications });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve applications.' });
  }
};

export const applyInternship = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { internshipId, coverNote, matchScoreAtApply } = req.body;
    if (!internshipId) {
      return res.status(400).json({ success: false, message: 'Internship ID is required.' });
    }

    const internship = await db.getInternshipById(internshipId);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found.' });
    }

    const profile = await db.getProfileByUserId(req.user.id);

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      userId: req.user.id,
      studentName: profile?.fullName || 'Student',
      studentEmail: req.user.email,
      internshipId,
      internship,
      status: 'Applied',
      appliedAt: new Date().toISOString(),
      coverNote: coverNote || 'Excited to apply for this role and contribute my skills.',
      matchScoreAtApply: matchScoreAtApply || 85
    };

    const saved = await db.createApplication(newApplication);

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application: saved
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to apply.' });
  }
};

export const updateApplicationStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses: Application['status'][] = ['Saved', 'Applied', 'Under Review', 'Shortlisted', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const updated = await db.updateApplicationStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Application status updated.',
      application: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update application.' });
  }
};
