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
      include: {
        user: { select: { id: true, name: true, email: true, role: true, avatarUrl: true } },
        skills: { include: { skill: true } },
        projects: true,
        certifications: true,
        careerGoals: true,
        assessments: { include: { skill: true } },
        applications: { include: { internship: { include: { company: true } } } },
      },
    });

    if (!profile) return NextResponse.json({ message: 'Profile not found' }, { status: 404 });

    const scoreBreakdown = calculateProfileScore(profile);

    return NextResponse.json({ profile, scoreBreakdown });
  } catch (error: any) {
    console.error('Get profile error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, college, course, branch, graduationYear, cgpa, semester, bio, targetRole } = body;

    let profile = await prisma.studentProfile.findFirst({
      where: { userId: user.userId },
      include: { skills: true, projects: true, certifications: true, careerGoals: true, assessments: true },
    });

    if (!profile) {
      profile = await prisma.studentProfile.create({
        data: {
          userId: user.userId,
          college: college || 'Galgotias University',
          course: course || 'B.Tech',
          branch: branch || 'Computer Science & Engineering',
          graduationYear: graduationYear ? parseInt(graduationYear) : 2026,
          cgpa: cgpa !== undefined ? parseFloat(cgpa) : 8.5,
          semester: semester ? parseInt(semester) : 6,
          bio: bio || null,
          targetRole: targetRole || 'Backend Developer',
        },
        include: { skills: true, projects: true, certifications: true, careerGoals: true, assessments: true },
      });
    } else {
      if (name) {
        await prisma.user.update({
          where: { id: user.userId },
          data: { name: name.trim() },
        });
      }

      const updatedCgpa = cgpa !== undefined ? parseFloat(cgpa) : profile.cgpa;
      const scoreBreakdown = calculateProfileScore({
        ...profile,
        cgpa: updatedCgpa,
      });

      profile = await prisma.studentProfile.update({
        where: { id: profile.id },
        data: {
          college: college !== undefined ? college : profile.college,
          course: course !== undefined ? course : profile.course,
          branch: branch !== undefined ? branch : profile.branch,
          graduationYear: graduationYear !== undefined ? parseInt(graduationYear) : profile.graduationYear,
          cgpa: updatedCgpa,
          semester: semester !== undefined ? parseInt(semester) : profile.semester,
          bio: bio !== undefined ? bio : profile.bio,
          targetRole: targetRole !== undefined ? targetRole : profile.targetRole,
          profileScore: scoreBreakdown.totalScore,
          careerReadiness: scoreBreakdown.careerReadiness,
        },
        include: { skills: true, projects: true, certifications: true, careerGoals: true, assessments: true },
      });
    }

    const fullProfile = await prisma.studentProfile.findUnique({
      where: { id: profile.id },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        skills: { include: { skill: true } },
        projects: true,
        certifications: true,
        careerGoals: true,
        assessments: true,
      },
    });

    const scoreBreakdown = calculateProfileScore(fullProfile!);

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: fullProfile,
      scoreBreakdown,
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
