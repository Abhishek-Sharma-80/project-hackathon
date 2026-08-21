import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Sparkles, 
  ShieldCheck, 
  Bell, 
  Globe, 
  Key, 
  Smartphone, 
  CheckCircle2, 
  Lock, 
  Sliders, 
  SlidersHorizontal,
  Save
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { AISettings } from '../../types';

export const AdminSettingsPage: React.FC = () => {
  const [platformName, setPlatformName] = useState('InternDisha – AI-Powered Internship Platform');
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST)');
  
  // Notification Toggles
  const [notifToggles, setNotifToggles] = useState({
    studentRegistration: true,
    newInternship: true,
    applicationAlerts: true,
    aiAlerts: true,
    systemNotifications: false
  });

  // AI Recommendation Weights
  const [weights, setWeights] = useState<AISettings>({
    skillsWeight: 40,
    interestWeight: 30,
    educationWeight: 20,
    experienceWeight: 10,
    thresholdMatchScore: 65,
    autoRecommendationEnabled: true,
    modelProvider: 'Groq LLaMA-3.3 Versatile (70B)',
    highMatchCutoff: 85
  });

  const [toastMsg, setToastMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'ai' | 'notifications' | 'security'>('general');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await api.getAdminAISettings();
      if (res.success) {
        setWeights(res.settings);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateAdminAISettings(weights);
    showToast('Platform settings and AI parameters updated successfully.');
  };

  return (
    <AdminLayout
      pageTitle="Platform Settings"
      pageSubtitle="Configure enterprise system preferences, AI weights, automated alert triggers, and security controls."
      actionButton={
        <button
          onClick={handleSaveAll}
          className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
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

        {/* 📑 SETTINGS TABS */}
        <div className="flex items-center space-x-2 border-b border-slate-200/80 dark:border-slate-800 pb-2">
          {[
            { key: 'general' as const, label: 'General Settings', icon: Globe },
            { key: 'ai' as const, label: 'AI Recommendation Weights', icon: Sparkles },
            { key: 'notifications' as const, label: 'Alert Preferences', icon: Bell },
            { key: 'security' as const, label: 'Security & 2FA', icon: Lock }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 🌐 1. GENERAL SETTINGS */}
        {activeTab === 'general' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Platform Identity & Localization</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Platform Name</label>
                <input
                  type="text"
                  value={platformName}
                  onChange={e => setPlatformName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Default UI Language</label>
                <select
                  value={defaultLanguage}
                  onChange={e => setDefaultLanguage(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                  <option value="Bengali">বাংলা (Bengali)</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Telugu">తెలుగు (Telugu)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Institutional Timezone</label>
                <select
                  value={timezone}
                  onChange={e => setTimezone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST - UTC+5:30)</option>
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">AI Inference Engine</label>
                <input
                  type="text"
                  readOnly
                  value="Groq LLaMA-3.3 Versatile (70B) • Ultra-Fast"
                  className="w-full p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-mono font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* 🤖 2. AI RECOMMENDATION SETTINGS */}
        {activeTab === 'ai' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
                <span>Explainable 4-Factor Matching Weights</span>
              </h3>
              <p className="text-xs text-slate-400">Total weight: {weights.skillsWeight + weights.interestWeight + weights.educationWeight + weights.experienceWeight}%</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Skills Weight</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{weights.skillsWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={70}
                  value={weights.skillsWeight}
                  onChange={e => setWeights({ ...weights, skillsWeight: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Interest & Domain Alignment Weight</span>
                  <span className="text-sky-600 dark:text-sky-400 font-extrabold">{weights.interestWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  value={weights.interestWeight}
                  onChange={e => setWeights({ ...weights, interestWeight: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-sky-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Education & Eligibility Weight</span>
                  <span className="text-purple-600 dark:text-purple-400 font-extrabold">{weights.educationWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={40}
                  value={weights.educationWeight}
                  onChange={e => setWeights({ ...weights, educationWeight: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-purple-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Experience & Project Match Weight</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{weights.experienceWeight}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  value={weights.experienceWeight}
                  onChange={e => setWeights({ ...weights, experienceWeight: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-emerald-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* 🔔 3. NOTIFICATION SETTINGS */}
        {activeTab === 'notifications' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Automated Alert Triggers</h3>
            
            <div className="space-y-3 text-xs">
              {[
                { key: 'studentRegistration' as const, label: 'New Student Cohort Registration', desc: 'Trigger alerts when batch registrations occur.' },
                { key: 'newInternship' as const, label: 'New Corporate Internship Submissions', desc: 'Notify admin when partner recruiters post listings.' },
                { key: 'applicationAlerts' as const, label: 'Application Funnel Anomalies', desc: 'Alert when a student reaches shortlist or offer status.' },
                { key: 'aiAlerts' as const, label: 'AI Early Warning for At-Risk Students', desc: 'Trigger when student completion score drops below 65%.' },
                { key: 'systemNotifications' as const, label: 'Nightly Cache Maintenance & Database Backups', desc: 'Receive automated server heartbeat logs.' }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div>
                    <p className="font-extrabold text-slate-800 dark:text-slate-200">{item.label}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifToggles[item.key]}
                    onChange={e => setNotifToggles({ ...notifToggles, [item.key]: e.target.checked })}
                    className="w-5 h-5 rounded-lg accent-indigo-600 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔒 4. SECURITY & 2FA */}
        {activeTab === 'security' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5 text-xs">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Administrator Security Controls</h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">Two-Factor Authentication (2FA)</p>
                    <p className="text-[11px] text-slate-400">Enforce TOTP authenticator verification on administrator login.</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-[11px]">
                  Enabled ✓
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Active Administrative Sessions</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Windows 11 (Chrome 122) • Greater Noida, India (Current IP)</span>
                  <span className="font-extrabold text-indigo-500">Active Session</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};
