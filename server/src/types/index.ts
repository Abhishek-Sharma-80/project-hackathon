export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

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

export interface AIProvider {
  calculateMatch(studentProfile: any, internship: any): Promise<InternshipMatchResult>;
  explainRecommendation(studentProfile: any, internship: any, matchResult: InternshipMatchResult): Promise<string>;
  detectSkillGaps(studentProfile: any): Promise<any[]>;
  generateRoadmap(studentProfile: any, targetRole: string): Promise<any>;
  answerQuestion(question: string, studentContext: any): Promise<string>;
}
