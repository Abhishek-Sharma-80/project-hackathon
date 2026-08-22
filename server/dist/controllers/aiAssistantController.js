"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatHistory = exports.chatWithAssistant = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const aiAssistantService_1 = require("../services/aiAssistantService");
const chatWithAssistant = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { message } = req.body;
        if (!message) {
            res.status(400).json({ error: 'Message is required.' });
            return;
        }
        const studentProfile = await prisma_1.default.studentProfile.findUnique({
            where: { userId },
        });
        if (!studentProfile) {
            res.status(404).json({ error: 'Student profile not found.' });
            return;
        }
        // Save user message
        await prisma_1.default.chatMessage.create({
            data: {
                studentId: studentProfile.id,
                sender: 'USER',
                message,
            },
        });
        // Generate context-aware AI response
        const aiResponse = await aiAssistantService_1.aiAssistantService.generateAnswer(studentProfile.id, message);
        // Save AI message
        await prisma_1.default.chatMessage.create({
            data: {
                studentId: studentProfile.id,
                sender: 'AI',
                message: aiResponse,
            },
        });
        res.json({
            reply: aiResponse,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        res.status(500).json({ error: 'AI Assistant error. ' + error.message });
    }
};
exports.chatWithAssistant = chatWithAssistant;
const getChatHistory = async (req, res) => {
    try {
        const userId = req.user.userId;
        const studentProfile = await prisma_1.default.studentProfile.findUnique({
            where: { userId },
        });
        if (!studentProfile) {
            res.status(404).json({ error: 'Student profile not found.' });
            return;
        }
        const history = await prisma_1.default.chatMessage.findMany({
            where: { studentId: studentProfile.id },
            orderBy: { timestamp: 'asc' },
            take: 50,
        });
        res.json({ history });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch history. ' + error.message });
    }
};
exports.getChatHistory = getChatHistory;
