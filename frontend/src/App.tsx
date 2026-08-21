import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AdminRoute } from './components/common/AdminRoute';
import { DishaAIAssistant } from './components/common/DishaAIAssistant';

// Public & Student Pages
import { LandingPage } from './pages/LandingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { ExploreInternshipsPage } from './pages/ExploreInternshipsPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { LearningPathPage } from './pages/LearningPathPage';
import { ApplicationTrackerPage } from './pages/ApplicationTrackerPage';
import { SavedInternshipsPage } from './pages/SavedInternshipsPage';
import { ProfilePage } from './pages/ProfilePage';
import { RecruiterDashboardPage } from './pages/RecruiterDashboardPage';
import { InternshipDetailPage } from './pages/InternshipDetailPage';

// Admin Portal Pages
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
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/explore" element={<ExploreInternshipsPage />} />
            <Route path="/internships/:id" element={<InternshipDetailPage />} />
            <Route path="/recruiter" element={<RecruiterDashboardPage />} />

            {/* Student Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/skill-gap" element={<SkillGapPage />} />
              <Route path="/learning-path" element={<LearningPathPage />} />
              <Route path="/applications" element={<ApplicationTrackerPage />} />
              <Route path="/saved" element={<SavedInternshipsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Admin Portal Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
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

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Global Disha AI Floating Assistant */}
          <DishaAIAssistant />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
