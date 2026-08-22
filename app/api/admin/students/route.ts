import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';

    const whereClause: any = {};
    if (search) {
      whereClause.OR = [
        { user: { name: { contains: search } } },
        { user: { email: { contains: search } } },
        { college: { contains: search } },
        { branch: { contains: search } },
        { targetRole: { contains: search } },
      ];
    }

    const students = await prisma.studentProfile.findMany({
      where: whereClause,
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        skills: { include: { skill: true } },
        projects: true,
        certifications: true,
        applications: true,
      },
      orderBy: { profileScore: 'desc' },
    });

    return NextResponse.json({ students });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
