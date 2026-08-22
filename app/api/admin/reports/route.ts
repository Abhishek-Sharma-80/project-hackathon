import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'skill-gap';

    if (type === 'skill-gap') {
      const report = {
        title: 'Institutional Student Skill Gap Intelligence Report',
        data: [
          { skill: 'Spring Boot 3 & Microservices', affectedStudents: 340, percentOfCohort: '53%', severity: 'Critical Priority', suggestedIntervention: 'Conduct 4-week Spring Framework Bootcamp' },
          { skill: 'Docker Containerization & CI/CD', affectedStudents: 290, percentOfCohort: '45%', severity: 'High Priority', suggestedIntervention: 'Integrate Docker Labs in Distributed Systems Course' },
          { skill: 'REST API Design & JWT Security', affectedStudents: 260, percentOfCohort: '41%', severity: 'High Priority', suggestedIntervention: 'API Contract Workshop and OpenAPI Hackathon' },
          { skill: 'System Design & Scalability', affectedStudents: 220, percentOfCohort: '34%', severity: 'Medium Priority', suggestedIntervention: 'Case study analysis of high-throughput architectures' },
          { skill: 'AWS Cloud Services & Deployments', affectedStudents: 205, percentOfCohort: '32%', severity: 'Medium Priority', suggestedIntervention: 'Cloud practitioner voucher subsidies' },
        ],
      };
      return NextResponse.json(report);
    } else {
      const report = {
        title: 'Department-Wise Career Readiness & Placement Forecast',
        data: [
          { department: 'Computer Science & Engineering', enrolled: 480, avgProfileScore: '84%', readyForInternship: '79%', topCareerTrack: 'Backend Development' },
          { department: 'Information Technology', enrolled: 320, avgProfileScore: '79%', readyForInternship: '72%', topCareerTrack: 'Full Stack Development' },
          { department: 'AI & Data Science', enrolled: 240, avgProfileScore: '87%', readyForInternship: '83%', topCareerTrack: 'AI & Machine Learning' },
          { department: 'Electronics & Communication', enrolled: 160, avgProfileScore: '71%', readyForInternship: '62%', topCareerTrack: 'Cloud & Embedded Systems' },
        ],
      };
      return NextResponse.json(report);
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
