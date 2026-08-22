import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { title, companyName, description, location, workMode, stipend, duration, careerCategory, skills = [] } = await req.json();

    if (!title || !companyName) {
      return NextResponse.json({ message: 'Title and company name are required' }, { status: 400 });
    }

    let company = await prisma.company.findFirst({
      where: { name: companyName.trim() },
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: companyName.trim(),
          industry: 'Technology',
          description: 'Enterprise corporate partner',
          location: location || 'Bangalore, India',
        },
      });
    }

    const internship = await prisma.internship.create({
      data: {
        companyId: company.id,
        title: title.trim(),
        description: description || 'Exciting engineering internship opportunity.',
        location: location || 'Remote',
        workMode: workMode || 'Remote',
        stipend: stipend || '₹25,000 / month',
        duration: duration || '3-6 Months',
        careerCategory: careerCategory || 'Backend',
        active: true,
      },
    });

    for (const reqSkill of skills) {
      let skill = await prisma.skill.findUnique({ where: { name: reqSkill.name } });
      if (!skill) {
        skill = await prisma.skill.create({
          data: { name: reqSkill.name, category: 'Technical', industryDemand: 80 },
        });
      }
      await prisma.internshipSkill.create({
        data: {
          internshipId: internship.id,
          skillId: skill.id,
          requiredLevel: reqSkill.requiredLevel || 70,
        },
      });
    }

    return NextResponse.json({ message: 'Internship published', internship }, { status: 201 });
  } catch (error: any) {
    console.error('Create internship error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
