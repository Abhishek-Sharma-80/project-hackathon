import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { recommendationEngine } from '@/services/recommendation-engine';

export async function GET(req: NextRequest) {
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

    if (!studentProfile) {
      return NextResponse.json({ message: 'Student profile not found' }, { status: 404 });
    }

    const activeInternships = await prisma.internship.findMany({
      where: { active: true },
      include: {
        company: true,
        requiredSkills: { include: { skill: true } },
      },
    });

    const recommendations = activeInternships.map((internship) => {
      const matchResult = recommendationEngine.calculateMatch(studentProfile, internship);
      return {
        internship,
        ...matchResult,
      };
    });

    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      recommendations,
      topMatch: recommendations[0] || null,
    });
  } catch (error: any) {
    console.error('Recommendations error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
