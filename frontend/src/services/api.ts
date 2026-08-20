import { User, StudentProfile, Internship, RecommendationBreakdown, SkillGapItem, LearningRoadmap, Application, SavedInternship, AdminStats } from '../types';

const API_BASE_URL = '/api';

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('interndisha_token');
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
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data as T;
    } catch (err: any) {
      console.error(`API error on ${endpoint}:`, err.message);
      throw err;
    }
  }

  // --- Auth Endpoints ---
  async login(credentials: { email: string; password: string }) {
    return this.request<{ success: boolean; token: string; user: User; profile?: StudentProfile }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData: { name: string; email: string; password: string; role?: 'student' | 'admin' }) {
    return this.request<{ success: boolean; token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async demoLogin(role: 'student' | 'admin' = 'student') {
    return this.request<{ success: boolean; token: string; user: User; profile?: StudentProfile }>('/auth/demo-login', {
      method: 'POST',
      body: JSON.stringify({ role })
    });
  }

  async getMe() {
    return this.request<{ success: boolean; user: User; profile?: StudentProfile }>('/auth/me');
  }

  // --- Profile Endpoints ---
  async getProfile() {
    return this.request<{ success: boolean; profile: StudentProfile }>('/user/profile');
  }

  async updateProfile(updates: Partial<StudentProfile>) {
    return this.request<{ success: boolean; message: string; profile: StudentProfile }>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  // --- Internships Endpoints ---
  async getInternships(params?: { search?: string; sector?: string; workMode?: string; minStipend?: number; skill?: string; sort?: string }) {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.sector) query.append('sector', params.sector);
    if (params?.workMode) query.append('workMode', params.workMode);
    if (params?.minStipend) query.append('minStipend', String(params.minStipend));
    if (params?.skill) query.append('skill', params.skill);
    if (params?.sort) query.append('sort', params.sort);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.request<{ success: boolean; count: number; internships: Internship[] }>(`/internships${queryString}`);
  }

  async getInternshipById(id: string) {
    return this.request<{ success: boolean; internship: Internship }>(`/internships/${id}`);
  }

  // --- Recommendations & AI Endpoints ---
  async getRecommendations(limit: number = 5) {
    return this.request<{ success: boolean; count: number; recommendations: { internship: Internship; breakdown: RecommendationBreakdown }[] }>(`/recommendations?limit=${limit}`);
  }

  async getSkillGap() {
    return this.request<{
      success: boolean;
      currentSkills: string[];
      skillGaps: SkillGapItem[];
      summary: { totalSkillsHave: number; totalGapsIdentified: number; highPriorityCount: number };
    }>('/recommendations/skill-gap');
  }

  async getLearningRoadmap(role?: string) {
    const query = role ? `?role=${encodeURIComponent(role)}` : '';
    return this.request<{
      success: boolean;
      roadmap: LearningRoadmap;
      availableRoles: { id: string; role: string; sector: string }[];
    }>(`/recommendations/learning-path${query}`);
  }

  // --- Applications Endpoints ---
  async getApplications() {
    return this.request<{ success: boolean; applications: Application[] }>('/applications');
  }

  async applyInternship(internshipId: string, coverNote?: string, matchScoreAtApply?: number) {
    return this.request<{ success: boolean; message: string; application: Application }>('/applications', {
      method: 'POST',
      body: JSON.stringify({ internshipId, coverNote, matchScoreAtApply })
    });
  }

  async updateApplicationStatus(id: string, status: Application['status']) {
    return this.request<{ success: boolean; message: string; application: Application }>(`/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  // --- Saved Endpoints ---
  async getSaved() {
    return this.request<{ success: boolean; saved: SavedInternship[] }>('/saved');
  }

  async saveInternship(internshipId: string) {
    return this.request<{ success: boolean; message: string; saved: SavedInternship }>('/saved', {
      method: 'POST',
      body: JSON.stringify({ internshipId })
    });
  }

  async removeSaved(internshipId: string) {
    return this.request<{ success: boolean; message: string }>(`/saved/${internshipId}`, {
      method: 'DELETE'
    });
  }

  // --- Admin Endpoints ---
  async getAdminStats() {
    return this.request<{ success: boolean; stats: AdminStats }>('/admin/stats');
  }

  async createInternship(internship: Partial<Internship>) {
    return this.request<{ success: boolean; message: string; internship: Internship }>('/admin/internships', {
      method: 'POST',
      body: JSON.stringify(internship)
    });
  }

  async updateInternshipAdmin(id: string, updates: Partial<Internship>) {
    return this.request<{ success: boolean; message: string; internship: Internship }>(`/admin/internships/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteInternship(id: string) {
    return this.request<{ success: boolean; message: string }>(`/admin/internships/${id}`, {
      method: 'DELETE'
    });
  }

  async getAllStudents() {
    return this.request<{ success: boolean; count: number; students: (User & { profile: StudentProfile })[] }>('/admin/students');
  }

  async getAllApplicationsAdmin() {
    return this.request<{ success: boolean; count: number; applications: Application[] }>('/admin/applications');
  }
}

export const api = new ApiService();
