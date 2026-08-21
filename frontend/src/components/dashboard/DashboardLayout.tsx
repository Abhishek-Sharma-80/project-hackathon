import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Compass,
  LayoutDashboard,
  Sparkles,
  Search,
  TrendingUp,
  Map,
  Briefcase,
  Bookmark,
  User,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  Languages as LangIcon,
  Building2,
  ChevronDown,
  MoreVertical,
  FileText
} from 'lucide-react';

import { RecruiterProfileCard } from '../recruiter/RecruiterProfileCard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, profile, isAdmin, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'TechNova Status Update', desc: 'Your Backend Developer application was shortlisted for Interview Round 1.', time: '10m ago', read: false, link: '/applications' },
    { id: '2', title: 'High AI Compatibility Match (94%)', desc: 'NexGen AI Labs posted Machine Learning & AI Intern matching your profile.', time: '1h ago', read: false, link: '/recommendations' },
    { id: '3', title: 'Skill Milestone Alert', desc: 'Complete Spring Boot basics on your Roadmap to reach 98% hiring readiness.', time: '1d ago', read: true, link: '/learning-path' }
  ]);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: t('nav_dashboard'), path: '/student/dashboard', icon: LayoutDashboard },
    { label: t('nav_recommendations'), path: '/student/recommendations', icon: Sparkles, badge: '91% AI' },
    { label: t('nav_explore'), path: '/explore', icon: Search },
    { label: t('nav_skill_gap'), path: '/student/skill-gap', icon: TrendingUp },
    { label: t('nav_learning_path'), path: '/student/learning-path', icon: Map },
    { label: t('nav_applications'), path: '/student/applications', icon: Briefcase },
    { label: 'ATS Resume', path: '/student/ats-resume', icon: FileText, badge: '82/100' },
    { label: t('nav_saved'), path: '/student/saved', icon: Bookmark },
    { label: t('nav_profile'), path: '/student/profile', icon: User },
  ];

  if (isAdmin || user?.role === 'admin') {
    navItems.push({ label: t('nav_admin_panel'), path: '/admin', icon: ShieldCheck, badge: 'Admin' });
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex transition-colors">
      
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col justify-between border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 backdrop-blur-md transition-all duration-300 z-30 sticky top-0 h-screen ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-slate-800/80">
            <Link to="/" className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              {!collapsed && (
                <div className="flex items-center space-x-1 whitespace-nowrap">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent">
                    InternDisha
                  </span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    AI
                  </span>
                </div>
              )}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all group ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'}`} />
                  {!collapsed && (
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            active
                              ? 'bg-white/20 text-white'
                              : item.badge === 'Admin'
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                              : item.badge === 'Partner'
                              ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Snapshot */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80">
          {user?.role === 'recruiter' || location.pathname === '/recruiter' ? (
            <RecruiterProfileCard collapsed={collapsed} placement="sidebar" />
          ) : (
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60`}>
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
                alt="User"
                className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0 object-cover"
              />
              {!collapsed && (
                <div className="truncate flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name || 'Abhishek Sharma'}</p>
                  <p className="text-[10px] text-slate-400 truncate">{profile?.college || (user?.role === 'admin' ? 'Placement Officer' : 'Galgotias University')}</p>
                </div>
              )}
              {!collapsed && (
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-xs font-medium text-slate-400">InternDisha &gt;</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                {location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Quick Header Controls */}
          <div className="flex items-center space-x-2.5">
            
            {/* 5-Language Switch Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5"
              >
                <LangIcon className="w-3.5 h-3.5 text-indigo-500" />
                <span>{LANGUAGES.find(l => l.code === language)?.nativeName || 'EN'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
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

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Notification Bell with Interactive Popover */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-500" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">Notifications</span>
                    <button
                      onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                      className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                    {notifications.map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
                          if (item.link) {
                            setNotificationsOpen(false);
                            navigate(item.link);
                          }
                        }}
                        className={`p-3 text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${
                          !item.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-[11px] leading-tight">{item.title}</h4>
                          <span className="text-[9px] text-slate-400 shrink-0">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 px-4 border-t border-slate-100 dark:border-slate-800 text-center">
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar link */}
            <Link to="/profile" className="flex items-center space-x-2 pl-2">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
                alt="User"
                className="w-8 h-8 rounded-xl border border-indigo-200 dark:border-indigo-800 object-cover"
              />
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)}></div>
            <div className="relative w-64 bg-white dark:bg-slate-900 h-full p-4 flex flex-col justify-between shadow-2xl z-10">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-6 h-6 text-indigo-600" />
                    <span className="font-bold text-lg text-indigo-600">InternDisha</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="p-1 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="mt-4 space-y-1">
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                          active
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <button
                onClick={() => { logout(); setMobileOpen(false); navigate('/'); }}
                className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-rose-600"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('nav_logout')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
