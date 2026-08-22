'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { assessmentApi } from '@/services/api';
import confetti from 'canvas-confetti';
import {
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';

export default function SkillTestPage() {
  const params = useParams();
  const router = useRouter();
  const skillName = decodeURIComponent(params?.skillName as string);
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        if (skillName) {
          const res = await assessmentApi.getQuestions(skillName);
          setTestData(res);
          setTimeLeft((res.timeLimitMinutes || 10) * 60);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [skillName]);

  // Timer
  useEffect(() => {
    if (!testData || result || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [testData, result, timeLeft]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = async () => {
    if (!testData?.skillId) return;
    try {
      setSubmitting(true);
      const res = await assessmentApi.submitAssessment({
        skillId: testData.skillId,
        answers,
      });

      setResult(res);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <LoadingScreen message={`Preparing verified assessment test for ${skillName}...`} />
      </StudentLayout>
    );
  }

  const questions = testData?.questions || [];
  const currentQuestion = questions[currentIndex];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <StudentLayout>
      <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
        {/* ================= RESULT SUMMARY VIEW ================= */}
        {result ? (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-emerald-100 text-emerald-600 shadow-md">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
                SmartEdu AI Skill Assessment Result
              </span>
              <h1 className="text-3xl font-black text-slate-900 mt-1">{skillName} Evaluation</h1>
            </div>

            {/* Score Badge */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 max-w-sm mx-auto space-y-2">
              <div className="text-4xl font-black text-slate-900 font-mono">
                {result.score} / {result.totalQuestions}
              </div>
              <div className="text-xs font-bold text-emerald-600">
                Verified Score: {result.percentage}%
              </div>
            </div>

            {/* Skill Level Upgrade Visualizer */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200/80 flex items-center justify-around max-w-md mx-auto">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Previous Level</span>
                <span className="text-xl font-bold text-slate-600 font-mono">{result.previousLevel}%</span>
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-600" />
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase block">Updated Level</span>
                <span className="text-2xl font-black text-emerald-600 font-mono">{result.updatedLevel}% ✓</span>
              </div>
            </div>

            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed font-medium">
              "{result.feedback}"
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/recommendations"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs shadow-md"
              >
                View Updated Internship Matches →
              </Link>
              <Link
                href="/assessments"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Back to Skill Assessments
              </Link>
            </div>
          </div>
        ) : (
          /* ================= TIMED TEST QUESTION VIEW ================= */
          <div className="space-y-6">
            {/* Top Header with Live Timer */}
            <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <Link
                href="/assessments"
                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600"
              >
                <ChevronLeft className="w-4 h-4" /> Exit
              </Link>

              <div className="text-center">
                <span className="text-xs font-bold text-indigo-600">{skillName} Assessment</span>
                <span className="text-[11px] text-slate-400 block">Question {currentIndex + 1} of {questions.length}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 font-mono text-xs font-bold border border-red-100">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Question Card */}
            {currentQuestion && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Question #{currentIndex + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">{currentQuestion.difficulty}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {currentQuestion.question}
                </h2>

                {/* Options Radio List */}
                <div className="space-y-3 pt-2">
                  {currentQuestion.options?.map((opt: string, optIdx: number) => {
                    const isSelected = answers[currentQuestion.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                        className={`w-full p-4 rounded-2xl text-left text-xs font-medium border-2 transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3 pr-2">
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 font-bold ${
                              isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 text-slate-500'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Test Bottom Controls */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {currentIndex < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIndex(currentIndex + 1)}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                    >
                      {submitting ? 'Evaluating...' : 'Submit Assessment'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
