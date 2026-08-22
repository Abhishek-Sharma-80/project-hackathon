import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { skillGapEngine } from '@/services/skill-gap-engine';

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
      include: {
        skills: { include: { skill: true } },
      },
    });

    if (!studentProfile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const allSkills = await prisma.skill.findMany();

    const formattedStudentSkills = studentProfile.skills.map((s) => ({
      skillId: s.skillId,
      skillName: s.skill.name,
      level: s.level,
      category: s.skill.category,
      industryDemand: s.skill.industryDemand,
    }));

    const analysis = skillGapEngine.analyzeSkillGaps(
      formattedStudentSkills,
      allSkills,
      studentProfile.targetRole
    );

    return NextResponse.json({
      targetRole: studentProfile.targetRole,
      ...analysis,
    });
  } catch (error: any) {
    console.error('Skill gaps error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
