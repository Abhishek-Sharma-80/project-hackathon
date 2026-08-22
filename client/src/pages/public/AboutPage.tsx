import React from 'react';
import { Award, Target, BrainCircuit, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { Logo } from '../../components/common/Logo';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Smart India Hackathon 2026</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            About SmartEdu AI
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            A next-generation AI-powered personalized learning, skill intelligence, and internship recommendation platform built for SIH 2026.
          </p>
        </div>

        {/* Hackathon Specs Card */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 mb-12">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <Logo size="md" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">SIH 2026 Official Submission</h3>
              <p className="text-xs text-slate-500">Ministry of Education’s Innovation Cell & AICTE</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="font-semibold text-slate-400 block mb-0.5">Problem Statement ID</span>
              <span className="font-mono font-bold text-slate-800 text-sm">26205</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="font-semibold text-slate-400 block mb-0.5">Problem Statement</span>
              <span className="font-bold text-slate-800 text-sm">Student Innovation</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="font-semibold text-slate-400 block mb-0.5">Theme</span>
              <span className="font-bold text-indigo-700 text-sm">Smart Education</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="font-semibold text-slate-400 block mb-0.5">Organization</span>
              <span className="font-bold text-slate-800 text-sm">AICTE</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-slate-800">Core Mission</h4>
            <blockquote className="p-4 rounded-2xl bg-indigo-50/70 border-l-4 border-indigo-600 text-indigo-950 font-medium text-sm italic">
              "Bridge the gap between what students learn and what industry needs through explainable AI matching, dynamic skill gap diagnostics, and interactive learning paths."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};
