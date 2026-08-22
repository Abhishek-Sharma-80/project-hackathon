import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { recommendationApi, applicationApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  MapPin,
  DollarSign,
  TrendingUp,
  BrainCircuit,
  Zap,
  BookOpen,
} from 'lucide-react';

export const ExplainableMatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await recommendationApi.getExplanation(id);
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExplanation();
  }, [id]);

  const handleApply = async () => {
    try {
      if (id) {
        await applicationApi.createApplication({ internshipId: id, status: 'APPLIED' });
        setApplySuccess(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <LoadingScreen message="Unpacking neural weights and explainable match dimensions..." />;
  }

  const { internship, matchAnalysis, studentProfile } = data || {};
  const { matchScore, potentialMatchAfterLearning, explanation, breakdown, skillComparison } = matchAnalysis || {};

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              Explainable AI Intelligence
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-3">
              Why SmartEdu AI Recommends This
            </h1>
            <p className="text-indigo-200 text-sm mt-1">
              {internship?.title} • <span className="font-semibold text-white">{internship?.company?.name}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-right">
              <span className="text-xs text-indigo-200 block font-semibold">Match Score</span>
              <span className="text-3xl font-black font-mono text-emerald-400">{matchScore}%</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* 1. NATURAL LANGUAGE AI EXPLANATION */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
          <BrainCircuit className="w-5 h-5" />
          <span>SmartEdu AI Natural Language Diagnostic</span>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 font-medium">
          "{explanation}"
        </p>

        {/* Projected Readiness Uplift Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-950">Projected Score After Completing Roadmap</h4>
              <p className="text-[11px] text-emerald-700">Closing missing framework gaps unlocks higher placement probability.</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-emerald-700 font-semibold block">Potential Match</span>
            <span className="text-2xl font-black text-emerald-900 font-mono">{potentialMatchAfterLearning}%</span>
          </div>
        </div>
      </div>

      {/* 2. SKILLS REQUIRED BY THIS ROLE (Progress Comparison Visualizer) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
          <span>Skills Required by This Role vs Your Proficiency</span>
          <span className="text-xs font-semibold text-slate-400 font-normal">Candidate: {studentProfile?.name}</span>
        </h3>

        <div className="space-y-3 pt-2">
          {skillComparison?.map((item: any) => {
            const isMet = item.studentLevel >= item.requiredLevel;
            return (
              <div
                key={item.skillName}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 text-sm">{item.skillName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      item.importance === 'REQUIRED' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.importance}
                    </span>
                  </div>
                  <span className={`flex items-center gap-1 ${isMet ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {isMet ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{item.studentLevel}% / Required {item.requiredLevel}%</span>
                  </span>
                </div>

                {/* Progress bar comparison */}
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden relative">
                  {/* Required Target Marker Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                    style={{ left: `${item.requiredLevel}%` }}
                    title={`Required: ${item.requiredLevel}%`}
                  />
                  {/* Current Student Level */}
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isMet ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-indigo-600'
                    }`}
                    style={{ width: `${item.studentLevel}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. 6-FACTOR FORMULA BREAKDOWN */}
      {breakdown && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            6-Factor Deterministic Match Weighting Breakdown
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block">Skill Overlap (40%)</span>
              <span className="text-lg font-black text-slate-900 font-mono">{breakdown.skillOverlapScore}%</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block">Proficiency Depth (20%)</span>
              <span className="text-lg font-black text-slate-900 font-mono">{breakdown.proficiencyScore}%</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block">Career Goal Match (15%)</span>
              <span className="text-lg font-black text-slate-900 font-mono">{breakdown.careerInterestScore}%</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block">Academic CGPA (10%)</span>
              <span className="text-lg font-black text-slate-900 font-mono">{breakdown.academicScore}%</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block">Project Relevance (10%)</span>
              <span className="text-lg font-black text-slate-900 font-mono">{breakdown.projectScore}%</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block">Certifications (5%)</span>
              <span className="text-lg font-black text-slate-900 font-mono">{breakdown.certificationScore}%</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. ACTIONS & NEXT STEPS */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold">Ready to bridge the qualification gap?</h4>
          <p className="text-xs text-slate-400">Follow your personalized roadmap to achieve 97%+ readiness.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to="/learning-path"
            className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-xs shadow-md hover:opacity-95 transition flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Improve My Match</span>
          </Link>
          <button
            onClick={handleApply}
            disabled={applySuccess}
            className={`flex-1 sm:flex-none text-center px-5 py-2.5 rounded-xl font-bold text-xs transition ${
              applySuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-900 hover:bg-slate-100'
            }`}
          >
            {applySuccess ? 'Applied ✓' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
