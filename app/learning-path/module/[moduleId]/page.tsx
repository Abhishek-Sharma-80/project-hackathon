'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { learningPathApi } from '@/services/api';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Check,
  Sparkles,
  Award,
} from 'lucide-react';

export default function LearningModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params?.moduleId as string;
  const [loading, setLoading] = useState(true);
  const [moduleData, setModuleData] = useState<any>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchModule = async () => {
    try {
      setLoading(true);
      const res = await learningPathApi.getLearningPath();
      const path = res.learningPath;
      const found = path?.modules?.find((m: any) => m.id === moduleId) || path?.modules?.[0];
      setModuleData(found);

      const firstIncomplete = found?.lessons?.findIndex((l: any) => !l.completed);
      if (firstIncomplete >= 0) {
        setActiveLessonIndex(firstIncomplete);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModule();
  }, [moduleId]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCompleteLesson = async () => {
    const currentLesson = moduleData?.lessons?.[activeLessonIndex];
    if (!currentLesson || currentLesson.completed) return;

    try {
      setCompleting(true);
      const res = await learningPathApi.completeLesson(currentLesson.id);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      setNotification(`🎉 Lesson completed! Your skills in ${res.improvedSkills?.join(', ')} were upgraded, increasing your Profile Score & Internship Match!`);

      await fetchModule();

      if (activeLessonIndex < moduleData.lessons.length - 1) {
        setActiveLessonIndex(activeLessonIndex + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <LoadingScreen message="Loading interactive lesson environment and reference architecture..." />
      </StudentLayout>
    );
  }

  const lessons = moduleData?.lessons || [];
  const activeLesson = lessons[activeLessonIndex] || lessons[0];

  return (
    <StudentLayout>
      <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/learning-path"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Roadmap
          </Link>
          <span className="text-xs font-semibold text-slate-400">
            Module Progress: <strong className="text-indigo-600">{moduleData?.progress}%</strong>
          </span>
        </div>

        {notification && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>{notification}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-xs font-bold underline ml-4 hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Module Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Interactive Learning Sandbox
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {moduleData?.title}
              </h1>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {moduleData?.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 shrink-0 text-center">
              <span className="text-[11px] font-bold text-indigo-600 uppercase block">Skills Improved</span>
              <span className="text-sm font-black text-indigo-950">{moduleData?.skillsImproved}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Lesson Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Lessons Table of Contents */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 h-fit">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Module Lessons ({lessons.length})
            </h3>
            <div className="space-y-1.5">
              {lessons.map((lesson: any, i: number) => {
                const isCurrent = i === activeLessonIndex;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonIndex(i)}
                    className={`w-full p-3 rounded-2xl text-left text-xs font-bold transition flex items-center justify-between ${
                      isCurrent
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : lesson.completed
                        ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      {lesson.completed ? (
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />
                      ) : (
                        <span
                          className={`w-4 h-4 rounded-full border text-[10px] flex items-center justify-center shrink-0 ${
                            isCurrent ? 'border-white text-white' : 'border-slate-400 text-slate-500'
                          }`}
                        >
                          {i + 1}
                        </span>
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    <span className={`text-[10px] shrink-0 font-medium ${isCurrent ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {lesson.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Lesson Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-mono">
                    Lesson {activeLessonIndex + 1} of {lessons.length}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">{activeLesson?.title}</h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                  {activeLesson?.duration}
                </span>
              </div>

              {/* Lesson Summary */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Core Concept & Architecture
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  {activeLesson?.summary}
                </p>
              </div>

              {/* Code Snippet */}
              {activeLesson?.codeSnippet && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-indigo-600" /> Reference Architecture
                    </span>
                    <button
                      onClick={() => handleCopyCode(activeLesson.codeSnippet)}
                      className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 p-1 rounded-lg"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-2xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
                    <code>{activeLesson.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Bottom Navigation */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  disabled={activeLessonIndex === 0}
                  onClick={() => setActiveLessonIndex(activeLessonIndex - 1)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 disabled:opacity-40 transition"
                >
                  Previous Lesson
                </button>

                <button
                  onClick={handleCompleteLesson}
                  disabled={activeLesson?.completed || completing}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-xs font-bold transition shadow-md ${
                    activeLesson?.completed
                      ? 'bg-emerald-100 text-emerald-800 cursor-default'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white shadow-emerald-500/20'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{activeLesson?.completed ? 'Lesson Completed ✓' : completing ? 'Saving Progress...' : 'Mark Lesson Complete'}</span>
                </button>

                <button
                  disabled={activeLessonIndex === lessons.length - 1}
                  onClick={() => setActiveLessonIndex(activeLessonIndex + 1)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 disabled:opacity-40 transition"
                >
                  Next Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
