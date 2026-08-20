import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { db } from '../config/database';
import { StudentProfile } from '../types';

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const profile = await db.getProfileByUserId(req.user.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    return res.status(200).json({ success: true, profile });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Server error retrieving profile' });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const existing = await db.getProfileByUserId(req.user.id);
    const updates = req.body;

    const mergedProfile: StudentProfile = {
      id: existing?.id || `profile-${Date.now()}`,
      userId: req.user.id,
      fullName: updates.fullName || existing?.fullName || 'Student',
      email: req.user.email,
      phone: updates.phone ?? existing?.phone,
      highestQualification: updates.highestQualification ?? existing?.highestQualification ?? 'B.Tech',
      college: updates.college ?? existing?.college ?? '',
      course: updates.course ?? existing?.course ?? '',
      branch: updates.branch ?? existing?.branch ?? '',
      currentYear: updates.currentYear ?? existing?.currentYear ?? '1st Year',
      cgpa: updates.cgpa !== undefined ? Number(updates.cgpa) : existing?.cgpa,
      skills: updates.skills ?? existing?.skills ?? [],
      interests: updates.interests ?? existing?.interests ?? [],
      preferredRoles: updates.preferredRoles ?? existing?.preferredRoles ?? [],
      preferredLocation: updates.preferredLocation ?? existing?.preferredLocation ?? 'Any',
      workPreference: updates.workPreference ?? existing?.workPreference ?? 'Any',
      durationPreference: updates.durationPreference ?? existing?.durationPreference ?? '3-6 Months',
      experienceLevel: updates.experienceLevel ?? existing?.experienceLevel ?? 'Beginner',
      languages: updates.languages ?? existing?.languages ?? ['English'],
      bio: updates.bio ?? existing?.bio,
      linkedinUrl: updates.linkedinUrl ?? existing?.linkedinUrl,
      githubUrl: updates.githubUrl ?? existing?.githubUrl,
      portfolioUrl: updates.portfolioUrl ?? existing?.portfolioUrl,
      resumeUrl: updates.resumeUrl ?? existing?.resumeUrl,
      onboardingCompleted: updates.onboardingCompleted !== undefined ? updates.onboardingCompleted : (existing?.onboardingCompleted ?? true),
      updatedAt: new Date().toISOString()
    };

    const saved = await db.upsertProfile(mergedProfile);

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      profile: saved
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};
