import { Internship, StudentProfile, RecommendationBreakdown, RecommendedInternship } from '../types';

export class RecommendationEngine {
  /**
   * Calculate Explainable Match Score for a single internship against a student profile
   */
  public static calculateMatch(profile: StudentProfile, internship: Internship): RecommendationBreakdown {
    const studentSkillsLower = new Set((profile.skills || []).map(s => s.toLowerCase().trim()));
    const requiredSkillsLower = (internship.requiredSkills || []).map(s => s.toLowerCase().trim());
    const preferredSkillsLower = (internship.preferredSkills || []).map(s => s.toLowerCase().trim());

    // 1. Skill Match Calculation (Weight 40%)
    const matchedRequired: string[] = [];
    const missingRequired: string[] = [];

    internship.requiredSkills.forEach(skill => {
      if (studentSkillsLower.has(skill.toLowerCase().trim())) {
        matchedRequired.push(skill);
      } else {
        missingRequired.push(skill);
      }
    });

    const matchedPreferred: string[] = [];
    internship.preferredSkills.forEach(skill => {
      if (studentSkillsLower.has(skill.toLowerCase().trim())) {
        matchedPreferred.push(skill);
      }
    });

    let skillsScore = 0;
    if (requiredSkillsLower.length > 0) {
      const requiredRatio = matchedRequired.length / requiredSkillsLower.length;
      skillsScore = requiredRatio * 85; // Base required skills worth up to 85%
      
      // Preferred bonus up to 15%
      if (preferredSkillsLower.length > 0) {
        const prefRatio = matchedPreferred.length / preferredSkillsLower.length;
        skillsScore += prefRatio * 15;
      } else if (requiredRatio > 0.8) {
        skillsScore += 15;
      }
    } else {
      skillsScore = 75;
    }
    skillsScore = Math.min(100, Math.max(10, Math.round(skillsScore)));

    // 2. Sector Match Calculation (Weight 30%)
    let sectorScore = 30;
    const studentInterestsLower = (profile.interests || []).map(i => i.toLowerCase().trim());
    const internSectorLower = (internship.sector || '').toLowerCase().trim();

    if (studentInterestsLower.includes(internSectorLower)) {
      sectorScore = 100;
    } else if (studentInterestsLower.length === 0 || studentInterestsLower.includes('any') || studentInterestsLower.includes('all')) {
      sectorScore = 80;
    } else {
      // Check partial or category overlap (e.g. AI with Data Science, Software Dev with Web)
      const isRelated = 
        (internSectorLower.includes('artificial') && studentInterestsLower.some(i => i.includes('data') || i.includes('software'))) ||
        (internSectorLower.includes('software') && studentInterestsLower.some(i => i.includes('web') || i.includes('ai'))) ||
        (internSectorLower.includes('data') && studentInterestsLower.some(i => i.includes('ai') || i.includes('software')));

      sectorScore = isRelated ? 70 : 35;
    }

    // 3. Education Match Calculation (Weight 20%)
    let educationScore = 75;
    const studentBranchLower = (profile.branch || '').toLowerCase();
    const preferredBranchesLower = (internship.preferredBranches || []).map(b => b.toLowerCase());
    
    // Check branch fit
    const branchMatch = preferredBranchesLower.some(b => 
      b === 'any' || studentBranchLower.includes(b) || b.includes(studentBranchLower)
    );

    // Check CGPA fit
    const cgpaFit = !internship.minCgpa || !profile.cgpa || (profile.cgpa >= internship.minCgpa);

    if (branchMatch && cgpaFit) {
      educationScore = 95;
    } else if (branchMatch || cgpaFit) {
      educationScore = 80;
    } else {
      educationScore = 60;
    }

    // 4. Location & Work Preference Match Calculation (Weight 10%)
    let locationScore = 60;
    const prefMode = (profile.workPreference || 'Any').toLowerCase();
    const internMode = (internship.workMode || '').toLowerCase();
    const prefLocation = (profile.preferredLocation || 'Any').toLowerCase();
    const internLocation = (internship.location || '').toLowerCase();

    const modeMatches = prefMode === 'any' || prefMode === internMode || internMode === 'remote';
    const locMatches = prefLocation === 'any' || internLocation.includes(prefLocation) || internMode === 'remote';

    if (modeMatches && locMatches) {
      locationScore = 100;
    } else if (modeMatches || locMatches) {
      locationScore = 75;
    } else {
      locationScore = 40;
    }

    // Weighted Total Score Calculation
    // Formula: 40% Skills + 30% Sector + 20% Education + 10% Location
    const finalMatchScore = Math.round(
      skillsScore * 0.40 +
      sectorScore * 0.30 +
      educationScore * 0.20 +
      locationScore * 0.10
    );

    // Selection Probability Calculation
    let selectionProbability = Math.round(finalMatchScore * 0.85);
    if (profile.cgpa && profile.cgpa >= 8.0) selectionProbability += 5;
    if (matchedRequired.length === internship.requiredSkills.length) selectionProbability += 8;
    selectionProbability = Math.min(96, Math.max(25, selectionProbability));

    const probabilityLevel: 'High' | 'Medium' | 'Low' = 
      selectionProbability >= 75 ? 'High' : selectionProbability >= 50 ? 'Medium' : 'Low';

    // Generate Human-Readable Reasons
    const reasons: string[] = [];
    if (matchedRequired.length > 0) {
      reasons.push(`Your ${matchedRequired.slice(0, 3).join(', ')} skills directly match the core requirements.`);
    }
    if (studentInterestsLower.includes(internSectorLower)) {
      reasons.push(`You selected ${internship.sector} as one of your primary areas of interest.`);
    }
    if (modeMatches) {
      reasons.push(`The ${internship.workMode} work mode aligns perfectly with your work preferences.`);
    }
    if (branchMatch) {
      reasons.push(`Your academic background in ${profile.branch || profile.course || 'Technology'} fits the target applicant profile.`);
    }
    if (reasons.length === 0) {
      reasons.push('Great introductory role to expand your technical skills and industry portfolio.');
    }

    // Improvement Tips
    const improvementTips: string[] = [];
    if (missingRequired.length > 0) {
      improvementTips.push(`Add or learn ${missingRequired.slice(0, 2).join(' & ')} to boost your match by up to +${Math.round(missingRequired.length * 8)}%.`);
    }
    if (internship.preferredSkills.length > 0 && matchedPreferred.length < internship.preferredSkills.length) {
      const missingPref = internship.preferredSkills.filter(s => !studentSkillsLower.has(s.toLowerCase()));
      if (missingPref.length > 0) {
        improvementTips.push(`Familiarity with ${missingPref[0]} gives an edge during the interview stage.`);
      }
    }
    if (!profile.githubUrl || !profile.portfolioUrl) {
      improvementTips.push('Linking your GitHub or portfolio can increase your selection probability by 15%.');
    }

    return {
      skillsScore,
      sectorScore,
      educationScore,
      locationScore,
      finalMatchScore,
      selectionProbability,
      probabilityLevel,
      matchedSkills: [...matchedRequired, ...matchedPreferred],
      missingSkills: missingRequired,
      reasons,
      improvementTips
    };
  }

  /**
   * Generate Top Ranked Recommendations for a student profile
   */
  public static recommend(profile: StudentProfile, allInternships: Internship[], limit: number = 5): RecommendedInternship[] {
    const scoredList: RecommendedInternship[] = allInternships
      .filter(i => i.status === 'active')
      .map(internship => ({
        internship,
        breakdown: this.calculateMatch(profile, internship)
      }))
      .sort((a, b) => b.breakdown.finalMatchScore - a.breakdown.finalMatchScore);

    return scoredList.slice(0, limit);
  }
}
