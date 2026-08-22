/**
 * SmartEdu AI Client API wrapper
 * Calls relative Next.js API route handlers (/api/...) for 100% Vercel Serverless compatibility!
 */

const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('smartedu_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options.headers as Record<string, string> || {}),
  };

  const res = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
}

export const authApi = {
  login: (data: any) => apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: any) => apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  demoLogin: (role: 'STUDENT' | 'ADMIN') => apiFetch('/api/auth/demo-login', { method: 'POST', body: JSON.stringify({ role }) }),
  getMe: () => apiFetch('/api/auth/me'),
};

export const profileApi = {
  getProfile: () => apiFetch('/api/profile'),
  updateProfile: (data: any) => apiFetch('/api/profile', { method: 'PUT', body: JSON.stringify(data) }),
  addSkill: (data: any) => apiFetch('/api/profile/skills', { method: 'POST', body: JSON.stringify(data) }),
  deleteSkill: (id: string) => apiFetch(`/api/profile/skills/${id}`, { method: 'DELETE' }),
  createProject: (data: any) => apiFetch('/api/profile/projects', { method: 'POST', body: JSON.stringify(data) }),
  deleteProject: (id: string) => apiFetch(`/api/profile/projects/${id}`, { method: 'DELETE' }),
  createCertification: (data: any) => apiFetch('/api/profile/certifications', { method: 'POST', body: JSON.stringify(data) }),
  deleteCertification: (id: string) => apiFetch(`/api/profile/certifications/${id}`, { method: 'DELETE' }),
};

export const internshipApi = {
  getInternships: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch(`/api/internships${qs}`);
  },
  getInternshipById: (id: string) => apiFetch(`/api/internships/${id}`),
};

export const recommendationApi = {
  getRecommendations: () => apiFetch('/api/recommendations'),
  getExplanation: (id: string) => apiFetch(`/api/recommendations/${id}/explanation`),
};

export const skillGapApi = {
  getSkillGaps: () => apiFetch('/api/skill-gaps'),
};

export const learningPathApi = {
  getLearningPath: () => apiFetch('/api/learning-path'),
  completeLesson: (lessonId: string) => apiFetch('/api/learning-path/complete-lesson', { method: 'POST', body: JSON.stringify({ lessonId }) }),
};

export const assessmentApi = {
  getAssessments: () => apiFetch('/api/assessments'),
  getQuestions: (skillName: string) => apiFetch(`/api/assessments/${encodeURIComponent(skillName)}`),
  submitAssessment: (data: { skillId: string; answers: Record<string, number> }) => apiFetch('/api/assessments/submit', { method: 'POST', body: JSON.stringify(data) }),
};

export const applicationApi = {
  getApplications: () => apiFetch('/api/applications'),
  apply: (data: { internshipId: string; status?: string; notes?: string; matchScore?: number }) =>
    apiFetch('/api/applications', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id: string, data: { status?: string; notes?: string }) =>
    apiFetch(`/api/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteApplication: (id: string) => apiFetch(`/api/applications/${id}/status`, { method: 'DELETE' }),
};

export const assistantApi = {
  chat: (message: string) => apiFetch('/api/assistant/chat', { method: 'POST', body: JSON.stringify({ message }) }),
};

export const adminApi = {
  getAnalytics: () => apiFetch('/api/admin/analytics'),
  getInterventions: () => apiFetch('/api/admin/interventions'),
  getStudents: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch(`/api/admin/students${qs}`);
  },
  createInternship: (data: any) => apiFetch('/api/admin/internships', { method: 'POST', body: JSON.stringify(data) }),
  deleteInternship: (id: string) => apiFetch(`/api/admin/internships/${id}`, { method: 'DELETE' }),
  getCompanies: () => apiFetch('/api/admin/companies'),
  createCompany: (data: any) => apiFetch('/api/admin/companies', { method: 'POST', body: JSON.stringify(data) }),
  getReports: (type?: string) => apiFetch(`/api/admin/reports?type=${type || 'skill-gap'}`),
};
