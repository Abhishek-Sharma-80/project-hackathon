import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { db } from '../config/database';
import { Internship } from '../types';

export const getDashboardStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const stats = await db.getAdminStats();
    return res.status(200).json({ success: true, stats });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve admin stats.' });
  }
};

export const createInternship = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = req.body;
    if (!data.companyName || !data.title || !data.sector || !data.location) {
      return res.status(400).json({ success: false, message: 'Please fill all required internship fields.' });
    }

    const newInternship: Internship = {
      id: `intern-${Date.now()}`,
      companyName: data.companyName,
      companyLogo: data.companyLogo || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop&crop=faces&q=80',
      title: data.title,
      description: data.description || '',
      responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [data.responsibilities || 'Contribute to daily engineering tasks.'],
      requiredSkills: Array.isArray(data.requiredSkills) ? data.requiredSkills : [],
      preferredSkills: Array.isArray(data.preferredSkills) ? data.preferredSkills : [],
      sector: data.sector,
      roleCategory: data.roleCategory || 'Software Development',
      location: data.location,
      workMode: data.workMode || 'Remote',
      duration: data.duration || '3 Months',
      stipend: data.stipend || '₹20,000 / month',
      stipendAmount: Number(data.stipendAmount) || 20000,
      openings: Number(data.openings) || 2,
      minQualification: data.minQualification || 'B.Tech / BCA / MCA',
      preferredBranches: Array.isArray(data.preferredBranches) ? data.preferredBranches : ['Computer Science', 'Information Technology'],
      minCgpa: data.minCgpa ? Number(data.minCgpa) : undefined,
      postedAt: new Date().toISOString().split('T')[0],
      status: 'active',
      applicantCount: 0
    };

    const saved = await db.createInternship(newInternship);

    return res.status(201).json({
      success: true,
      message: 'New internship posted successfully!',
      internship: saved
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to create internship.' });
  }
};

export const updateInternship = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await db.updateInternship(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Internship not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Internship updated successfully!',
      internship: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update internship.' });
  }
};

export const deleteInternship = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteInternship(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Internship not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Internship deleted successfully.'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete internship.' });
  }
};

export const getAllStudents = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await db.getAllUsers();
    const students = users.filter(u => u.role === 'student');

    const studentsWithProfiles = await Promise.all(
      students.map(async s => {
        const profile = await db.getProfileByUserId(s.id);
        return {
          ...s,
          profile
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: studentsWithProfiles.length,
      students: studentsWithProfiles
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve students.' });
  }
};

export const getAllApplicationsAdmin = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const applications = await db.getAllApplications();
    return res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve applications.' });
  }
};
