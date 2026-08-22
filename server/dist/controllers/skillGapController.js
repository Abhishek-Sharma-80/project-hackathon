"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSkillGaps = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const skillGapEngine_1 = require("../services/skillGapEngine");
const getSkillGaps = async (req, res) => {
    try {
        const userId = req.user.userId;
        const studentProfile = await prisma_1.default.studentProfile.findUnique({
            where: { userId },
            include: {
                skills: { include: { skill: true } },
            },
        });
        if (!studentProfile) {
            res.status(404).json({ error: 'Student profile not found.' });
            return;
        }
        const allSkills = await prisma_1.default.skill.findMany();
        const studentSkills = studentProfile.skills.map((s) => ({
            skillId: s.skillId,
            skillName: s.skill.name,
            level: s.level,
            category: s.skill.category,
            industryDemand: s.skill.industryDemand,
        }));
        const analysis = skillGapEngine_1.skillGapEngine.analyzeSkillGaps(studentSkills, allSkills, studentProfile.targetRole);
        res.json({
            targetRole: studentProfile.targetRole,
            strongSkills: analysis.strongSkills,
            developingSkills: analysis.developingSkills,
            priorityGaps: analysis.priorityGaps,
            stats: {
                strongCount: analysis.strongSkills.length,
                developingCount: analysis.developingSkills.length,
                priorityCount: analysis.priorityGaps.length,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to analyze skill gaps. ' + error.message });
    }
};
exports.getSkillGaps = getSkillGaps;
