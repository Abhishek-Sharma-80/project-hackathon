import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { recommendationEngine } from '@/services/recommendation-engine';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(req);
    let studentProfile: any = null;
    if (user) {
      studentProfile = await prisma.studentProfile.findFirst({
        where: { userId: user.userId },
        include: {
          skills: { include: { skill: true } },
          projects: true,
          certifications: true,
        },
      });
    }

    const internship = await prisma.internship.findUnique({
      where: { id: params.id },
      include: {
        company: true,
        requiredSkills: { include: { skill: true } },
      },
    });

    if (!internship) {
      return NextResponse.json({ message: 'Internship not found' }, { status: 404 });
    }

    let matchAnalysis = null;
    if (studentProfile) {
      matchAnalysis = recommendationEngine.calculateMatch(studentProfile, internship);
    }

    return NextResponse.json({
      internship,
      matchAnalysis,
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
