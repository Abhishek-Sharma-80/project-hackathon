import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { learningPathService } from '@/services/learning-path-service';

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
    });

    if (!studentProfile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const { lessonId } = await req.json();
    if (!lessonId) return NextResponse.json({ message: 'lessonId is required' }, { status: 400 });

    const result = await learningPathService.completeLesson(lessonId, studentProfile.id);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Complete lesson error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
