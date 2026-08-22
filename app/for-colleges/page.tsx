import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ShieldCheck, BarChart3, TrendingUp, AlertTriangle, FileBarChart, ArrowRight } from 'lucide-react';

export default function ForCollegesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
            Institutional Governance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Institutional Intelligence for Deans & TPOs
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Empower Training & Placement Officers (TPOs), Department Heads, and Deans with real-time cohort skill analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Demanded Skills Analytics</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Identify what skills active recruiters are requesting to align semester electives and laboratory courses with market needs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">At-Risk Interventions</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automatically flag students lagging behind in career readiness indices before placement drives begin.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileBarChart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Accreditation Data Exports</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Generate 1-click CSV reports formatted for NIRF, NAAC Criteria 5, and AICTE compliance audits.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Inspect Institutional Dean Console</h3>
            <p className="text-xs text-slate-400 mt-1">Access macro analytics, placement funnels, and at-risk rosters.</p>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <span>Login as Dean / Admin</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
