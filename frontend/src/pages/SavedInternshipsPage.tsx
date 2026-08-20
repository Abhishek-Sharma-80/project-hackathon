import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Sparkles, Trash2, ArrowRight, Search, Briefcase } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { InternshipCard } from '../components/internships/InternshipCard';
import { MatchBreakdownModal } from '../components/dashboard/MatchBreakdownModal';
import { QuickApplyModal } from '../components/dashboard/QuickApplyModal';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { SavedInternship, Internship, RecommendationBreakdown } from '../types';

export const SavedInternshipsPage: React.FC = () => {
  const { t } = useLanguage();
  const [savedList, setSavedList] = useState<SavedInternship[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBreakdown, setSelectedBreakdown] = useState<{ internship: Internship; breakdown: RecommendationBreakdown } | null>(null);
  const [applyModalIntern, setApplyModalIntern] = useState<Internship | null>(null);

  const fetchSaved = async () => {
    setLoading(true);
    try {
      const res = await api.getSaved();
      if (res.success) {
        setSavedList(res.saved);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleRemove = async (internshipId: string) => {
    try {
      await api.removeSaved(internshipId);
      setSavedList(prev => prev.filter(s => s.internshipId !== internshipId));
    } catch (err) {
      alert('Failed to remove bookmark.');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="space-y-1 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30">
              <Bookmark className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t('nav_saved')}
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review and apply to opportunities you bookmarked for later.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : savedList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedList.map(item => {
              if (!item.internship) return null;
              return (
                <InternshipCard
                  key={item.id}
                  internship={item.internship}
                  breakdown={item.internship.breakdown}
                  isSavedInitial={true}
                  onBookmarkChange={fetchSaved}
                  onOpenBreakdown={(internship, breakdown) => setSelectedBreakdown({ internship, breakdown })}
                  onApply={(internship) => setApplyModalIntern(internship)}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 max-w-md mx-auto my-8">
            <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950 text-amber-500 rounded-2xl flex items-center justify-center mx-auto">
              <Bookmark className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('empty_saved_title')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('empty_saved_desc')}
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>{t('btn_explore')}</span>
            </Link>
          </div>
        )}

      </div>

      {/* Explainable Modal */}
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
