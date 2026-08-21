import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileCheck2, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Users, 
  Sparkles, 
  Calendar, 
  Building2, 
  Briefcase, 
  ChevronRight, 
  Download,
  AlertCircle,
  Eye
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { Application, ApplicationStatus } from '../../types';

export const AdminApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const res = await api.getAllApplicationsAdmin();
      if (res.success) {
        setApplications(res.applications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleUpdateStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    showToast(`Application moved to ${newStatus}.`);
  };

  const statusCards = [
    { label: 'Applied', count: '12,450', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/60', border: 'border-indigo-200/80 dark:border-indigo-900/60' },
    { label: 'Shortlisted', count: '4,820', color: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-950/60', border: 'border-sky-200/80 dark:border-sky-900/60' },
    { label: 'Interview', count: '1,250', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/60', border: 'border-purple-200/80 dark:border-purple-900/60' },
    { label: 'Selected', count: '620', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/60', border: 'border-emerald-200/80 dark:border-emerald-900/60' },
    { label: 'Rejected', count: '3,200', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/60', border: 'border-rose-200/80 dark:border-rose-900/60' }
  ];

  const filteredApplications = applications.filter(app => {
    const matchSearch = (app.internship?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.internship?.company || app.internship?.companyName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout
      pageTitle="Application Management"
      pageSubtitle="Track 24,560 student internship submissions, screening velocity, and candidate status conversions."
      actionButton={
        <button
          onClick={() => showToast('Application Funnel CSV Report exported.')}
          className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm flex items-center space-x-1.5"
        >
          <Download className="w-3.5 h-3.5 text-indigo-500" />
          <span>Export Funnel CSV</span>
        </button>
      }
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="p-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* 📊 STATUS SUMMARY CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statusCards.map(card => (
            <div
              key={card.label}
              onClick={() => setStatusFilter(card.label === 'Applied' ? 'Applied' : card.label === 'Shortlisted' ? 'Shortlisted' : card.label === 'Interview' ? 'Under Review' : card.label === 'Selected' ? 'Selected' : 'Rejected')}
              className={`p-4 rounded-3xl bg-white dark:bg-slate-900 border ${card.border} shadow-sm cursor-pointer hover:shadow-md transition-all text-center group`}
            >
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">{card.label}</span>
              <h3 className={`text-2xl font-black ${card.color} mt-1`}>{card.count}</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Click to filter</p>
            </div>
          ))}
        </div>

        {/* 🔍 SEARCH AND FILTERS */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by role or company..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="w-full sm:w-56">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Application Stages</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Selected">Selected / Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* 📋 APPLICATION DATA TABLE */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Applicant Student</th>
                  <th className="py-3.5 px-4">Target Role & Company</th>
                  <th className="py-3.5 px-4 text-center">AI Match Score</th>
                  <th className="py-3.5 px-4 text-center">Applied Date</th>
                  <th className="py-3.5 px-4 text-center">Current Status</th>
                  <th className="py-3.5 px-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredApplications.map(app => {
                  const matchScore = app.internship?.matchScore || 91;
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      
                      {/* Student */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-black border border-slate-200 dark:border-slate-700 shrink-0">
                            {(app.studentName || 'ST').split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-900 dark:text-white">{app.studentName || 'Student'}</p>
                            <p className="text-[10px] text-slate-400">{app.studentCollege || 'University'} {app.studentBranch ? `(${app.studentBranch})` : ''}</p>
                          </div>
                        </div>
                      </td>

                      {/* Internship & Company */}
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{app.internship?.title || 'Backend Developer Intern'}</p>
                        <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">{app.internship?.company || app.internship?.companyName || 'TechNova'}</p>
                      </td>

                      {/* AI Match Score */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-[11px]">
                          {matchScore}% Match
                        </span>
                      </td>

                      {/* Applied Date */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                          {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'Feb 15, 2025'}
                        </span>
                      </td>

                      {/* Current Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          app.status === 'Selected'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : app.status === 'Shortlisted'
                            ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                            : app.status === 'Under Review'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                            : app.status === 'Applied'
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {app.status}
                        </span>
                      </td>

                      {/* Update Action */}
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={app.status}
                          onChange={e => handleUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
