import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  SlidersHorizontal, 
  Filter, 
  RefreshCw, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase 
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { InternshipCard } from '../components/internships/InternshipCard';
import { MatchBreakdownModal } from '../components/dashboard/MatchBreakdownModal';
import { QuickApplyModal } from '../components/dashboard/QuickApplyModal';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Internship, RecommendationBreakdown } from '../types';

export const RecommendationsPage: React.FC = () => {
  const { t } = useLanguage();
  const [recommendations, setRecommendations] = useState<{ internship: Internship; breakdown: RecommendationBreakdown }[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectorFilter, setSectorFilter] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');
  const [selectedBreakdown, setSelectedBreakdown] = useState<{ internship: Internship; breakdown: RecommendationBreakdown } | null>(null);
  const [applyModalIntern, setApplyModalIntern] = useState<Internship | null>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await api.getRecommendations(8);
      if (res.success) {
        setRecommendations(res.recommendations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const filteredRecs = recommendations.filter(rec => {
    if (sectorFilter !== 'All' && rec.internship.sector !== sectorFilter) return false;
    if (modeFilter !== 'All' && rec.internship.workMode !== modeFilter) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {t('rec_title')}
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
              {t('rec_subtitle')}
            </p>
          </div>

          <button
            onClick={fetchRecommendations}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-1.5 self-start sm:self-auto shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Recalculate AI Matches</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-xs">
          <div className="flex items-center space-x-2 text-slate-500 mr-2">
            <Filter className="w-4 h-4 text-indigo-500" />
            <span className="font-bold">Filters:</span>
          </div>

          {/* Sector Filter */}
          <select
            value={sectorFilter}
            onChange={e => setSectorFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <option value="All">All Sectors</option>
            <option value="Software Development">Software Development</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Data Science">Data Science</option>
            <option value="Design">UI/UX Design</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>

          {/* Work Mode Filter */}
          <select
            value={modeFilter}
            onChange={e => setModeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <option value="All">All Work Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          <span className="text-[11px] text-slate-400 ml-auto font-medium">
            Showing {filteredRecs.length} top recommendations
          </span>
        </div>

        {/* Recommendations Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filteredRecs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecs.map(rec => (
              <InternshipCard
                key={rec.internship.id}
                internship={rec.internship}
                breakdown={rec.breakdown}
                onOpenBreakdown={(internship, breakdown) => setSelectedBreakdown({ internship, breakdown })}
                onApply={(internship) => setApplyModalIntern(internship)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Matching Internships Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your sector or work mode filters above to see more opportunities.
            </p>
          </div>
        )}

      </div>

      {/* Explainable AI Modal */}
      {selectedBreakdown && (
        <MatchBreakdownModal
          isOpen={!!selectedBreakdown}
          onClose={() => setSelectedBreakdown(null)}
          internship={selectedBreakdown.internship}
          breakdown={selectedBreakdown.breakdown}
          onApply={() => {
            setApplyModalIntern(selectedBreakdown.internship);
            setSelectedBreakdown(null);
          }}
        />
      )}

      {/* Quick Apply Modal */}
      {applyModalIntern && (
        <QuickApplyModal
          isOpen={!!applyModalIntern}
          onClose={() => setApplyModalIntern(null)}
          internship={applyModalIntern}
        />
      )}
    </DashboardLayout>
  );
};
