import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    let studentProfile: any = null;
    if (user) {
      studentProfile = await prisma.studentProfile.findFirst({
        where: { userId: user.userId },
        include: { skills: true, assessments: true },
      });
    }

    const testSkills = ['Java', 'Python', 'SQL', 'Data Structures & Algorithms', 'Spring Boot', 'React', 'Docker', 'AWS'];
    const skills = await prisma.skill.findMany({
      where: { name: { in: testSkills } },
      include: { questions: true },
    });

    const result = skills.map((sk) => {
      const studentSkill = studentProfile?.skills.find((s: any) => s.skillId === sk.id);
      const lastAssessment = studentProfile?.assessments
        .filter((a: any) => a.skillId === sk.id)
        .sort((a: any, b: any) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0];

      return {
        skillId: sk.id,
        name: sk.name,
        category: sk.category,
        totalQuestions: sk.questions.length || 5,
        timeLimitMinutes: 10,
        currentLevel: studentSkill ? studentSkill.level : 40,
        isVerified: studentSkill ? studentSkill.isVerified : false,
        lastScore: lastAssessment ? lastAssessment.score : null,
      };
    });

    return NextResponse.json({ assessments: result });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
