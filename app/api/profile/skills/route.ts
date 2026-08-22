import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { calculateProfileScore } from '@/services/profile-score-engine';

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const profile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
    });

    if (!profile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const skills = await prisma.studentSkill.findMany({
      where: { studentId: profile.id },
      include: { skill: true },
    });

    return NextResponse.json({ skills });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const profile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
    });

    if (!profile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const { name, level = 70, category = 'Technical' } = await req.json();
    if (!name) return NextResponse.json({ message: 'Skill name is required' }, { status: 400 });

    let skill = await prisma.skill.findUnique({
      where: { name: name.trim() },
    });

    if (!skill) {
      skill = await prisma.skill.create({
        data: {
          name: name.trim(),
          category,
          industryDemand: 80,
        },
      });
    }

    const studentSkill = await prisma.studentSkill.upsert({
      where: {
        studentId_skillId: {
          studentId: profile.id,
          skillId: skill.id,
        },
      },
      update: { level: parseInt(level) || 70 },
      create: {
        studentId: profile.id,
        skillId: skill.id,
        level: parseInt(level) || 70,
      },
      include: { skill: true },
    });

    // Recalculate profile score
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

    return NextResponse.json({ message: 'Skill saved', skill: studentSkill });
  } catch (error: any) {
    console.error('Save skill error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
