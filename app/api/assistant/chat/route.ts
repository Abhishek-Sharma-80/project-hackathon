import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { groqAIService } from '@/services/groq-ai';

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    let studentProfileId: string = '';

    if (user) {
      const studentProfile = await prisma.studentProfile.findFirst({
        where: { userId: user.userId },
      });
      if (studentProfile) {
        studentProfileId = studentProfile.id;
      }
    }

    // If no logged in profile, find Aryan's demo profile
    if (!studentProfileId) {
      const aryan = await prisma.studentProfile.findFirst({
        include: { user: true },
      });
      studentProfileId = aryan?.id || '';
    }

    const { message } = await req.json();
    if (!message || !message.trim()) {
      return NextResponse.json({ message: 'Message content is required' }, { status: 400 });
    }

    // Generate intelligent AI response from Groq LLaMA 3.3 70B
    const reply = await groqAIService.generateStudentResponse(studentProfileId, message);

    // Save message history if student exists
    if (studentProfileId) {
      await prisma.chatMessage.createMany({
        data: [
          { studentId: studentProfileId, sender: 'USER', message },
          { studentId: studentProfileId, sender: 'AI', message: reply },
        ],
      });
    }

    return NextResponse.json({
      reply,
      provider: 'Groq Cloud LLaMA 3.3 70B Versatile',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('AI assistant route error:', error);
    return NextResponse.json({
      reply: "I am ready to help you analyze your skill gaps, recommendations, and roadmaps. Ask me anything!",
    });
  }
}
