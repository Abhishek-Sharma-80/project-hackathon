import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Briefcase,
  GitPullRequest,
  BookOpen,
  Award,
  Kanban,
  TrendingUp,
  MessageSquareCode,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
  CheckCircle2,
} from 'lucide-react';

export const StudentLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Recommendations', path: '/recommendations', icon: Sparkles, badge: '91% Match' },
    { name: 'Discover Internships', path: '/internships', icon: Briefcase },
    { name: 'Skill Gap Engine', path: '/skill-gaps', icon: GitPullRequest, badge: '3 Gaps' },
    { name: 'Learning Roadmap', path: '/learning-path', icon: BookOpen },
    { name: 'Skill Assessments', path: '/assessments', icon: Award },
    { name: 'Application Tracker', path: '/applications', icon: Kanban, badge: '12' },
    { name: 'Career Insights', path: '/career-insights', icon: TrendingUp },
    { name: 'SmartEdu AI Assistant', path: '/assistant', icon: MessageSquareCode, isSpecial: true },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Top Logo */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <Logo size="md" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Status Summary Card */}
          <div className="px-4 py-3 m-3 bg-gradient-to-br from-indigo-50/80 via-blue-50/40 to-slate-50 border border-indigo-100/80 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-bold flex items-center justify-center shadow-md shadow-indigo-500/20 text-sm">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate">{user?.name || 'Aryan Sharma'}</h4>
                <p className="text-[11px] font-medium text-indigo-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> B.Tech CSE (6th Sem)
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-3 py-2 space-y-1">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Career & Skill Loop
            </p>
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20 font-semibold'
                      : item.isSpecial
                      ? 'text-purple-700 bg-purple-50/70 hover:bg-purple-100/80 font-semibold border border-purple-200/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isSpecial ? 'text-purple-600' : 'text-slate-500'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && !isActive && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom Controls */}
          <div className="p-4 border-t border-slate-100 space-y-2">
            <div className="p-3 rounded-xl bg-slate-900 text-white text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-300">Smart India Hackathon</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-bold">2026</span>
              </div>
              <p className="text-slate-400 text-[11px]">Problem 26205 • Smart Education</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <span>SmartEdu AI</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-slate-800 capitalize">
                {location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Live AI Pill */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Recommendation Engine Active</span>
            </div>

            <Link
              to="/assistant"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200/80 text-xs font-bold text-purple-700 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin" />
              <span>Ask AI Coach</span>
            </Link>

            <Link
              to="/profile"
              className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-sm"
              title="View Profile"
            >
              {user?.name ? user.name.charAt(0) : 'A'}
            </Link>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
