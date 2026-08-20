import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AdminRoute } from './components/common/AdminRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
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
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { InternshipDetailPage } from './pages/InternshipDetailPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/explore" element={<ExploreInternshipsPage />} />
            <Route path="/internships/:id" element={<InternshipDetailPage />} />

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

            {/* Admin Protected Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
