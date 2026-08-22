import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { learningPathApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  PlayCircle,
  Clock,
  Zap,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const LearningPathPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [pathData, setPathData] = useState<any>(null);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        setLoading(true);
        const res = await learningPathApi.getLearningPath();
        setPathData(res.data.learningPath);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPath();
  }, []);

  if (loading) {
    return <LoadingScreen message="Synthesizing dynamic roadmap based on priority skill gaps..." />;
  }

  const modules = pathData?.modules || [];
  const overallProgress = pathData?.overallProgress || 0;

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Personalized Curriculum
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Your {pathData?.careerPath || 'Backend Developer'} Learning Roadmap
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Completing these curated modules dynamically upgrades your skill proficiencies and increases your internship match scores.
          </p>
        </div>

        {/* Overall Progress Widget */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase block">Roadmap Progress</span>
            <span className="text-2xl font-black text-indigo-600 font-mono">{overallProgress}%</span>
          </div>
          <div className="w-24 h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Motivational Feedback Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 border border-indigo-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-indigo-950">AI Growth Projection</h4>
            <p className="text-xs text-indigo-700">
              Completing <strong>Spring Boot Fundamentals</strong> will unlock <strong>8 additional internship opportunities</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Node Roadmap */}
      <div className="space-y-6 relative">
        {modules.map((module: any, idx: number) => {
          const isLocked = module.status === 'LOCKED';
          const isCompleted = module.status === 'COMPLETED';
          const isInProgress = module.status === 'IN_PROGRESS';

          return (
            <div key={module.id} className="relative">
              {/* Vertical connector line */}
              {idx < modules.length - 1 && (
                <div
                  className={`absolute left-7 top-16 bottom-[-24px] w-1 rounded-full -z-10 ${
                    isCompleted ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                />
              )}

              <div
                className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                  isCompleted
                    ? 'bg-white border-emerald-200 shadow-sm'
                    : isInProgress
                    ? 'bg-white border-indigo-300 shadow-lg shadow-indigo-500/5 ring-2 ring-indigo-500/20'
                    : isLocked
                    ? 'bg-slate-50/70 border-slate-200 opacity-60'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Status Node Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 shadow-sm ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : isInProgress
                        ? 'bg-indigo-600 text-white shadow-indigo-500/25 animate-pulse'
                        : isLocked
                        ? 'bg-slate-200 text-slate-400'
                        : 'bg-indigo-50 text-indigo-700'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : isLocked ? (
                      <Lock className="w-6 h-6" />
                    ) : (
                      <span>{module.order}</span>
                    )}
                  </div>

                  {/* Module Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Step {module.order} • {module.estimatedHours} Hours
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInProgress
                            ? 'bg-indigo-100 text-indigo-800'
                            : isLocked
                            ? 'bg-slate-200 text-slate-600'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {module.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">{module.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{module.description}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-slate-400">Skills Enhanced:</span>
                      {module.skillsImproved?.split(',').map((s: string) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          {s.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Progress bar */}
                    {!isLocked && (
                      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${module.progress}%` }} />
                          </div>
                          <span className="text-xs font-bold text-slate-600 font-mono">{module.progress}% Complete</span>
                        </div>

                        <Link
                          to={`/learning-path/module/${module.id}`}
                          className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                            isCompleted
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                          }`}
                        >
                          <span>{isCompleted ? 'Review Lessons' : isInProgress ? 'Continue Learning' : 'Start Module'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
