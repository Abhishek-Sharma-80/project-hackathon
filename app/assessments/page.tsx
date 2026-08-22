'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { assessmentApi } from '@/services/api';
import { Award, CheckCircle2, Clock, Sparkles, ArrowRight } from 'lucide-react';

export default function SkillAssessmentsPage() {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        const res = await assessmentApi.getAssessments();
        setAssessments(res.assessments || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <LoadingScreen message="Loading verified skill assessment test catalog..." />
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Verified Competency Validation
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Timed Skill Assessments
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Prove your technical proficiency with timed MCQ evaluations. High scores verify your skills and upgrade match scores.
            </p>
          </div>
        </div>

        {/* Grid of Skill Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((item) => (
            <div
              key={item.skillId}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.isVerified ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                      Unverified
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{item.name}</h3>

                <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>Current Skill Level:</span>
                    <span className="text-indigo-600">{item.currentLevel}%</span>
                  </div>
                  {item.lastScore !== null && (
                    <div className="flex justify-between font-medium text-slate-500">
                      <span>Previous Test Result:</span>
                      <span className="font-bold text-slate-800">{item.lastScore}/{item.totalQuestions}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href={`/assessments/${encodeURIComponent(item.name)}`}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition"
                >
                  <span>{item.isVerified ? 'Retake Assessment' : 'Take Skill Test'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
