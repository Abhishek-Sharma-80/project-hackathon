'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { CircularProgress } from '@/components/common/CircularProgress';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { profileApi, recommendationApi, skillGapApi, learningPathApi, applicationApi } from '@/services/api';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Compass,
  Layers,
  Award,
  Kanban,
  CheckCircle2,
  AlertCircle,
  Building2,
  Clock,
  Briefcase,
} from 'lucide-react';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [skillGaps, setSkillGaps] = useState<any>(null);
  const [learningPath, setLearningPath] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profRes, recRes, gapRes, pathRes, appRes] = await Promise.all([
          profileApi.getProfile(),
          recommendationApi.getRecommendations(),
          skillGapApi.getSkillGaps(),
          learningPathApi.getLearningPath(),
          applicationApi.getApplications(),
        ]);

        setProfileData(profRes);
        setRecommendations(recRes.recommendations || []);
        setSkillGaps(gapRes);
        setLearningPath(pathRes.learningPath);
        setApplications(appRes.applications || []);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <LoadingScreen message="Synthesizing multidimensional profile analytics, recommendations, and roadmap..." />
      </StudentLayout>
    );
  }

  const profile = profileData?.profile;
  const topMatch = recommendations[0];
  const priorityGap = skillGaps?.priorityGaps?.[0];
  const activeModule = learningPath?.modules?.find((m: any) => m.status === 'IN_PROGRESS') || learningPath?.modules?.[0];

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Top Hero Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SmartEdu AI Personalized Career Intelligence</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                Welcome back, {profile?.user?.name || 'Aryan'}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Targeting <strong>{profile?.targetRole || 'Backend Developer'}</strong> • {profile?.college || 'Galgotias University'} (CGPA: {profile?.cgpa || 8.7})
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/recommendations"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition flex items-center gap-1.5"
              >
                <span>View {recommendations.length} Recommended Roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Macro Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metric 1: Circular Profile Completeness Score */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Profile Score</span>
            <CircularProgress
              score={profile?.profileScore || 82}
              size={130}
              label="Profile Index"
              colorGradient="blue-indigo"
            />
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Calculated from CGPA, {profile?.skills?.length || 10} skills, {profile?.projects?.length || 4} projects & certs.
            </p>
          </div>

          {/* Metric 2: Career Readiness Index */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Career Readiness</span>
            <CircularProgress
              score={profile?.careerReadiness || 76}
              size={130}
              label="Industry Ready"
              colorGradient="emerald-green"
            />
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Based on verified assessment scores & framework experience.
            </p>
          </div>

          {/* Metric 3: Active Recruitment Pipeline */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Application Pipeline</span>
              <div className="text-3xl font-black text-slate-900 font-mono">
                {applications.length} Active
              </div>
              <p className="text-xs text-slate-500 mt-1">Across recruitment review stages</p>

              <div className="mt-4 space-y-1 text-xs font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>Applied:</span>
                  <span className="text-indigo-600 font-bold">{applications.filter(a => a.status === 'APPLIED').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shortlisted:</span>
                  <span className="text-blue-600 font-bold">{applications.filter(a => a.status === 'SHORTLISTED').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interviews:</span>
                  <span className="text-amber-600 font-bold">{applications.filter(a => a.status === 'INTERVIEW').length}</span>
                </div>
              </div>
            </div>

            <Link
              href="/applications"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-4 pt-3 border-t border-slate-100"
            >
              <span>Open Application Kanban</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* TOP MATCH & SKILL GAP TWO-COLUMN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Internship Match Banner */}
          {topMatch && (
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-800">
                    {topMatch.matchScore}% Match Score
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase font-mono">
                    Top Recommendation
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-xl font-bold text-slate-900">{topMatch.internship.title}</h3>
                  <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                    {topMatch.internship.company?.name} • {topMatch.internship.location} ({topMatch.internship.workMode})
                  </p>
                </div>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {topMatch.explanation}
                </p>

                {/* Matching vs Missing Highlights */}
                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">Strengths Met</span>
                    <span className="font-semibold text-emerald-950 text-xs">
                      {topMatch.matchingSkills?.slice(0, 3).join(', ') || 'Java, SQL, DSA'}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">Missing Gap</span>
                    <span className="font-semibold text-amber-950 text-xs">
                      {topMatch.missingSkills?.slice(0, 2).join(', ') || 'Spring Boot, Docker'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/recommendations/${topMatch.internship.id}`}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Why This Match? (Explainable AI)</span>
                </Link>
                <Link
                  href={`/internships/${topMatch.internship.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                >
                  View Details & Apply
                </Link>
              </div>
            </div>
          )}

          {/* Priority Skill Gap & Active Roadmap Module */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-black text-red-800">
                  Priority Skill Gap
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  Roadmap Focus
                </span>
              </div>

              {priorityGap ? (
                <div className="mt-3 space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">{priorityGap.skillName}</h3>
                  <p className="text-xs text-slate-500 font-medium">{priorityGap.reason}</p>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between font-bold text-slate-700">
                      <span>Current Level:</span>
                      <span className="text-red-600">{priorityGap.currentLevel}%</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-700">
                      <span>Target Employer Level:</span>
                      <span className="text-emerald-600">{priorityGap.targetLevel}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <h3 className="text-lg font-bold text-slate-900">All Core Skills On Track!</h3>
                  <p className="text-xs text-slate-500">Continue practicing advanced roadmaps.</p>
                </div>
              )}

              {/* Active Learning Module Card */}
              {activeModule && (
                <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase block mb-1">Active Module:</span>
                  <span className="font-bold text-indigo-950 block">{activeModule.title}</span>
                  <div className="w-full bg-indigo-200/60 rounded-full h-1.5 mt-2">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${activeModule.progress}%` }} />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/skill-gaps"
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                View Full Skill Matrix
              </Link>
              <Link
                href={activeModule ? `/learning-path/module/${activeModule.id}` : '/learning-path'}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition flex items-center gap-1"
              >
                <span>Continue Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* AI ASSISTANT PROMPT CALLOUT */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h4 className="text-base font-bold">Have questions about your roadmap or match ratings?</h4>
              <p className="text-xs text-indigo-200">Our Groq LLaMA 3.3 70B AI Career Coach is grounded in your live profile.</p>
            </div>
          </div>

          <Link
            href="/assistant"
            className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition shrink-0 shadow-sm"
          >
            Chat with SmartEdu AI →
          </Link>
        </div>
      </div>
    </StudentLayout>
  );
}
