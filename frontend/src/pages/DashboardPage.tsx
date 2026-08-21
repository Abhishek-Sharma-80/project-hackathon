import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  Building2, 
  MapPin, 
  DollarSign, 
  FileText, 
  Award,
  ChevronRight,
  Zap,
  Layers,
  BookOpen
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StitchCard, StitchStatCard, StitchMatchGauge, StitchBadge } from '../components/stitch/StitchComponents';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const metrics = [
    {
      title: 'Profile Strength',
      value: '85%',
      subtext: 'ATS & GitHub connected',
      trend: '+12%',
      trendPositive: true,
      icon: <Award className="w-5 h-5" />,
      iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
    },
    {
      title: 'Active Applications',
      value: '3',
      subtext: '2 in active review',
      trend: '+1 new',
      trendPositive: true,
      icon: <Briefcase className="w-5 h-5" />,
      iconBg: 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
    },
    {
      title: 'Average Match Score',
      value: '78%',
      subtext: 'Across 12 matched roles',
      trend: '+6%',
      trendPositive: true,
      icon: <Target className="w-5 h-5" />,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    }
  ];

  const aiMatches = [
    {
      id: '1',
      company: 'TechNova Solutions',
      title: 'Backend Developer Intern',
      matchScore: 91,
      location: 'San Francisco, CA (Hybrid)',
      stipend: '$45/hr',
      duration: '3 Months',
      skills: ['Java', 'SQL', 'Git', 'REST APIs'],
      reason: 'Strong alignment with your coursework Java projects & GitHub repos.'
    },
    {
      id: '2',
      company: 'InnovateSoft',
      title: 'Software Engineer Intern',
      matchScore: 84,
      location: 'Seattle, WA (Remote)',
      stipend: '$42/hr',
      duration: '6 Months',
      skills: ['Python', 'SQL', 'Docker'],
      reason: 'Python scripts & data structuring match automation stack.'
    },
    {
      id: '3',
      company: 'Quantum Systems',
      title: 'Data Engineer Intern',
      matchScore: 76,
      location: 'Austin, TX (On-site)',
      stipend: '$40/hr',
      duration: '3 Months',
      skills: ['SQL', 'Python', 'ETL'],
      reason: 'Coursework in database management qualifies key criteria.'
    }
  ];

  const applications = [
    {
      company: 'TechNova Solutions',
      role: 'Backend Developer',
      applied: '2 days ago',
      status: 'In Review',
      statusVariant: 'info' as const
    },
    {
      company: 'InnovateSoft',
      role: 'Software Engineer',
      applied: '5 days ago',
      status: 'Interview',
      statusVariant: 'success' as const
    },
    {
      company: 'Quantum Systems',
      role: 'Data Engineer',
      applied: '8 days ago',
      status: 'Submitted',
      statusVariant: 'warning' as const
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto font-sans">
        
        {/* 👋 1. WELCOME HERO BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-[#070A11] border border-indigo-500/20 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI Student Copilot Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome back, {user?.name || 'Abhishek Sharma'} 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Your AI recommendation engine has detected <strong className="text-white">3 new high-match internships</strong> based on your verified skills.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/student/ats-resume"
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs border border-slate-700 flex items-center space-x-2 transition-all"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>ATS Resume: 82/100</span>
              </Link>
              <Link
                to="/student/recommendations"
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-[1.02]"
              >
                <span>View AI Matches</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 📊 2. METRIC STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {metrics.map((m, idx) => (
            <StitchStatCard key={idx} {...m} />
          ))}
        </div>

        {/* 🎯 3. AI INTERNSHIP MATCHES SECTION (Stitch High-Fidelity Cards) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white tracking-tight flex items-center space-x-2">
                <span>Top AI Internship Matches</span>
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </h2>
              <p className="text-xs text-slate-400">Ranked by precision algorithmic alignment</p>
            </div>
            <Link
              to="/student/recommendations"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
            >
              <span>Explore all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiMatches.map(item => (
              <StitchCard key={item.id} className="p-6 flex flex-col justify-between space-y-4 border-indigo-500/20">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-black text-indigo-400 block">{item.company}</span>
                      <h3 className="text-sm font-extrabold text-white mt-0.5">{item.title}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {item.matchScore}% Match
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-400">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.stipend} • {item.duration}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 leading-relaxed">
                    💡 {item.reason}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.skills.map((s, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/student/recommendations?id=${item.id}`}
                  className="w-full py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white font-extrabold text-xs border border-indigo-500/30 transition-all text-center flex items-center justify-center space-x-1.5"
                >
                  <span>Explain AI Score</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </StitchCard>
            ))}
          </div>
        </section>

        {/* 📑 4. APPLICATION TRACKER TABLE & QUICK ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Tracker Table (2 Cols) */}
          <StitchCard className="lg:col-span-2 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">Application Tracker</h3>
                <p className="text-[11px] text-slate-400">Live pipeline updates from hiring companies</p>
              </div>
              <Link to="/student/applications" className="text-xs font-bold text-indigo-400 hover:underline">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 font-bold">
                    <th className="pb-3">Company & Role</th>
                    <th className="pb-3">Applied Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {applications.map((app, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5">
                        <span className="font-extrabold text-white block">{app.company}</span>
                        <span className="text-slate-400 text-[11px]">{app.role}</span>
                      </td>
                      <td className="py-3.5 text-slate-400 font-medium">{app.applied}</td>
                      <td className="py-3.5">
                        <StitchBadge label={app.status} variant={app.statusVariant} />
                      </td>
                      <td className="py-3.5 text-right">
                        <Link to="/student/applications" className="text-xs font-bold text-indigo-400 hover:underline">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </StitchCard>

          {/* Quick Learning & Skill Links (1 Col) */}
          <StitchCard className="p-6 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">Target Growth</span>
              <h3 className="text-sm font-extrabold text-white mt-1">Skill Roadmap Status</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your Backend Developer learning path is <strong className="text-white">42% completed</strong>.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Spring Boot & REST APIs</span>
                <span className="text-emerald-400">Next Priority</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                <div className="w-[42%] h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                to="/student/skill-gap"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 transition-all border border-slate-700"
              >
                <Target className="w-4 h-4 text-purple-400" />
                <span>Skill Gap Intelligence</span>
              </Link>

              <Link
                to="/student/learning-path"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-indigo-600/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>Continue Roadmap (Module 2)</span>
              </Link>
            </div>
          </StitchCard>
        </div>

      </div>
    </DashboardLayout>
  );
};
