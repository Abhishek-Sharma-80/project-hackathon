import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { profileApi, recommendationApi, skillGapApi, learningPathApi, applicationApi } from '../../services/api';
import { CircularProgress } from '../../components/common/CircularProgress';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  GitPullRequest,
  CheckCircle2,
  AlertCircle,
  Clock,
  Kanban,
  FileCode2,
  Zap,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [bestMatch, setBestMatch] = useState<any>(null);
  const [priorityGap, setPriorityGap] = useState<any>(null);
  const [learningPath, setLearningPath] = useState<any>(null);
  const [appCounts, setAppCounts] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [profRes, recRes, gapRes, pathRes, appRes] = await Promise.all([
          profileApi.getProfile(),
          recommendationApi.getRecommendations(),
          skillGapApi.getSkillGaps(),
          learningPathApi.getLearningPath(),
          applicationApi.getApplications(),
        ]);

        setProfile(profRes.data.profile);
        setBestMatch(recRes.data.bestMatch);
        setPriorityGap(gapRes.data.priorityGaps?.[0] || null);
        setLearningPath(pathRes.data.learningPath);
        setAppCounts(appRes.data.counts);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingScreen message="Aggregating your real-time skills, AI recommendations, and application funnel..." />;
  }

  const activeModule = learningPath?.modules?.find((m: any) => m.status === 'IN_PROGRESS') || learningPath?.modules?.[0];
  const firstName = user?.name?.split(' ')[0] || 'Aryan';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. WELCOME HEADER & AI INSIGHT PILL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Welcome back, {firstName} 👋</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            SmartEdu AI has analyzed your profile. Here are your best opportunities and next learning steps.
          </p>
        </div>

        {/* Dynamic AI Context Insight Badge */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200/80 shadow-sm text-xs font-semibold text-purple-900">
          <Sparkles className="w-4 h-4 text-purple-600 shrink-0 animate-spin" />
          <span>
            Targeting <strong>{profile?.targetRole || 'Backend Developer'}</strong> • Readiness <strong>{profile?.careerReadiness || 76}%</strong>
          </span>
        </div>
      </div>

      {/* 2. TOP PROFILE COMPLETENESS METRIC CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          {/* Circular Score Ring */}
          <div className="flex items-center justify-center lg:border-r border-slate-100 lg:pr-6">
            <CircularProgress
              score={profile?.profileScore || 82}
              size={135}
              label="Profile Score"
              colorGradient="blue-indigo"
            />
          </div>

          {/* Core Stats Overview */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-400 block mb-1">Academic CGPA</span>
              <span className="text-xl font-black text-slate-900 font-mono">{profile?.cgpa || 8.7}/10</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-400 block mb-1">Active Skills</span>
              <span className="text-xl font-black text-indigo-600 font-mono">{profile?.skills?.length || 10}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-400 block mb-1">Projects</span>
              <span className="text-xl font-black text-blue-600 font-mono">{profile?.projects?.length || 4}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-400 block mb-1">Certifications</span>
              <span className="text-xl font-black text-emerald-600 font-mono">{profile?.certifications?.length || 6}</span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col gap-2 justify-center lg:pl-4">
            <Link
              to="/profile"
              className="w-full text-center py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
            >
              Improve Profile →
            </Link>
            <Link
              to="/career-insights"
              className="w-full text-center py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              View Career Radar
            </Link>
          </div>
        </div>
      </div>

      {/* 3. CORE RECOMMENDATION & SKILL GAP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BEST INTERNSHIP MATCH CARD */}
        {bestMatch && bestMatch.internship ? (
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{bestMatch.matchScore}% Match</span>
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {bestMatch.internship.company?.name || 'TechNova'}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {bestMatch.internship.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {bestMatch.internship.stipend} • {bestMatch.internship.workMode} • {bestMatch.internship.location}
              </p>

              {/* Skills Analysis Tag List */}
              <div className="mt-5 space-y-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Matching Strengths:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {bestMatch.matchingSkills?.slice(0, 4).map((s: string) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Missing Skill Gaps:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {bestMatch.missingSkills?.slice(0, 3).map((s: string) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center gap-1">
                        ✕ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <Link
                to={`/recommendations/${bestMatch.internship.id}`}
                className="w-full text-center py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center justify-center gap-1"
              >
                <span>Why This Match?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/internships/${bestMatch.internship.id}`}
                className="w-full text-center py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
              >
                View Opportunity
              </Link>
            </div>
          </div>
        ) : null}

        {/* PRIORITY SKILL GAP & ROADMAP MODULE */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                <span>Priority Skill Gap #1</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Industry Demand: {priorityGap?.industryDemand || 89}%
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {priorityGap?.skillName || 'Spring Boot 3'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {priorityGap?.reason || 'Critical framework requirement for top-tier backend internships.'}
            </p>

            {/* Visual Level Progress */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Current Level: {priorityGap?.currentLevel || 20}%</span>
                <span className="text-indigo-600">Required Target: {priorityGap?.targetLevel || 70}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${priorityGap?.currentLevel || 20}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
            <Link
              to="/learning-path"
              className="flex-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition flex items-center justify-center gap-1"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Start Learning Roadmap</span>
            </Link>
            <Link
              to="/skill-gaps"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              All Gaps
            </Link>
          </div>
        </div>
      </div>

      {/* 4. CONTINUE LEARNING & APPLICATION FUNNEL ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CONTINUE LEARNING MODULE */}
        <div className="lg:col-span-2 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Continue Learning
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {activeModule?.estimatedHours || 10} Hours Module
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {activeModule?.title || 'Spring Boot 3 Fundamentals'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {activeModule?.description || 'Master Dependency Injection, REST Controllers, and Spring Data JPA persistence.'}
            </p>

            <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-900">Module Progress</span>
                <div className="text-[11px] text-slate-500">
                  {activeModule?.progress || 65}% Complete
                </div>
              </div>
              <div className="w-32 h-2 bg-indigo-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${activeModule?.progress || 65}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
            <Link
              to="/learning-path"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition"
            >
              <span>Continue Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* APPLICATION FUNNEL OVERVIEW */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Kanban className="w-4 h-4 text-indigo-600" /> Applications Overview
              </span>
              <span className="text-xs font-bold text-indigo-600">{appCounts?.total || 12} Total</span>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 text-xs">
                <span className="font-semibold text-slate-600">Applied</span>
                <span className="font-black text-slate-900 font-mono">{appCounts?.APPLIED || 2}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-blue-50 text-xs">
                <span className="font-semibold text-blue-800">Shortlisted</span>
                <span className="font-black text-blue-900 font-mono">{appCounts?.SHORTLISTED || 2}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-amber-50 text-xs">
                <span className="font-semibold text-amber-800">Interviews</span>
                <span className="font-black text-amber-900 font-mono">{appCounts?.INTERVIEW || 2}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-emerald-50 text-xs">
                <span className="font-semibold text-emerald-800">Selected (Offers)</span>
                <span className="font-black text-emerald-900 font-mono">{appCounts?.SELECTED || 1}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-center">
            <Link
              to="/applications"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Open Kanban Tracker →
            </Link>
          </div>
        </div>
      </div>

      {/* 5. AI INSIGHT CARD CALLOUT */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>SmartEdu AI Strategic Insight</span>
          </div>
          <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
            "Your strongest career trajectory is <strong>Backend Development</strong>. Completing Spring Boot and Docker modules will elevate your average internship match score by approximately <strong>18%</strong>, unlocking 8 additional tier-1 company opportunities."
          </p>
        </div>
        <Link
          to="/assistant"
          className="shrink-0 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition"
        >
          Chat with AI Assistant
        </Link>
      </div>
    </div>
  );
};
