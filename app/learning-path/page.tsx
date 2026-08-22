'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { learningPathApi } from '@/services/api';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  PlayCircle,
  Clock,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export default function LearningPathPage() {
  const [loading, setLoading] = useState(true);
  const [learningPath, setLearningPath] = useState<any>(null);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        setLoading(true);
        const res = await learningPathApi.getLearningPath();
        setLearningPath(res.learningPath);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPath();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <LoadingScreen message="Synthesizing personalized modular learning roadmap..." />
      </StudentLayout>
    );
  }

  const modules = learningPath?.modules || [];

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Personalized Curriculum
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              {learningPath?.careerPath || 'Backend Developer'} Learning Roadmap
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Follow step-by-step modular lessons to close priority skill gaps. Lesson completion dynamically updates your verified database levels!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm shrink-0 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Roadmap Progress</span>
            <span className="text-2xl font-black text-indigo-600 font-mono">
              {learningPath?.overallProgress || 0}%
            </span>
          </div>
        </div>

        {/* Modules Node Graph List */}
        <div className="space-y-6">
          {modules.map((mod: any, index: number) => {
            const isLocked = mod.status === 'LOCKED';
            const isCompleted = mod.status === 'COMPLETED' || mod.progress === 100;
            const inProgress = mod.status === 'IN_PROGRESS';

            return (
              <div
                key={mod.id}
                className={`p-6 sm:p-8 rounded-3xl border transition shadow-sm ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-200/80'
                    : inProgress
                    ? 'bg-white border-indigo-300 ring-2 ring-indigo-500/10'
                    : 'bg-white border-slate-200 opacity-80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                        Module {index + 1}
                      </span>
                      {isCompleted && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed
                        </span>
                      )}
                      {inProgress && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                          In Progress
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">{mod.title}</h3>
                    <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">{mod.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> ~{mod.estimatedHours} Hours
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {mod.lessons?.length || 4} Interactive Lessons
                      </span>
                      <span className="font-semibold text-indigo-700">
                        Skills Improved: {mod.skillsImproved}
                      </span>
                    </div>
                  </div>

                  {/* Progress & Start Button */}
                  <div className="flex flex-col items-end gap-3 shrink-0 self-end sm:self-start">
                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-slate-700">{mod.progress}%</span>
                      <div className="w-28 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${mod.progress}%` }} />
                      </div>
                    </div>

                    {isLocked ? (
                      <button
                        disabled
                        className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs flex items-center gap-1.5 cursor-not-allowed"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Locked</span>
                      </button>
                    ) : (
                      <Link
                        href={`/learning-path/module/${mod.id}`}
                        className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5 ${
                          isCompleted
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                        }`}
                      >
                        <span>{isCompleted ? 'Review Module' : inProgress ? 'Continue Learning' : 'Start Module'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}
