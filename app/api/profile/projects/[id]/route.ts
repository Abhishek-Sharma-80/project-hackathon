import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { calculateProfileScore } from '@/services/profile-score-engine';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { student: true },
    });

    if (!project || project.student.userId !== user.userId) {
      return NextResponse.json({ message: 'Project not found or forbidden' }, { status: 404 });
    }

    await prisma.project.delete({ where: { id: params.id } });

    // Recalculate score
    const updatedProfile = await prisma.studentProfile.findUnique({
      where: { id: project.studentId },
      include: { skills: true, projects: true, certifications: true, careerGoals: true, assessments: true },
    });

    if (updatedProfile) {
      const breakdown = calculateProfileScore(updatedProfile);
      await prisma.studentProfile.update({
        where: { id: project.studentId },
        data: {
          profileScore: breakdown.totalScore,
          careerReadiness: breakdown.careerReadiness,
        },
      });
    }

    return NextResponse.json({ message: 'Project deleted' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
