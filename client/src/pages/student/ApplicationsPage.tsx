import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { applicationApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import {
  Kanban,
  List,
  Sparkles,
  Building2,
  Calendar,
  MoreVertical,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';

export const ApplicationsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const columns = [
    { id: 'SAVED', title: 'Saved', color: 'border-slate-300 bg-slate-50/50 text-slate-700' },
    { id: 'APPLIED', title: 'Applied', color: 'border-indigo-300 bg-indigo-50/40 text-indigo-700' },
    { id: 'SHORTLISTED', title: 'Shortlisted', color: 'border-blue-300 bg-blue-50/40 text-blue-700' },
    { id: 'INTERVIEW', title: 'Interview', color: 'border-amber-300 bg-amber-50/40 text-amber-700' },
    { id: 'SELECTED', title: 'Offer Received', color: 'border-emerald-300 bg-emerald-50/40 text-emerald-700' },
  ];

  const fetchApps = async () => {
    try {
      setLoading(true);
      const res = await applicationApi.getApplications();
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      // Optimistic update
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      );
      await applicationApi.updateStatus(appId, { status: newStatus });
    } catch (err) {
      console.error(err);
      fetchApps();
    }
  };

  const handleDelete = async (appId: string) => {
    try {
      setApplications((prev) => prev.filter((a) => a.id !== appId));
      await applicationApi.deleteApplication(appId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading candidate application tracking stages..." />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header & View Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Career Pipeline
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Application Tracker
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and track your active internship applications across all recruitment stages.
          </p>
        </div>

        <div className="flex p-1 rounded-2xl bg-white border border-slate-200 shadow-sm self-start sm:self-auto">
          <button
            onClick={() => setViewMode('kanban')}
            className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'kanban' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List View</span>
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colApps = applications.filter((a) => a.status === col.id);
            return (
              <div
                key={col.id}
                className="flex flex-col bg-slate-100/70 p-3.5 rounded-3xl border border-slate-200/80 min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-2 py-1.5 mb-3">
                  <span className="text-xs font-bold text-slate-800">{col.title}</span>
                  <span className="text-xs font-black font-mono px-2 py-0.5 rounded-full bg-white text-slate-700 shadow-xs">
                    {colApps.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-50 text-emerald-700">
                          {app.matchScore}% Match
                        </span>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                          title="Remove application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {app.internship?.title}
                        </h4>
                        <p className="text-[11px] font-semibold text-indigo-600 mt-0.5">
                          {app.internship?.company?.name}
                        </p>
                      </div>

                      {app.notes && (
                        <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100 leading-tight">
                          {app.notes}
                        </p>
                      )}

                      {/* Quick stage selector */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400">Move stage:</span>
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="text-[10px] font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none"
                        >
                          {columns.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))}
                          <option value="REJECTED">Rejected</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  {colApps.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-[11px] font-medium text-slate-400">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Internship Role & Company</th>
                <th className="p-4">AI Match</th>
                <th className="p-4">Current Stage</th>
                <th className="p-4">Notes</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{app.internship?.title}</div>
                    <div className="text-indigo-600 font-semibold">{app.internship?.company?.name}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-600">{app.matchScore}%</td>
                  <td className="p-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1"
                    >
                      {columns.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                  <td className="p-4 text-slate-500 max-w-xs truncate">{app.notes || '—'}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
