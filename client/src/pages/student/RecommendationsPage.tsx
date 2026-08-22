import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { recommendationApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, Building2, MapPin, DollarSign, Calendar } from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        setLoading(true);
        const res = await recommendationApi.getRecommendations();
        setRecommendations(res.data.recommendations || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  if (loading) {
    return <LoadingScreen message="Computing 6-factor explainable recommendation vectors..." />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
          Explainable AI Intelligence
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
          Your Personalized AI Internship Matches
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Every recommendation is backed by a 6-factor algorithm with transparent skill overlap and roadmap projections.
        </p>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec) => {
          const { internship, matchScore, matchingSkills, missingSkills, potentialMatchAfterLearning } = rec;
          return (
            <div
              key={internship.id}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{matchScore}% Match</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Projected: {potentialMatchAfterLearning}% after roadmap
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{internship.title}</h3>
                <p className="text-xs font-bold text-indigo-600 mt-0.5">{internship.company?.name}</p>

                <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {internship.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {internship.stipend}</span>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {internship.description}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {matchingSkills?.slice(0, 4).map((s: string) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                        {s} ✓
                      </span>
                    ))}
                    {missingSkills?.slice(0, 3).map((s: string) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800">
                        {s} ✕
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <Link
                  to={`/recommendations/${internship.id}`}
                  className="text-center py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>Why This Match?</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to={`/internships/${internship.id}`}
                  className="text-center py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
