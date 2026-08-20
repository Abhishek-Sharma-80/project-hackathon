import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  CheckCircle2, 
  Clock, 
  Lock, 
  PlayCircle, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Code, 
  FolderGit2 
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import { LearningRoadmap } from '../types';

export const LearningPathPage: React.FC = () => {
  const { t } = useLanguage();
  const { profile, updateProfileState } = useAuth();
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [availableRoles, setAvailableRoles] = useState<{ id: string; role: string; sector: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('Frontend Developer');
  const [loading, setLoading] = useState(true);

  const fetchRoadmap = async (roleName?: string) => {
    setLoading(true);
    try {
      const res = await api.getLearningRoadmap(roleName || selectedRole);
      if (res.success) {
        setRoadmap(res.roadmap);
        setAvailableRoles(res.availableRoles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap(selectedRole);
  }, [selectedRole]);

  const completedCount = roadmap?.nodes.filter(n => n.status === 'completed').length || 0;
  const totalNodes = roadmap?.nodes.length || 1;
  const progressPercent = Math.round((completedCount / totalNodes) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Header Banner */}
        <div className="space-y-2 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/30">
              <Map className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('learn_title')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            {t('learn_subtitle')}
          </p>
        </div>

        {/* Role Selector & Progress Overview */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Track Selector Tabs */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {t('learn_select_role')}
              </span>
              <div className="flex flex-wrap gap-2">
                {['Frontend Developer', 'Backend Engineer', 'AI & Data Science Engineer'].map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      selectedRole === r
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Track Metadata */}
            <div className="flex items-center space-x-6 text-xs text-slate-600 dark:text-slate-300">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-bold">Estimated Track Time</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {roadmap?.estimatedWeeks || 12} Weeks
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-bold">Your Progress</span>
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">
                  {progressPercent}% Complete
                </span>
              </div>
            </div>

          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <motion.div
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500"
            />
          </div>
        </div>

        {/* Roadmap Nodes Timeline */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-6">
            {roadmap?.nodes.map((node, idx) => {
              const isCompleted = node.status === 'completed';
              const isInProgress = node.status === 'in-progress';

              return (
                <div key={node.id} className="relative">
                  
                  {/* Status Node Circle on Timeline */}
                  <div
                    className={`absolute -left-[33px] sm:-left-[41px] top-4 w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-300 text-white shadow-md shadow-emerald-500/30'
                        : isInProgress
                        ? 'bg-indigo-600 border-indigo-300 text-white animate-pulse shadow-md shadow-indigo-600/30'
                        : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isInProgress ? (
                      <PlayCircle className="w-4 h-4" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Node Card */}
                  <div
                    className={`p-6 rounded-2xl border transition-all ${
                      isInProgress
                        ? 'bg-white dark:bg-slate-900 border-indigo-400 dark:border-indigo-600 shadow-md ring-1 ring-indigo-500/20'
                        : isCompleted
                        ? 'bg-white/70 dark:bg-slate-900/70 border-emerald-200 dark:border-emerald-900/40'
                        : 'bg-white/40 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-80'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Step {idx + 1}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                : isInProgress
                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            {isCompleted ? t('learn_step_completed') : isInProgress ? t('learn_step_in_progress') : t('learn_step_locked')}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          {node.title}
                        </h3>
                      </div>

                      {/* Covered Skills */}
                      <div className="flex flex-wrap gap-1.5 shrink-0">
                        {node.skills.map(s => (
                          <span
                            key={s}
                            className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {node.description}
                    </p>

                    {/* Project Idea Milestone */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300 mb-3">
                      <FolderGit2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block font-bold text-[11px]">
                          {t('learn_project_idea')}
                        </strong>
                        <span>{node.projectIdea}</span>
                      </div>
                    </div>

                    {/* Action Row & Curated Resources */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                      
                      {/* Interactive Completion Toggle */}
                      <div>
                        {!isCompleted ? (
                          <button
                            onClick={async () => {
                              try {
                                const existingSkills = profile?.skills || [];
                                const newSkills = Array.from(new Set([...existingSkills, ...node.skills]));
                                const res = await api.updateProfile({ skills: newSkills });
                                if (res.success) {
                                  updateProfileState(res.profile);
                                  confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
                                  fetchRoadmap();
                                }
                              } catch (e) {
                                alert('Failed to update progress.');
                              }
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm shadow-indigo-600/30 transition-all"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark Milestone Complete</span>
                          </button>
                        ) : (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1 text-xs">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Milestone Achieved!</span>
                          </span>
                        )}
                      </div>

                      {/* Curated Resources */}
                      {node.resources.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Free Links:</span>
                          {node.resources.map((res, i) => (
                            <a
                              key={i}
                              href={res.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
                            >
                              <span>{res.name}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
