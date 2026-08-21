import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  UploadCloud, 
  TrendingUp, 
  Cpu, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Award
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StitchCard, StitchStatCard, StitchMatchGauge, StitchBadge, StitchProgressBar } from '../components/stitch/StitchComponents';

export const ATSResumePage: React.FC = () => {
  const [atsScore, setAtsScore] = useState(82);
  const [analyzing, setAnalyzing] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const categories = [
    { name: 'Keyword Optimization', score: 90, color: 'from-emerald-500 to-teal-400' },
    { name: 'Technical Skills Match', score: 85, color: 'from-indigo-500 to-sky-400' },
    { name: 'Formatting & Parsability', score: 80, color: 'from-purple-500 to-indigo-400' },
    { name: 'Impact & Quantified Results', score: 70, color: 'from-amber-500 to-orange-400' }
  ];

  const strengths = [
    'Strong alignment with Java, Python, and SQL backend engineering keywords.',
    'Projects section effectively demonstrates hands-on implementation & Git repository links.',
    'Clean, single-column ATS-compliant typography with standard section headers.'
  ];

  const improvements = [
    'Lacks measurable business metric achievements (e.g., "reduced latency by 25%").',
    'Weak action verbs in work and leadership bullet points (replace "Worked on" with "Architected").',
    'Missing secondary high-demand domain keywords (e.g., CI/CD Pipelines, Docker, REST APIs).'
  ];

  const handleReanalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAtsScore(86);
      setToastMsg('AI ATS scan complete! Score updated to 86/100.');
      setTimeout(() => setToastMsg(''), 3500);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="p-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* 🌟 HERO BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B0F19] via-indigo-950/80 to-slate-900 border border-indigo-500/20 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI ATS Engine • LLaMA-3.3 Diagnostic</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                ATS Resume Optimization & Compatibility
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Scan your resume against 1,250+ live corporate postings to ensure ATS screening parsability and keyword ranking.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={handleReanalyze}
                disabled={analyzing}
                className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-[1.02]"
              >
                <RefreshCw className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
                <span>{analyzing ? 'Scanning...' : 'Re-scan Resume with AI'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 📊 ATS SCORE GAUGE & BREAKDOWN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Overall Score Card */}
          <StitchCard className="p-6 flex flex-col items-center justify-between text-center space-y-4">
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Overall ATS Score</span>
              <h3 className="text-base font-extrabold text-white mt-1">Resume Screening Strength</h3>
            </div>

            <StitchMatchGauge
              score={atsScore}
              maxScore={100}
              size={150}
              strokeWidth={12}
              label="ATS Compatibility"
              subtitle="Optimized for Top-Tier Tech Roles"
            />

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-left w-full text-xs space-y-1">
              <span className="font-extrabold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Good Match Potential</span>
              </span>
              <p className="text-[11px] text-slate-300">
                Your resume surpasses 82% of student applicants for Backend and Software roles.
              </p>
            </div>
          </StitchCard>

          {/* Right: Category Performance Breakdown */}
          <StitchCard className="lg:col-span-2 p-6 flex flex-col justify-between space-y-5">
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Diagnostic Dimensions</span>
              <h3 className="text-base font-extrabold text-white mt-1">Detailed Category Breakdown</h3>
            </div>

            <div className="space-y-4">
              {categories.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300">{cat.name}</span>
                    <span className="text-white font-extrabold">{cat.score}%</span>
                  </div>
                  <StitchProgressBar value={cat.score} showPercent={false} color={cat.color} />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Target Benchmark: 85%+</span>
              <span className="text-indigo-400 font-extrabold">+14% Interview Shortlist Rate</span>
            </div>
          </StitchCard>
        </div>

        {/* 📝 AI ANALYSIS REPORT: STRENGTHS & IMPROVEMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Core Strengths */}
          <StitchCard className="p-6 space-y-4 border-emerald-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">Core Resume Strengths</h4>
                <p className="text-[11px] text-slate-400">Elements scoring high in recruiter ATS scanners</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {strengths.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-slate-300 flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </StitchCard>

          {/* Targeted Improvements */}
          <StitchCard className="p-6 space-y-4 border-amber-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">High-Impact Growth Areas</h4>
                <p className="text-[11px] text-slate-400">Fix these to reach a 90+ score</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {improvements.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-slate-300 flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </StitchCard>
        </div>

        {/* 📄 UPLOADED RESUME METADATA CARD */}
        <StitchCard className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Alex_Mercer_Resume_2026.pdf</h4>
              <p className="text-[11px] text-slate-400">Uploaded 3 days ago • 1.2 MB • Parsed by Disha ATS AI</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setToastMsg('Downloading latest parsed ATS resume format...')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setToastMsg('AI Resume Copilot launched!')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-md shadow-indigo-600/25 flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Improve with AI</span>
            </button>
          </div>
        </StitchCard>

      </div>
    </DashboardLayout>
  );
};
