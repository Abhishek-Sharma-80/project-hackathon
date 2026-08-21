import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Compass,
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  FileCheck2,
  Sparkles,
  TrendingUp,
  Route,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Languages as LangIcon,
  ChevronDown,
  User,
  ExternalLink,
  HelpCircle
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
  actionButton?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  pageTitle = "Good Morning, Admin 👋", 
  pageSubtitle = "Here's what's happening across the InternDisha platform today.",
  actionButton
}) => {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  const navigationGroups = [
    {
      group: 'MAIN',
      items: [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Students', path: '/admin/students', icon: Users, badge: '12.4K' },
        { label: 'Internships', path: '/admin/internships', icon: Briefcase, badge: '1,250' },
        { label: 'Companies', path: '/admin/companies', icon: Building2, badge: '320' },
        { label: 'Applications', path: '/admin/applications', icon: FileCheck2, badge: '24.5K' }
      ]
    },
    {
      group: 'AI MANAGEMENT',
      items: [
        { label: 'AI Recommendations', path: '/admin/ai-recommendations', icon: Sparkles, badge: 'Groq AI' },
        { label: 'Skill Analytics', path: '/admin/skill-analytics', icon: TrendingUp },
        { label: 'Learning Paths', path: '/admin/learning-paths', icon: Route }
      ]
    },
    {
      group: 'ANALYTICS',
      items: [
        { label: 'Reports & Insights', path: '/admin/reports', icon: BarChart3 }
      ]
    },
    {
      group: 'SYSTEM',
      items: [
        { label: 'Notifications', path: '/admin/notifications', icon: Bell, badge: '4' },
        { label: 'Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const notificationsList = [
    { id: '1', title: '120 New Students Registered Today', desc: 'Galgotias University cohort completed onboarding.', time: '25m ago', read: false },
    { id: '2', title: 'TechNova Posted Backend Internship', desc: 'Remote • ₹15,000/mo • 4 openings.', time: '1h ago', read: false },
    { id: '3', title: '85 Students Identified At Risk', desc: 'Action required: Dispatch automated learning path.', time: '3h ago', read: false },
    { id: '4', title: 'AI Match Accuracy 89.5%', desc: 'Cache refreshed with Groq LLaMA 3.3.', time: '1d ago', read: true }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 flex transition-colors font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 🧭 LEFT SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col justify-between border-r border-slate-800/80 bg-[#0B0F19] text-white transition-all duration-300 z-30 sticky top-0 h-screen shrink-0 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Logo & Portal Badge */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 shrink-0">
            <Link to="/admin" className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                      InternDisha
                    </span>
                  </div>
                  <span className="text-[9px] font-extrabold tracking-widest text-indigo-400 uppercase">
                    Admin Portal
                  </span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links with Category Groups */}
          <div className="flex-1 px-3 py-4 overflow-y-auto space-y-5 no-scrollbar">
            {navigationGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                {!collapsed && (
                  <h4 className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                    {group.group}
                  </h4>
                )}
                {group.items.map(item => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all group ${
                        active
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                      {!collapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                                active
                                  ? 'bg-white/20 text-white'
                                  : item.badge === 'Groq AI'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : item.badge === '4'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : 'bg-slate-800 text-slate-300'
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
              </div>
            ))}
          </div>

          {/* Bottom Admin Profile Section */}
          <div className="p-3 border-t border-slate-800/80 shrink-0 relative">
            <div 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} p-2 rounded-2xl bg-slate-800/60 hover:bg-slate-800 cursor-pointer transition-colors border border-slate-700/60`}
            >
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  alt="Admin"
                  className="w-9 h-9 rounded-xl object-cover border border-indigo-400/40"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#0B0F19]"></div>
              </div>

              {!collapsed && (
                <div className="truncate flex-1">
                  <p className="text-xs font-bold text-white truncate">Dr. Ramesh Mehta</p>
                  <p className="text-[10px] text-indigo-300 font-medium truncate">Super Administrator</p>
                </div>
              )}

              {!collapsed && (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </div>

            {/* Profile Dropdown Popup */}
            {profileDropdownOpen && (
              <div className="absolute bottom-16 left-3 right-3 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2">
                <Link
                  to="/admin/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
                >
                  <User className="w-4 h-4 text-indigo-400" />
                  <span>Admin Profile</span>
                </Link>
                <Link
                  to="/admin/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
                >
                  <Settings className="w-4 h-4 text-indigo-400" />
                  <span>Platform Settings</span>
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
                >
                  <ExternalLink className="w-4 h-4 text-indigo-400" />
                  <span>Switch to Student View</span>
                </Link>
                <div className="h-px bg-slate-800 my-1"></div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </aside>

      {/* 🚀 MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* 🌟 TOP HEADER */}
        <header className="h-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8">
          
          {/* Left: Greeting and Search */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Title & Subtitle */}
            <div className="hidden sm:block">
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight flex items-center space-x-2">
                <span>{pageTitle}</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Enterprise
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                {pageSubtitle}
              </p>
            </div>
          </div>

          {/* Right: Search, Language, Notifications, Theme, Profile */}
          <div className="flex items-center space-x-3">
            
            {/* Global Search Input */}
            <div className="hidden md:flex items-center relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder="Search students, internships, companies..."
                className="w-64 lg:w-80 pl-9 pr-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            {/* Language Switch */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 sm:px-3 sm:py-2 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5"
              >
                <LangIcon className="w-4 h-4 text-indigo-500" />
                <span className="hidden sm:inline">{LANGUAGES.find(l => l.code === language)?.nativeName || 'EN'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
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
                      <span className="text-[10px] text-slate-400 uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-500" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-slate-900 dark:text-white">Admin Alerts</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">4 New</span>
                    </div>
                    <Link
                      to="/admin/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                    {notificationsList.map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setNotifDropdownOpen(false);
                          navigate('/admin/notifications');
                        }}
                        className={`p-3 text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${
                          !item.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">{item.title}</h4>
                          <span className="text-[9px] text-slate-400 shrink-0">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Optional Header Action Button */}
            {actionButton && (
              <div className="hidden lg:block">
                {actionButton}
              </div>
            )}
          </div>
        </header>

        {/* 📱 MOBILE SIDEBAR DRAWER */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)}></div>
            <div className="relative w-72 bg-[#0B0F19] text-white h-full p-4 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <Compass className="w-6 h-6 text-indigo-400" />
                    <div>
                      <span className="font-bold text-base text-white">InternDisha</span>
                      <p className="text-[9px] text-indigo-400 uppercase font-extrabold">Admin Portal</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="p-1 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {navigationGroups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-1">
                      <h4 className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                        {group.group}
                      </h4>
                      {group.items.map(item => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                              active
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => { logout(); setMobileOpen(false); navigate('/'); }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 📄 PAGE BODY CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
