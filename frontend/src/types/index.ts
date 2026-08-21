export type UserRole = 'student' | 'admin' | 'recruiter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  companyName?: string;
  createdAt: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
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
  resumeScore?: number;
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  experiences?: ExperienceItem[];
  onboardingCompleted: boolean;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  demandLevel: 'High' | 'Medium' | 'Trending';
  proficiency?: number;
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

export interface Internship {
  id: string;
  companyName: string;
  company?: string;
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
  benefits?: string[];
}

export interface RecommendedInternship {
  internship: Internship;
  breakdown: RecommendationBreakdown;
}

export interface SkillGapItem {
  skill: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  status: 'Strong' | 'Developing' | 'Missing';
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
  estimatedHours?: number;
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

export type ApplicationStatus = 'Saved' | 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';

export interface Application {
  id: string;
  userId: string;
  studentName?: string;
  studentEmail?: string;
  studentCollege?: string;
  studentBranch?: string;
  studentCgpa?: number;
  internshipId: string;
  internship?: Internship;
  status: ApplicationStatus;
  appliedAt: string;
  coverNote?: string;
  notes?: string;
  interviewDate?: string;
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
  activeStudents: number;
  availableInternships: number;
  partnerCompanies: number;
  totalApplications: number;
  totalRecommendationsGenerated: number;
  studentsAtRiskCount: number;
  sectorDistribution: { sector: string; count: number }[];
  topDemandedSkills: { skill: string; count: number }[];
  applicationStatusBreakdown: { status: ApplicationStatus; count: number }[];
  skillDistribution: { name: string; percentage: number; color: string }[];
  monthlyTrends: { month: string; applications: number; placements: number }[];
  recentApplications: Application[];
}

export interface RecruiterCandidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  branch: string;
  cgpa: number;
  graduationYear: string;
  targetRole: string;
  matchScore: number;
  selectionProbability: number;
  skills: string[];
  status: 'New' | 'Shortlisted' | 'Interview Scheduled' | 'Offered' | 'Rejected';
  appliedFor: string;
  appliedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionButtons?: { label: string; link?: string; action?: string }[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  website: string;
  location: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  activeInternshipsCount: number;
  totalApplicationsCount: number;
  averageMatchScore: number;
  status: 'Verified' | 'Pending' | 'Suspended';
  description: string;
  foundedYear: number;
  companySize: string;
}

export interface AdminReport {
  id: string;
  title: string;
  category: 'Students' | 'Internships' | 'Applications' | 'Skill Gap' | 'AI Performance' | 'Companies';
  generatedDate: string;
  format: 'PDF' | 'CSV';
  fileSize: string;
  status: 'Ready' | 'Generating';
  downloadUrl?: string;
  metricsSummary: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'student' | 'company' | 'approval' | 'risk' | 'system';
  read: boolean;
  link?: string;
}

export interface LearningPathAdmin {
  id: string;
  title: string;
  category: string;
  description: string;
  durationWeeks: number;
  totalStudents: number;
  completionRate: number;
  averageProgress: number;
  status: 'Active' | 'Draft' | 'Archived';
  steps: {
    step: number;
    title: string;
    skills: string[];
    estimatedHours: number;
  }[];
}

export interface AISettings {
  skillsWeight: number;
  interestWeight: number;
  educationWeight: number;
  experienceWeight: number;
  thresholdMatchScore: number;
  autoRecommendationEnabled: boolean;
  modelProvider: string;
  highMatchCutoff: number;
}

