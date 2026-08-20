import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Building2, 
  MapPin, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Internship, RecommendationBreakdown } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface MatchBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship: Internship | null;
  breakdown: RecommendationBreakdown | null;
  onApply?: () => void;
}

export const MatchBreakdownModal: React.FC<MatchBreakdownModalProps> = ({
  isOpen,
  onClose,
  internship,
  breakdown,
  onApply
}) => {
  const { t } = useLanguage();

  if (!isOpen || !internship || !breakdown) return null;

  const scoreFactors = [
    {
      name: t('modal_skills_weight'),
      score: breakdown.skillsScore,
      weight: '40%',
      contribution: Math.round(breakdown.skillsScore * 0.40),
      color: 'bg-indigo-600',
      bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/20'
    },
    {
      name: t('modal_sector_weight'),
      score: breakdown.sectorScore,
      weight: '30%',
      contribution: Math.round(breakdown.sectorScore * 0.30),
      color: 'bg-sky-500',
      bgColor: 'bg-sky-500/10 dark:bg-sky-500/20'
    },
    {
      name: t('modal_education_weight'),
      score: breakdown.educationScore,
      weight: '20%',
      contribution: Math.round(breakdown.educationScore * 0.20),
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20'
    },
    {
      name: t('modal_location_weight'),
      score: breakdown.locationScore,
      weight: '10%',
      contribution: Math.round(breakdown.locationScore * 0.10),
      color: 'bg-amber-500',
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/20'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.35 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    Explainable AI Engine
                  </span>
                  <span className="text-xs text-slate-400">{internship.companyName}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {internship.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-200">
            
            {/* Total Score Summary Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-transparent border border-indigo-200/80 dark:border-indigo-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-center px-4 py-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                  <span className="text-2xl font-extrabold">{breakdown.finalMatchScore}%</span>
                  <span className="block text-[10px] uppercase font-bold tracking-wider opacity-90">Total Match</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Overall Compatibility Rating</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Transparent weighted score computed across 4 dimensions.
                  </p>
                </div>
              </div>

              {/* Selection Probability */}
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <ShieldCheck className={`w-4 h-4 ${
                  breakdown.probabilityLevel === 'High' ? 'text-emerald-500' :
                  breakdown.probabilityLevel === 'Medium' ? 'text-amber-500' : 'text-slate-400'
                }`} />
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block leading-none">Selection Chance</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {breakdown.probabilityLevel} ({breakdown.selectionProbability}%)
                  </span>
                </div>
              </div>
            </div>

            {/* 4-Factor Weighted Score Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t('modal_score_formula')}
                </h4>
                <span className="text-[11px] text-indigo-500 font-medium">100% Total Scale</span>
              </div>

              <div className="space-y-3">
                {scoreFactors.map((factor, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">{factor.name}</span>
                      <div className="space-x-1.5">
                        <span className="font-bold text-slate-900 dark:text-white">{factor.score}%</span>
                        <span className="text-[11px] text-slate-400">({factor.contribution} pts)</span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.score}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`h-full rounded-full ${factor.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matched vs Missing Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Matched Skills */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Skills You Have ({breakdown.matchedSkills.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {breakdown.matchedSkills.length > 0 ? (
                    breakdown.matchedSkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 text-[11px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 rounded-md">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">No direct skill matches</span>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
                <div className="flex items-center space-x-1.5 text-amber-700 dark:text-amber-400 text-xs font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>Skills To Improve ({breakdown.missingSkills.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {breakdown.missingSkills.length > 0 ? (
                    breakdown.missingSkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 text-[11px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 rounded-md">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      🎉 You meet 100% of required skills!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Human-Readable Match Reasons */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('modal_human_reasons')}
              </h4>
              <ul className="space-y-1.5">
                {breakdown.reasons.map((r, i) => (
                  <li key={i} className="text-xs flex items-start space-x-2 text-slate-600 dark:text-slate-300">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvement Suggestions */}
            {breakdown.improvementTips.length > 0 && (
              <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{t('modal_tips_title')}</span>
                </div>
                <ul className="space-y-1">
                  {breakdown.improvementTips.map((tip, i) => (
                    <li key={i} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start space-x-1.5">
                      <span className="text-indigo-500">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              {t('modal_close')}
            </button>
            {onApply && (
              <button
                onClick={() => { onClose(); onApply(); }}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/25 flex items-center space-x-1.5 transition-all hover:scale-[1.02]"
              >
                <span>{t('dash_apply_now')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
