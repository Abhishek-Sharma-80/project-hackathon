import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Unlock, 
  ExternalLink, 
  Clock, 
  BookOpen, 
  Award, 
  ArrowRight 
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { SkillGapItem } from '../types';

export const SkillGapPage: React.FC = () => {
  const { t } = useLanguage();
  const { updateProfileState } = useAuth();
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [summary, setSummary] = useState<{ totalSkillsHave: number; totalGapsIdentified: number; highPriorityCount: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.getSkillGap();
      if (res.success) {
        setCurrentSkills(res.currentSkills);
        setSkillGaps(res.skillGaps);
        setSummary(res.summary);
      }
    } catch (err) {
      console.error('Failed to load skill gap data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalUnlockedIfLearnedTop2 = skillGaps.slice(0, 2).reduce((acc, curr) => acc + curr.unlockedInternshipsCount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="space-y-2 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('gap_title')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {t('gap_subtitle')}
          </p>
        </div>

        {/* Highlight Unlock Callout */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 border border-white/10 uppercase tracking-wider inline-block">
              AI Opportunity Multiplier
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              You are only <strong>2 high-priority skills</strong> away from unlocking{' '}
              <span className="text-amber-300 font-extrabold">{totalUnlockedIfLearnedTop2 || 8} more internship opportunities</span>!
            </h3>
            <p className="text-xs text-indigo-200">
              Learning in-demand complementary skills like TypeScript and Docker will elevate your profile to 95%+ match scores.
            </p>
          </div>

          <div className="shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-indigo-950 flex items-center justify-center font-extrabold text-2xl shadow-lg">
              <Unlock className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Section 1: Skills You Already Have */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{t('gap_have_title')} ({currentSkills.length})</span>
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Active in Profile</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {currentSkills.map(skill => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Skills You Should Learn */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>{t('gap_need_title')}</span>
            </h3>
            <span className="text-xs text-slate-400">Ranked by Market Demand & Unlock Count</span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillGaps.map((item, idx) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.skill}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.priority === 'High'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              : item.priority === 'Medium'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          }`}>
                            {item.priority === 'High' ? t('gap_high_priority') : item.priority === 'Medium' ? t('gap_medium_priority') : t('gap_beginner_priority')}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{item.category} Domain</span>
                      </div>

                      {/* Unlock count badge */}
                      <div className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold text-right shrink-0">
                        <span>+{item.unlockedInternshipsCount} Roles</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.whyImportant}
                    </p>

                    {item.relatedRoles.length > 0 && (
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        <strong>Target Roles:</strong> {item.relatedRoles.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Action Row & Curated Learning Resource Link */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={async () => {
                          const updated = [...currentSkills, item.skill];
                          try {
                            const res = await api.updateProfile({ skills: updated });
                            if (res.success) {
                              setCurrentSkills(updated);
                              updateProfileState(res.profile);
                              fetchData();
                            }
                          } catch (e) {
                            alert('Failed to add skill.');
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] hover:bg-emerald-100 transition-colors flex items-center space-x-1"
                        title="Mark skill as acquired and add to your student profile"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Add to Profile</span>
                      </button>

                      <div className="flex items-center space-x-1 text-slate-400 text-[10px]">
                        <Clock className="w-3 h-3" />
                        <span>{item.recommendedResource.estimatedHours}</span>
                      </div>
                    </div>

                    <a
                      href={item.recommendedResource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 font-semibold flex items-center space-x-1 transition-colors text-[11px]"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[140px]">{item.recommendedResource.title}</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};
