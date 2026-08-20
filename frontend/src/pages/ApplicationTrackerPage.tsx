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
  ChevronRight 
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Application, ApplicationStatus } from '../types';

export const ApplicationTrackerPage: React.FC = () => {
  const { t } = useLanguage();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.getApplications();
      if (res.success) {
        setApplications(res.applications);
      }
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

  const columns: { status: ApplicationStatus; title: string; color: string; badgeBg: string }[] = [
    { status: 'Applied', title: t('kanban_applied'), color: 'border-sky-500', badgeBg: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
    { status: 'Under Review', title: t('kanban_under_review'), color: 'border-indigo-500', badgeBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' },
    { status: 'Shortlisted', title: t('kanban_shortlisted'), color: 'border-emerald-500', badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
    { status: 'Rejected', title: t('kanban_rejected'), color: 'border-rose-500', badgeBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="space-y-1 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t('kanban_title')}
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('kanban_subtitle')}
          </p>
        </div>

        {/* Kanban Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {columns.map(col => {
            const colApps = applications.filter(a => a.status === col.status);

            return (
              <div
                key={col.status}
                className="bg-slate-100/70 dark:bg-slate-900/70 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3 min-h-[420px] flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      col.status === 'Applied' ? 'bg-sky-500' :
                      col.status === 'Under Review' ? 'bg-indigo-500' :
                      col.status === 'Shortlisted' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      {col.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
                    {colApps.length}
                  </span>
                </div>

                {/* Column Cards */}
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
                            {app.internship?.companyName || 'Company'}
                          </span>
                          <Link
                            to={`/internships/${app.internshipId}`}
                            className="text-xs font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 mt-0.5 leading-snug block transition-colors"
                          >
                            {app.internship?.title || 'Internship Role'} →
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
                          <span className="text-[10px] text-slate-400 font-medium">Move to:</span>
                          <select
                            value={app.status}
                            onChange={(e) => moveStatus(app.id, e.target.value as ApplicationStatus)}
                            className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Shortlisted">Shortlisted</option>
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
              </div>
            );
          })}
        </div>

      </div>
    </DashboardLayout>
  );
};
