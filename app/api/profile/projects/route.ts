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

    const { title, description, technologies, githubUrl, projectUrl } = await req.json();
    if (!title) return NextResponse.json({ message: 'Project title is required' }, { status: 400 });

    const project = await prisma.project.create({
      data: {
        studentId: profile.id,
        title: title.trim(),
        description: description || '',
        technologies: technologies || 'Software',
        githubUrl: githubUrl || null,
        projectUrl: projectUrl || null,
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

    return NextResponse.json({ message: 'Project added', project });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
