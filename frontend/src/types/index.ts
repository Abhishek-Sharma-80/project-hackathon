export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  highestQualification: string;
  college: string;
  course: string;
  branch: string;
  currentYear: string;
  cgpa?: number;
  skills: string[];
  interests: string[];
  preferredRoles: string[];
  preferredLocation: string;
  workPreference: 'Remote' | 'Hybrid' | 'On-site' | 'Any';
  durationPreference?: string;
  experienceLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  languages?: string[];
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  onboardingCompleted: boolean;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  demandLevel: 'High' | 'Medium' | 'Trending';
}

export interface Internship {
  id: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  sector: string;
  roleCategory: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  duration: string;
  stipend: string;
  stipendAmount: number;
  openings: number;
  minQualification: string;
  preferredBranches: string[];
  minCgpa?: number;
  postedAt: string;
  status: 'active' | 'closed';
  applicantCount?: number;
  matchScore?: number | null;
  selectionProbability?: number | null;
  probabilityLevel?: 'High' | 'Medium' | 'Low' | null;
  breakdown?: RecommendationBreakdown | null;
}

export interface RecommendationBreakdown {
  skillsScore: number;
  sectorScore: number;
  educationScore: number;
  locationScore: number;
  finalMatchScore: number;
  selectionProbability: number;
  probabilityLevel: 'High' | 'Medium' | 'Low';
  matchedSkills: string[];
  missingSkills: string[];
  reasons: string[];
  improvementTips: string[];
}

export interface RecommendedInternship {
  internship: Internship;
  breakdown: RecommendationBreakdown;
}

export interface SkillGapItem {
  skill: string;
  category: string;
  priority: 'High' | 'Medium' | 'Beginner Friendly';
  whyImportant: string;
  unlockedInternshipsCount: number;
  relatedRoles: string[];
  recommendedResource: {
    title: string;
    type: 'Course' | 'Documentation' | 'Project' | 'Certification';
    url: string;
    estimatedHours: string;
  };
}

export interface LearningRoadmapNode {
  id: string;
  title: string;
  description: string;
  skills: string[];
  status: 'completed' | 'in-progress' | 'locked';
  resources: { name: string; link: string; free: boolean }[];
  projectIdea: string;
}

export interface LearningRoadmap {
  id: string;
  role: string;
  sector: string;
  description: string;
  estimatedWeeks: number;
  nodes: LearningRoadmapNode[];
}

export type ApplicationStatus = 'Saved' | 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected';

export interface Application {
  id: string;
  userId: string;
  studentName?: string;
  studentEmail?: string;
  internshipId: string;
  internship?: Internship;
  status: ApplicationStatus;
  appliedAt: string;
  coverNote?: string;
  notes?: string;
  matchScoreAtApply?: number;
}

export interface SavedInternship {
  id: string;
  userId: string;
  internshipId: string;
  internship?: Internship;
  savedAt: string;
}

export interface AdminStats {
  totalStudents: number;
  totalInternships: number;
  totalApplications: number;
  totalRecommendationsGenerated: number;
  sectorDistribution: { sector: string; count: number }[];
  topDemandedSkills: { skill: string; count: number }[];
  applicationStatusBreakdown: { status: ApplicationStatus; count: number }[];
  recentApplications: Application[];
}
