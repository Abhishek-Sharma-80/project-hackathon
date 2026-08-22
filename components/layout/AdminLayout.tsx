'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../common/Logo';
import { useAuth } from '@/context/AuthContext';
import {
  BarChart3,
  AlertTriangle,
  Users,
  Briefcase,
  Building2,
  FileBarChart,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Analytics Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'At-Risk Interventions', href: '/admin/interventions', icon: AlertTriangle, badge: 'Active' },
    { name: 'Student Registry', href: '/admin/students', icon: Users },
    { name: 'Internship Listings', href: '/admin/internships', icon: Briefcase },
    { name: 'Partner Companies', href: '/admin/companies', icon: Building2 },
    { name: 'Institutional Reports', href: '/admin/reports', icon: FileBarChart, badge: 'NIRF / NAAC' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <span className="font-bold text-sm block leading-none">Dean & Admin</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Institutional Portal</span>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="px-4 py-3 mx-3 my-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs shrink-0">
            D
          </div>
          <div className="overflow-hidden flex-1">
            <h4 className="text-xs font-bold text-white truncate">{user?.name || 'Dr. Ramesh Kulkarni'}</h4>
            <p className="text-[10px] font-semibold text-emerald-400 truncate">Dean of Engineering</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-emerald-400'
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
        <div className="p-3 border-t border-slate-800 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Switch to Student View</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden sticky top-0 z-40 bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-sm">SmartEdu Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-300 hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-slate-900 text-white h-full p-4 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-sm">Institutional Menu</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-5 h-5 text-slate-400" />
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
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                        isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'
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
                setMobileMenuOpen(false);
                logout();
              }}
              className="flex items-center gap-2 p-3 text-xs font-bold text-red-400 rounded-xl hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 px-8 items-center justify-between sticky top-0 z-30">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Galgotias University • NAAC A+ Institutional Governance
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Live Production Telemetry Connected
          </span>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
};
