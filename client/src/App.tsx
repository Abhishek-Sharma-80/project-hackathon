import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LoadingScreen } from './components/common/LoadingScreen';

// Layouts
import { StudentLayout } from './components/layout/StudentLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { ForStudentsPage } from './pages/public/ForStudentsPage';
import { ForCollegesPage } from './pages/public/ForCollegesPage';
import { AboutPage } from './pages/public/AboutPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Student Pages
import { OnboardingPage } from './pages/student/OnboardingPage';
import { DashboardPage } from './pages/student/DashboardPage';
import { RecommendationsPage } from './pages/student/RecommendationsPage';
import { ExplainableMatchPage } from './pages/student/ExplainableMatchPage';
import { InternshipsPage } from './pages/student/InternshipsPage';
import { InternshipDetailPage } from './pages/student/InternshipDetailPage';
import { SkillGapPage } from './pages/student/SkillGapPage';
import { LearningPathPage } from './pages/student/LearningPathPage';
import { LearningModulePage } from './pages/student/LearningModulePage';
import { SkillAssessmentsPage } from './pages/student/SkillAssessmentsPage';
import { SkillTestPage } from './pages/student/SkillTestPage';
import { ApplicationsPage } from './pages/student/ApplicationsPage';
import { CareerInsightsPage } from './pages/student/CareerInsightsPage';
import { AIAssistantPage } from './pages/student/AIAssistantPage';
import { ProfilePage } from './pages/student/ProfilePage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminInterventionsPage } from './pages/admin/AdminInterventionsPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminInternshipsPage } from './pages/admin/AdminInternshipsPage';
import { AdminCompaniesPage } from './pages/admin/AdminCompaniesPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Guard for Students
const ProtectedStudentRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return <StudentLayout />;
};

// Protected Route Guard for Admins
const ProtectedAdminRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/login" replace />;
  return <AdminLayout />;
};

// Public Layout Container
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Navbar & Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/for-students" element={<ForStudentsPage />} />
            <Route path="/for-colleges" element={<ForCollegesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Onboarding Wizard */}
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Student Dashboard & Workflows */}
          <Route element={<ProtectedStudentRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/recommendations/:id" element={<ExplainableMatchPage />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/internships/:id" element={<InternshipDetailPage />} />
            <Route path="/skill-gaps" element={<SkillGapPage />} />
            <Route path="/learning-path" element={<LearningPathPage />} />
            <Route path="/learning-path/module/:moduleId" element={<LearningModulePage />} />
            <Route path="/assessments" element={<SkillAssessmentsPage />} />
            <Route path="/assessments/:skillName" element={<SkillTestPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/career-insights" element={<CareerInsightsPage />} />
            <Route path="/assistant" element={<AIAssistantPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Institutional Portal */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/interventions" element={<AdminInterventionsPage />} />
            <Route path="/admin/students" element={<AdminStudentsPage />} />
            <Route path="/admin/internships" element={<AdminInternshipsPage />} />
            <Route path="/admin/companies" element={<AdminCompaniesPage />} />
            <Route path="/admin/reports" element={<AdminReportsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
