import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  CheckCheck, 
  Users, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Filter, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { AdminNotification } from '../../types';

export const AdminNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminNotifications();
      if (res.success) {
        setNotifications(res.notifications);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleMarkRead = async (id: string) => {
    await api.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = async () => {
    await api.markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const types = ['All', 'student', 'company', 'approval', 'risk', 'system'];

  const filteredNotifications = notifications.filter(n => filterType === 'All' || n.type === filterType);

  const getIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'student': return <Users className="w-4 h-4 text-indigo-500" />;
      case 'company': return <Building2 className="w-4 h-4 text-sky-500" />;
      case 'approval': return <ShieldCheck className="w-4 h-4 text-purple-500" />;
      case 'risk': return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'system': return <Sparkles className="w-4 h-4 text-emerald-500" />;
      default: return <Bell className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <AdminLayout
      pageTitle="Administrative Notification Center"
      pageSubtitle="Real-time system events, corporate job postings, student cohort onboarding, and AI alerts."
      actionButton={
        <button
          onClick={handleMarkAllRead}
          className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm flex items-center space-x-1.5"
        >
          <CheckCheck className="w-4 h-4 text-indigo-500" />
          <span>Mark All as Read</span>
        </button>
      }
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="p-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* 🔍 FILTER BUTTONS */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
          {types.map(tp => (
            <button
              key={tp}
              onClick={() => setFilterType(tp)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold capitalize transition-all shrink-0 ${
                filterType === tp
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600'
              }`}
            >
              {tp === 'All' ? 'All Alerts' : `${tp} Alerts`}
            </button>
          ))}
        </div>

        {/* 🔔 NOTIFICATIONS LIST */}
        <div className="space-y-3">
          {filteredNotifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => handleMarkRead(notif.id)}
              className={`p-4 rounded-3xl border transition-all flex items-start justify-between gap-4 cursor-pointer group ${
                !notif.read
                  ? 'bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-800 shadow-sm'
                  : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800 opacity-80'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700/60 mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 animate-pulse"></span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {notif.description}
                  </p>

                  <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-semibold pt-1">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{notif.time}</span>
                    </span>
                    <span className="capitalize font-bold text-indigo-500">• {notif.type} alert</span>
                  </div>
                </div>
              </div>

              {notif.link && (
                <Link
                  to={notif.link}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold transition-all shrink-0 flex items-center space-x-1 self-center"
                >
                  <span>Action</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
};
