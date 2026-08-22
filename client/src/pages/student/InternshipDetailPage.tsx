import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { internshipApi, applicationApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import {
  Sparkles,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const InternshipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await internshipApi.getInternshipById(id);
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleApply = async () => {
    try {
      if (id) {
        await applicationApi.createApplication({ internshipId: id, status: 'APPLIED' });
        setApplied(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveToggle = async () => {
    try {
      if (id) {
        await applicationApi.createApplication({ internshipId: id, status: 'SAVED' });
        setSaved(!saved);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading position details and real-time eligibility matrix..." />;
  }

  const { internship, matchAnalysis } = data || {};
  const { matchScore = 75, matchingSkills = [], missingSkills = [] } = matchAnalysis || {};

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700">
              {internship?.careerCategory} Track
            </span>
            <span className="text-xs text-slate-400 font-semibold">{internship?.workMode}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {internship?.title}
          </h1>
          <p className="text-sm font-bold text-indigo-600 flex items-center gap-1.5">
            <Building2 className="w-4 h-4" /> {internship?.company?.name} • {internship?.location}
          </p>
        </div>

        {/* Quick CTA Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveToggle}
            className={`p-3 rounded-2xl border transition ${
              saved ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {saved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
          <button
            onClick={handleApply}
            disabled={applied}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm transition shadow-md ${
              applied
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-95'
            }`}
          >
            {applied ? 'Application Submitted ✓' : 'Apply for Role'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Left: Role Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Role Overview</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{internship?.description}</p>
            </div>

            {internship?.responsibilities && (
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Core Responsibilities</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{internship.responsibilities}</p>
              </div>
            )}

            {internship?.eligibility && (
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Candidate Eligibility</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{internship.eligibility}</p>
              </div>
            )}

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">Required Technical Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {internship?.requiredSkills?.map((req: any) => (
                  <span
                    key={req.id}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {req.skill?.name} (Required Level: {req.requiredLevel}%)
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: SmartEdu AI Match Analysis */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-indigo-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Your Match Analysis
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-400 text-slate-900">
                {matchScore}% Match
              </span>
            </div>

            {/* Strengths */}
            <div>
              <span className="text-xs font-bold text-emerald-400 block mb-2">Your Strengths:</span>
              <div className="space-y-1.5">
                {matchingSkills.length > 0 ? (
                  matchingSkills.map((s: string) => (
                    <div key={s} className="flex items-center gap-1.5 text-xs text-indigo-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{s} (Meets Requirement)</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">Add skills to profile for full analysis.</span>
                )}
              </div>
            </div>

            {/* Priority Gaps */}
            <div>
              <span className="text-xs font-bold text-amber-400 block mb-2">Priority Gaps:</span>
              <div className="space-y-1.5">
                {missingSkills.length > 0 ? (
                  missingSkills.map((s: string) => (
                    <div key={s} className="flex items-center gap-1.5 text-xs text-amber-200">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{s} (Gap to bridge)</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">All core prerequisites are currently satisfied!</span>
                )}
              </div>
            </div>

            <Link
              to="/learning-path"
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-slate-900 font-bold text-xs transition shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>Improve My Match via Roadmap</span>
            </Link>
          </div>

          {/* Quick Details Box */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Monthly Stipend</span>
              <span className="font-bold text-slate-800">{internship?.stipend}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Duration</span>
              <span className="font-bold text-slate-800">{internship?.duration}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Application Deadline</span>
              <span className="font-bold text-slate-800">{internship?.deadline || 'Rolling basis'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
