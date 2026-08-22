import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, Users, AlertTriangle, FileBarChart, ArrowRight } from 'lucide-react';

export const ForCollegesPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Institutional Intelligence
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Institutional Oversight for Deans, TPOs & Placement Cells
          </h1>
          <p className="text-slate-600 text-base">
            SmartEdu AI empowers higher education institutions to understand what students know, what they lack, and what industry demands in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Demanded Skills Analytics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track live market demand across 40+ industry recruiters to dynamically adapt college curriculum and elective offerings to industry standards.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">At-Risk Student Intervention</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatically flag students falling behind in profile completeness, readiness scores, or critical prerequisite skills before campus placement drives commence.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Cohort Placement Funnel</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monitor aggregate conversion ratios across departments from Saved → Applied → Shortlisted → Interviewed → Selected.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileBarChart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">NAAC / NIRF Ready Reports</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Export institutional Skill Gap, Career Readiness, and Department Performance metrics as formatted data for accreditation audits.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Open Institutional Dean Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
