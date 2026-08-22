import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { recommendationEngine } from '@/services/recommendation-engine';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const workMode = searchParams.get('workMode') || '';

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

    const whereClause: any = { active: true };
    if (category) whereClause.careerCategory = category;
    if (workMode) whereClause.workMode = workMode;
    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { company: { name: { contains: search } } },
      ];
    }

    const internships = await prisma.internship.findMany({
      where: whereClause,
      include: {
        company: true,
        requiredSkills: { include: { skill: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const enriched = internships.map((item) => {
      let matchScore = 75;
      let matchingSkills: string[] = [];
      let missingSkills: string[] = [];

      if (studentProfile) {
        const matchResult = recommendationEngine.calculateMatch(studentProfile, item);
        matchScore = matchResult.matchScore;
        matchingSkills = matchResult.matchingSkills;
        missingSkills = matchResult.missingSkills;
      }

      return {
        ...item,
        matchScore,
        matchingSkills,
        missingSkills,
      };
    });

    enriched.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({ internships: enriched });
  } catch (error: any) {
    console.error('Get internships error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
