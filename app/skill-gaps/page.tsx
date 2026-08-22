'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { skillGapApi } from '@/services/api';
import {
  Layers,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Compass,
} from 'lucide-react';

export default function SkillGapPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchGaps = async () => {
      try {
        setLoading(true);
        const res = await skillGapApi.getSkillGaps();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGaps();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <LoadingScreen message="Calculating dynamic skill gaps and priority indices..." />
      </StudentLayout>
    );
  }

  const { strongSkills = [], developingSkills = [], priorityGaps = [], targetRole } = data || {};

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Diagnostic Intelligence
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Skill Gap Intelligence Matrix
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Target Career Role: <strong className="text-indigo-600">{targetRole || 'Backend Developer'}</strong> • Formula: Gap × Industry Demand × Career Relevance.
            </p>
          </div>

          <Link
            href="/learning-path"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition self-start sm:self-auto"
          >
            <Compass className="w-4 h-4" />
            <span>Open Personalized Roadmap</span>
          </Link>
        </div>

        {/* 1. PRIORITY SKILL GAPS (CRITICAL) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <h3 className="text-lg font-bold text-slate-900">Priority Skill Gaps (High Employer Demand)</h3>
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
              {priorityGaps.length} Gaps Requiring Action
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {priorityGaps.map((gap: any) => (
              <div
                key={gap.skillId}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900">{gap.skillName}</h4>
                  <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                    Priority Score: {gap.priorityScore}
                  </span>
                </div>

                <p className="text-xs text-slate-600">{gap.reason}</p>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">Your Level: <strong className="text-red-600">{gap.currentLevel}%</strong></span>
                    <span className="text-slate-600">Employer Target: <strong className="text-emerald-600">{gap.targetLevel}%</strong></span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${gap.currentLevel}%` }} />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Link
                    href="/learning-path"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Start Learning Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. DEVELOPING SKILLS & 3. STRONG SKILLS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Developing Skills */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Developing Skills (Intermediate 40–74%)</span>
            </h3>

            <div className="space-y-3">
              {developingSkills.map((sk: any) => (
                <div key={sk.skillId} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{sk.skillName}</span>
                    <span className="text-amber-600">{sk.level}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${sk.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strong Skills */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Verified Strong Skills (≥75%)</span>
            </h3>

            <div className="space-y-3">
              {strongSkills.map((sk: any) => (
                <div key={sk.skillId} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{sk.skillName}</span>
                    </span>
                    <span className="text-emerald-700 font-mono">{sk.level}% (Advanced)</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-1.5">
                    <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${sk.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
