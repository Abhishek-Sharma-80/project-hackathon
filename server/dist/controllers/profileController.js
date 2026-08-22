"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCertification = exports.createCertification = exports.deleteProject = exports.createProject = exports.deleteSkill = exports.updateSkill = exports.addSkill = exports.saveOnboarding = exports.updateProfile = exports.getProfile = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const profileScoreEngine_1 = require("../services/profileScoreEngine");
const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const profile = await prisma_1.default.studentProfile.findUnique({
            where: { userId },
            include: {
                user: true,
                skills: {
                    include: { skill: true },
                    orderBy: { level: 'desc' },
                },
                projects: { orderBy: { createdAt: 'desc' } },
                certifications: { orderBy: { createdAt: 'desc' } },
                careerGoals: true,
                assessments: {
                    include: { skill: true },
                    orderBy: { completedAt: 'desc' },
                },
            },
        });
        if (!profile) {
            res.status(404).json({ error: 'Profile not found.' });
            return;
        }
        const breakdown = (0, profileScoreEngine_1.calculateProfileScore)(profile);
        res.json({
            profile,
            scoreBreakdown: breakdown,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile. ' + error.message });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { college, course, branch, graduationYear, cgpa, semester, bio, targetRole, name } = req.body;
        if (name) {
            await prisma_1.default.user.update({
                where: { id: userId },
                data: { name },
            });
        }
        const currentProfile = await prisma_1.default.studentProfile.findUnique({
            where: { userId },
            include: { skills: true, projects: true, certifications: true, careerGoals: true, assessments: true },
        });
        if (!currentProfile) {
            res.status(404).json({ error: 'Profile not found.' });
            return;
        }
        const newCgpa = cgpa !== undefined ? parseFloat(cgpa) : currentProfile.cgpa;
        const updatedProfileData = {
            ...currentProfile,
            cgpa: newCgpa,
        };
        const breakdown = (0, profileScoreEngine_1.calculateProfileScore)(updatedProfileData);
        const updatedProfile = await prisma_1.default.studentProfile.update({
            where: { userId },
            data: {
                college: college ?? currentProfile.college,
                course: course ?? currentProfile.course,
                branch: branch ?? currentProfile.branch,
                graduationYear: graduationYear ? parseInt(graduationYear) : currentProfile.graduationYear,
                cgpa: newCgpa,
                semester: semester ? parseInt(semester) : currentProfile.semester,
                bio: bio ?? currentProfile.bio,
                targetRole: targetRole ?? currentProfile.targetRole,
                profileScore: breakdown.totalScore,
                careerReadiness: breakdown.careerReadiness,
            },
            include: {
                user: true,
                skills: { include: { skill: true } },
                projects: true,
                certifications: true,
                careerGoals: true,
            },
        });
        res.json({
            message: 'Profile updated successfully!',
            profile: updatedProfile,
            scoreBreakdown: breakdown,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update profile. ' + error.message });
    }
};
exports.updateProfile = updateProfile;
const saveOnboarding = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { college, course, branch, graduationYear, cgpa, semester, skills = [], // [{ name, level, category }]
        projects = [], // [{ title, description, technologies, githubUrl, projectUrl }]
        certifications = [], // [{ name, provider, completionDate }]
        targetRole, } = req.body;
        const studentProfile = await prisma_1.default.studentProfile.findUnique({ where: { userId } });
        if (!studentProfile) {
            res.status(404).json({ error: 'Student profile not found.' });
            return;
        }
        // 1. Update basic and academic info
        await prisma_1.default.studentProfile.update({
            where: { id: studentProfile.id },
            data: {
                college: college || studentProfile.college,
                course: course || studentProfile.course,
                branch: branch || studentProfile.branch,
                graduationYear: graduationYear ? parseInt(graduationYear) : studentProfile.graduationYear,
                cgpa: cgpa ? parseFloat(cgpa) : studentProfile.cgpa,
                semester: semester ? parseInt(semester) : studentProfile.semester,
                targetRole: targetRole || studentProfile.targetRole,
            },
        });
        // 2. Add skills
        for (const s of skills) {
            if (!s.name)
                continue;
            const skillRecord = await prisma_1.default.skill.upsert({
                where: { name: s.name },
                update: {},
                create: {
                    name: s.name,
                    category: s.category || 'General',
                    industryDemand: 80,
                },
            });
            await prisma_1.default.studentSkill.upsert({
                where: {
                    studentId_skillId: {
                        studentId: studentProfile.id,
                        skillId: skillRecord.id,
                    },
                },
                update: { level: s.level || 60 },
                create: {
                    studentId: studentProfile.id,
                    skillId: skillRecord.id,
                    level: s.level || 60,
                },
            });
        }
        // 3. Add projects
        for (const p of projects) {
            if (!p.title)
                continue;
            await prisma_1.default.project.create({
                data: {
                    studentId: studentProfile.id,
                    title: p.title,
                    description: p.description || '',
                    technologies: p.technologies || '',
                    githubUrl: p.githubUrl || null,
                    projectUrl: p.projectUrl || null,
                },
            });
        }
        // 4. Add certifications
        for (const c of certifications) {
            if (!c.name)
                continue;
            await prisma_1.default.certification.create({
                data: {
                    studentId: studentProfile.id,
                    name: c.name,
                    provider: c.provider || '',
                    completionDate: c.completionDate || new Date().toISOString().split('T')[0],
                },
            });
        }
        // 5. Update career goal
        if (targetRole) {
            await prisma_1.default.careerGoal.create({
                data: {
                    studentId: studentProfile.id,
                    careerPath: targetRole,
                },
            });
        }
        // Recalculate profile score
        const updated = await prisma_1.default.studentProfile.findUnique({
            where: { id: studentProfile.id },
            include: {
                skills: { include: { skill: true } },
                projects: true,
                certifications: true,
                careerGoals: true,
                assessments: true,
            },
        });
        if (updated) {
            const scoreData = (0, profileScoreEngine_1.calculateProfileScore)(updated);
            await prisma_1.default.studentProfile.update({
                where: { id: updated.id },
                data: {
                    profileScore: scoreData.totalScore,
                    careerReadiness: scoreData.careerReadiness,
                },
            });
        }
        res.json({
            message: 'Onboarding completed successfully!',
            profile: updated,
        });
    }
    catch (error) {
        console.error('Onboarding error:', error);
        res.status(500).json({ error: 'Failed to save onboarding. ' + error.message });
    }
};
exports.saveOnboarding = saveOnboarding;
const addSkill = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, level = 60, category = 'General' } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Skill name is required.' });
            return;
        }
        const profile = await prisma_1.default.studentProfile.findUnique({ where: { userId } });
        if (!profile) {
            res.status(404).json({ error: 'Profile not found.' });
            return;
        }
        const skillRecord = await prisma_1.default.skill.upsert({
            where: { name },
            update: {},
            create: { name, category, industryDemand: 80 },
        });
        const studentSkill = await prisma_1.default.studentSkill.upsert({
            where: {
                studentId_skillId: {
                    studentId: profile.id,
                    skillId: skillRecord.id,
                },
            },
            update: { level: parseInt(level) },
            create: {
                studentId: profile.id,
                skillId: skillRecord.id,
                level: parseInt(level),
            },
            include: { skill: true },
        });
        // Update profile score
        const fullProfile = await prisma_1.default.studentProfile.findUnique({
            where: { id: profile.id },
            include: { skills: true, projects: true, certifications: true, careerGoals: true, assessments: true },
        });
        if (fullProfile) {
            const score = (0, profileScoreEngine_1.calculateProfileScore)(fullProfile);
            await prisma_1.default.studentProfile.update({
                where: { id: profile.id },
                data: { profileScore: score.totalScore, careerReadiness: score.careerReadiness },
            });
        }
        res.status(201).json({ message: 'Skill added!', studentSkill });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add skill. ' + error.message });
    }
};
exports.addSkill = addSkill;
const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { level } = req.body;
        const studentSkill = await prisma_1.default.studentSkill.update({
            where: { id },
            data: { level: parseInt(level) },
            include: { skill: true },
        });
        res.json({ message: 'Skill updated!', studentSkill });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update skill. ' + error.message });
    }
};
exports.updateSkill = updateSkill;
const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.studentSkill.delete({ where: { id } });
        res.json({ message: 'Skill deleted successfully.' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete skill. ' + error.message });
    }
};
exports.deleteSkill = deleteSkill;
const createProject = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, description, technologies, githubUrl, projectUrl } = req.body;
        const profile = await prisma_1.default.studentProfile.findUnique({ where: { userId } });
        if (!profile) {
            res.status(404).json({ error: 'Profile not found.' });
            return;
        }
        const project = await prisma_1.default.project.create({
            data: {
                studentId: profile.id,
                title,
                description,
                technologies: Array.isArray(technologies) ? technologies.join(', ') : technologies,
                githubUrl,
                projectUrl,
            },
        });
        res.status(201).json({ message: 'Project created!', project });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create project. ' + error.message });
    }
};
exports.createProject = createProject;
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.project.delete({ where: { id } });
        res.json({ message: 'Project deleted.' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete project. ' + error.message });
    }
};
exports.deleteProject = deleteProject;
const createCertification = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, provider, completionDate, credentialUrl } = req.body;
        const profile = await prisma_1.default.studentProfile.findUnique({ where: { userId } });
        if (!profile) {
            res.status(404).json({ error: 'Profile not found.' });
            return;
        }
        const certification = await prisma_1.default.certification.create({
            data: {
                studentId: profile.id,
                name,
                provider,
                completionDate: completionDate || new Date().toISOString().split('T')[0],
                credentialUrl,
            },
        });
        res.status(201).json({ message: 'Certification added!', certification });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add certification. ' + error.message });
    }
};
exports.createCertification = createCertification;
const deleteCertification = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.certification.delete({ where: { id } });
        res.json({ message: 'Certification deleted.' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete certification. ' + error.message });
    }
};
exports.deleteCertification = deleteCertification;
