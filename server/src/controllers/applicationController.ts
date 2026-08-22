import { Response } from 'express';
import prisma from '../config/prisma';
import { recommendationEngine } from '../services/recommendationEngine';

export const getApplications = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!studentProfile) {
      res.status(404).json({ error: 'Student profile not found.' });
      return;
    }

    const applications = await prisma.application.findMany({
      where: { studentId: studentProfile.id },
      include: {
        internship: {
          include: {
            company: true,
            requiredSkills: { include: { skill: true } },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Counts for application summary
    const counts = {
      SAVED: applications.filter((a) => a.status === 'SAVED').length,
      APPLIED: applications.filter((a) => a.status === 'APPLIED').length,
      SHORTLISTED: applications.filter((a) => a.status === 'SHORTLISTED').length,
      INTERVIEW: applications.filter((a) => a.status === 'INTERVIEW').length,
      SELECTED: applications.filter((a) => a.status === 'SELECTED').length,
      REJECTED: applications.filter((a) => a.status === 'REJECTED').length,
      total: applications.length,
    };

    res.json({
      applications,
      counts,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch applications. ' + error.message });
  }
};

export const createApplication = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const { internshipId, status = 'APPLIED', notes } = req.body;

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: {
        skills: { include: { skill: true } },
        projects: true,
        certifications: true,
        careerGoals: true,
        user: true,
      },
    });

    if (!studentProfile) {
      res.status(404).json({ error: 'Student profile not found.' });
      return;
    }

    const internship = await prisma.internship.findUnique({
      where: { id: internshipId },
      include: { requiredSkills: { include: { skill: true } } },
    });

    if (!internship) {
      res.status(404).json({ error: 'Internship not found.' });
      return;
    }

    const match = recommendationEngine.calculateMatch(studentProfile, internship);

    const application = await prisma.application.upsert({
      where: {
        studentId_internshipId: {
          studentId: studentProfile.id,
          internshipId,
        },
      },
      update: {
        status,
        notes: notes || undefined,
        matchScore: match.matchScore,
      },
      create: {
        studentId: studentProfile.id,
        internshipId,
        status,
        matchScore: match.matchScore,
        notes: notes || 'Applied via SmartEdu AI recommendation.',
      },
      include: {
        internship: { include: { company: true } },
      },
    });

    res.status(201).json({
      message: status === 'SAVED' ? 'Internship saved to your list!' : 'Application submitted successfully!',
      application,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to process application. ' + error.message });
  }
};

export const updateApplicationStatus = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const application = await prisma.application.update({
      where: { id },
      data: {
        status: status || undefined,
        notes: notes !== undefined ? notes : undefined,
      },
      include: {
        internship: { include: { company: true } },
      },
    });

    res.json({ message: 'Application updated.', application });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update application. ' + error.message });
  }
};

export const deleteApplication = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.application.delete({ where: { id } });
    res.json({ message: 'Application removed.' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to remove application. ' + error.message });
  }
};
