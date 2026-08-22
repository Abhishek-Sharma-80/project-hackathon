import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { calculateProfileScore } from '@/services/profile-score-engine';

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const profile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
    });

    if (!profile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const { name, provider, completionDate, credentialUrl } = await req.json();
    if (!name) return NextResponse.json({ message: 'Certification name is required' }, { status: 400 });

    const cert = await prisma.certification.create({
      data: {
        studentId: profile.id,
        name: name.trim(),
        provider: provider || 'Industry Provider',
        completionDate: completionDate || new Date().toISOString().split('T')[0],
        credentialUrl: credentialUrl || null,
      },
    });

    // Recalculate score
    const updatedProfile = await prisma.studentProfile.findUnique({
      where: { id: profile.id },
      include: { skills: true, projects: true, certifications: true, careerGoals: true, assessments: true },
    });

    if (updatedProfile) {
      const breakdown = calculateProfileScore(updatedProfile);
      await prisma.studentProfile.update({
        where: { id: profile.id },
        data: {
          profileScore: breakdown.totalScore,
          careerReadiness: breakdown.careerReadiness,
        },
      });
    }

    return NextResponse.json({ message: 'Certification added', certification: cert });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
