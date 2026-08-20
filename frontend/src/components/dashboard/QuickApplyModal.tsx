import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Building2, MapPin, CheckCircle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Internship } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface QuickApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship: Internship | null;
  onSuccess?: () => void;
}

export const QuickApplyModal: React.FC<QuickApplyModalProps> = ({
  isOpen,
  onClose,
  internship,
  onSuccess
}) => {
  const { user, profile } = useAuth();
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !internship) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.applyInternship(
        internship.id,
        coverNote || `I am excited to apply for the ${internship.title} role at ${internship.companyName}.`,
        internship.matchScore || 85
      );

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSuccess(true);
      if (onSuccess) onSuccess();

      setTimeout(() => {
        setIsSuccess(false);
        setCoverNote('');
        onClose();
      }, 1600);
    } catch (err: any) {
      alert(err.message || 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 p-6"
        >
          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Application Submitted!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Your profile has been forwarded to {internship.companyName}. You can track this under Application Tracker.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    1-Click Application
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{internship.title}</h3>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                    <span>{internship.companyName}</span>
                    <span>•</span>
                    <span>{internship.location} ({internship.workMode})</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Applicant Snapshot */}
              <div className="my-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Applying as</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{user?.name}</span>
                  <span className="text-slate-400 block text-[10px]">{profile?.college || 'Student Profile'}</span>
                </div>
                {internship.matchScore && (
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">AI Match Score</span>
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">
                      {internship.matchScore}%
                    </span>
                  </div>
                )}
              </div>

              {/* Cover Note Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Short Cover Note / Portfolio Link (Optional)
                  </label>
                  <textarea
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    rows={3}
                    placeholder="Highlight your relevant projects or why you're a great fit for this internship..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
