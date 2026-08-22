"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeLesson = exports.getLearningPath = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const learningPathService_1 = require("../services/learningPathService");
const getLearningPath = async (req, res) => {
    try {
        const userId = req.user.userId;
        const studentProfile = await prisma_1.default.studentProfile.findUnique({
            where: { userId },
        });
        if (!studentProfile) {
            res.status(404).json({ error: 'Student profile not found.' });
            return;
        }
        const path = await learningPathService_1.learningPathService.getOrCreateLearningPath(studentProfile.id, studentProfile.targetRole);
        res.json({
            learningPath: path,
            targetRole: studentProfile.targetRole,
            overallProgress: path.overallProgress,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch learning path. ' + error.message });
    }
};
exports.getLearningPath = getLearningPath;
const completeLesson = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { lessonId } = req.body;
        if (!lessonId) {
            res.status(400).json({ error: 'lessonId is required.' });
            return;
        }
        const studentProfile = await prisma_1.default.studentProfile.findUnique({
            where: { userId },
        });
        if (!studentProfile) {
            res.status(404).json({ error: 'Student profile not found.' });
            return;
        }
        const result = await learningPathService_1.learningPathService.completeLesson(lessonId, studentProfile.id);
        // Fetch updated learning path
        const updatedPath = await learningPathService_1.learningPathService.getOrCreateLearningPath(studentProfile.id, studentProfile.targetRole);
        // Fetch updated profile
        const updatedProfile = await prisma_1.default.studentProfile.findUnique({
            where: { id: studentProfile.id },
            include: { skills: { include: { skill: true } } },
        });
        res.json({
            ...result,
            learningPath: updatedPath,
            profile: updatedProfile,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to complete lesson. ' + error.message });
    }
};
exports.completeLesson = completeLesson;
