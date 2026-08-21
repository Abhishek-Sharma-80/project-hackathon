import { 
  User, 
  StudentProfile, 
  Internship, 
  RecommendationBreakdown, 
  SkillGapItem, 
  LearningRoadmap, 
  Application, 
  SavedInternship, 
  AdminStats,
  RecruiterCandidate
} from '../types';
import { 
  INITIAL_USER, 
  INITIAL_PROFILE, 
  MOCK_INTERNSHIPS, 
  MOCK_SKILL_GAPS, 
  MOCK_ROADMAP, 
  MOCK_APPLICATIONS, 
  MOCK_ADMIN_STATS,
  MOCK_RECRUITER_CANDIDATES,
  MOCK_ADMIN_STUDENTS,
  MOCK_ADMIN_COMPANIES,
  MOCK_ADMIN_REPORTS,
  MOCK_ADMIN_NOTIFICATIONS,
  MOCK_ADMIN_LEARNING_PATHS,
  MOCK_AI_SETTINGS
} from '../data/mockData';

const API_BASE_URL = '/api';

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('interndisha_token');
  }

  // Local Storage Helpers for Offline / Instant Standalone Mode
  private getLocal<T>(key: string, fallback: T): T {
    try {
      const stored = localStorage.getItem(`interndisha_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  }

  private setLocal<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`interndisha_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  private getHeaders(customHeaders: Record<string, string> = {}): HeadersInit {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = this.getHeaders(options.headers as Record<string, string>);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200); // quick timeout to fallback to instant mock

      const response = await fetch(url, { ...options, headers, signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (err: any) {
      // Backend not running or timeout -> Handled by fallback methods
      throw err;
    }
  }

  // --- Auth Endpoints ---
  async login(credentials: { email: string; password: string }) {
    try {
      return await this.request<{ success: boolean; token: string; user: User; profile?: StudentProfile }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    } catch {
      // Mock Fallback — derive name and role from the actual email typed
      const token = 'mock-jwt-token-xyz';
      const role = credentials.email.includes('admin') ? 'admin' : credentials.email.includes('recruiter') ? 'recruiter' : 'student';
      // Derive a human-readable name from email: e.g. dev@gmail.com → Dev
      const emailLocalPart = credentials.email.split('@')[0];
      const derivedName = emailLocalPart
        .split(/[._\-+]/)  // split on common separators
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
      const user: User = {
        id: `usr-${role}-${Date.now()}`,
        name: derivedName,
        email: credentials.email,
        role: role as any,
        createdAt: new Date().toISOString()
      };
      // Try to reuse any stored profile if it belongs to this email
      const storedProfile = this.getLocal<StudentProfile>('profile', INITIAL_PROFILE);
      const profile: StudentProfile = {
        ...storedProfile,
        id: `prof-${Date.now()}`,
        userId: user.id,
        fullName: user.name,
        email: user.email,
        onboardingCompleted: storedProfile.email === credentials.email ? storedProfile.onboardingCompleted : false
      };
      this.setLocal('user', user);
      this.setLocal('profile', profile);
      return { success: true, token, user, profile };
    }
  }

  async register(userData: { name: string; email: string; password: string; role?: 'student' | 'admin' | 'recruiter' }) {
    try {
      return await this.request<{ success: boolean; token: string; user: User }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    } catch {
      const token = 'mock-jwt-token-register';
      const user: User = {
        id: `usr-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`,
        createdAt: new Date().toISOString()
      };
      const profile: StudentProfile = {
        ...INITIAL_PROFILE,
        id: `prof-${Date.now()}`,
        userId: user.id,
        fullName: user.name,
        email: user.email,
        onboardingCompleted: false
      };
      this.setLocal('user', user);
      this.setLocal('profile', profile);
      return { success: true, token, user };
    }
  }

  async demoLogin(role: 'student' | 'admin' | 'recruiter' = 'student') {
    try {
      return await this.request<{ success: boolean; token: string; user: User; profile?: StudentProfile }>('/auth/demo-login', {
        method: 'POST',
        body: JSON.stringify({ role })
      });
    } catch {
      const token = `demo-token-${role}`;
      let user: User;
      if (role === 'admin') {
        user = {
          id: 'usr-admin-01',
          name: 'Prof. Ramesh Mehta',
          email: 'admin.placement@interndisha.edu',
          role: 'admin',
          createdAt: new Date().toISOString()
        };
      } else if (role === 'recruiter') {
        user = {
          id: 'usr-recruiter-01',
          name: 'Pooja Nair',
          email: 'pooja.nair@technova.ai',
          role: 'recruiter',
          companyName: 'TechNova',
          createdAt: new Date().toISOString()
        };
      } else {
        // Generic demo student — no hardcoded name
        user = {
          id: 'usr-demo-student-01',
          name: 'Demo Student',
          email: 'demo.student@interndisha.edu',
          role: 'student',
          createdAt: new Date().toISOString()
        };
      }
      const profile: StudentProfile = {
        ...INITIAL_PROFILE,
        id: `prof-demo-${role}-${Date.now()}`,
        userId: user.id,
        fullName: user.name,
        email: user.email
      };
      this.setLocal('user', user);
      this.setLocal('profile', profile);
      return { success: true, token, user, profile };
    }
  }

  async getMe() {
    try {
      return await this.request<{ success: boolean; user: User; profile?: StudentProfile }>('/auth/me');
    } catch {
      const user = this.getLocal<User>('user', INITIAL_USER);
      const profile = this.getLocal<StudentProfile>('profile', INITIAL_PROFILE);
      return { success: true, user, profile };
    }
  }

  // --- Profile Endpoints ---
  async getProfile() {
    try {
      return await this.request<{ success: boolean; profile: StudentProfile }>('/user/profile');
    } catch {
      const profile = this.getLocal<StudentProfile>('profile', INITIAL_PROFILE);
      return { success: true, profile };
    }
  }

  async updateProfile(updates: Partial<StudentProfile>) {
    try {
      return await this.request<{ success: boolean; message: string; profile: StudentProfile }>('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch {
      const current = this.getLocal<StudentProfile>('profile', INITIAL_PROFILE);
      const updated: StudentProfile = {
        ...current,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.setLocal('profile', updated);
      return { success: true, message: 'Profile updated successfully', profile: updated };
    }
  }

  // --- Internships Endpoints ---
  async getInternships(params?: { search?: string; sector?: string; workMode?: string; minStipend?: number; skill?: string; sort?: string }) {
    try {
      const query = new URLSearchParams();
      if (params?.search) query.append('search', params.search);
      if (params?.sector) query.append('sector', params.sector);
      if (params?.workMode) query.append('workMode', params.workMode);
      if (params?.minStipend) query.append('minStipend', String(params.minStipend));
      if (params?.skill) query.append('skill', params.skill);
      if (params?.sort) query.append('sort', params.sort);

      const queryString = query.toString() ? `?${query.toString()}` : '';
      return await this.request<{ success: boolean; count: number; internships: Internship[] }>(`/internships${queryString}`);
    } catch {
      let list = this.getLocal<Internship[]>('internships', MOCK_INTERNSHIPS);

      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(i => 
          i.title.toLowerCase().includes(q) || 
          i.companyName.toLowerCase().includes(q) || 
          i.requiredSkills.some(s => s.toLowerCase().includes(q)) ||
          i.sector.toLowerCase().includes(q)
        );
      }

      if (params?.sector && params.sector !== 'All') {
        list = list.filter(i => i.sector.toLowerCase() === params.sector!.toLowerCase());
      }

      if (params?.workMode && params.workMode !== 'All') {
        list = list.filter(i => i.workMode.toLowerCase() === params.workMode!.toLowerCase());
      }

      if (params?.minStipend && params.minStipend > 0) {
        list = list.filter(i => i.stipendAmount >= params.minStipend!);
      }

      if (params?.sort === 'highest-stipend') {
        list.sort((a, b) => b.stipendAmount - a.stipendAmount);
      } else if (params?.sort === 'best-match') {
        list.sort((a, b) => ((b.matchScore || 0) - (a.matchScore || 0)));
      } else if (params?.sort === 'selection-prob') {
        list.sort((a, b) => ((b.selectionProbability || 0) - (a.selectionProbability || 0)));
      }

      return { success: true, count: list.length, internships: list };
    }
  }

  async getInternshipById(id: string) {
    try {
      return await this.request<{ success: boolean; internship: Internship }>(`/internships/${id}`);
    } catch {
      const list = this.getLocal<Internship[]>('internships', MOCK_INTERNSHIPS);
      const found = list.find(i => i.id === id) || list[0];
      return { success: true, internship: found };
    }
  }

  // --- Recommendations & AI Endpoints ---
  async getRecommendations(limit: number = 5) {
    try {
      return await this.request<{ success: boolean; count: number; recommendations: { internship: Internship; breakdown: RecommendationBreakdown }[] }>(`/recommendations?limit=${limit}`);
    } catch {
      const list = this.getLocal<Internship[]>('internships', MOCK_INTERNSHIPS);
      const recs = list
        .filter(i => i.breakdown)
        .map(i => ({ internship: i, breakdown: i.breakdown! }))
        .slice(0, limit);
      return { success: true, count: recs.length, recommendations: recs };
    }
  }

  async getSkillGap() {
    try {
      return await this.request<{
        success: boolean;
        currentSkills: string[];
        skillGaps: SkillGapItem[];
        summary: { totalSkillsHave: number; totalGapsIdentified: number; highPriorityCount: number };
      }>('/recommendations/skill-gap');
    } catch {
      const profile = this.getLocal<StudentProfile>('profile', INITIAL_PROFILE);
      const gaps = this.getLocal<SkillGapItem[]>('skill_gaps', MOCK_SKILL_GAPS);
      return {
        success: true,
        currentSkills: profile.skills || INITIAL_PROFILE.skills,
        skillGaps: gaps,
        summary: {
          totalSkillsHave: (profile.skills || INITIAL_PROFILE.skills).length,
          totalGapsIdentified: gaps.filter(g => g.status !== 'Strong').length,
          highPriorityCount: gaps.filter(g => g.priority === 'High').length
        }
      };
    }
  }

  async getLearningRoadmap(role?: string) {
    try {
      const query = role ? `?role=${encodeURIComponent(role)}` : '';
      return await this.request<{
        success: boolean;
        roadmap: LearningRoadmap;
        availableRoles: { id: string; role: string; sector: string }[];
      }>(`/recommendations/learning-path${query}`);
    } catch {
      const roadmap = this.getLocal<LearningRoadmap>('roadmap', MOCK_ROADMAP);
      return {
        success: true,
        roadmap,
        availableRoles: [
          { id: 'backend', role: 'Backend Developer (Java & Spring)', sector: 'Software Development' },
          { id: 'frontend', role: 'Frontend React Developer', sector: 'Software Development' },
          { id: 'ai-ml', role: 'Machine Learning & AI Engineer', sector: 'Artificial Intelligence' },
          { id: 'devops', role: 'Cloud & DevOps Engineer', sector: 'Cloud & DevOps' },
          { id: 'uiux', role: 'UI/UX Product Designer', sector: 'Design' }
        ]
      };
    }
  }

  // --- Applications Endpoints ---
  async getApplications() {
    try {
      return await this.request<{ success: boolean; applications: Application[] }>('/applications');
    } catch {
      const apps = this.getLocal<Application[]>('applications', MOCK_APPLICATIONS);
      return { success: true, applications: apps };
    }
  }

  async applyInternship(internshipId: string, coverNote?: string, matchScoreAtApply?: number) {
    try {
      return await this.request<{ success: boolean; message: string; application: Application }>('/applications', {
        method: 'POST',
        body: JSON.stringify({ internshipId, coverNote, matchScoreAtApply })
      });
    } catch {
      const list = this.getLocal<Internship[]>('internships', MOCK_INTERNSHIPS);
      const intern = list.find(i => i.id === internshipId) || list[0];
      const apps = this.getLocal<Application[]>('applications', MOCK_APPLICATIONS);

      // Use the currently logged-in user's data
      const currentUser = this.getLocal<User | null>('user', null);
      const currentProfile = this.getLocal<StudentProfile | null>('profile', null);

      const newApp: Application = {
        id: `app-${Date.now()}`,
        userId: currentUser?.id || 'usr-student-01',
        studentName: currentUser?.name || currentProfile?.fullName || 'Student',
        studentEmail: currentUser?.email || currentProfile?.email || '',
        studentCollege: currentProfile?.college || 'Your University',
        studentBranch: currentProfile?.branch || 'Computer Science',
        studentCgpa: currentProfile?.cgpa || 0,
        internshipId,
        internship: intern,
        status: 'Applied',
        appliedAt: new Date().toISOString(),
        coverNote: coverNote || 'Submitted via InternDisha AI Quick Apply with verified credentials.',
        matchScoreAtApply: matchScoreAtApply || intern.matchScore || 85
      };

      const updated = [newApp, ...apps];
      this.setLocal('applications', updated);
      return { success: true, message: 'Application submitted successfully!', application: newApp };
    }
  }


  async updateApplicationStatus(id: string, status: Application['status']) {
    try {
      return await this.request<{ success: boolean; message: string; application: Application }>(`/applications/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
    } catch {
      const apps = this.getLocal<Application[]>('applications', MOCK_APPLICATIONS);
      const updated = apps.map(a => a.id === id ? { ...a, status } : a);
      this.setLocal('applications', updated);
      const app = updated.find(a => a.id === id)!;
      return { success: true, message: 'Status updated', application: app };
    }
  }

  // --- Saved Endpoints ---
  async getSaved() {
    try {
      return await this.request<{ success: boolean; saved: SavedInternship[] }>('/saved');
    } catch {
      const saved = this.getLocal<SavedInternship[]>('saved', [
        { id: 'sav-1', userId: 'usr-student-01', internshipId: 'intern-1', internship: MOCK_INTERNSHIPS[0], savedAt: new Date().toISOString() },
        { id: 'sav-2', userId: 'usr-student-01', internshipId: 'intern-3', internship: MOCK_INTERNSHIPS[2], savedAt: new Date().toISOString() }
      ]);
      return { success: true, saved };
    }
  }

  async saveInternship(internshipId: string) {
    try {
      return await this.request<{ success: boolean; message: string; saved: SavedInternship }>('/saved', {
        method: 'POST',
        body: JSON.stringify({ internshipId })
      });
    } catch {
      const list = this.getLocal<Internship[]>('internships', MOCK_INTERNSHIPS);
      const intern = list.find(i => i.id === internshipId) || list[0];
      const saved = this.getLocal<SavedInternship[]>('saved', []);
      const item: SavedInternship = {
        id: `sav-${Date.now()}`,
        userId: 'usr-student-01',
        internshipId,
        internship: intern,
        savedAt: new Date().toISOString()
      };
      this.setLocal('saved', [item, ...saved]);
      return { success: true, message: 'Saved to your bookmarks', saved: item };
    }
  }

  async removeSaved(internshipId: string) {
    try {
      return await this.request<{ success: boolean; message: string }>(`/saved/${internshipId}`, {
        method: 'DELETE'
      });
    } catch {
      const saved = this.getLocal<SavedInternship[]>('saved', []);
      this.setLocal('saved', saved.filter(s => s.internshipId !== internshipId));
      return { success: true, message: 'Removed from saved' };
    }
  }

  // --- Admin Endpoints ---
  async getAdminStats() {
    try {
      return await this.request<{ success: boolean; stats: AdminStats }>('/admin/stats');
    } catch {
      return { success: true, stats: MOCK_ADMIN_STATS };
    }
  }

  async createInternship(internship: Partial<Internship>) {
    try {
      return await this.request<{ success: boolean; message: string; internship: Internship }>('/admin/internships', {
        method: 'POST',
        body: JSON.stringify(internship)
      });
    } catch {
      const list = this.getLocal<Internship[]>('internships', MOCK_INTERNSHIPS);
      const newIntern: Internship = {
        id: `intern-${Date.now()}`,
        companyName: internship.companyName || 'Tech Corp',
        title: internship.title || 'Software Engineering Intern',
        description: internship.description || 'Exciting internship opportunity.',
        responsibilities: internship.responsibilities || ['Develop modules', 'Collaborate with team'],
        requiredSkills: internship.requiredSkills || ['Java', 'SQL'],
        preferredSkills: internship.preferredSkills || ['Docker'],
        sector: internship.sector || 'Software Development',
        roleCategory: internship.roleCategory || 'Engineering',
        location: internship.location || 'Remote',
        workMode: internship.workMode || 'Remote',
        duration: internship.duration || '6 Months',
        stipend: internship.stipend || '₹20,000 / month',
        stipendAmount: internship.stipendAmount || 20000,
        openings: internship.openings || 2,
        minQualification: internship.minQualification || 'B.Tech',
        preferredBranches: internship.preferredBranches || ['CS', 'IT'],
        postedAt: new Date().toISOString().split('T')[0],
        status: 'active',
        applicantCount: 0,
        matchScore: 88,
        selectionProbability: 82,
        probabilityLevel: 'High'
      };
      this.setLocal('internships', [newIntern, ...list]);
      return { success: true, message: 'Internship posted successfully', internship: newIntern };
    }
  }

  async updateInternshipAdmin(id: string, updates: Partial<Internship>) {
    try {
      return await this.request<{ success: boolean; message: string; internship: Internship }>(`/admin/internships/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch {
      const list = this.getLocal<Internship[]>('internships', MOCK_INTERNSHIPS);
      const updated = list.map(i => i.id === id ? { ...i, ...updates } : i);
      this.setLocal('internships', updated);
      const item = updated.find(i => i.id === id)!;
      return { success: true, message: 'Internship updated', internship: item };
    }
  }

  async deleteInternship(id: string) {
    try {
      return await this.request<{ success: boolean; message: string }>(`/admin/internships/${id}`, {
        method: 'DELETE'
      });
    } catch {
      const list = this.getLocal<Internship[]>('internships', MOCK_INTERNSHIPS);
      this.setLocal('internships', list.filter(i => i.id !== id));
      return { success: true, message: 'Internship deleted' };
    }
  }

  async getAllStudents() {
    try {
      return await this.request<{ success: boolean; count: number; students: (User & { profile: StudentProfile })[] }>('/admin/students');
    } catch {
      const profile = this.getLocal<StudentProfile>('profile', INITIAL_PROFILE);
      const students = [
        { ...INITIAL_USER, profile },
        {
          id: 'usr-2',
          name: 'Priya Singh',
          email: 'priya.singh@iitd.ac.in',
          role: 'student' as const,
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          createdAt: '2025-01-15T12:00:00Z',
          profile: {
            ...INITIAL_PROFILE,
            id: 'prof-2',
            userId: 'usr-2',
            fullName: 'Priya Singh',
            college: 'IIT Delhi',
            branch: 'Information Technology',
            cgpa: 9.1,
            skills: ['Python', 'Machine Learning', 'PyTorch', 'FastAPI', 'SQL']
          }
        },
        {
          id: 'usr-3',
          name: 'Rohan Gupta',
          email: 'rohan.g@dtu.ac.in',
          role: 'student' as const,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          createdAt: '2025-01-20T12:00:00Z',
          profile: {
            ...INITIAL_PROFILE,
            id: 'prof-3',
            userId: 'usr-3',
            fullName: 'Rohan Gupta',
            college: 'Delhi Technological University',
            branch: 'Computer Engineering',
            cgpa: 8.7,
            skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js']
          }
        },
        {
          id: 'usr-4',
          name: 'Ananya Verma',
          email: 'ananya.v@bits-pilani.ac.in',
          role: 'student' as const,
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
          createdAt: '2025-01-22T12:00:00Z',
          profile: {
            ...INITIAL_PROFILE,
            id: 'prof-4',
            userId: 'usr-4',
            fullName: 'Ananya Verma',
            college: 'BITS Pilani',
            branch: 'Electronics & CS',
            cgpa: 8.8,
            skills: ['Docker', 'AWS', 'Kubernetes', 'Linux', 'Python']
          }
        }
      ];
      return { success: true, count: students.length, students };
    }
  }

  async getAllStudentsAdmin() {
    try {
      return await this.request<{ success: boolean; count: number; students: any[] }>('/admin/students');
    } catch {
      const students = this.getLocal<any[]>('admin_students', MOCK_ADMIN_STUDENTS);
      return { success: true, count: students.length, students };
    }
  }

  async getAllApplicationsAdmin() {
    try {
      return await this.request<{ success: boolean; count: number; applications: Application[] }>('/admin/applications');
    } catch {
      const apps = this.getLocal<Application[]>('applications', MOCK_APPLICATIONS);
      return { success: true, count: apps.length, applications: apps };
    }
  }

  async getAdminCompanies() {
    try {
      return await this.request<{ success: boolean; companies: import('../types').Company[] }>('/admin/companies');
    } catch {
      const comps = this.getLocal<import('../types').Company[]>('admin_companies', MOCK_ADMIN_COMPANIES);
      return { success: true, count: comps.length, companies: comps };
    }
  }

  async updateCompanyStatus(companyId: string, status: 'Verified' | 'Pending' | 'Suspended') {
    const comps = this.getLocal<import('../types').Company[]>('admin_companies', MOCK_ADMIN_COMPANIES);
    const updated = comps.map(c => c.id === companyId ? { ...c, status } : c);
    this.setLocal('admin_companies', updated);
    return { success: true, message: `Company status updated to ${status}` };
  }

  async getAdminReports() {
    try {
      return await this.request<{ success: boolean; reports: import('../types').AdminReport[] }>('/admin/reports');
    } catch {
      const reports = this.getLocal<import('../types').AdminReport[]>('admin_reports', MOCK_ADMIN_REPORTS);
      return { success: true, count: reports.length, reports };
    }
  }

  async generateNewReport(title: string, category: import('../types').AdminReport['category'], format: 'PDF' | 'CSV') {
    const reports = this.getLocal<import('../types').AdminReport[]>('admin_reports', MOCK_ADMIN_REPORTS);
    const newRep: import('../types').AdminReport = {
      id: `rep-${Date.now()}`,
      title,
      category,
      generatedDate: new Date().toISOString().split('T')[0],
      format,
      fileSize: format === 'PDF' ? '2.1 MB' : '750 KB',
      status: 'Ready',
      metricsSummary: `Automated ${category} report compiled across 12,480 student records.`
    };
    const updated = [newRep, ...reports];
    this.setLocal('admin_reports', updated);
    return { success: true, report: newRep };
  }

  async getAdminNotifications() {
    try {
      return await this.request<{ success: boolean; notifications: import('../types').AdminNotification[] }>('/admin/notifications');
    } catch {
      const notifs = this.getLocal<import('../types').AdminNotification[]>('admin_notifications', MOCK_ADMIN_NOTIFICATIONS);
      return { success: true, notifications: notifs };
    }
  }

  async markNotificationRead(id: string) {
    const notifs = this.getLocal<import('../types').AdminNotification[]>('admin_notifications', MOCK_ADMIN_NOTIFICATIONS);
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    this.setLocal('admin_notifications', updated);
    return { success: true };
  }

  async markAllNotificationsRead() {
    const notifs = this.getLocal<import('../types').AdminNotification[]>('admin_notifications', MOCK_ADMIN_NOTIFICATIONS);
    const updated = notifs.map(n => ({ ...n, read: true }));
    this.setLocal('admin_notifications', updated);
    return { success: true };
  }

  async getAdminLearningPaths() {
    try {
      return await this.request<{ success: boolean; paths: import('../types').LearningPathAdmin[] }>('/admin/learning-paths');
    } catch {
      const paths = this.getLocal<import('../types').LearningPathAdmin[]>('admin_learning_paths', MOCK_ADMIN_LEARNING_PATHS);
      return { success: true, paths };
    }
  }

  async createLearningPath(path: Partial<import('../types').LearningPathAdmin>) {
    const paths = this.getLocal<import('../types').LearningPathAdmin[]>('admin_learning_paths', MOCK_ADMIN_LEARNING_PATHS);
    const newPath: import('../types').LearningPathAdmin = {
      id: `path-${Date.now()}`,
      title: path.title || 'New Career Path',
      category: path.category || 'Software Development',
      description: path.description || 'Custom curriculum',
      durationWeeks: path.durationWeeks || 6,
      totalStudents: 0,
      completionRate: 0,
      averageProgress: 0,
      status: 'Active',
      steps: path.steps || []
    };
    const updated = [newPath, ...paths];
    this.setLocal('admin_learning_paths', updated);
    return { success: true, path: newPath };
  }

  async getAdminAISettings() {
    try {
      return await this.request<{ success: boolean; settings: import('../types').AISettings }>('/admin/ai-settings');
    } catch {
      const settings = this.getLocal<import('../types').AISettings>('admin_ai_settings', MOCK_AI_SETTINGS);
      return { success: true, settings };
    }
  }

  async updateAdminAISettings(newSettings: import('../types').AISettings) {
    this.setLocal('admin_ai_settings', newSettings);
    return { success: true, settings: newSettings };
  }

  // --- Recruiter Portal Endpoints ---
  async getRecruiterCandidates() {
    try {
      return await this.request<{ success: boolean; candidates: RecruiterCandidate[] }>('/recruiter/candidates');
    } catch {
      const candidates = this.getLocal<RecruiterCandidate[]>('recruiter_candidates', MOCK_RECRUITER_CANDIDATES);
      return { success: true, candidates };
    }
  }

  async updateCandidateStatus(candidateId: string, status: RecruiterCandidate['status']) {
    try {
      return await this.request<{ success: boolean; message: string }>('/recruiter/candidates/status', {
        method: 'PATCH',
        body: JSON.stringify({ candidateId, status })
      });
    } catch {
      const candidates = this.getLocal<RecruiterCandidate[]>('recruiter_candidates', MOCK_RECRUITER_CANDIDATES);
      const updated = candidates.map(c => c.id === candidateId ? { ...c, status } : c);
      this.setLocal('recruiter_candidates', updated);
      return { success: true, message: `Candidate moved to ${status}` };
    }
  }
}

export const api = new ApiService();

