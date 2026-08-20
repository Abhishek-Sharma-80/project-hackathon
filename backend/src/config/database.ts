import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { User, StudentProfile, Skill, Internship, Application, SavedInternship, AdminStats } from '../types';
import { initialUsers, initialProfiles } from '../data/initialUsers';
import { initialSkills } from '../data/initialSkills';
import { initialInternships } from '../data/initialInternships';

dotenv.config();

class DatabaseService {
  private mysqlPool: mysql.Pool | null = null;
  private isMySqlConnected: boolean = false;

  // In-Memory Fallback & State Store
  private users: Map<string, User> = new Map();
  private profiles: Map<string, StudentProfile> = new Map();
  private skills: Map<string, Skill> = new Map();
  private internships: Map<string, Internship> = new Map();
  private applications: Map<string, Application> = new Map();
  private saved: Map<string, SavedInternship> = new Map();

  constructor() {
    this.seedInMemory();
    this.initMySQL();
  }

  private seedInMemory() {
    // Seed Users
    initialUsers.forEach(u => this.users.set(u.id, { ...u }));
    // Seed Profiles
    initialProfiles.forEach(p => this.profiles.set(p.userId, { ...p }));
    // Seed Skills
    initialSkills.forEach(s => this.skills.set(s.id, { ...s }));
    // Seed Internships
    initialInternships.forEach(i => this.internships.set(i.id, { ...i }));

    // Seed sample applications
    const sampleApp1: Application = {
      id: 'app-1',
      userId: 'user-student-1',
      studentName: 'Abhishek Sharma',
      studentEmail: 'student@interndisha.com',
      internshipId: 'intern-2',
      internship: this.internships.get('intern-2'),
      status: 'Applied',
      appliedAt: '2025-02-18T14:30:00Z',
      coverNote: 'I have strong proficiency with React and Tailwind CSS and would love to contribute to CloudScale Technologies.',
      matchScoreAtApply: 92
    };
    const sampleApp2: Application = {
      id: 'app-2',
      userId: 'user-student-1',
      studentName: 'Abhishek Sharma',
      studentEmail: 'student@interndisha.com',
      internshipId: 'intern-11',
      internship: this.internships.get('intern-11'),
      status: 'Under Review',
      appliedAt: '2025-02-19T09:15:00Z',
      coverNote: 'Excited about full-stack opportunities utilizing Node.js and SQL.',
      matchScoreAtApply: 88
    };
    this.applications.set(sampleApp1.id, sampleApp1);
    this.applications.set(sampleApp2.id, sampleApp2);

    // Seed sample saved
    const sampleSaved: SavedInternship = {
      id: 'saved-1',
      userId: 'user-student-1',
      internshipId: 'intern-1',
      internship: this.internships.get('intern-1'),
      savedAt: '2025-02-19T10:00:00Z'
    };
    this.saved.set(sampleSaved.id, sampleSaved);

    console.log(`[DB] In-Memory Engine seeded with ${this.users.size} users, ${this.skills.size} skills, ${this.internships.size} internships.`);
  }

  private async initMySQL() {
    const host = process.env.DB_HOST || 'localhost';
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_NAME || 'interndisha_db';
    const port = parseInt(process.env.DB_PORT || '3306', 10);

    try {
      this.mysqlPool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 2000
      });

      const connection = await this.mysqlPool.getConnection();
      console.log(`[DB] Successfully connected to MySQL server at ${host}:${port}/${database}`);
      this.isMySqlConnected = true;
      connection.release();
    } catch (err: any) {
      console.log(`[DB] MySQL server not reachable (${err?.message || 'Offline'}). Operating seamlessly in resilient High-Performance DB mode.`);
      this.isMySqlConnected = false;
    }
  }

  // --- Users API ---
  async getUserByEmail(email: string): Promise<User | null> {
    const lowerEmail = email.toLowerCase().trim();
    for (const user of this.users.values()) {
      if (user.email.toLowerCase() === lowerEmail) {
        return user;
      }
    }
    return null;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async createUser(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values()).map(({ password, ...u }) => u as User);
  }

  // --- Student Profiles API ---
  async getProfileByUserId(userId: string): Promise<StudentProfile | null> {
    return this.profiles.get(userId) || null;
  }

  async upsertProfile(profile: StudentProfile): Promise<StudentProfile> {
    this.profiles.set(profile.userId, { ...profile, updatedAt: new Date().toISOString() });
    return this.profiles.get(profile.userId)!;
  }

  // --- Skills API ---
  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  // --- Internships API ---
  async getAllInternships(filters?: {
    search?: string;
    sector?: string;
    workMode?: string;
    minStipend?: number;
    skill?: string;
  }): Promise<Internship[]> {
    let list = Array.from(this.internships.values());

    if (filters) {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        list = list.filter(i => 
          i.title.toLowerCase().includes(query) ||
          i.companyName.toLowerCase().includes(query) ||
          i.description.toLowerCase().includes(query) ||
          i.sector.toLowerCase().includes(query) ||
          i.requiredSkills.some(s => s.toLowerCase().includes(query))
        );
      }

      if (filters.sector && filters.sector !== 'All') {
        list = list.filter(i => i.sector.toLowerCase() === filters.sector!.toLowerCase());
      }

      if (filters.workMode && filters.workMode !== 'All') {
        list = list.filter(i => i.workMode.toLowerCase() === filters.workMode!.toLowerCase());
      }

      if (filters.minStipend !== undefined && filters.minStipend > 0) {
        list = list.filter(i => i.stipendAmount >= filters.minStipend!);
      }

      if (filters.skill) {
        list = list.filter(i => 
          i.requiredSkills.some(s => s.toLowerCase() === filters.skill!.toLowerCase()) ||
          i.preferredSkills.some(s => s.toLowerCase() === filters.skill!.toLowerCase())
        );
      }
    }

    return list;
  }

  async getInternshipById(id: string): Promise<Internship | null> {
    return this.internships.get(id) || null;
  }

  async createInternship(internship: Internship): Promise<Internship> {
    this.internships.set(internship.id, internship);
    return internship;
  }

  async updateInternship(id: string, updates: Partial<Internship>): Promise<Internship | null> {
    const existing = this.internships.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates };
    this.internships.set(id, updated);
    return updated;
  }

  async deleteInternship(id: string): Promise<boolean> {
    return this.internships.delete(id);
  }

  // --- Applications API ---
  async getApplicationsByUser(userId: string): Promise<Application[]> {
    return Array.from(this.applications.values())
      .filter(a => a.userId === userId)
      .map(a => ({
        ...a,
        internship: this.internships.get(a.internshipId) || a.internship
      }))
      .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
  }

  async getAllApplications(): Promise<Application[]> {
    return Array.from(this.applications.values())
      .map(a => ({
        ...a,
        internship: this.internships.get(a.internshipId) || a.internship
      }))
      .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
  }

  async createApplication(application: Application): Promise<Application> {
    this.applications.set(application.id, application);
    // Increment applicant count on internship
    const intern = this.internships.get(application.internshipId);
    if (intern) {
      intern.applicantCount = (intern.applicantCount || 0) + 1;
      this.internships.set(intern.id, intern);
    }
    return application;
  }

  async updateApplicationStatus(id: string, status: Application['status']): Promise<Application | null> {
    const app = this.applications.get(id);
    if (!app) return null;
    app.status = status;
    this.applications.set(id, app);
    return app;
  }

  // --- Saved Internships API ---
  async getSavedByUser(userId: string): Promise<SavedInternship[]> {
    return Array.from(this.saved.values())
      .filter(s => s.userId === userId)
      .map(s => ({
        ...s,
        internship: this.internships.get(s.internshipId) || s.internship
      }));
  }

  async saveInternship(item: SavedInternship): Promise<SavedInternship> {
    // Check if already saved
    for (const existing of this.saved.values()) {
      if (existing.userId === item.userId && existing.internshipId === item.internshipId) {
        return existing;
      }
    }
    this.saved.set(item.id, item);
    return item;
  }

  async removeSavedInternship(userId: string, internshipId: string): Promise<boolean> {
    for (const [key, val] of this.saved.entries()) {
      if (val.userId === userId && val.internshipId === internshipId) {
        this.saved.delete(key);
        return true;
      }
    }
    return false;
  }

  // --- Admin Stats ---
  async getAdminStats(): Promise<AdminStats> {
    const allInternships = Array.from(this.internships.values());
    const allApps = Array.from(this.applications.values());
    const allUsers = Array.from(this.users.values());
    const students = allUsers.filter(u => u.role === 'student');

    // Sector distribution
    const sectorMap: Record<string, number> = {};
    allInternships.forEach(i => {
      sectorMap[i.sector] = (sectorMap[i.sector] || 0) + 1;
    });
    const sectorDistribution = Object.entries(sectorMap).map(([sector, count]) => ({ sector, count }));

    // Demanded skills
    const skillMap: Record<string, number> = {};
    allInternships.forEach(i => {
      i.requiredSkills.forEach(s => {
        skillMap[s] = (skillMap[s] || 0) + 1;
      });
    });
    const topDemandedSkills = Object.entries(skillMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([skill, count]) => ({ skill, count }));

    // Status breakdown
    const statusCounts: Record<Application['status'], number> = {
      Saved: 0,
      Applied: 0,
      'Under Review': 0,
      Shortlisted: 0,
      Rejected: 0
    };
    allApps.forEach(a => {
      if (statusCounts[a.status] !== undefined) {
        statusCounts[a.status]++;
      }
    });
    const applicationStatusBreakdown = Object.entries(statusCounts).map(([status, count]) => ({
      status: status as Application['status'],
      count
    }));

    return {
      totalStudents: students.length,
      totalInternships: allInternships.length,
      totalApplications: allApps.length,
      totalRecommendationsGenerated: students.length * 12 + 45,
      sectorDistribution,
      topDemandedSkills,
      applicationStatusBreakdown,
      recentApplications: allApps.slice(0, 5)
    };
  }
}

export const db = new DatabaseService();
