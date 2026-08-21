import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Layers, 
  BrainCircuit, 
  FileText, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Target,
  Zap,
  TrendingUp,
  BarChart3,
  Award,
  Users
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { StitchCard, StitchMatchGauge, StitchBadge } from '../components/stitch/StitchComponents';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070A11] text-white flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* 🚀 1. HERO SECTION */}
        <section className="text-center space-y-8 pt-8 sm:pt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AI Career Nexus • Precision Matching</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              Bridge the Gap Between <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Education & Employment
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Empowering students with AI-driven internship matching, personalized skill pathways, and automated resume feedback.
            </p>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/student/login"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>Find Your Match</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/recruiter/login"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 border border-slate-700 text-slate-200 font-extrabold text-sm hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Hire AI-vetted Talent</span>
            </Link>
          </motion.div>

          {/* Interactive Feature Hero Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-8"
          >
            <StitchCard className="p-6 sm:p-8 max-w-4xl mx-auto border-indigo-500/30 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-black text-white">91%</span>
                  <p className="text-xs text-slate-400 font-bold">Average AI Match Accuracy</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-black text-white">+18%</span>
                  <p className="text-xs text-slate-400 font-bold">Skill Gap Uplift</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-black text-white">320+</span>
                  <p className="text-xs text-slate-400 font-bold">Corporate Hiring Partners</p>
                </div>
              </div>
            </StitchCard>
          </motion.div>
        </section>

        {/* ⚙️ 2. HOW IT WORKS SECTION (Stitch 3-Step Pipeline) */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Autonomous Pipeline</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">How InternDisha Works</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              From profile setup to verified recruiter interviews in three intelligent steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StitchCard className="p-8 space-y-4 relative overflow-hidden border-indigo-500/20">
              <span className="text-5xl font-black text-slate-800 select-none absolute top-4 right-4">01</span>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Profile Setup</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload your resume or connect GitHub for AI-powered profile creation, skill extraction, and ATS verification.
              </p>
            </StitchCard>

            <StitchCard className="p-8 space-y-4 relative overflow-hidden border-purple-500/20">
              <span className="text-5xl font-black text-slate-800 select-none absolute top-4 right-4">02</span>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Skill Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                View interactive competency maps and dynamic gap analysis that pinpoint missing skills needed for high-paying roles.
              </p>
            </StitchCard>

            <StitchCard className="p-8 space-y-4 relative overflow-hidden border-emerald-500/20">
              <span className="text-5xl font-black text-slate-800 select-none absolute top-4 right-4">03</span>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Tailored Match</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive explainable AI recommendations mapped to live corporate postings with real-time application tracking.
              </p>
            </StitchCard>
          </div>
        </section>

        {/* 💡 3. KEY FEATURES (Stitch Architecture) */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Enterprise Platform</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Core Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StitchCard className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-white">AI Career Copilot</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dynamically adjusts learning pathways as you complete modules and acquire verified projects.
              </p>
            </StitchCard>

            <StitchCard className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-white">ATS Optimization</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time feedback on resume compatibility, keyword density, and industry standard ATS benchmarks.
              </p>
            </StitchCard>

            <StitchCard className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-white">Enterprise Pipeline</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recruiter dashboard with AI candidate match filters, score badges, and integrated applicant tracking.
              </p>
            </StitchCard>
          </div>
        </section>

        {/* 🎯 4. BOTTOM CTA */}
        <section>
          <StitchCard className="p-8 sm:p-12 text-center space-y-6 bg-gradient-to-tr from-indigo-950/70 via-slate-900 to-[#070A11] border-indigo-500/30">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Find Your Match?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Join thousands of students and 300+ recruiters building their careers with explainable AI.
            </p>
            <div className="pt-2">
              <Link
                to="/portal-select"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </StitchCard>
        </section>

      </main>

      {/* 🏁 STITCH FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-bold text-white">InternDisha</span>
            <span className="text-[11px] text-slate-600">© 2026 AI Career Nexus</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/student/login" className="hover:text-slate-300 transition-colors">Students</Link>
            <Link to="/recruiter/login" className="hover:text-slate-300 transition-colors">Recruiters</Link>
            <Link to="/admin/login" className="hover:text-slate-300 transition-colors">Administrators</Link>
            <Link to="/how-it-works" className="hover:text-slate-300 transition-colors">How It Works</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
