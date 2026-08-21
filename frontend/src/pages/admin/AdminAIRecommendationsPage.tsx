import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  Sliders, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Layers, 
  Activity, 
  RefreshCw, 
  ShieldCheck,
  Percent,
  SlidersHorizontal,
  Bot
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  AreaChart, 
  Area 
} from 'recharts';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { AISettings } from '../../types';

export const AdminAIRecommendationsPage: React.FC = () => {
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
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

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
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleSaveWeights = async () => {
    setIsSaving(true);
    await api.updateAdminAISettings(weights);
    setIsSaving(false);
    showToast('AI Recommendation weights updated and synchronized across all live matching services!');
  };

  const performanceTrends = [
    { month: 'Sep', accuracy: 82.4, acceptance: 65.1, conversion: 28.2 },
    { month: 'Oct', accuracy: 84.8, acceptance: 68.4, conversion: 31.5 },
    { month: 'Nov', accuracy: 86.2, acceptance: 71.0, conversion: 34.0 },
    { month: 'Dec', accuracy: 87.5, acceptance: 69.8, conversion: 33.2 },
    { month: 'Jan', accuracy: 88.9, acceptance: 73.5, conversion: 37.1 },
    { month: 'Feb', accuracy: 89.5, acceptance: 74.2, conversion: 38.6 }
  ];

  const totalWeight = weights.skillsWeight + weights.interestWeight + weights.educationWeight + weights.experienceWeight;

  return (
    <AdminLayout
      pageTitle="AI Recommendation Engine"
      pageSubtitle="Monitor neural matching performance, tune explainable 4-factor scoring weights, and inspect recommendation pipelines."
      actionButton={
        <button
          onClick={handleSaveWeights}
          disabled={isSaving}
          className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isSaving ? 'Recalculating...' : 'Save & Retune Engine'}</span>
        </button>
      }
    >
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="p-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* 🤖 4 TOP AI METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border border-indigo-500/30 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Recommendations Generated</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/30 text-indigo-300 flex items-center justify-center border border-indigo-400/30">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-white tracking-tight">45,820</h3>
              <p className="text-[11px] font-bold text-emerald-300 mt-1 flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>Groq LLaMA 3.3 Versatile</span>
              </p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Average Match Accuracy</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">89.5%</h3>
              <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">↑ 2.4% precision lift</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">High Match Recommendations</span>
              <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">12,540</h3>
              <p className="text-[11px] font-bold text-sky-600 dark:text-sky-400 mt-1">&gt;85% compatibility score</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Students Without Match</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">340</h3>
              <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mt-1">Auto-assigned learning path</p>
            </div>
          </div>

        </div>

        {/* 🎛️ AI EXPLAINABILITY & WEIGHT TUNER PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Formula Weight Sliders */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
                  <span>Recommendation Score Formula Weights</span>
                </h3>
                <p className="text-[11px] text-slate-400">Total weight must equal 100% (Current: {totalWeight}%)</p>
              </div>

              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                totalWeight === 100 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              }`}>
                {totalWeight === 100 ? 'Balanced' : 'Unbalanced'}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Skills Match Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-800 dark:text-slate-200">1. Skills Match (Required & Verified Proficiencies)</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{weights.skillsWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={70}
                  value={weights.skillsWeight}
                  onChange={e => setWeights({ ...weights, skillsWeight: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Sector Alignment Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-800 dark:text-slate-200">2. Career Interest & Domain Sector Match</span>
                  <span className="text-sky-600 dark:text-sky-400 font-extrabold">{weights.interestWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  value={weights.interestWeight}
                  onChange={e => setWeights({ ...weights, interestWeight: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              {/* Education Match Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-800 dark:text-slate-200">3. Education & Degree Eligibility Match</span>
                  <span className="text-purple-600 dark:text-purple-400 font-extrabold">{weights.educationWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={40}
                  value={weights.educationWeight}
                  onChange={e => setWeights({ ...weights, educationWeight: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Experience Match Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-800 dark:text-slate-200">4. Past Projects & Experience Match</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{weights.experienceWeight}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  value={weights.experienceWeight}
                  onChange={e => setWeights({ ...weights, experienceWeight: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

            </div>

            <button
              onClick={handleSaveWeights}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30"
            >
              Apply Weight Distribution
            </button>
          </div>

          {/* AI Recommendation Preview Pipeline */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-purple-500" />
                  <span>Recommendation Pipeline Architecture</span>
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Live Neural Ingestion
                </span>
              </div>

              {/* 5-Step Pipeline Flow */}
              <div className="space-y-2 mt-3 text-xs">
                {[
                  { step: '1. Student Profile Ingestion', desc: 'Verified skills, CGPA, courses, target roles, preferred modes.', color: 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40' },
                  { step: '2. Skill Gap & Vector Embeddings', desc: 'Maps verified competencies against 1,250 live internship taxonomies.', color: 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40' },
                  { step: '3. 4-Factor Compatibility Calculation', desc: 'Applies 40/30/20/10 weighted formula with selection probability.', color: 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/40' },
                  { step: '4. Ranking & Selection Probability Filter', desc: 'Ranks top 10 matches with Explainable AI reasoning chips.', color: 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40' },
                  { step: '5. Student Dashboard Presentation', desc: 'Displays 91% TechNova, 87% CodeCraft with 1-click Quick Apply.', color: 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/40' }
                ].map((p, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl border-l-4 ${p.color} border-slate-200 dark:border-slate-800`}>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-[11px]">{p.step}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 📊 AI PERFORMANCE ACCURACY OVER TIME */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>AI Matching Accuracy, Acceptance Rate & Conversion History</span>
            </h3>
            <p className="text-xs text-slate-400">Evaluating Groq LLaMA-3.3 neural recommendation precision across 6 months</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorAccept" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    borderColor: '#1E293B', 
                    borderRadius: '12px', 
                    color: '#FFF',
                    fontSize: '12px' 
                  }} 
                />
                <Area type="monotone" dataKey="accuracy" name="Match Accuracy %" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAcc)" />
                <Area type="monotone" dataKey="acceptance" name="Student Acceptance %" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAccept)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
