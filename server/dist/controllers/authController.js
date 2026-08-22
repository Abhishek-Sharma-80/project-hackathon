"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoLogin = exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const learningPathService_1 = require("../services/learningPathService");
const JWT_SECRET = process.env.JWT_SECRET || 'smartedu_sih2026_super_secret_jwt_key_983742';
const register = async (req, res) => {
    try {
        const { name, email, password, college, course, branch, graduationYear, targetRole } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: 'Name, email, and password are required.' });
            return;
        }
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'An account with this email already exists.' });
            return;
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                passwordHash,
                role: 'STUDENT',
                profile: {
                    create: {
                        college: college || 'Galgotias University',
                        course: course || 'B.Tech',
                        branch: branch || 'Computer Science & Engineering',
                        graduationYear: graduationYear ? parseInt(graduationYear) : 2026,
                        targetRole: targetRole || 'Backend Developer',
                        cgpa: 8.0,
                        semester: 6,
                        profileScore: 65,
                        careerReadiness: 60,
                    },
                },
            },
            include: { profile: true },
        });
        if (user.profile) {
            await learningPathService_1.learningPathService.getOrCreateLearningPath(user.profile.id, user.profile.targetRole);
        }
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
        };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            message: 'Registration successful!',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileId: user.profile?.id,
            },
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed to register user. ' + error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required.' });
            return;
        }
        const user = await prisma_1.default.user.findUnique({
            where: { email },
            include: { profile: true },
        });
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
        };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            message: 'Login successful!',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileId: user.profile?.id,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Failed to login. ' + error.message });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            include: {
                profile: {
                    include: {
                        skills: { include: { skill: true } },
                        projects: true,
                        certifications: true,
                        careerGoals: true,
                    },
                },
            },
        });
        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user. ' + error.message });
    }
};
exports.getMe = getMe;
const demoLogin = async (req, res) => {
    try {
        const { role = 'student' } = req.body; // 'student' or 'admin'
        const targetEmail = role === 'admin' ? 'admin@smartedu.ai' : 'aryan@smartedu.ai';
        const user = await prisma_1.default.user.findUnique({
            where: { email: targetEmail },
            include: { profile: true },
        });
        if (!user) {
            res.status(404).json({ error: `Demo account (${targetEmail}) not found. Please run seed script.` });
            return;
        }
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
        };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            message: `Logged in as ${user.name} (${user.role})`,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileId: user.profile?.id,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Demo login failed. ' + error.message });
    }
};
exports.demoLogin = demoLogin;
