'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { recommendationApi } from '@/services/api';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Building2,
  TrendingUp,
  Award,
  Layers,
  Compass,
} from 'lucide-react';

export default function ExplainableMatchPage() {
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await recommendationApi.getExplanation(id);
          setData(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExplanation();
  }, [id]);

  if (loading) {
    return (
      <StudentLayout>
        <LoadingScreen message="Computing multi-factor matching breakdown and prerequisite coverage..." />
      </StudentLayout>
    );
  }

  const { internship, matchAnalysis } = data || {};
  const breakdown = matchAnalysis?.breakdown;

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
        {/* Top Back Link */}
        <div>
          <Link
            href="/recommendations"
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Recommendations
          </Link>
        </div>

        {/* Big Match Score Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
                Explainable AI Diagnostic
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Why was {internship?.title} recommended?
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {internship?.company?.name} • {internship?.location} ({internship?.workMode})
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 shrink-0">
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Current Match</span>
                <span className="text-3xl font-black text-emerald-600 font-mono">
                  {matchAnalysis?.matchScore}%
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-400" />
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">After Roadmap</span>
                <span className="text-3xl font-black text-indigo-600 font-mono">
                  {matchAnalysis?.potentialMatchAfterLearning || 97}%
                </span>
              </div>
            </div>
          </div>

          {/* AI Explanation Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Natural Language AI Rationale
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              "{matchAnalysis?.explanation}"
            </p>
          </div>
        </div>

        {/* 6-FACTOR ALGORITHM WEIGHT BREAKDOWN */}
        {breakdown && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                6-Factor Weighted Algorithm Breakdown
              </h3>
              <p className="text-xs text-slate-500">
                Deterministic matching score computed live from database records.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Required Skill Overlap', weight: '40% Weight', score: breakdown.skillOverlapScore, color: 'bg-indigo-600' },
                { label: 'Proficiency Depth', weight: '20% Weight', score: breakdown.proficiencyScore, color: 'bg-blue-600' },
                { label: 'Career Trajectory Alignment', weight: '15% Weight', score: breakdown.careerInterestScore, color: 'bg-purple-600' },
                { label: 'Academic Standing (CGPA)', weight: '10% Weight', score: breakdown.academicScore, color: 'bg-emerald-600' },
                { label: 'Project Portfolio Relevance', weight: '10% Weight', score: breakdown.projectScore, color: 'bg-amber-500' },
                { label: 'Verified Certifications', weight: '5% Weight', score: breakdown.certificationScore, color: 'bg-teal-500' },
              ].map((f) => (
                <div key={f.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-800">{f.label}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">{f.weight}</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono">{f.score}%</div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className={`${f.color} h-1.5 rounded-full`} style={{ width: `${f.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREREQUISITE COMPARISON TABLE */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Required Technical Prerequisite Coverage
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Skill Requirement</th>
                  <th className="p-3.5">Importance</th>
                  <th className="p-3.5">Required Level</th>
                  <th className="p-3.5">Your Proficiency</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {matchAnalysis?.skillComparison?.map((sc: any) => (
                  <tr key={sc.skillName} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">{sc.skillName}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                        {sc.importance}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono">{sc.requiredLevel}%</td>
                    <td className="p-3.5 font-mono font-bold text-indigo-600">{sc.studentLevel}%</td>
                    <td className="p-3.5 text-right">
                      {sc.isMet ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                          <CheckCircle2 className="w-4 h-4" /> Met
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-500 font-bold">
                          <AlertCircle className="w-4 h-4" /> Gap
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/learning-path"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>Bridge Missing Gaps in Learning Roadmap</span>
            </Link>

            <Link
              href={`/internships/${internship?.id}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs shadow-md transition text-center"
            >
              Proceed to Application
            </Link>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
