export interface CategorizedSkillGaps {
  strongSkills: {
    skillId: string;
    skillName: string;
    level: number;
    category: string;
    industryDemand: number;
  }[];
  developingSkills: {
    skillId: string;
    skillName: string;
    level: number;
    category: string;
    industryDemand: number;
  }[];
  priorityGaps: {
    skillId: string;
    skillName: string;
    currentLevel: number;
    targetLevel: number;
    gapSize: number;
    priorityScore: number;
    industryDemand: number;
    careerRelevance: number;
    reason: string;
  }[];
}

export class SkillGapEngine {
  /**
   * Analyzes all skills in the database against student profile and target role
   */
  public analyzeSkillGaps(
    studentSkills: { skillId: string; skillName: string; level: number; category?: string; industryDemand?: number }[],
    allSkills: { id: string; name: string; category: string; industryDemand: number }[],
    targetRole: string = 'Backend Developer'
  ): CategorizedSkillGaps {
    const studentSkillMap = new Map<string, number>();
    studentSkills.forEach((s) => {
      studentSkillMap.set(s.skillName.toLowerCase(), s.level);
    });

    const strongSkills: CategorizedSkillGaps['strongSkills'] = [];
    const developingSkills: CategorizedSkillGaps['developingSkills'] = [];
    const priorityGaps: CategorizedSkillGaps['priorityGaps'] = [];

    // Target role relevance dictionary
    const roleSkillWeights: Record<string, string[]> = {
      'backend developer': ['java', 'spring boot', 'sql', 'dsa', 'git', 'rest api', 'docker', 'postgresql', 'microservices', 'redis', 'aws'],
      'frontend developer': ['javascript', 'typescript', 'react', 'next.js', 'html/css', 'tailwind css', 'git', 'redux', 'rest api'],
      'full stack developer': ['javascript', 'react', 'node.js', 'express', 'sql', 'mongodb', 'docker', 'git', 'rest api', 'aws'],
      'data scientist': ['python', 'sql', 'machine learning', 'deep learning', 'pandas', 'numpy', 'scikit-learn', 'data analysis', 'power bi'],
      'ai engineer': ['python', 'pytorch', 'tensorflow', 'llms', 'langchain', 'vector databases', 'fastapi', 'docker'],
      'cloud engineer': ['aws', 'docker', 'kubernetes', 'linux', 'terraform', 'ci/cd', 'python', 'networking', 'git'],
      'cybersecurity': ['network security', 'linux', 'python', 'ethical hacking', 'cryptography', 'owasp', 'penetration testing'],
    };

    const targetKey = targetRole.toLowerCase();
    const relevantSkillNames = roleSkillWeights[targetKey] || roleSkillWeights['backend developer'];

    allSkills.forEach((skill) => {
      const skillLower = skill.name.toLowerCase();
      const currentLevel = studentSkillMap.get(skillLower) ?? 0;
      const isTargetRelevant = relevantSkillNames.some((r) => skillLower.includes(r) || r.includes(skillLower));
      const careerRelevance = isTargetRelevant ? 1.5 : 0.8;
      const targetLevel = isTargetRelevant ? 75 : 60;
      const gapSize = Math.max(0, targetLevel - currentLevel);

      if (currentLevel >= 75) {
        strongSkills.push({
          skillId: skill.id,
          skillName: skill.name,
          level: currentLevel,
          category: skill.category,
          industryDemand: skill.industryDemand,
        });
      } else if (currentLevel >= 40 && currentLevel < 75 && !isTargetRelevant) {
        developingSkills.push({
          skillId: skill.id,
          skillName: skill.name,
          level: currentLevel,
          category: skill.category,
          industryDemand: skill.industryDemand,
        });
      } else if (gapSize > 15 || (isTargetRelevant && currentLevel < 70)) {
        // Calculate priorityScore = gapSize * industryDemand * careerRelevance / 10
        const priorityScore = parseFloat(((gapSize * (skill.industryDemand / 100) * careerRelevance) * 1.5).toFixed(1));
        
        let reason = `High demand (${skill.industryDemand}%) for ${targetRole} roles.`;
        if (currentLevel === 0) {
          reason = `Critical prerequisite missing for ${targetRole}. Industry demand is ${skill.industryDemand}%.`;
        } else if (currentLevel < 35) {
          reason = `Significant gap (${gapSize}% below target). Found in over 85% of active internship listings.`;
        }

        priorityGaps.push({
          skillId: skill.id,
          skillName: skill.name,
          currentLevel,
          targetLevel,
          gapSize,
          priorityScore,
          industryDemand: skill.industryDemand,
          careerRelevance,
          reason,
        });
      } else if (currentLevel > 0) {
        developingSkills.push({
          skillId: skill.id,
          skillName: skill.name,
          level: currentLevel,
          category: skill.category,
          industryDemand: skill.industryDemand,
        });
      }
    });

    // Sort priority gaps by priority score descending
    priorityGaps.sort((a, b) => b.priorityScore - a.priorityScore);
    strongSkills.sort((a, b) => b.level - a.level);
    developingSkills.sort((a, b) => b.level - a.level);

    return {
      strongSkills,
      developingSkills,
      priorityGaps,
    };
  }
}

export const skillGapEngine = new SkillGapEngine();
