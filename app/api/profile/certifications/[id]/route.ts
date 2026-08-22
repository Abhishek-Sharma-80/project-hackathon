import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { calculateProfileScore } from '@/services/profile-score-engine';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const cert = await prisma.certification.findUnique({
      where: { id: params.id },
      include: { student: true },
    });

    if (!cert || cert.student.userId !== user.userId) {
      return NextResponse.json({ message: 'Certification not found or forbidden' }, { status: 404 });
    }

    await prisma.certification.delete({ where: { id: params.id } });

    // Recalculate score
    const updatedProfile = await prisma.studentProfile.findUnique({
      where: { id: cert.studentId },
      include: { skills: true, projects: true, certifications: true, careerGoals: true, assessments: true },
    });

    if (updatedProfile) {
      const breakdown = calculateProfileScore(updatedProfile);
      await prisma.studentProfile.update({
        where: { id: cert.studentId },
        data: {
          profileScore: breakdown.totalScore,
          careerReadiness: breakdown.careerReadiness,
        },
      });
    }

    return NextResponse.json({ message: 'Certification deleted' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
