import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
    });

    if (!studentProfile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const applications = await prisma.application.findMany({
      where: { studentId: studentProfile.id },
      include: {
        internship: {
          include: {
            company: true,
            requiredSkills: { include: { skill: true } },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ applications });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
    });

    if (!studentProfile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const { internshipId, status = 'APPLIED', notes = '', matchScore = 85 } = await req.json();
    if (!internshipId) return NextResponse.json({ message: 'internshipId is required' }, { status: 400 });

    const application = await prisma.application.upsert({
      where: {
        studentId_internshipId: {
          studentId: studentProfile.id,
          internshipId,
        },
      },
      update: {
        status,
        notes: notes || undefined,
        matchScore: parseInt(matchScore) || 85,
      },
      create: {
        studentId: studentProfile.id,
        internshipId,
        status,
        notes,
        matchScore: parseInt(matchScore) || 85,
      },
      include: {
        internship: {
          include: { company: true },
        },
      },
    });

    return NextResponse.json({ message: 'Application submitted successfully', application });
  } catch (error: any) {
    console.error('Submit application error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
