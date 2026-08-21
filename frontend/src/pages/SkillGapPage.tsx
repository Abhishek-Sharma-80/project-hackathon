import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ArrowRight,
  BarChart3,
  Layers,
  Zap,
  Target
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell
} from 'recharts';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { SkillGapItem } from '../types';

export const SkillGapPage: React.FC = () => {
  const { t } = useLanguage();
  const { updateProfileState } = useAuth();
  const navigate = useNavigate();
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [summary, setSummary] = useState<{ totalSkillsHave: number; totalGapsIdentified: number; highPriorityCount: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<'All' | 'Strong' | 'Developing' | 'Missing'>('All');

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

  // Radar Chart Data preparation
  const radarData = skillGaps.map(item => ({
    skill: item.skill,
    current: item.currentLevel,
    required: item.requiredLevel,
    fullMark: 100
  }));

  const filteredGaps = skillGaps.filter(g => {
    if (filterCategory === 'All') return true;
    return g.status === filterCategory;
  });

  const strongSkills = skillGaps.filter(s => s.status === 'Strong');
  const developingSkills = skillGaps.filter(s => s.status === 'Developing');
  const missingSkills = skillGaps.filter(s => s.status === 'Missing');

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
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

          <button
            onClick={() => navigate('/learning-path')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 self-start sm:self-auto transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('gap_btn_generate_plan')}</span>
          </button>
        </div>

        {/* AI Insight Highlight Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 z-10 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-[11px] font-bold border border-white/15">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('gap_insight_title')}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              {t('gap_insight_desc')}
            </h3>
            <p className="text-xs text-indigo-200 max-w-xl">
              Bridging Spring Boot (+15 roles) and Docker (+10 roles) will raise your average AI match score from 84% to 98% across top partner startups.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <button
              onClick={() => navigate('/learning-path')}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-indigo-50 text-indigo-900 font-extrabold text-xs shadow-2xl flex items-center space-x-2 transition-all hover:scale-105"
            >
              <span>{t('gap_btn_generate_plan')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Analytics Section: Radar Chart & Status Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Interactive Radar Chart */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-indigo-500" />
                  <span>Skill Competency Radar</span>
                </h3>
                <span className="text-[11px] text-slate-400">Your Current Level vs Industry Benchmark</span>
              </div>
              <div className="flex items-center space-x-3 text-[10px] font-semibold">
                <span className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                  <span>Your Level</span>
                </span>
                <span className="flex items-center space-x-1 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                  <span>Required</span>
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" opacity={0.5} />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <Radar
                    name="Your Skill Level"
                    dataKey="current"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Industry Benchmark"
                    dataKey="required"
                    stroke="#0EA5E9"
                    fill="#0EA5E9"
                    fillOpacity={0.15}
                  />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3 Categories Breakdown Summary */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Strong Skills (Green) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Strong Competencies ({strongSkills.length})
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Top Tier Match (75%-90%)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {strongSkills.map(s => (
                  <span
                    key={s.skill}
                    className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{s.skill} – {s.currentLevel}%</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Developing Skills (Orange) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Developing Skills ({developingSkills.length})
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  Moderate (40%-60%)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {developingSkills.map(s => (
                  <span
                    key={s.skill}
                    className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>{s.skill} – {s.currentLevel}%</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills (Red) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Missing Priority Skills ({missingSkills.length})
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  Action Required (&lt;35%)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map(s => (
                  <span
                    key={s.skill}
                    className="px-3 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                  >
                    <Target className="w-3.5 h-3.5 text-rose-500" />
                    <span>{s.skill} – {s.currentLevel}%</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Skill Cards with Progress Bars & Actionable Links */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Skill Proficiency Breakdown & Target Resources
            </h3>
            
            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
              {(['All', 'Strong', 'Developing', 'Missing'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    filterCategory === cat
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGaps.map((item, idx) => {
              const isStrong = item.status === 'Strong';
              const isDeveloping = item.status === 'Developing';

              return (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.skill}</h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isStrong
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : isDeveloping
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{item.category}</span>
                      </div>

                      {/* Unlock count badge */}
                      <span className="px-2 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-[10px] font-bold shrink-0">
                        +{item.unlockedInternshipsCount} Roles
                      </span>
                    </div>

                    {/* Progress Level Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium">
                        <span className="text-slate-500">Proficiency</span>
                        <span className="font-bold text-slate-900 dark:text-white">{item.currentLevel}% / 100%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.currentLevel}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full rounded-full ${
                            isStrong
                              ? 'bg-emerald-500'
                              : isDeveloping
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.whyImportant}
                    </p>
                  </div>

                  {/* Resource Link & Action */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 font-bold flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.recommendedResource.estimatedHours}</span>
                    </span>

                    <a
                      href={item.recommendedResource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 font-bold text-[11px] flex items-center space-x-1 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[130px]">{item.recommendedResource.title}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
