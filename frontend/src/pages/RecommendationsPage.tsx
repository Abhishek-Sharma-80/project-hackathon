import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  ArrowRight, 
  Send, 
  BookOpen, 
  Share2, 
  Bookmark, 
  Compass,
  FileCheck2,
  TrendingUp,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StitchCard, StitchMatchGauge, StitchBadge, StitchProgressBar } from '../components/stitch/StitchComponents';

export const RecommendationsPage: React.FC = () => {
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  const matchedSkills = [
    { name: 'Java Programming', level: '90% Proficient', matched: true },
    { name: 'SQL & Database Architecture', level: '85% Proficient', matched: true },
    { name: 'Git & GitHub Version Control', level: '80% Proficient', matched: true },
    { name: 'Data Structures & Algorithms', level: '85% Coursework', matched: true }
  ];

  const missingSkills = [
    { name: 'Spring Boot Framework', priority: 'High Priority', gap: '55% current vs 80% req' },
    { name: 'RESTful API Architecture', priority: 'High Priority', gap: '60% current vs 85% req' },
    { name: 'Docker & Containerization', priority: 'Medium Priority', gap: '50% current vs 75% req' }
  ];

  const aiReasons = [
    {
      title: 'Strong Core Language Match',
      desc: 'Strong alignment with Java & SQL requirements from your university coursework and public GitHub projects.'
    },
    {
      title: 'Secondary Automation Alignment',
      desc: 'Your Python scripting knowledge matches secondary preference for internal automation tooling.'
    },
    {
      title: 'REST Architecture Foundation',
      desc: 'You possess a solid base in HTTP and RESTful concepts, though production Spring Boot experience will boost onboarding.'
    },
    {
      title: 'Academic Trajectory & GPA Match',
      desc: 'Your 3.8 GPA in Computer Science matches historical candidate profiles hired by TechNova Solutions.'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto font-sans">
        
        {/* 🌟 1. ROLE HEADER BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-[#070A11] border border-indigo-500/20 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">TechNova Solutions</span>
                <span className="text-slate-500">•</span>
                <StitchBadge label="AI Top Recommendation" variant="success" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Backend Developer Intern</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>San Francisco, CA (Hybrid)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>$45 / hour</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>3 Months (Summer 2026)</span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-3 rounded-2xl border transition-all ${
                  saved ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <button
                onClick={() => setApplied(true)}
                disabled={applied}
                className={`px-6 py-3 rounded-2xl font-extrabold text-xs flex items-center space-x-2 transition-all shadow-xl ${
                  applied
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white shadow-indigo-600/30 hover:scale-105'
                }`}
              >
                {applied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Application Submitted!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Apply with 1-Click Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 🎯 2. SCORE GAUGE & EXPLAINABLE AI BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Circular Score Gauge Card */}
          <StitchCard className="p-6 flex flex-col items-center justify-between text-center space-y-4">
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Algorithmic Fit</span>
              <h3 className="text-base font-extrabold text-white mt-1">Candidate Match Score</h3>
            </div>

            <StitchMatchGauge
              score={91}
              maxScore={100}
              size={150}
              strokeWidth={12}
              label="91% Precision Match"
              subtitle="High Placement Probability"
            />

            <div className="w-full space-y-2 pt-2 border-t border-slate-800 text-xs text-left">
              <div className="flex justify-between text-slate-400">
                <span>Technical Alignment:</span>
                <span className="text-white font-bold">94%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Coursework Relevance:</span>
                <span className="text-white font-bold">89%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Experience Level:</span>
                <span className="text-white font-bold">90%</span>
              </div>
            </div>
          </StitchCard>

          {/* Why AI Recommends This Role (2 Cols) */}
          <StitchCard className="lg:col-span-2 p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-sm font-extrabold text-white">Why AI Recommends This Role</h3>
                <p className="text-[11px] text-slate-400">Deep semantic analysis of your profile vs posting criteria</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {aiReasons.map((reason, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <h4 className="font-extrabold text-xs text-white">{reason.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed pl-4">
                    {reason.desc}
                  </p>
                </div>
              ))}
            </div>
          </StitchCard>
        </div>

        {/* 🧩 3. MATCHED SKILLS VS TARGET SKILL GAPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Matched Skills */}
          <StitchCard className="p-6 space-y-4 border-emerald-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">Verified Matched Skills</h4>
                <p className="text-[11px] text-slate-400">Skills confirmed in your verified projects and resume</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {matchedSkills.map((s, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between">
                  <span className="font-extrabold text-white">{s.name}</span>
                  <span className="text-[11px] font-bold text-emerald-400">{s.level}</span>
                </div>
              ))}
            </div>
          </StitchCard>

          {/* Missing Skills Gap */}
          <StitchCard className="p-6 space-y-4 border-amber-500/20 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">Skill Gaps to Level Up</h4>
                  <p className="text-[11px] text-slate-400">Closing these will increase match to 98%</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                {missingSkills.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/20 flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-white block">{s.name}</span>
                      <span className="text-[10px] text-slate-400">{s.gap}</span>
                    </div>
                    <StitchBadge label={s.priority} variant="warning" />
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/student/learning-path"
              className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs text-center flex items-center justify-center space-x-2 shadow-md shadow-indigo-600/20 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Launch Learning Roadmap for TechNova</span>
            </a>
          </StitchCard>
        </div>

      </div>
    </DashboardLayout>
  );
};
