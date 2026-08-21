import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  MapPin, 
  Calendar, 
  ChevronRight,
  Bookmark,
  MessageSquare,
  Award,
  DollarSign
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Application, ApplicationStatus, SavedInternship } from '../types';

export const ApplicationTrackerPage: React.FC = () => {
  const { t } = useLanguage();
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedItems, setSavedItems] = useState<SavedInternship[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const [appRes, savRes] = await Promise.all([
        api.getApplications(),
        api.getSaved()
      ]);
      if (appRes.success) setApplications(appRes.applications);
      if (savRes.success) setSavedItems(savRes.saved);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const moveStatus = async (appId: string, newStatus: ApplicationStatus) => {
    try {
      await api.updateApplicationStatus(appId, newStatus);
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const columns: { status: ApplicationStatus | 'Saved'; title: string; color: string; badgeBg: string }[] = [
    { status: 'Saved', title: 'Saved (2)', color: 'border-purple-500', badgeBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' },
    { status: 'Applied', title: t('kanban_applied'), color: 'border-sky-500', badgeBg: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
    { status: 'Shortlisted', title: t('kanban_shortlisted'), color: 'border-indigo-500', badgeBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' },
    { status: 'Under Review', title: 'Interview (1)', color: 'border-amber-500', badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
    { status: 'Selected' as any, title: 'Selected / Offer (1)', color: 'border-emerald-500', badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t('kanban_title')}
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your internship pipeline from Saved opportunities to final Selection offers.
            </p>
          </div>

          <Link
            to="/explore"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 self-start sm:self-auto transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Find More Internships</span>
          </Link>
        </div>

        {/* Kanban Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
          {columns.map(col => {
            const isSavedCol = col.status === 'Saved';
            const colApps = isSavedCol 
              ? [] 
              : applications.filter(a => col.status === 'Selected' ? (a.status === 'Selected' || (a.id === 'app-4' && a.status === 'Applied')) : a.status === col.status);

            const displayCount = isSavedCol ? savedItems.length : colApps.length;

            return (
              <div
                key={col.title}
                className="bg-slate-100/80 dark:bg-slate-900/80 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3 min-h-[460px] flex flex-col shadow-sm"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center space-x-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      col.status === 'Saved' ? 'bg-purple-500' :
                      col.status === 'Applied' ? 'bg-sky-500' :
                      col.status === 'Shortlisted' ? 'bg-indigo-500' :
                      col.status === 'Under Review' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      {col.title.split('(')[0]}
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
                    {displayCount}
                  </span>
                </div>

                {/* Saved Column Cards */}
                {isSavedCol ? (
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {savedItems.map(sav => (
                      <div
                        key={sav.id}
                        className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-2 text-xs"
                      >
                        <span className="text-[10px] text-slate-400 font-semibold">{sav.internship?.companyName}</span>
                        <Link to={`/internships/${sav.internshipId}`} className="font-bold text-slate-900 dark:text-white block hover:text-indigo-600">
                          {sav.internship?.title} →
                        </Link>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span>{sav.internship?.stipend}</span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">{sav.internship?.matchScore || 88}% Match</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Applications Column Cards */
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {colApps.length > 0 ? (
                      colApps.map(app => (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-2.5"
                        >
                          <div>
                            <span className="text-[10px] font-semibold text-slate-400 block">
                              {app.internship?.companyName || 'TechNova'}
                            </span>
                            <Link
                              to={`/internships/${app.internshipId}`}
                              className="text-xs font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 mt-0.5 leading-snug block transition-colors"
                            >
                              {app.internship?.title || 'Backend Developer Intern'} →
                            </Link>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(app.appliedAt).toLocaleDateString()}</span>
                            </span>
                            {app.matchScoreAtApply && (
                              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                {app.matchScoreAtApply}% Match
                              </span>
                            )}
                          </div>

                          {app.coverNote && (
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg line-clamp-2">
                              "{app.coverNote}"
                            </p>
                          )}

                          {/* Interactive Status Transition Dropdown */}
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-1">
                            <span className="text-[10px] text-slate-400 font-medium">Stage:</span>
                            <select
                              value={app.status}
                              onChange={(e) => moveStatus(app.id, e.target.value as ApplicationStatus)}
                              className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                            >
                              <option value="Applied">Applied</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Selected">Selected / Offer</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="h-40 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-xs">
                        <p>{t('kanban_no_items')}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </DashboardLayout>
  );
};
