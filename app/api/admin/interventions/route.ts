import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const students = await prisma.studentProfile.findMany({
      include: {
        user: true,
        skills: { include: { skill: true } },
      },
      orderBy: { profileScore: 'asc' },
    });

    const flagged = students
      .filter((s) => s.profileScore < 75 || s.careerReadiness < 70 || s.cgpa < 7.5)
      .map((s) => {
        const weakSkills = s.skills.filter((sk) => sk.level < 50).map((sk) => sk.skill.name);
        const isHighRisk = s.profileScore < 60 || s.cgpa < 7.0;

        return {
          id: s.id,
          name: s.user.name,
          email: s.user.email,
          branch: s.branch,
          semester: s.semester,
          cgpa: s.cgpa,
          profileScore: s.profileScore,
          careerReadiness: s.careerReadiness,
          riskLevel: isHighRisk ? 'HIGH' : 'MEDIUM',
          criticalGaps: weakSkills.length > 0 ? weakSkills.slice(0, 3) : ['Spring Boot', 'Docker'],
          recommendedAction: isHighRisk
            ? 'Assign academic faculty mentor for hands-on project intervention.'
            : 'Recommend completing SmartEdu AI verified assessment and guided roadmap modules.',
        };
      });

    return NextResponse.json({ students: flagged });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
