import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { recommendationEngine } from '@/services/recommendation-engine';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
      include: {
        skills: { include: { skill: true } },
        projects: true,
        certifications: true,
        careerGoals: true,
      },
    });

    if (!studentProfile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const internship = await prisma.internship.findUnique({
      where: { id: params.id },
      include: {
        company: true,
        requiredSkills: { include: { skill: true } },
      },
    });

    if (!internship) return NextResponse.json({ message: 'Internship not found' }, { status: 404 });

    const matchAnalysis = recommendationEngine.calculateMatch(studentProfile, internship);

    return NextResponse.json({
      internship,
      matchAnalysis,
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
