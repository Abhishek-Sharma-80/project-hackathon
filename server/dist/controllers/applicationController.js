"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplication = exports.updateApplicationStatus = exports.createApplication = exports.getApplications = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const recommendationEngine_1 = require("../services/recommendationEngine");
const getApplications = async (req, res) => {
    try {
        const userId = req.user.userId;
        const studentProfile = await prisma_1.default.studentProfile.findUnique({
            where: { userId },
        });
        if (!studentProfile) {
            res.status(404).json({ error: 'Student profile not found.' });
            return;
        }
        const applications = await prisma_1.default.application.findMany({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications. ' + error.message });
    }
};
exports.getApplications = getApplications;
const createApplication = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { internshipId, status = 'APPLIED', notes } = req.body;
        const studentProfile = await prisma_1.default.studentProfile.findUnique({
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
        const internship = await prisma_1.default.internship.findUnique({
            where: { id: internshipId },
            include: { requiredSkills: { include: { skill: true } } },
        });
        if (!internship) {
            res.status(404).json({ error: 'Internship not found.' });
            return;
        }
        const match = recommendationEngine_1.recommendationEngine.calculateMatch(studentProfile, internship);
        const application = await prisma_1.default.application.upsert({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to process application. ' + error.message });
    }
};
exports.createApplication = createApplication;
const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;
        const application = await prisma_1.default.application.update({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update application. ' + error.message });
    }
};
exports.updateApplicationStatus = updateApplicationStatus;
const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.application.delete({ where: { id } });
        res.json({ message: 'Application removed.' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove application. ' + error.message });
    }
};
exports.deleteApplication = deleteApplication;
