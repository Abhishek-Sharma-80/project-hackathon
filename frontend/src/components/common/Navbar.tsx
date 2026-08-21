import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, LANGUAGES, Language } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Languages as LangIcon, 
  Layers, 
  Bookmark, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown,
  Building2,
  TrendingUp,
  Map
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, profile, isAuthenticated, isAdmin, logout, demoLogin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDemo = async (role: 'student' | 'admin' | 'recruiter') => {
    await demoLogin(role);
    setDemoDropdownOpen(false);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'recruiter') {
      navigate('/recruiter/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-[#0B0F19]/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent">
                  InternDisha
                </span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block leading-none">
                Find the Right Internship • Build the Right Skills
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                    isActive('/') 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/how-it-works"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                    isActive('/how-it-works')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  How It Works
                </Link>
                <Link
                  to="/explore"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                    isActive('/explore')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  Explore Internships
                </Link>
                <Link
                  to="/recruiter"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1 ${
                    isActive('/recruiter')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>For Companies</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/recommendations"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1 ${
                    isActive('/recommendations') 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>AI Matches</span>
                </Link>
                <Link
                  to="/explore"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                    isActive('/explore') 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  Explore
                </Link>
                <Link
                  to="/skill-gap"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1 ${
                    isActive('/skill-gap') 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  <span>Skill Gap</span>
                </Link>
                <Link
                  to="/learning-path"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1 ${
                    isActive('/learning-path') 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Map className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Roadmap</span>
                </Link>
                <Link
                  to="/applications"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                    isActive('/applications') 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  Tracker
                </Link>
                <Link
                  to="/recruiter"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Recruiter Hub</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center space-x-2">
            
            {/* 5-Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 transition-colors"
                title="Switch Language"
              >
                <LangIcon className="w-3.5 h-3.5 text-indigo-500" />
                <span>{LANGUAGES.find(l => l.code === language)?.nativeName || 'EN'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between transition-colors ${
                        language === lang.code
                          ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400 font-normal uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Demo Accounts Quick Trigger */}
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
              >
                <span>Demo Login</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Instant 1-Click Access
                  </div>
                  <button
                    onClick={() => handleDemo('student')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 flex items-center justify-between"
                  >
                    <span>🎓 {t('nav_demo_student')}</span>
                    <span className="text-[10px] text-slate-400">Demo</span>
                  </button>
                  <button
                    onClick={() => handleDemo('recruiter')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/50 flex items-center justify-between"
                  >
                    <span>🏢 Demo Recruiter</span>
                    <span className="text-[10px] text-slate-400">TechNova</span>
                  </button>
                  <button
                    onClick={() => handleDemo('admin')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 flex items-center justify-between"
                  >
                    <span>🛡️ {t('nav_demo_admin')}</span>
                    <span className="text-[10px] text-slate-400">Dr. Ramesh</span>
                  </button>
                </div>
              )}
            </div>

            {/* Auth Buttons or User Avatar */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/portal-select"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('nav_login')}
                </Link>
                <Link
                  to="/portal-select"
                  className="px-4 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/30 transition-all hover:scale-[1.02]"
                >
                  {t('nav_signup')}
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full border border-indigo-200 dark:border-indigo-800 hover:ring-2 hover:ring-indigo-500/30 transition-all"
                >
                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
                    alt="User"
                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 object-cover"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 hidden sm:block mr-1" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {user?.role === 'admin' ? '🛡️ Administrator' : user?.role === 'recruiter' ? '🏢 Recruiter' : '🎓 Student'}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Compass className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{t('nav_dashboard')}</span>
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <User className="w-3.5 h-3.5 text-sky-500" />
                        <span>{t('nav_profile')}</span>
                      </Link>
                      <Link
                        to="/applications"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{t('nav_applications')}</span>
                      </Link>
                      <Link
                        to="/saved"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                        <span>{t('nav_saved')}</span>
                      </Link>
                      <Link
                        to="/recruiter"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Recruiter Hub</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-xs text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{t('nav_admin_panel')}</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t('nav_logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {!isAuthenticated ? (
            <>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800"
              >
                Home
              </Link>
              <Link
                to="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800"
              >
                How It Works
              </Link>
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800"
              >
                {t('nav_explore')}
              </Link>
              <Link
                to="/recruiter"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400"
              >
                Company Recruiter Portal
              </Link>
              <div className="pt-2 flex flex-col space-y-2 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => { handleDemo('student'); setMobileMenuOpen(false); }}
                    className="py-2 text-[11px] font-bold rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-center"
                  >
                    Student
                  </button>
                  <button
                    onClick={() => { handleDemo('recruiter'); setMobileMenuOpen(false); }}
                    className="py-2 text-[11px] font-bold rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-300 text-center"
                  >
                    Recruiter
                  </button>
                  <button
                    onClick={() => { handleDemo('admin'); setMobileMenuOpen(false); }}
                    className="py-2 text-[11px] font-bold rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 text-center"
                  >
                    Admin
                  </button>
                </div>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                >
                  {t('nav_login')}
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white"
                >
                  {t('nav_signup')}
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                {t('nav_dashboard')}
              </Link>
              <Link
                to="/recommendations"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                {t('nav_recommendations')}
              </Link>
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                {t('nav_explore')}
              </Link>
              <Link
                to="/skill-gap"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                {t('nav_skill_gap')}
              </Link>
              <Link
                to="/learning-path"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                {t('nav_learning_path')}
              </Link>
              <Link
                to="/applications"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                {t('nav_applications')}
              </Link>
              <Link
                to="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                {t('nav_saved')}
              </Link>
              <Link
                to="/recruiter"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400"
              >
                Company Recruiter Portal
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400"
              >
                {t('nav_logout')}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
