export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN';
  avatarUrl?: string;
  profileId?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  college: string;
  course: string;
  branch: string;
  graduationYear: number;
  cgpa: number;
  semester: number;
  profileScore: number;
  careerReadiness: number;
  bio?: string;
  targetRole: string;
  user?: User;
  skills?: StudentSkill[];
  projects?: Project[];
  certifications?: Certification[];
  careerGoals?: CareerGoal[];
  applications?: Application[];
  assessments?: SkillAssessment[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  industryDemand: number;
  description?: string;
}

export interface StudentSkill {
  id: string;
  studentId: string;
  skillId: string;
  skill: Skill;
  level: number;
  verifiedLevel?: number;
  isVerified: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  githubUrl?: string;
  projectUrl?: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  completionDate: string;
  credentialUrl?: string;
}

export interface CareerGoal {
  id: string;
  careerPath: string;
  targetDate?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  website?: string;
  location: string;
  logoUrl?: string;
  companySize: string;
}

export interface InternshipSkill {
  id: string;
  skillId: string;
  skill: Skill;
  requiredLevel: number;
  importance: 'REQUIRED' | 'PREFERRED';
}

export interface Internship {
  id: string;
  companyId: string;
  company: Company;
  title: string;
  description: string;
  location: string;
  workMode: string;
  stipend: string;
  duration: string;
  deadline?: string;
  careerCategory: string;
  active: boolean;
  responsibilities?: string;
  eligibility?: string;
  requiredSkills: InternshipSkill[];
  matchScore?: number;
  matchingSkills?: string[];
  missingSkills?: string[];
  explanation?: string;
  isSaved?: boolean;
}

export interface LearningLesson {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  completed: boolean;
  summary: string;
  codeSnippet?: string;
  resources?: string;
  order: number;
}

export interface LearningModule {
  id: string;
  learningPathId: string;
  title: string;
  description: string;
  estimatedHours: number;
  order: number;
  status: 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';
  progress: number;
  skillsImproved: string;
  lessons: LearningLesson[];
}

export interface LearningPath {
  id: string;
  studentId: string;
  careerPath: string;
  overallProgress: number;
  modules: LearningModule[];
}

export interface SkillAssessment {
  id: string;
  skillId: string;
  skill: Skill;
  score: number;
  totalQuestions: number;
  previousLevel: number;
  updatedLevel: number;
  feedback?: string;
  completedAt: string;
}

export interface Application {
  id: string;
  studentId: string;
  internshipId: string;
  internship: Internship;
  status: 'SAVED' | 'APPLIED' | 'SHORTLISTED' | 'INTERVIEW' | 'SELECTED' | 'REJECTED';
  matchScore: number;
  notes?: string;
  appliedAt: string;
  updatedAt: string;
}
