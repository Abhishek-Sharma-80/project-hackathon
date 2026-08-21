import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Building2, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Layers,
  BarChart3,
  Search,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { StitchCard, StitchStatCard, StitchBadge, StitchProgressBar } from '../components/stitch/StitchComponents';

export const AdminDashboardPage: React.FC = () => {
  const metrics = [
    {
      title: 'Total Students',
      value: '12,450',
      subtext: 'Active candidates on platform',
      trend: '+14% this mo',
      trendPositive: true,
      icon: <Users className="w-5 h-5" />,
      iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
    },
    {
      title: 'Active Internships',
      value: '1,280',
      subtext: 'Across 320 companies',
      trend: '+5% this mo',
      trendPositive: true,
      icon: <Briefcase className="w-5 h-5" />,
      iconBg: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
    },
    {
      title: 'Registered Companies',
      value: '320',
      subtext: 'Verified enterprise employers',
      trend: '+22 new',
      trendPositive: true,
      icon: <Building2 className="w-5 h-5" />,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    },
    {
      title: 'Total Applications',
      value: '24,890',
      subtext: 'Cumulative platform pipeline',
      trend: '+18% growth',
      trendPositive: true,
      icon: <FileText className="w-5 h-5" />,
      iconBg: 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
    }
  ];

  const skillDemands = [
    { skill: 'React.js & Next.js Ecosystem', pct: 85, color: 'from-blue-500 to-indigo-500' },
    { skill: 'Python & Machine Learning Stack', pct: 78, color: 'from-indigo-500 to-purple-500' },
    { skill: 'Cloud Architecture & DevOps', pct: 70, color: 'from-purple-500 to-emerald-500' },
    { skill: 'UI/UX Design Systems', pct: 62, color: 'from-emerald-500 to-teal-400' }
  ];

  const attentionStudents = [
    {
      name: 'John Doe',
      school: 'Galgotias University • CS',
      issue: 'Profile Incomplete (Missing Resume)',
      pendingDays: '14 days pending',
      action: 'Review Profile',
      badge: 'warning' as const
    },
    {
      name: 'Alice Smith',
      school: 'Delhi Technological Univ • IT',
      issue: 'Low AI Match Rate (< 40%)',
      pendingDays: '7 days pending',
      action: 'Adjust AI Weights',
      badge: 'danger' as const
    },
    {
      name: 'Michael Kim',
      school: 'IIT Delhi • Electrical',
      issue: 'Multiple Rejections in Round 1',
      pendingDays: '10 days pending',
      action: 'Offer Guidance',
      badge: 'warning' as const
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto font-sans">
        
        {/* 🌟 1. ADMIN HERO BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/70 to-[#070A11] border border-purple-500/20 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-purple-400 uppercase tracking-widest">Enterprise Command Center</span>
                <span className="text-slate-500">•</span>
                <StitchBadge label="Super Administrator" variant="purple" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Platform Operations & Intelligence
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Comprehensive supervision of candidate telemetry, corporate partner compliance, and algorithmic AI accuracy.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-right">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">AI Match Accuracy</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">92.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 📊 2. METRIC STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <StitchStatCard key={idx} {...m} />
          ))}
        </div>

        {/* 📈 3. SKILLS DEMAND & ALGORITHMIC ACCURACY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Top In-Demand Skills Across Postings */}
          <StitchCard className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-purple-400 uppercase tracking-wider">Market Telemetry</span>
                <h3 className="text-base font-extrabold text-white mt-1">Top In-Demand Industry Skills</h3>
              </div>
              <span className="text-xs text-slate-400 font-bold">1,280 Postings</span>
            </div>

            <div className="space-y-4">
              {skillDemands.map((s, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">{s.skill}</span>
                    <span className="text-purple-300">{s.pct}% Postings</span>
                  </div>
                  <StitchProgressBar value={s.pct} showPercent={false} color={s.color} />
                </div>
              ))}
            </div>
          </StitchCard>

          {/* AI Accuracy & Quality Control */}
          <StitchCard className="p-6 space-y-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-purple-400 uppercase tracking-wider">Quality Assurance</span>
              <h3 className="text-base font-extrabold text-white mt-1">AI Recommendation Reliability</h3>
              <p className="text-xs text-slate-400 mt-1">
                Measured by successful shortlist conversion and candidate placement telemetry.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                <span className="text-2xl font-black text-white block">92.4%</span>
                <span className="text-[11px] font-bold text-emerald-400">Match Precision</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                <span className="text-2xl font-black text-white block">&lt; 1.2s</span>
                <span className="text-[11px] font-bold text-indigo-400">Inference Latency</span>
              </div>
            </div>

            <Link
              to="/admin/ai-recommendations"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs text-center flex items-center justify-center space-x-2 transition-all shadow-md shadow-purple-600/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Inspect AI Model Telemetry</span>
            </Link>
          </StitchCard>
        </div>

        {/* ⚠️ 4. STITCH "STUDENTS NEEDING ATTENTION" TABLE */}
        <StitchCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <span>Students Needing Attention</span>
                <AlertCircle className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-[11px] text-slate-400">Flagged by automated telemetry for counselor review</p>
            </div>
            <Link to="/admin/students" className="text-xs font-bold text-purple-400 hover:underline">
              View All 12,450 Students
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold">
                  <th className="pb-3">Candidate</th>
                  <th className="pb-3">Flagged Issue</th>
                  <th className="pb-3">Telemetry Age</th>
                  <th className="pb-3 text-right">Administrative Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {attentionStudents.map((st, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5">
                      <span className="font-extrabold text-white block">{st.name}</span>
                      <span className="text-slate-400 text-[11px]">{st.school}</span>
                    </td>
                    <td className="py-3.5">
                      <StitchBadge label={st.issue} variant={st.badge} />
                    </td>
                    <td className="py-3.5 text-slate-400 font-medium">{st.pendingDays}</td>
                    <td className="py-3.5 text-right">
                      <button className="px-3.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white font-extrabold text-xs border border-purple-500/30 transition-all">
                        {st.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StitchCard>

      </div>
    </AdminLayout>
  );
};
