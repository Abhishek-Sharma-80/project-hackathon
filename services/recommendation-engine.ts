export interface MatchFactorBreakdown {
  skillOverlapScore: number;      // 40% weight
  proficiencyScore: number;       // 20% weight
  careerInterestScore: number;    // 15% weight
  academicScore: number;          // 10% weight
  projectScore: number;           // 10% weight
  certificationScore: number;     // 5% weight
}

export interface InternshipMatchResult {
  internshipId: string;
  matchScore: number;
  potentialMatchAfterLearning: number;
  matchingSkills: string[];
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  explanation: string;
  breakdown: MatchFactorBreakdown;
  skillComparison: {
    skillName: string;
    studentLevel: number;
    requiredLevel: number;
    isMet: boolean;
    importance: string;
  }[];
}

export class RecommendationEngine {
  public calculateMatch(studentProfile: any, internship: any): InternshipMatchResult {
    const studentSkillsMap = new Map<string, number>();
    (studentProfile.skills || []).forEach((ss: any) => {
      const skillName = ss.skill?.name || ss.name || '';
      studentSkillsMap.set(skillName.toLowerCase(), ss.level || 0);
    });

    const requiredSkillsList = internship.requiredSkills || [];
    let totalProficiencyWeight = 0;
    let maxProficiencyWeight = 0;

    const matchingSkills: string[] = [];
    const missingSkills: string[] = [];
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    const skillComparison = requiredSkillsList.map((req: any) => {
      const skillName = req.skill?.name || 'Skill';
      const requiredLevel = req.requiredLevel || 70;
      const studentLevel = studentSkillsMap.get(skillName.toLowerCase()) || 0;
      const importance = req.importance || 'REQUIRED';
      const isMet = studentLevel >= requiredLevel;

      if (studentLevel >= requiredLevel * 0.7) {
        matchingSkills.push(skillName);
        if (studentLevel >= 80) {
          strengths.push(`${skillName} (${studentLevel}% - Advanced)`);
        }
      } else {
        missingSkills.push(skillName);
        weaknesses.push(`${skillName} (Current: ${studentLevel}%, Needed: ${requiredLevel}%)`);
      }

      const weight = importance === 'REQUIRED' ? 1.5 : 1.0;
      totalProficiencyWeight += Math.min(1.0, studentLevel / requiredLevel) * weight;
      maxProficiencyWeight += weight;

      return {
        skillName,
        studentLevel,
        requiredLevel,
        isMet,
        importance,
      };
    });

    // 1. Skill Overlap Score (40%)
    const skillCount = Math.max(1, requiredSkillsList.length);
    const overlapRatio = Math.min(1, matchingSkills.length / skillCount);
    const skillOverlapScore = Math.round(overlapRatio * 100);

    // 2. Proficiency Score (20%)
    const proficiencyRatio = maxProficiencyWeight > 0 ? totalProficiencyWeight / maxProficiencyWeight : 0.5;
    const proficiencyScore = Math.round(proficiencyRatio * 100);

    // 3. Career Interest Match (15%)
    const targetRole = (studentProfile.targetRole || '').toLowerCase();
    const internshipCategory = (internship.careerCategory || '').toLowerCase();
    const internshipTitle = (internship.title || '').toLowerCase();
    let careerInterestScore = 60;
    if (targetRole && (internshipCategory.includes(targetRole) || internshipTitle.includes(targetRole) || targetRole.includes(internshipCategory))) {
      careerInterestScore = 100;
    } else if (targetRole && (targetRole.includes('full stack') || internshipCategory.includes('software') || internshipTitle.includes('developer'))) {
      careerInterestScore = 85;
    }

    // 4. Academic Profile Score (10%)
    const cgpa = studentProfile.cgpa || 7.5;
    const academicScore = Math.min(100, Math.round((cgpa / 10) * 100));

    // 5. Project Relevance (10%)
    const projects = studentProfile.projects || [];
    let projectRelevance = 40;
    if (projects.length >= 4) projectRelevance = 95;
    else if (projects.length >= 2) projectRelevance = 80;
    else if (projects.length >= 1) projectRelevance = 65;

    // 6. Certification Relevance (5%)
    const certs = studentProfile.certifications || [];
    let certificationScore = 50;
    if (certs.length >= 4) certificationScore = 100;
    else if (certs.length >= 2) certificationScore = 85;
    else if (certs.length >= 1) certificationScore = 70;

    const breakdown: MatchFactorBreakdown = {
      skillOverlapScore,
      proficiencyScore,
      careerInterestScore,
      academicScore,
      projectScore: projectRelevance,
      certificationScore,
    };

    const calculatedMatch = Math.round(
      skillOverlapScore * 0.40 +
      proficiencyScore * 0.20 +
      careerInterestScore * 0.15 +
      academicScore * 0.10 +
      projectRelevance * 0.10 +
      certificationScore * 0.05
    );

    const matchScore = Math.min(99, Math.max(25, calculatedMatch));
    const potentialMatchAfterLearning = Math.min(99, matchScore + Math.min(15, missingSkills.length * 4 + 4));

    const explanation = this.generateExplanation(
      studentProfile,
      internship,
      matchingSkills,
      missingSkills,
      matchScore,
      potentialMatchAfterLearning
    );

    return {
      internshipId: internship.id,
      matchScore,
      potentialMatchAfterLearning,
      matchingSkills,
      missingSkills,
      strengths,
      weaknesses,
      explanation,
      breakdown,
      skillComparison,
    };
  }

  private generateExplanation(
    student: any,
    internship: any,
    matchingSkills: string[],
    missingSkills: string[],
    matchScore: number,
    potentialScore: number
  ): string {
    const topMatches = matchingSkills.slice(0, 4).join(', ');
    const topGaps = missingSkills.slice(0, 3).join(', ');

    if (matchScore >= 85) {
      return `Outstanding match! Your solid foundation in ${topMatches || 'core engineering'} directly satisfies ${internship.company?.name || 'this company'}'s primary requirements. ${
        topGaps ? `Improving ${topGaps} via your personalized learning roadmap will elevate your readiness from ${matchScore}% to ${potentialScore}%, making you a standout applicant.` : 'You already meet or exceed all critical qualifications for this position.'
      }`;
    } else if (matchScore >= 70) {
      return `Strong potential match. You possess key prerequisites (${topMatches || 'fundamental skills'}), but ${internship.company?.name || 'the role'} heavily emphasizes ${topGaps || 'specialized tools'}. Completing the recommended learning modules will unlock a projected ${potentialScore}% match.`;
    } else {
      return `Developing match. While your academic background and foundational knowledge provide a base, this position requires specific hands-on experience in ${topGaps || 'advanced domain skills'}. Follow the step-by-step SmartEdu AI roadmap to bridge this gap.`;
    }
  }
}

export const recommendationEngine = new RecommendationEngine();
