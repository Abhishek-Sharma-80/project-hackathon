import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json();
    const email = role === 'ADMIN' ? 'admin@smartedu.ai' : 'aryan@smartedu.ai';

    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'Demo account not found in database. Please seed database.' }, { status: 404 });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return NextResponse.json({
      message: `Logged in as demo ${user.role}`,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profileId: user.profile?.id || null,
        profileScore: user.profile?.profileScore || 82,
      },
    });
  } catch (error: any) {
    console.error('Demo login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
