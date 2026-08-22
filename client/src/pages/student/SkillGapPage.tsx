import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { skillGapApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import {
  GitPullRequest,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Zap,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';

export const SkillGapPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchGaps = async () => {
      try {
        setLoading(true);
        const res = await skillGapApi.getSkillGaps();
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGaps();
  }, []);

  if (loading) {
    return <LoadingScreen message="Analyzing student skill matrix against industry demand indices..." />;
  }

  const { strongSkills = [], developingSkills = [], priorityGaps = [], targetRole = 'Backend Developer' } = data || {};

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Diagnostic Matrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            SmartEdu AI Skill Gap Intelligence
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Prioritizing technical bottlenecks for <strong>{targetRole}</strong> based on live industry demand.
          </p>
        </div>

        <Link
          to="/learning-path"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:opacity-95 transition"
        >
          <Zap className="w-4 h-4" />
          <span>Open Full Roadmap</span>
        </Link>
      </div>

      {/* 1. PRIORITY SKILL GAPS (Highest impact bottlenecks) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span>Priority Skill Gaps (Action Required)</span>
          </h2>
          <span className="text-xs font-semibold text-slate-400">
            Formula: Gap Size × Demand × Role Relevance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {priorityGaps.map((gap: any) => (
            <div
              key={gap.skillId}
              className="p-6 rounded-3xl bg-white border border-red-100 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-red-500 to-amber-500" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full">
                    Priority Score: {gap.priorityScore}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Demand: {gap.industryDemand}%
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{gap.skillName}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{gap.reason}</p>

                {/* Level Comparison */}
                <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Current: {gap.currentLevel}%</span>
                    <span className="text-indigo-600">Target: {gap.targetLevel}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-indigo-600 rounded-full"
                      style={{ width: `${gap.currentLevel}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-right font-bold text-amber-600">
                    Gap: {gap.gapSize}% to bridge
                  </div>
                </div>
              </div>

              <Link
                to="/learning-path"
                className="mt-5 w-full text-center py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Start Learning Module</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 2. DEVELOPING SKILLS */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-500" />
          <span>Developing Skills (Intermediate Foundation)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {developingSkills.map((sk: any) => (
            <div key={sk.skillId} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 text-sm">{sk.skillName}</span>
                <span className="font-bold text-amber-600">{sk.level}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${sk.level}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Category: {sk.category}</span>
                <span>Demand: {sk.industryDemand}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. STRONG SKILLS */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>Strong Core Skills (Verified Foundation)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {strongSkills.map((sk: any) => (
            <div key={sk.skillId} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">{sk.skillName}</span>
                <span className="font-extrabold text-emerald-600">{sk.level}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${sk.level}%` }} />
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold block">✓ Industry Ready</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
