export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
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
  highestQualification: string; // e.g. B.Tech, BCA, B.Sc, MCA, M.Tech
  college: string;
  course: string;
  branch: string;
  currentYear: string; // e.g. '1st Year', '2nd Year', '3rd Year', 'Final Year', 'Graduated'
  cgpa?: number;
  skills: string[]; // List of skill names
  interests: string[]; // Sectors e.g. 'Software Development', 'Artificial Intelligence'
  preferredRoles: string[]; // e.g. 'Frontend Developer', 'Data Analyst'
  preferredLocation: string; // City or 'Any'
  workPreference: 'Remote' | 'Hybrid' | 'On-site' | 'Any';
  durationPreference?: string; // e.g. '1-3 Months', '3-6 Months', '6+ Months'
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
  category: 'Frontend' | 'Backend' | 'AI & Data' | 'Cloud & DevOps' | 'Mobile' | 'Design' | 'Cybersecurity' | 'Core CS' | 'Soft Skills' | 'Business';
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
  sector: string; // e.g. 'Software Development', 'Data Science', 'Artificial Intelligence'
  roleCategory: string; // e.g. 'Frontend', 'Backend', 'Machine Learning'
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  duration: string; // e.g. '3 Months', '6 Months'
  stipend: string; // e.g. '₹25,000 / month' or 'Unpaid'
  stipendAmount: number; // numeric value in INR for filtering/sorting
  openings: number;
  minQualification: string;
  preferredBranches: string[];
  minCgpa?: number;
  deadline?: string;
  postedAt: string;
  status: 'active' | 'closed';
  applicantCount?: number;
}

export interface RecommendationBreakdown {
  skillsScore: number; // 0-100 (40% weight)
  sectorScore: number; // 0-100 (30% weight)
  educationScore: number; // 0-100 (20% weight)
  locationScore: number; // 0-100 (10% weight)
  finalMatchScore: number; // 0-100 weighted
  selectionProbability: number; // 0-100 estimated
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
