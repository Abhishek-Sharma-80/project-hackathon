import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Sparkles, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Eye, 
  UserCheck, 
  Filter, 
  ArrowRight,
  ChevronRight,
  Search,
  Layers
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StitchCard, StitchStatCard, StitchBadge, StitchProgressBar } from '../components/stitch/StitchComponents';

export const RecruiterDashboardPage: React.FC = () => {
  const metrics = [
    {
      title: 'Active Internships',
      value: '12',
      subtext: '4 listings expiring soon',
      trend: '+2 this week',
      trendPositive: true,
      icon: <Briefcase className="w-5 h-5" />,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    },
    {
      title: 'Total Applications',
      value: '1,240',
      subtext: 'High volume received',
      trend: '+15% vs last mo',
      trendPositive: true,
      icon: <Users className="w-5 h-5" />,
      iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
    },
    {
      title: 'AI Matched Candidates',
      value: '860',
      subtext: 'Passed 75%+ score threshold',
      trend: '70% match rate',
      trendPositive: true,
      icon: <Sparkles className="w-5 h-5" />,
      iconBg: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
    },
    {
      title: 'Shortlisted',
      value: '245',
      subtext: 'Ready for recruiter interviews',
      trend: '19.7% of total',
      trendPositive: true,
      icon: <UserCheck className="w-5 h-5" />,
      iconBg: 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
    }
  ];

  const funnelStages = [
    { name: 'Applied', count: 1240, pct: 100, color: 'from-blue-600 to-indigo-600' },
    { name: 'AI Matched', count: 860, pct: 69, color: 'from-indigo-600 to-purple-600' },
    { name: 'Shortlisted', count: 245, pct: 20, color: 'from-purple-600 to-emerald-500' },
    { name: 'Interviewing', count: 42, pct: 3.4, color: 'from-emerald-500 to-teal-400' },
    { name: 'Offers Extended', count: 8, pct: 0.6, color: 'from-amber-400 to-emerald-400' }
  ];

  const candidates = [
    {
      name: 'Sarah Jenkins',
      role: 'Backend Developer Intern Applicant',
      school: 'Stanford University • Class of 2026',
      matchScore: 92,
      skills: ['Java', 'SQL', 'Spring Boot', 'REST APIs'],
      badge: 'Strong Match',
      status: 'Shortlisted'
    },
    {
      name: 'David Chen',
      role: 'Data Analyst Intern Applicant',
      school: 'UC Berkeley • Class of 2026',
      matchScore: 88,
      skills: ['Python', 'Pandas', 'Machine Learning', 'SQL'],
      badge: 'High Match',
      status: 'In Review'
    },
    {
      name: 'Elena Rostova',
      role: 'Full Stack Engineer Applicant',
      school: 'MIT • Class of 2027',
      matchScore: 85,
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      badge: 'Recommended',
      status: 'Applied'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto font-sans">
        
        {/* 🌟 1. RECRUITER HERO HEADER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/70 to-[#070A11] border border-emerald-500/20 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">TechNova Solutions</span>
                <span className="text-slate-500">•</span>
                <StitchBadge label="Hiring Hub Live" variant="success" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Corporate Recruitment Hub
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Streamline candidate vetting with AI semantic scoring, pipeline analytics, and automated ATS match filters.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <Link
                to="/recruiter/internships"
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center space-x-2 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Internship</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 📊 2. METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <StitchStatCard key={idx} {...m} />
          ))}
        </div>

        {/* 📉 3. 5-STAGE HIRING FUNNEL (Stitch Design) */}
        <StitchCard className="p-6 space-y-5 border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">Candidate Pipeline</span>
              <h3 className="text-base font-extrabold text-white mt-1">5-Stage Recruitment Conversion Funnel</h3>
            </div>
            <span className="text-xs text-slate-400 font-bold">1,240 Total Candidates</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {funnelStages.map((stage, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-center">
                <span className="text-xs font-extrabold text-slate-400 block">{stage.name}</span>
                <span className="text-2xl font-black text-white block">{stage.count}</span>
                <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden mt-2">
                  <div className={`h-full rounded-full bg-gradient-to-r ${stage.color}`} style={{ width: `${Math.max(stage.pct, 8)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </StitchCard>

        {/* 👥 4. TOP AI MATCHED CANDIDATES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white tracking-tight flex items-center space-x-2">
                <span>Top AI-Matched Candidates</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </h2>
              <p className="text-xs text-slate-400">Ranked by algorithmic fit against active postings</p>
            </div>
            <Link to="/recruiter/candidates" className="text-xs font-bold text-emerald-400 hover:underline">
              View All Candidates
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {candidates.map((c, idx) => (
              <StitchCard key={idx} className="p-6 space-y-4 border-slate-800 hover:border-emerald-500/40">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-base text-white">{c.name}</h3>
                    <p className="text-xs text-emerald-400 font-bold">{c.role}</p>
                    <p className="text-[11px] text-slate-400">{c.school}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {c.matchScore}% Match
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {c.skills.map((s, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <StitchBadge label={c.status} variant={c.status === 'Shortlisted' ? 'success' : 'info'} />
                  <Link
                    to="/recruiter/candidates"
                    className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
                  >
                    <span>Inspect Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </StitchCard>
            ))}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
};
