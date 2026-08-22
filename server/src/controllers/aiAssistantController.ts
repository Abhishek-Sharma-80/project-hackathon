import { Response } from 'express';
import prisma from '../config/prisma';
import { aiAssistantService } from '../services/aiAssistantService';

export const chatWithAssistant = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!studentProfile) {
      res.status(404).json({ error: 'Student profile not found.' });
      return;
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        studentId: studentProfile.id,
        sender: 'USER',
        message,
      },
    });

    // Generate context-aware AI response
    const aiResponse = await aiAssistantService.generateAnswer(studentProfile.id, message);

    // Save AI message
    await prisma.chatMessage.create({
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
  } catch (error: any) {
    res.status(500).json({ error: 'AI Assistant error. ' + error.message });
  }
};

export const getChatHistory = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!studentProfile) {
      res.status(404).json({ error: 'Student profile not found.' });
      return;
    }

    const history = await prisma.chatMessage.findMany({
      where: { studentId: studentProfile.id },
      orderBy: { timestamp: 'asc' },
      take: 50,
    });

    res.json({ history });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch history. ' + error.message });
  }
};
