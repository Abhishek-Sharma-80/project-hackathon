import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Sparkles, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  DollarSign, 
  Users, 
  ExternalLink 
} from 'lucide-react';
import { Internship, RecommendationBreakdown } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';

interface InternshipCardProps {
  internship: Internship;
  breakdown?: RecommendationBreakdown | null;
  onOpenBreakdown?: (internship: Internship, breakdown: RecommendationBreakdown) => void;
  onApply?: (internship: Internship) => void;
  onBookmarkChange?: () => void;
  isSavedInitial?: boolean;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({
  internship,
  breakdown,
  onOpenBreakdown,
  onApply,
  onBookmarkChange,
  isSavedInitial = false
}) => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [isSaved, setIsSaved] = useState(isSavedInitial);
  const [isSaving, setIsSaving] = useState(false);

  const effectiveBreakdown = breakdown || internship.breakdown;
  const matchScore = effectiveBreakdown?.finalMatchScore || internship.matchScore;
  const probability = effectiveBreakdown?.probabilityLevel || internship.probabilityLevel;
  const matchedSkills = effectiveBreakdown?.matchedSkills || [];
  const missingSkills = effectiveBreakdown?.missingSkills || [];

  const toggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please log in to save internships.');
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        await api.removeSaved(internship.id);
        setIsSaved(false);
      } else {
        await api.saveInternship(internship.id);
        setIsSaved(true);
      }
      if (onBookmarkChange) onBookmarkChange();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700/80 transition-all flex flex-col justify-between relative group"
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          
          {/* Company & Title */}
          <div className="flex items-start space-x-3 min-w-0">
            <img
              src={internship.companyLogo || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop&crop=faces&q=80'}
              alt={internship.companyName}
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {internship.companyName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                  {internship.sector}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate mt-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {internship.title}
              </h3>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={toggleSave}
            disabled={isSaving}
            className={`p-2 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-500'
                : 'border-slate-200 dark:border-slate-700/70 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save internship'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Badges Info (Work Mode, Location, Duration, Stipend) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 font-medium">
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            <span>{internship.location}</span>
          </span>
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
            internship.workMode === 'Remote'
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              : internship.workMode === 'Hybrid'
              ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300'
              : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
          }`}>
            {internship.workMode}
          </span>
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{internship.duration}</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold">
            {internship.stipend}
          </span>
        </div>

        {/* AI Match Gauge & Probability (if available) */}
        {matchScore !== undefined && matchScore !== null && (
          <div className="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t('rec_match_score')}:
                </span>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                  {matchScore}%
                </span>
              </div>

              {probability && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  probability === 'High'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : probability === 'Medium'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {probability} Chance
                </span>
              )}
            </div>

            {/* Score Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${matchScore}%` }}
                transition={{ duration: 0.6 }}
                className={`h-full rounded-full ${
                  matchScore >= 80 ? 'bg-gradient-to-r from-indigo-600 to-emerald-500' :
                  matchScore >= 60 ? 'bg-gradient-to-r from-indigo-500 to-sky-400' : 'bg-slate-400'
                }`}
              />
            </div>
          </div>
        )}

        {/* Matched / Missing Skills Badges */}
        <div className="space-y-2 mb-4">
          {matchedSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Matched:</span>
              {matchedSkills.slice(0, 4).map((s, i) => (
                <span key={i} className="px-2 py-0.5 text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-md">
                  ✓ {s}
                </span>
              ))}
              {matchedSkills.length > 4 && (
                <span className="text-[10px] text-slate-400">+{matchedSkills.length - 4} more</span>
              )}
            </div>
          )}

          {missingSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Missing:</span>
              {missingSkills.slice(0, 3).map((s, i) => (
                <span key={i} className="px-2 py-0.5 text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-md">
                  • {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        {effectiveBreakdown && onOpenBreakdown ? (
          <button
            onClick={() => onOpenBreakdown(internship, effectiveBreakdown)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center space-x-1"
          >
            <span>{t('dash_why_match')}</span>
            <Sparkles className="w-3 h-3" />
          </button>
        ) : (
          <span className="text-[11px] text-slate-400">
            {internship.openings} opening{internship.openings > 1 ? 's' : ''}
          </span>
        )}

        <div className="flex items-center space-x-1.5">
          <Link
            to={`/internships/${internship.id}`}
            className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Details
          </Link>
          {onApply && (
            <button
              onClick={() => onApply(internship)}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              {t('dash_apply_now')}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
