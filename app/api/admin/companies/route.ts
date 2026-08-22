import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const companies = await prisma.company.findMany({
      include: {
        internships: true,
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ companies });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, industry, description, location, companySize, website } = await req.json();
    if (!name) return NextResponse.json({ message: 'Company name is required' }, { status: 400 });

    const company = await prisma.company.create({
      data: {
        name: name.trim(),
        industry: industry || 'Technology',
        description: description || '',
        location: location || 'Bangalore, India',
        companySize: companySize || '100-500 employees',
        website: website || null,
      },
    });

    return NextResponse.json({ message: 'Company registered', company }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
