import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { learningPathService } from '@/services/learning-path-service';

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
    });

    if (!studentProfile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const learningPath = await learningPathService.getOrCreateLearningPath(
      studentProfile.id,
      studentProfile.targetRole
    );

    return NextResponse.json({ learningPath });
  } catch (error: any) {
    console.error('Learning path error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
