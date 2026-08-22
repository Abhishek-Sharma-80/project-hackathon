'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '../common/Logo';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Sparkles,
  Compass,
  Layers,
  Award,
  Kanban,
  TrendingUp,
  MessageSquareCode,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Briefcase,
  ChevronRight,
} from 'lucide-react';

export const StudentLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Matches', href: '/recommendations', icon: Sparkles, badge: '91% Top' },
    { name: 'Discover Internships', href: '/internships', icon: Briefcase },
    { name: 'Skill Gap Engine', href: '/skill-gaps', icon: Layers },
    { name: 'Learning Roadmap', href: '/learning-path', icon: Compass },
    { name: 'Skill Assessments', href: '/assessments', icon: Award },
    { name: 'Application Tracker', href: '/applications', icon: Kanban },
    { name: 'Career Insights', href: '/career-insights', icon: TrendingUp },
    { name: 'SmartEdu AI Assistant', href: '/assistant', icon: MessageSquareCode, badge: 'LLaMA 3.3' },
    { name: 'My Profile & Portfolio', href: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/90 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Logo size="sm" />
        </div>

        {/* User Mini Profile Card */}
        <div className="px-4 py-3 mx-3 my-3 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-blue-50/60 border border-indigo-100/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-indigo-500/20 shrink-0">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="overflow-hidden flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Aryan Sharma'}</h4>
            <p className="text-[11px] font-semibold text-indigo-600 truncate">
              Score: {user?.profileScore || 82}% • CS 2026
            </p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <Link
            href="/admin"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <span>Switch to Admin</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <Logo size="sm" />
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-white h-full p-4 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <Logo size="sm" />
                <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-lg">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                        isActive ? 'bg-indigo-600 text-white' : 'text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={() => {
                setMobileSidebarOpen(false);
                logout();
              }}
              className="flex items-center gap-2 p-3 text-xs font-bold text-red-600 rounded-xl hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-8 items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              Student Innovation Track • AICTE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/assistant"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold transition border border-purple-200/60"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask SmartEdu AI</span>
            </Link>
            <div className="w-px h-6 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-500">
              Logged in as <strong className="text-slate-800">{user?.name || 'Aryan Sharma'}</strong>
            </span>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
};
