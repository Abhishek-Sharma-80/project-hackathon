import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role = 'STUDENT', college, course, branch, graduationYear, targetRole } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'A user with this email already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        role: role.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'STUDENT',
        profile: role.toUpperCase() === 'ADMIN' ? undefined : {
          create: {
            college: college || 'Galgotias University',
            course: course || 'B.Tech',
            branch: branch || 'Computer Science & Engineering',
            graduationYear: parseInt(graduationYear) || 2026,
            targetRole: targetRole || 'Backend Developer',
            profileScore: 45,
            careerReadiness: 40,
          },
        },
      },
      include: { profile: true },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return NextResponse.json({
      message: 'Account registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profileId: user.profile?.id || null,
        profileScore: user.profile?.profileScore || 45,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
