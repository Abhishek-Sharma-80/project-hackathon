import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { StudentRoute, RecruiterRoute } from './components/common/RoleRoute';
import { AdminRoute } from './components/common/AdminRoute';
import { DishaAIAssistant } from './components/common/DishaAIAssistant';

// Public & Discovery Pages
import { LandingPage } from './pages/LandingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PortalSelectPage } from './pages/PortalSelectPage';
import { ExploreInternshipsPage } from './pages/ExploreInternshipsPage';
import { InternshipDetailPage } from './pages/InternshipDetailPage';

// 🎓 Student Portal Pages & Auth
import { StudentLoginPage } from './pages/auth/StudentLoginPage';
import { StudentRegisterPage } from './pages/auth/StudentRegisterPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { LearningPathPage } from './pages/LearningPathPage';
import { ApplicationTrackerPage } from './pages/ApplicationTrackerPage';
import { SavedInternshipsPage } from './pages/SavedInternshipsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ATSResumePage } from './pages/ATSResumePage';

// 💼 Recruiter Portal Pages & Auth
import { RecruiterLoginPage } from './pages/auth/RecruiterLoginPage';
import { RecruiterRegisterPage } from './pages/auth/RecruiterRegisterPage';
import { RecruiterDashboardPage } from './pages/RecruiterDashboardPage';

// 🛡️ Admin Portal Pages & Auth
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminInternshipsPage } from './pages/admin/AdminInternshipsPage';
import { AdminCompaniesPage } from './pages/admin/AdminCompaniesPage';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminAIRecommendationsPage } from './pages/admin/AdminAIRecommendationsPage';
import { AdminSkillAnalyticsPage } from './pages/admin/AdminSkillAnalyticsPage';
import { AdminLearningPathsPage } from './pages/admin/AdminLearningPathsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            {/* 🌟 1. Public & Discovery Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/portal-select" element={<PortalSelectPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/explore" element={<ExploreInternshipsPage />} />
            <Route path="/internships/:id" element={<InternshipDetailPage />} />

            {/* Legacy Portal Shortcuts */}
            <Route path="/login" element={<Navigate to="/portal-select" replace />} />
            <Route path="/signup" element={<Navigate to="/portal-select" replace />} />

            {/* 🎓 2. Student Portal Routes */}
            <Route path="/student/login" element={<StudentLoginPage />} />
            <Route path="/student/register" element={<StudentRegisterPage />} />
            
            {/* Student Protected Workspace */}
            <Route element={<StudentRoute />}>
              <Route path="/student/onboarding" element={<OnboardingPage />} />
              <Route path="/student/dashboard" element={<DashboardPage />} />
              <Route path="/student/profile" element={<ProfilePage />} />
              <Route path="/student/recommendations" element={<RecommendationsPage />} />
              <Route path="/student/skill-gap" element={<SkillGapPage />} />
              <Route path="/student/learning-path" element={<LearningPathPage />} />
              <Route path="/student/internships" element={<ExploreInternshipsPage />} />
              <Route path="/student/applications" element={<ApplicationTrackerPage />} />
              <Route path="/student/saved" element={<SavedInternshipsPage />} />
              <Route path="/student/ats-resume" element={<ATSResumePage />} />
            </Route>

            {/* Student Aliases for backwards compatibility */}
            <Route path="/onboarding" element={<Navigate to="/student/onboarding" replace />} />
            <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
            <Route path="/recommendations" element={<Navigate to="/student/recommendations" replace />} />
            <Route path="/skill-gap" element={<Navigate to="/student/skill-gap" replace />} />
            <Route path="/learning-path" element={<Navigate to="/student/learning-path" replace />} />
            <Route path="/applications" element={<Navigate to="/student/applications" replace />} />
            <Route path="/saved" element={<Navigate to="/student/saved" replace />} />
            <Route path="/profile" element={<Navigate to="/student/profile" replace />} />

            {/* 💼 3. Recruiter Portal Routes */}
            <Route path="/recruiter/login" element={<RecruiterLoginPage />} />
            <Route path="/recruiter/register" element={<RecruiterRegisterPage />} />
            
            {/* Recruiter Protected Workspace */}
            <Route element={<RecruiterRoute />}>
              <Route path="/recruiter/dashboard" element={<RecruiterDashboardPage />} />
              <Route path="/recruiter/company" element={<RecruiterDashboardPage />} />
              <Route path="/recruiter/candidates" element={<RecruiterDashboardPage />} />
              <Route path="/recruiter/internships" element={<AdminInternshipsPage />} />
              <Route path="/recruiter/applications" element={<AdminApplicationsPage />} />
              <Route path="/recruiter/analytics" element={<AdminReportsPage />} />
            </Route>
            <Route path="/recruiter" element={<Navigate to="/recruiter/dashboard" replace />} />

            {/* 🛡️ 4. Admin / College Portal Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            {/* Admin Protected Workspace */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/students" element={<AdminStudentsPage />} />
              <Route path="/admin/internships" element={<AdminInternshipsPage />} />
              <Route path="/admin/companies" element={<AdminCompaniesPage />} />
              <Route path="/admin/applications" element={<AdminApplicationsPage />} />
              <Route path="/admin/ai-recommendations" element={<AdminAIRecommendationsPage />} />
              <Route path="/admin/skill-analytics" element={<AdminSkillAnalyticsPage />} />
              <Route path="/admin/learning-paths" element={<AdminLearningPathsPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
              <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Route>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Global Disha AI Assistant */}
          <DishaAIAssistant />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
