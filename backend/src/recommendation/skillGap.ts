import { Internship, SkillGapItem, StudentProfile } from '../types';

export class SkillGapAnalyzer {
  public static analyze(profile: StudentProfile, allInternships: Internship[]): SkillGapItem[] {
    const studentSkillsLower = new Set((profile.skills || []).map(s => s.toLowerCase().trim()));

    // Collect all missing skills across active internships and calculate frequency
    const missingSkillCounts: Record<string, { count: number; roles: Set<string>; category: string }> = {};

    allInternships.forEach(internship => {
      const allReq = [...internship.requiredSkills, ...internship.preferredSkills];
      allReq.forEach(skill => {
        if (!studentSkillsLower.has(skill.toLowerCase().trim())) {
          if (!missingSkillCounts[skill]) {
            missingSkillCounts[skill] = {
              count: 0,
              roles: new Set(),
              category: internship.sector || 'Technical'
            };
          }
          missingSkillCounts[skill].count++;
          missingSkillCounts[skill].roles.add(internship.title);
        }
      });
    });

    const resourcesMap: Record<string, { title: string; type: 'Course' | 'Documentation' | 'Project' | 'Certification'; url: string; estimatedHours: string; why: string }> = {
      'TypeScript': {
        title: 'TypeScript for Modern React Developers',
        type: 'Course',
        url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
        estimatedHours: '8-10 Hours',
        why: '90% of modern frontend and full-stack enterprise codebases require TypeScript for type safety.'
      },
      'Docker': {
        title: 'Docker & Containers for Developers Bootcamp',
        type: 'Project',
        url: 'https://docs.docker.com/get-started/',
        estimatedHours: '6 Hours',
        why: 'Essential for running microservices, local testing, and modern cloud deployment pipelines.'
      },
      'Git & GitHub': {
        title: 'Complete Git & GitHub Collaboration Workflow',
        type: 'Course',
        url: 'https://learngitbranching.js.org/',
        estimatedHours: '4 Hours',
        why: 'Used daily in every engineering team for version control, code reviews, and open source collaboration.'
      },
      'Next.js': {
        title: 'Next.js App Router & Server Components Handbook',
        type: 'Documentation',
        url: 'https://nextjs.org/learn',
        estimatedHours: '12 Hours',
        why: 'The industry-standard framework for building production-grade SSR and SEO-optimized web apps.'
      },
      'PyTorch': {
        title: 'Deep Learning with PyTorch Fundamentals',
        type: 'Course',
        url: 'https://pytorch.org/tutorials/',
        estimatedHours: '15 Hours',
        why: 'Leading framework for training deep neural networks, computer vision, and generative AI models.'
      },
      'FastAPI': {
        title: 'FastAPI High-Performance Python Backend Guide',
        type: 'Project',
        url: 'https://fastapi.tiangolo.com/tutorial/',
        estimatedHours: '6 Hours',
        why: 'Standard modern framework for deploying scalable machine learning inference APIs.'
      },
      'PostgreSQL': {
        title: 'Relational Database Design & PostgreSQL Mastery',
        type: 'Course',
        url: 'https://www.postgresqltutorial.com/',
        estimatedHours: '10 Hours',
        why: 'The most popular relational database for high-reliability transactional web systems.'
      },
      'AWS': {
        title: 'AWS Cloud Practitioner Essentials',
        type: 'Certification',
        url: 'https://aws.amazon.com/training/',
        estimatedHours: '14 Hours',
        why: 'Primary cloud provider for hosting scalable cloud infrastructure and serverless workloads.'
      },
      'Figma': {
        title: 'UI/UX Design Systems & Component Design in Figma',
        type: 'Course',
        url: 'https://www.figma.com/resource-library/',
        estimatedHours: '8 Hours',
        why: 'Crucial for creating interactive UI prototypes and collaborating with development teams.'
      },
      'Data Structures & Algorithms': {
        title: 'Problem Solving & DSA Patterns in C++/Java/Python',
        type: 'Course',
        url: 'https://leetcode.com/explore/',
        estimatedHours: '25 Hours',
        why: 'Required for clearing technical coding rounds at top tech startups and MNCs.'
      },
      'REST APIs': {
        title: 'RESTful API Architecture & Best Practices',
        type: 'Documentation',
        url: 'https://restfulapi.net/',
        estimatedHours: '5 Hours',
        why: 'Core communication protocol connecting frontend clients with backend microservices.'
      }
    };

    const gapList: SkillGapItem[] = Object.entries(missingSkillCounts)
      .map(([skill, data]) => {
        const resource = resourcesMap[skill] || {
          title: `Mastering ${skill} Fundamentals & Projects`,
          type: 'Course',
          url: `https://www.google.com/search?q=${encodeURIComponent(skill + ' tutorial free')}`,
          estimatedHours: '6-8 Hours',
          why: `Frequently demanded in ${Array.from(data.roles).slice(0, 2).join(' and ')} positions.`
        };

        const priority: SkillGapItem['priority'] = 
          data.count >= 4 ? 'High' : data.count >= 2 ? 'Medium' : 'Beginner Friendly';

        return {
          skill,
          category: data.category,
          priority,
          whyImportant: resource.why,
          unlockedInternshipsCount: data.count,
          relatedRoles: Array.from(data.roles).slice(0, 3),
          recommendedResource: resource
        };
      })
      .sort((a, b) => b.unlockedInternshipsCount - a.unlockedInternshipsCount);

    return gapList.slice(0, 10);
  }
}
