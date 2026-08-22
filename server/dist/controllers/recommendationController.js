"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendationExplanation = exports.getRecommendations = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const recommendationEngine_1 = require("../services/recommendationEngine");
const getRecommendations = async (req, res) => {
    try {
        const userId = req.user.userId;
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
        const allInternships = await prisma_1.default.internship.findMany({
            where: { active: true },
            include: {
                company: true,
                requiredSkills: { include: { skill: true } },
            },
        });
        const recommendations = allInternships.map((internship) => {
            const matchResult = recommendationEngine_1.recommendationEngine.calculateMatch(studentProfile, internship);
            return {
                ...matchResult,
                internship,
            };
        });
        // Sort by match score descending
        recommendations.sort((a, b) => b.matchScore - a.matchScore);
        const topRecommendations = recommendations.slice(0, 10);
        const bestMatch = topRecommendations[0] || null;
        res.json({
            bestMatch,
            recommendations: topRecommendations,
            studentProfile: {
                id: studentProfile.id,
                name: studentProfile.user.name,
                targetRole: studentProfile.targetRole,
                profileScore: studentProfile.profileScore,
                careerReadiness: studentProfile.careerReadiness,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to generate recommendations. ' + error.message });
    }
};
exports.getRecommendations = getRecommendations;
const getRecommendationExplanation = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { internshipId } = req.params;
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
            include: {
                company: true,
                requiredSkills: { include: { skill: true } },
            },
        });
        if (!internship) {
            res.status(404).json({ error: 'Internship not found.' });
            return;
        }
        const matchAnalysis = recommendationEngine_1.recommendationEngine.calculateMatch(studentProfile, internship);
        res.json({
            internship,
            studentProfile: {
                id: studentProfile.id,
                name: studentProfile.user.name,
                cgpa: studentProfile.cgpa,
                profileScore: studentProfile.profileScore,
                careerReadiness: studentProfile.careerReadiness,
            },
            matchAnalysis,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to explain recommendation. ' + error.message });
    }
};
exports.getRecommendationExplanation = getRecommendationExplanation;
