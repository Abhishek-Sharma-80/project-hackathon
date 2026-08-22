import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { skillName: string } }) {
  try {
    const decodedSkillName = decodeURIComponent(params.skillName);
    const skill = await prisma.skill.findFirst({
      where: {
        OR: [
          { name: decodedSkillName },
          { name: { contains: decodedSkillName } },
        ],
      },
      include: {
        questions: true,
      },
    });

    if (!skill) return NextResponse.json({ message: 'Skill assessment not found' }, { status: 404 });

    const formattedQuestions = skill.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: JSON.parse(q.options),
      difficulty: q.difficulty,
    }));

    return NextResponse.json({
      skillId: skill.id,
      skillName: skill.name,
      timeLimitMinutes: 10,
      totalQuestions: formattedQuestions.length,
      questions: formattedQuestions,
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
