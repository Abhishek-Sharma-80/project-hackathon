import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FolderGit2, 
  Award,
  Zap,
  Check,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { LearningRoadmap } from '../types';

export const LearningPathPage: React.FC = () => {
  const { t } = useLanguage();
  const { profile, updateProfileState } = useAuth();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [availableRoles, setAvailableRoles] = useState<{ id: string; role: string; sector: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('Backend Developer (Java & Spring)');
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

  const toggleNodeCompletion = async (nodeId: string) => {
    if (!roadmap) return;
    const nodeIndex = roadmap.nodes.findIndex(n => n.id === nodeId);
    if (nodeIndex === -1) return;

    const updatedNodes = roadmap.nodes.map((n, i) => {
      if (i === nodeIndex) {
        return { ...n, status: n.status === 'completed' ? 'in-progress' as const : 'completed' as const };
      }
      // unlock next node if current is completed
      if (i === nodeIndex + 1 && n.status === 'locked') {
        return { ...n, status: 'in-progress' as const };
      }
      return n;
    });

    const updatedRoadmap = { ...roadmap, nodes: updatedNodes };
    setRoadmap(updatedRoadmap);

    // If node was marked as completed, trigger celebratory confetti!
    if (updatedNodes[nodeIndex].status === 'completed') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 }
      });

      // Also add newly learned skills to student profile
      try {
        const newlyAcquiredSkills = updatedNodes[nodeIndex].skills;
        const currentSkills = profile?.skills || [];
        const combined = Array.from(new Set([...currentSkills, ...newlyAcquiredSkills]));
        const res = await api.updateProfile({ skills: combined });
        if (res.success) {
          updateProfileState(res.profile);
        }
      } catch (e) {
        console.warn('Profile skill sync error:', e);
      }
    }
  };

  const completedCount = roadmap?.nodes.filter(n => n.status === 'completed').length || 0;
  const totalNodes = roadmap?.nodes.length || 5;
  const progressPercent = Math.round((completedCount / totalNodes) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
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

          <button
            onClick={() => navigate('/recommendations')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 self-start sm:self-auto transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            <span>View Unlocked Internships</span>
          </button>
        </div>

        {/* Track Selector & Progress Status Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Track Selector */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {t('learn_select_role')}
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Backend Developer (Java & Spring)',
                  'Frontend React Developer',
                  'Machine Learning & AI Engineer',
                  'Cloud & DevOps Engineer',
                  'UI/UX Product Designer'
                ].map(track => (
                  <button
                    key={track}
                    onClick={() => setSelectedRole(track)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                      selectedRole === track
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-102'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center space-x-6 text-xs shrink-0 pt-2 md:pt-0">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Estimated Time</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-base">
                  {roadmap?.estimatedWeeks || 6} Weeks (51 Hours)
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Roadmap Progress</span>
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-base">
                  {progressPercent}% Complete ({completedCount}/{totalNodes})
                </span>
              </div>
            </div>

          </div>

          {/* Glowing Multi-Color Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5">
              <motion.div
                animate={{ width: `${Math.max(5, progressPercent)}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-400 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Timeline with Glowing Connected Nodes */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-36 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-10 border-l-2 border-indigo-200 dark:border-slate-800 space-y-8 my-4">
            {roadmap?.nodes.map((node, idx) => {
              const isCompleted = node.status === 'completed';
              const isInProgress = node.status === 'in-progress';
              const isLocked = node.status === 'locked';

              return (
                <div key={node.id} className="relative group">
                  
                  {/* Timeline Glowing Node Icon */}
                  <div
                    className={`absolute -left-[37px] sm:-left-[53px] top-6 w-8 h-8 rounded-2xl flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-300 text-white shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-500/20'
                        : isInProgress
                        ? 'bg-indigo-600 border-indigo-300 text-white shadow-lg shadow-indigo-600/40 animate-pulse ring-4 ring-indigo-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : isInProgress ? (
                      <PlayCircle className="w-4 h-4" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Milestone Card */}
                  <div
                    className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                      isInProgress
                        ? 'bg-white dark:bg-slate-900 border-indigo-500 dark:border-indigo-500/80 shadow-xl ring-1 ring-indigo-500/30'
                        : isCompleted
                        ? 'bg-white/90 dark:bg-slate-900/90 border-emerald-300/80 dark:border-emerald-800/60 shadow-md'
                        : 'bg-white/50 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800/60 opacity-80'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Step {idx + 1}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : isInProgress
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            {isCompleted ? '✓ Completed' : isInProgress ? '⚡ In Progress' : '🔒 Next Up'}
                          </span>
                          {node.estimatedHours && (
                            <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{node.estimatedHours} Hours</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                          {node.title}
                        </h3>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 shrink-0">
                        {node.skills.map(s => (
                          <span
                            key={s}
                            className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-100 dark:border-indigo-900/60"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {node.description}
                    </p>

                    {/* Capstone Project Idea */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start space-x-2.5 text-xs text-slate-700 dark:text-slate-300 mb-4">
                      <FolderGit2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block font-bold text-xs mb-0.5">
                          {t('learn_project_idea')}
                        </strong>
                        <span>{node.projectIdea}</span>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                      
                      {/* Mark Complete Toggle Button */}
                      <button
                        onClick={() => toggleNodeCompletion(node.id)}
                        className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all ${
                          isCompleted
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 hover:scale-[1.02]'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Milestone Achieved (Click to toggle)</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Mark as Complete</span>
                          </>
                        )}
                      </button>

                      {/* Curated Resources */}
                      {node.resources.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Free Tutorials:</span>
                          {node.resources.map((res, i) => (
                            <a
                              key={i}
                              href={res.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-[11px] flex items-center space-x-1"
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
