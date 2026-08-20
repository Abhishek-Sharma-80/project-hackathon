import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Briefcase, 
  Bookmark, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  Plus, 
  ChevronRight, 
  Zap, 
  Clock 
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { CircularProgress } from '../components/common/CircularProgress';
import { InternshipCard } from '../components/internships/InternshipCard';
import { MatchBreakdownModal } from '../components/dashboard/MatchBreakdownModal';
import { QuickApplyModal } from '../components/dashboard/QuickApplyModal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Internship, RecommendationBreakdown, SkillGapItem } from '../types';

export const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<{ internship: Internship; breakdown: RecommendationBreakdown }[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBreakdown, setSelectedBreakdown] = useState<{ internship: Internship; breakdown: RecommendationBreakdown } | null>(null);
  const [applyModalIntern, setApplyModalIntern] = useState<Internship | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [recRes, gapRes] = await Promise.all([
          api.getRecommendations(3),
          api.getSkillGap()
        ]);

        if (recRes.success) setRecommendations(recRes.recommendations);
        if (gapRes.success) setSkillGaps(gapRes.skillGaps);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Compute profile strength percentage
  const calcProfileStrength = () => {
    let score = 30; // base account
    if (profile?.highestQualification && profile?.college) score += 20;
    if (profile?.skills && profile.skills.length >= 3) score += 25;
    if (profile?.interests && profile.interests.length >= 1) score += 15;
    if (profile?.preferredLocation && profile?.workPreference) score += 10;
    return Math.min(100, score);
  };

  const profileStrength = calcProfileStrength();

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Welcome Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-indigo-200 border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Recommendation Engine Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t('dash_welcome')} {user?.name?.split(' ')[0] || 'Student'} 👋
              </h1>
              <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
                {t('dash_welcome_sub')}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to="/recommendations"
                className="px-5 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs shadow-lg hover:bg-indigo-50 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>View Top AI Matches</span>
              </Link>
              <Link
                to="/explore"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                {t('nav_explore')}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid + Profile Strength Radial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Circular Profile Strength Card */}
          <div className="md:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('dash_profile_strength')}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                AI Rating
              </span>
            </div>

            <div className="flex items-center justify-center py-2">
              <CircularProgress
                value={profileStrength}
                size={140}
                strokeWidth={12}
                label="Complete"
                colorClass={profileStrength >= 80 ? 'text-emerald-500' : 'text-indigo-600 dark:text-indigo-400'}
              />
            </div>

            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Actions:</span>
              <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                {profileStrength < 100 ? (
                  <>
                    <li className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400">
                      <span>•</span>
                      <span>Add 1 more technical skill to boost matching by +15%</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span>•</span>
                      <span>Link GitHub or Portfolio URL</span>
                    </li>
                  </>
                ) : (
                  <li className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Your profile is 100% complete for top AI matching!
                  </li>
                )}
              </ul>

              <Link
                to="/profile"
                className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1"
              >
                Edit Complete Profile →
              </Link>
            </div>
          </div>

          {/* 3 Metric Cards */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {recommendations.length || 5}
                </span>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                  {t('dash_stat_recommended')}
                </h4>
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center space-x-1">
                <span>↑ High Match Rates (&gt;85%)</span>
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {profile?.skills?.length || 8}
                </span>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                  {t('dash_stat_matched_skills')}
                </h4>
              </div>
              <p className="text-[11px] text-slate-400">
                Verified in your student profile
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {skillGaps.length || 3}
                </span>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                  {t('dash_stat_to_improve')}
                </h4>
              </div>
              <Link to="/skill-gap" className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                View Skill Growth Path →
              </Link>
            </div>

            {/* Quick Banner for Learning Path */}
            <div className="sm:col-span-3 p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-slate-800 dark:to-slate-800/60 border border-indigo-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Personalized Frontend & Full-Stack Roadmaps
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Follow step-by-step milestones to become an industry-ready candidate.
                  </p>
                </div>
              </div>

              <Link
                to="/learning-path"
                className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shrink-0"
              >
                Open Roadmap
              </Link>
            </div>

          </div>
        </div>

        {/* Top 3 AI Recommendations Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>{t('dash_top_matches_title')}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Top 3 best-fit opportunities ranked by our explainable 4-factor scoring algorithm.
              </p>
            </div>

            <Link
              to="/recommendations"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center space-x-1"
            >
              <span>{t('dash_view_all_rec')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map(rec => (
                <InternshipCard
                  key={rec.internship.id}
                  internship={rec.internship}
                  breakdown={rec.breakdown}
                  onOpenBreakdown={(internship, breakdown) => setSelectedBreakdown({ internship, breakdown })}
                  onApply={(internship) => setApplyModalIntern(internship)}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Explainable Modal */}
      {selectedBreakdown && (
        <MatchBreakdownModal
          isOpen={!!selectedBreakdown}
          onClose={() => setSelectedBreakdown(null)}
          internship={selectedBreakdown.internship}
          breakdown={selectedBreakdown.breakdown}
          onApply={() => {
            setApplyModalIntern(selectedBreakdown.internship);
            setSelectedBreakdown(null);
          }}
        />
      )}

      {/* Quick Apply Modal */}
      {applyModalIntern && (
        <QuickApplyModal
          isOpen={!!applyModalIntern}
          onClose={() => setApplyModalIntern(null)}
          internship={applyModalIntern}
        />
      )}
    </DashboardLayout>
  );
};
