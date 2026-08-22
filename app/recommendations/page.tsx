'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { recommendationApi } from '@/services/api';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Compass,
  Filter,
} from 'lucide-react';

export default function RecommendationsPage() {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [filterCategory, setFilterCategory] = useState('ALL');

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        setLoading(true);
        const res = await recommendationApi.getRecommendations();
        setRecommendations(res.recommendations || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <LoadingScreen message="Executing 6-factor deterministic matching algorithm across active internships..." />
      </StudentLayout>
    );
  }

  const filteredRecs =
    filterCategory === 'ALL'
      ? recommendations
      : recommendations.filter((r) => r.internship.careerCategory === filterCategory);

  const categories = ['ALL', 'Backend', 'Frontend', 'Full Stack', 'Cloud', 'AI/ML', 'CyberSecurity'];

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Explainable AI Match Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Recommended Internships & Role Matches
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Personalized matching calculated from your skills, project portfolio, CGPA, and verified tests.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filterCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat === 'ALL' ? 'All Roles' : cat}
            </button>
          ))}
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {filteredRecs.map((item) => (
            <div
              key={item.internship.id}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.internship.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {item.internship.careerCategory}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-600">
                    {item.internship.company?.name} • {item.internship.location} ({item.internship.workMode})
                  </p>
                </div>

                {/* Match Badge */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-black font-mono shadow-xs ${
                      item.matchScore >= 85
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.matchScore >= 70
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.matchScore}% Match
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Roadmap Target: <strong className="text-indigo-600">{item.potentialScore || 97}%</strong>
                  </span>
                </div>
              </div>

              {/* Natural Language Explanation */}
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                "{item.explanation}"
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-400 text-[11px]">Strengths:</span>
                {item.matchingSkills?.map((s: string) => (
                  <span key={s} className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[11px]">
                    ✓ {s}
                  </span>
                ))}
                {item.missingSkills?.length > 0 && (
                  <>
                    <span className="font-bold text-slate-400 text-[11px] ml-2">Missing:</span>
                    {item.missingSkills?.map((s: string) => (
                      <span key={s} className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 font-semibold text-[11px]">
                        ✕ {s}
                      </span>
                    ))}
                  </>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  href={`/recommendations/${item.internship.id}`}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Why This Match? (View 6-Factor Breakdown)</span>
                </Link>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Link
                    href={`/internships/${item.internship.id}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition"
                  >
                    View Details & Apply
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
