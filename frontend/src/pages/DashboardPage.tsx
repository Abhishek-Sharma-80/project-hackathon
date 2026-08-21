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
  Clock,
  Code,
  FolderGit2,
  Award,
  Layers,
  Star
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
          api.getRecommendations(4),
          api.getSkillGap()
        ]);

        if (recRes.success) setRecommendations(recRes.recommendations);
        if (gapRes.success) setSkillGaps(recRes.success ? gapRes.skillGaps : []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const profileStrength = 82; // Abhishek Sharma verified profile score
  const totalSkillsCount = profile?.skills?.length || 12;
  const totalProjectsCount = profile?.projects?.length || 4;
  const totalCertificationsCount = profile?.certifications?.length || 6;

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Welcome Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-2xl border border-white/10">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-indigo-200 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Recommendation Engine Active</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Welcome back, {user?.name ? user.name.split(' ')[0] : 'Abhishek'} 👋
              </h1>
              <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
                Let's find the next opportunity for your career.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to="/recommendations"
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2 hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>View Top AI Matches</span>
              </Link>
              <Link
                to="/explore"
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                {t('nav_explore')}
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Modern Top Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Profile Strength (82% circular progress) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {t('dash_profile_strength')}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {profileStrength}%
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                +15% with 1 project
              </span>
            </div>
            <div className="shrink-0">
              <CircularProgress
                value={profileStrength}
                size={68}
                strokeWidth={7}
                colorClass="text-indigo-600 dark:text-indigo-400"
              />
            </div>
          </div>

          {/* Card 2: Skills (12) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Verified Skills
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {totalSkillsCount}
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold block">
                Java, SQL, Git, DSA +8
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-sm">
              <Code className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Projects (4) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Projects
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {totalProjectsCount}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                All with GitHub Links
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
              <FolderGit2 className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Certifications (6) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Certifications
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {totalCertificationsCount}
              </span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold block">
                Oracle, Meta, AWS, Docker
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* AI Recommendation Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span>Top AI Recommendations for You</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ranked by our explainable 4-factor scoring algorithm (Skills 40%, Sector 30%, Education 20%, Location 10%).
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Quick Skill Gap & Career Roadmap Previews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Skill Gap Summary Widget */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Skill Gap Detection
                </h3>
              </div>
              <Link to="/skill-gap" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                Full Radar Chart →
              </Link>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Java', level: 90, status: 'Strong', color: 'bg-emerald-500' },
                { name: 'SQL', level: 85, status: 'Strong', color: 'bg-emerald-500' },
                { name: 'REST API', level: 40, status: 'Developing', color: 'bg-amber-500' },
                { name: 'Docker', level: 30, status: 'Missing', color: 'bg-rose-500' },
                { name: 'Spring Boot', level: 20, status: 'Missing', color: 'bg-rose-500' }
              ].map(s => (
                <div key={s.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-800 dark:text-slate-200">{s.name}</span>
                    <span className={`text-[10px] font-bold ${
                      s.status === 'Strong' ? 'text-emerald-600' : s.status === 'Developing' ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {s.level}% ({s.status})
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/skill-gap"
                className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Analyze All 9 Skills & Unlock Opportunities</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Learning Roadmap Widget */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Your Career Roadmap
                </h3>
              </div>
              <Link to="/learning-path" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                View Timeline →
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Current Milestone</span>
                  <strong className="text-slate-900 dark:text-white block font-bold mt-0.5">Step 1: Spring Boot Basics (10h)</strong>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Dependency Injection, Beans & Controller routing</span>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-bold text-[10px] shrink-0">
                  In Progress
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between opacity-80">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Next Up</span>
                  <strong className="text-slate-800 dark:text-slate-200 block font-semibold mt-0.5">Step 2: Build REST APIs & JPA Persistence (12h)</strong>
                </div>
                <span className="px-2 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                  Locked
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/learning-path"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-600/25 transition-all"
              >
                <span>Continue Roadmap Learning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

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
