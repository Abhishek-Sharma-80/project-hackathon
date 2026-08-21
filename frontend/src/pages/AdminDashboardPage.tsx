import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  Building2, 
  FileCheck2, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  ArrowUpRight, 
  Filter, 
  Download, 
  Calendar,
  Layers,
  Cpu,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { AdminLayout } from '../components/admin/AdminLayout';
import { api } from '../services/api';
import { AdminStats } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '6m' | '1y'>('6m');
  const [atRiskModalOpen, setAtRiskModalOpen] = useState(false);
  const [guidanceSent, setGuidanceSent] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getAdminStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const timeRangeData = {
    '7d': [
      { period: 'Mon', applications: 450, shortlisted: 110, selected: 18 },
      { period: 'Tue', applications: 520, shortlisted: 130, selected: 22 },
      { period: 'Wed', applications: 610, shortlisted: 145, selected: 28 },
      { period: 'Thu', applications: 580, shortlisted: 140, selected: 25 },
      { period: 'Fri', applications: 720, shortlisted: 180, selected: 34 },
      { period: 'Sat', applications: 390, shortlisted: 95, selected: 14 },
      { period: 'Sun', applications: 340, shortlisted: 80, selected: 12 }
    ],
    '30d': [
      { period: 'Week 1', applications: 2800, shortlisted: 620, selected: 95 },
      { period: 'Week 2', applications: 3400, shortlisted: 780, selected: 120 },
      { period: 'Week 3', applications: 4100, shortlisted: 940, selected: 160 },
      { period: 'Week 4', applications: 4900, shortlisted: 1120, selected: 195 }
    ],
    '6m': [
      { period: 'Sep', applications: 2400, shortlisted: 580, selected: 140 },
      { period: 'Oct', applications: 3800, shortlisted: 890, selected: 210 },
      { period: 'Nov', applications: 5100, shortlisted: 1240, selected: 340 },
      { period: 'Dec', applications: 4200, shortlisted: 1050, selected: 280 },
      { period: 'Jan', applications: 6900, shortlisted: 1680, selected: 490 },
      { period: 'Feb', applications: 8400, shortlisted: 2120, selected: 620 }
    ],
    '1y': [
      { period: 'Q1', applications: 7200, shortlisted: 1750, selected: 380 },
      { period: 'Q2', applications: 11400, shortlisted: 2800, selected: 590 },
      { period: 'Q3', applications: 15600, shortlisted: 3900, selected: 840 },
      { period: 'Q4', applications: 24560, shortlisted: 4820, selected: 1250 }
    ]
  };

  const demandedSkillsRanking = [
    { rank: 1, skill: 'Java', demand: '94% High Demand', trend: 'up', change: '+14%' },
    { rank: 2, skill: 'Python', demand: '91% High Demand', trend: 'up', change: '+18%' },
    { rank: 3, skill: 'SQL', demand: '88% Essential', trend: 'up', change: '+9%' },
    { rank: 4, skill: 'React', demand: '84% High Demand', trend: 'up', change: '+12%' },
    { rank: 5, skill: 'Spring Boot', demand: '79% Growing', trend: 'up', change: '+22%' },
    { rank: 6, skill: 'JavaScript', demand: '76% Core', trend: 'down', change: '-2%' },
    { rank: 7, skill: 'Machine Learning', demand: '72% Emerging', trend: 'up', change: '+31%' },
    { rank: 8, skill: 'AWS', demand: '68% High Value', trend: 'up', change: '+15%' },
    { rank: 9, skill: 'Docker', demand: '64% Containerization', trend: 'up', change: '+19%' },
    { rank: 10, skill: 'Data Structures', demand: '61% Foundation', trend: 'down', change: '-1%' }
  ];

  const atRiskStudents = [
    { id: '1', name: 'Vikram Malhotra', college: 'NIT Surathkal', reason: 'Only 3 skills logged, 0 applications sent in 30 days', profileScore: 68 },
    { id: '2', name: 'Karthik Raman', college: 'Anna University', reason: 'Missing Spring Boot & Docker for target Backend roles', profileScore: 64 },
    { id: '3', name: 'Aarav Desai', college: 'SRM University', reason: 'No portfolio projects attached, 0 AI match recommendations viewed', profileScore: 59 },
    { id: '4', name: 'Tanvi Joshi', college: 'Manipal University', reason: 'Incomplete profile (missing certifications and GitHub link)', profileScore: 62 }
  ];

  const handleSendGuidance = (studentId: string) => {
    setGuidanceSent(prev => ({ ...prev, [studentId]: true }));
  };

  return (
    <AdminLayout
      pageTitle="Good Morning, Admin 👋"
      pageSubtitle="Here's what's happening across the InternDisha platform today."
      actionButton={
        <div className="flex items-center space-x-2">
          <Link
            to="/admin/reports"
            className="px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-indigo-500" />
            <span>Export Analytics</span>
          </Link>
          <Link
            to="/admin/internships"
            className="px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
          >
            <span>+ Add Internship</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* 📊 6 TOP ANALYTICS STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          
          {/* Total Students */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Students</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">12,480</h3>
              <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center space-x-0.5">
                <span>↑ 12.5%</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal">this month</span>
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-80"></div>
          </div>

          {/* Active Students */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Students</span>
              <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">8,640</h3>
              <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center space-x-0.5">
                <span>↑ 8.2%</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal">active now</span>
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500 opacity-80"></div>
          </div>

          {/* Total Internships */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Internships</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">1,250</h3>
              <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center space-x-0.5">
                <span>+85</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal">added this month</span>
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-80"></div>
          </div>

          {/* Partner Companies */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Partner Companies</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">320</h3>
              <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center space-x-0.5">
                <span>+24</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal">this month</span>
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-80"></div>
          </div>

          {/* Total Applications */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applications</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">24,560</h3>
              <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center space-x-0.5">
                <span>↑ 18.4%</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal">velocity</span>
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-80"></div>
          </div>

          {/* AI Recommendations */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white border border-indigo-500/30 shadow-lg shadow-indigo-900/20 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">AI Matches</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/30 text-indigo-300 flex items-center justify-center border border-indigo-400/30 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-white tracking-tight">45,820</h3>
              <p className="text-[11px] font-bold text-emerald-300 mt-1 flex items-center space-x-1">
                <Cpu className="w-3 h-3" />
                <span>Groq LLaMA 3.3 Active</span>
              </p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

        </div>

        {/* 📈 PLATFORM ANALYTICS: INTERACTIVE APPLICATION GROWTH CHART */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                <span>Application Growth & Student Placement Funnel</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tracking total student submissions, shortlist selections, and final offers extended.
              </p>
            </div>

            {/* Time Filter Buttons */}
            <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              {[
                { label: '7 Days', key: '7d' as const },
                { label: '30 Days', key: '30d' as const },
                { label: '6 Months', key: '6m' as const },
                { label: 'This Year', key: '1y' as const }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setTimeRange(tab.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    timeRange === tab.key
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeRangeData[timeRange]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorShort" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorSelect" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    borderColor: '#1E293B', 
                    borderRadius: '16px', 
                    color: '#FFF',
                    fontSize: '12px',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
                  }} 
                />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorApps)" />
                <Area type="monotone" dataKey="shortlisted" name="Shortlisted" stroke="#0EA5E9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorShort)" />
                <Area type="monotone" dataKey="selected" name="Offers Extended" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSelect)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
              <span className="text-slate-600 dark:text-slate-300">Total Applications (24.5K)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-sky-500"></span>
              <span className="text-slate-600 dark:text-slate-300">Shortlisted (4.8K)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 dark:text-slate-300">Offers Extended (620)</span>
            </div>
          </div>
        </div>

        {/* 🥧 SKILL DISTRIBUTION & 🔥 MOST DEMANDED SKILLS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Student Skill Distribution Donut Chart */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-purple-500" />
                  <span>Student Skill Distribution</span>
                </h3>
                <span className="text-[11px] font-bold text-slate-400">12,480 Profiles</span>
              </div>

              <div className="h-60 w-full mt-2 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats?.skillDistribution || [
                        { name: 'Java', percentage: 30, color: '#6366F1' },
                        { name: 'Python', percentage: 25, color: '#0EA5E9' },
                        { name: 'SQL', percentage: 20, color: '#8B5CF6' },
                        { name: 'React', percentage: 15, color: '#10B981' },
                        { name: 'DSA', percentage: 10, color: '#F59E0B' }
                      ]}
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="percentage"
                    >
                      {(stats?.skillDistribution || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: '#0F172A', 
                        borderColor: '#1E293B', 
                        borderRadius: '12px', 
                        color: '#FFF',
                        fontSize: '12px' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">100%</span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Verified</span>
                </div>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              {[
                { name: 'Java', pct: '30%', color: 'bg-indigo-500' },
                { name: 'Python', pct: '25%', color: 'bg-sky-500' },
                { name: 'SQL', pct: '20%', color: 'bg-purple-500' },
                { name: 'React', pct: '15%', color: 'bg-emerald-500' },
                { name: 'DSA', pct: '10%', color: 'bg-amber-500' }
              ].map(s => (
                <div key={s.name} className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.color}`}></span>
                  <span className="text-slate-600 dark:text-slate-400">{s.name} ({s.pct})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Demanded Skills Ranking (Top 10) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>Top 10 Most Demanded Skills by Recruiters</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Derived from 1,250 active company job listings</p>
                </div>
                <Link to="/admin/skill-analytics" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1">
                  <span>Deep Analytics</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                {demandedSkillsRanking.map(item => (
                  <div
                    key={item.rank}
                    className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs hover:border-indigo-400/50 transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-[10px] flex items-center justify-center">
                        {item.rank}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.skill}</h4>
                        <span className="text-[10px] text-slate-400">{item.demand}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-[11px] font-extrabold">
                      {item.trend === 'up' ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-0.5" />
                          {item.change}
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center">
                          <TrendingDown className="w-3 h-3 mr-0.5" />
                          {item.change}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ⚠️ STUDENTS NEEDING ATTENTION / AT RISK ALERT BANNER */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-900/90 via-slate-900 to-indigo-950 border border-rose-500/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <div className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center space-x-1 shadow-md shadow-rose-500/30">
                <AlertTriangle className="w-3 h-3" />
                <span>AI EARLY WARNING ALERT</span>
              </div>
              <span className="text-xs text-rose-200 font-semibold">85 Students Identified At Risk</span>
            </div>
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Students with Low Profile Completion, Missing Key Skills, or Zero Applications
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our explainable AI model detected 85 students falling behind placement readiness thresholds. Dispatch automated personalized learning paths or trigger career guidance counseling with 1 click.
            </p>
          </div>

          <button
            onClick={() => setAtRiskModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs shadow-lg shadow-rose-500/40 shrink-0 transition-all flex items-center space-x-2"
          >
            <span>View At-Risk Students</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 🛡️ AT RISK STUDENTS INTERVENTION MODAL */}
      <AnimatePresence>
        {atRiskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAtRiskModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Students Requiring Intervention (85 Total)</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Automated diagnostic and guidance dispatcher</p>
                  </div>
                </div>
                <button onClick={() => setAtRiskModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {atRiskStudents.map(student => (
                  <div key={student.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{student.name}</span>
                        <span className="text-[10px] text-slate-400">({student.college})</span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                          {student.profileScore}% Readiness
                        </span>
                      </div>
                      <p className="text-[11px] text-rose-600 dark:text-rose-400">{student.reason}</p>
                    </div>

                    <button
                      onClick={() => handleSendGuidance(student.id)}
                      disabled={guidanceSent[student.id]}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
                        guidanceSent[student.id]
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30'
                      }`}
                    >
                      {guidanceSent[student.id] ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Roadmap Dispatched</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send AI Roadmap</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    atRiskStudents.forEach(s => handleSendGuidance(s.id));
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-600/30"
                >
                  Dispatch AI Roadmaps to All 85 Students
                </button>
                <button
                  onClick={() => setAtRiskModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};
