import axios from 'axios';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('smartedu_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Helper Services
export const authApi = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
  demoLogin: (role: 'student' | 'admin') => api.post('/auth/demo-login', { role }),
  getMe: () => api.get('/auth/me'),
};

export const profileApi = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data: any) => api.put('/profile', data),
  saveOnboarding: (data: any) => api.post('/profile/onboarding', data),
  addSkill: (data: any) => api.post('/profile/skills', data),
  updateSkill: (id: string, data: any) => api.put(`/profile/skills/${id}`, data),
  deleteSkill: (id: string) => api.delete(`/profile/skills/${id}`),
  createProject: (data: any) => api.post('/profile/projects', data),
  deleteProject: (id: string) => api.delete(`/profile/projects/${id}`),
  createCertification: (data: any) => api.post('/profile/certifications', data),
  deleteCertification: (id: string) => api.delete(`/profile/certifications/${id}`),
};

export const internshipApi = {
  getInternships: (params?: any) => api.get('/internships', { params }),
  getInternshipById: (id: string) => api.get(`/internships/${id}`),
};

export const recommendationApi = {
  getRecommendations: () => api.get('/recommendations'),
  getExplanation: (internshipId: string) => api.get(`/recommendations/${internshipId}/explanation`),
};

export const skillGapApi = {
  getSkillGaps: () => api.get('/skill-gaps'),
};

export const learningPathApi = {
  getLearningPath: () => api.get('/learning-path'),
  completeLesson: (lessonId: string) => api.post('/learning-path/complete-lesson', { lessonId }),
};

export const assessmentApi = {
  getAssessments: () => api.get('/assessments'),
  getQuestions: (skillName: string) => api.get(`/assessments/${skillName}`),
  submitAssessment: (data: { skillId: string; answers: Record<string, number> }) => api.post('/assessments/submit', data),
};

export const applicationApi = {
  getApplications: () => api.get('/applications'),
  createApplication: (data: { internshipId: string; status?: string; notes?: string }) => api.post('/applications', data),
  updateStatus: (id: string, data: { status?: string; notes?: string }) => api.put(`/applications/${id}/status`, data),
  deleteApplication: (id: string) => api.delete(`/applications/${id}`),
};

export const assistantApi = {
  chat: (message: string) => api.post('/assistant/chat', { message }),
  getHistory: () => api.get('/assistant/history'),
};

export const adminApi = {
  getAnalytics: () => api.get('/admin/analytics'),
  getInterventions: () => api.get('/admin/interventions'),
  getStudents: (params?: any) => api.get('/admin/students', { params }),
  getStudentById: (id: string) => api.get(`/admin/students/${id}`),
  getReports: (type?: string) => api.get('/admin/reports', { params: { type } }),
  getCompanies: () => api.get('/admin/companies'),
  createCompany: (data: any) => api.post('/admin/companies', data),
  createInternship: (data: any) => api.post('/admin/internships', data),
  updateInternship: (id: string, data: any) => api.put(`/admin/internships/${id}`, data),
  deleteInternship: (id: string) => api.delete(`/admin/internships/${id}`),
};
