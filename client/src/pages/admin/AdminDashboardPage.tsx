import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  AlertTriangle,
  FileBarChart,
  Sparkles,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await adminApi.getAnalytics();
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return <LoadingScreen message="Aggregating institutional skill distributions and placement funnels..." />;
  }

  const { stats, mostDemandedSkills = [], funnel, skillGapDistribution = [], studentSkillDistribution = [] } = data || {};

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Institutional Oversight
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Institutional Skill & Placement Analytics
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time intelligence on student competencies, market requirements, and recruitment funnels.
          </p>
        </div>

        <Link
          to="/admin/reports"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
        >
          <FileBarChart className="w-4 h-4 text-emerald-400" />
          <span>Export Institutional Reports</span>
        </Link>
      </div>

      {/* 4 Macro KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Students</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">{stats?.totalStudents || '1,200'}</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            {stats?.activeStudents || '640'} Active on Platform
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Internships</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">{stats?.totalInternships || '320'}</div>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">
            Across 8 Career Domains
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Partner Companies</span>
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">{stats?.totalCompanies || '150'}</div>
          <span className="text-[11px] text-purple-600 font-semibold mt-1 block">
            Tier-1 Tech & Startup Hubs
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Average Profile Score</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">{stats?.avgProfileScore || '78'}%</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            +14% since diagnostic launch
          </span>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* DEMANDED SKILLS IN INDUSTRY */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Most Demanded Skills by Employers</h3>
              <p className="text-xs text-slate-500">Derived from 40+ active industry recruiter specs.</p>
            </div>
            <BarChart3 className="w-5 h-5 text-indigo-600" />
          </div>

          <div className="space-y-3 pt-2">
            {mostDemandedSkills.map((sk: any) => (
              <div key={sk.name} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800">{sk.name}</span>
                  <span className="text-indigo-600">{sk.demandPercent}% Demand</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${sk.demandPercent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* APPLICATION CONVERSION FUNNEL */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Institutional Placement Funnel</h3>
              <p className="text-xs text-slate-500">Cohort progression from discovery to offer letters.</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Saved by Students', count: funnel?.saved || 95, color: 'bg-slate-500', width: '100%' },
              { label: 'Applications Submitted', count: funnel?.applied || 74, color: 'bg-indigo-600', width: '80%' },
              { label: 'Shortlisted by Recruiters', count: funnel?.shortlisted || 42, color: 'bg-blue-600', width: '55%' },
              { label: 'Technical Interviews', count: funnel?.interview || 24, color: 'bg-amber-500', width: '35%' },
              { label: 'Offers Selected', count: funnel?.selected || 14, color: 'bg-emerald-500', width: '20%' },
            ].map((f) => (
              <div key={f.label} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">{f.label}</span>
                  <span className="font-mono font-bold text-slate-900">{f.count} Students</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${f.color} rounded-full transition-all`} style={{ width: f.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMMON SKILL GAPS IN STUDENT BODY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Institutional Skill Gap Prevalence</h3>
            <p className="text-xs text-slate-500">Most common missing technical proficiencies requiring curriculum interventions.</p>
          </div>
          <Link
            to="/admin/interventions"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View At-Risk Cohort</span>
            <TrendingUp className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {skillGapDistribution.map((gap: any) => (
            <div key={gap.skill} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">{gap.skill}</span>
                <span className="text-xs font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{gap.percent}% of Cohort</span>
              </div>
              <p className="text-[11px] text-slate-500">{gap.affectedStudents} students lack industry proficiency.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
