import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  Target,
  BookOpen,
  Rocket,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Building2,
  Users,
  Award,
  Zap,
  ChevronRight,
  ShieldCheck,
  Code2,
  Layers,
  ArrowDown,
} from 'lucide-react';
import { CircularProgress } from '../../components/common/CircularProgress';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="overflow-hidden bg-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background glow meshes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] overflow-hidden -z-10 pointer-events-none opacity-60">
          <div className="absolute top-[-150px] left-1/4 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute top-[-100px] right-1/4 w-[450px] h-[450px] bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-400/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* SIH Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 shadow-sm text-xs font-bold text-indigo-700">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Smart India Hackathon 2026 • Problem 26205 (AICTE)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Find the Right Internship.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Build the Right Skills.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              SmartEdu AI analyzes your skills, recommends high-match opportunities, diagnoses your exact skill gaps, and generates a personalized learning roadmap to make you industry-ready.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to={user ? '/dashboard' : '/register'}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:opacity-95 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/internships"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-7 py-3.5 rounded-2xl border border-slate-200 shadow-sm transition"
              >
                <span>Explore Internships</span>
              </Link>
            </div>

            {/* Value Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Explainable 6-Factor AI</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero External API Lock-in</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Live Skill & Score Sync</span>
            </div>
          </div>

          {/* Hero Interactive App Mockup Preview */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            <div className="relative rounded-3xl bg-slate-900/5 p-3 sm:p-4 border border-slate-200/80 shadow-2xl backdrop-blur-sm">
              {/* Inner Mockup Window */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-inner">
                {/* Mockup Window Header */}
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-xs font-semibold text-slate-500 font-mono">smartedu.ai/dashboard/aryan-sharma</span>
                  </div>
                  <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    Live Demo Persona: Aryan Sharma
                  </div>
                </div>

                {/* Mockup Dashboard Content */}
                <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-50/50">
                  {/* Card 1: Profile Completeness */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">SmartEdu Profile Score</span>
                    <CircularProgress score={82} size={120} label="Optimal" colorGradient="blue-indigo" />
                    <p className="text-xs text-slate-500 mt-2">CGPA: 8.7 • 10 Skills • 4 Projects</p>
                  </div>

                  {/* Card 2: Top Internship Match */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          91% Match
                        </span>
                        <span className="text-xs text-slate-400">TechNova Inc.</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">Backend Developer Intern</h3>
                      <p className="text-xs text-slate-500 mt-1">₹35,000/mo • Remote • Java & Spring</p>
                      
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Java ✓</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">SQL ✓</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700">Spring Boot (In Progress)</span>
                      </div>
                    </div>

                    <Link
                      to="/recommendations"
                      className="mt-4 w-full text-center py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition"
                    >
                      Why This Match? →
                    </Link>
                  </div>

                  {/* Card 3: Priority Skill Gap */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full">
                          Priority Gap #1
                        </span>
                        <span className="text-[11px] text-slate-400">Demand: 89%</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">Spring Boot 3</h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-500">Current: 20%</span>
                          <span className="text-indigo-600">Target: 70%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 rounded-full" style={{ width: '28%' }} />
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/learning-path"
                      className="mt-4 w-full text-center py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      Start Roadmap Module
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE VALUE PROPOSITIONS */}
      <section className="py-20 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
              The 3-Pillar Learning Engine
            </h2>
            <p className="text-3xl font-black text-slate-900 tracking-tight">
              An intelligent loop built for student success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Discover */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">🎯 Discover</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Find real internships that match your actual skills, coursework, and career goals with explainable percentage scores based on 6 core criteria.
              </p>
            </div>

            {/* Card 2: Improve */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">📚 Improve</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Identify your exact skill gaps with industry demand ratings and follow a dynamically generated step-by-step learning roadmap to close them.
              </p>
            </div>

            {/* Card 3: Succeed */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Rocket className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">🚀 Succeed</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Validate your skills with timed assessments, elevate your readiness score, apply confidently, and track applications on an interactive Kanban board.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN DIFFERENTIATOR SECTION (Visual Before/After) */}
      <section className="py-24 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              The SmartEdu AI Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 tracking-tight leading-tight">
              SmartEdu AI doesn’t just tell students which internship to apply for — it tells them what they need to learn to become qualified for it.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Traditional Platform Box */}
            <div className="p-8 rounded-3xl bg-slate-800/60 border border-red-500/30 backdrop-blur-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                  <span>Traditional Job Board</span>
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-red-950/80 text-red-300 border border-red-800">
                  Broken Paradigm
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Students apply blindly without knowing requirements or eligibility, resulting in high rejection rates and zero skill feedback.
              </p>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300">1. Student searches random listings</div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300">2. Submits generic resume</div>
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-900 text-red-300">3. Silent rejection / No feedback</div>
              </div>
            </div>

            {/* SmartEdu AI Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900/80 via-blue-900/50 to-slate-900 border border-indigo-400/40 backdrop-blur-sm shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>SmartEdu AI Solution</span>
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                  Intelligent Loop
                </span>
              </div>
              <p className="text-sm text-indigo-200 mb-6">
                Comprehensive AI diagnostic identifies missing requirements and guides students through a verified learning roadmap prior to application.
              </p>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-600/40 text-indigo-200">1. Profile analyzed & match computed (91%)</div>
                <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-600/40 text-indigo-200">2. Missing gaps isolated (Spring Boot, Docker)</div>
                <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-600/40 text-indigo-200">3. Learning roadmap upgrades skills & readiness</div>
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">4. Confident, qualified application with high placement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 6-STEP INTERACTIVE TIMELINE */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
              Step-by-Step Architecture
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How SmartEdu AI Powers Your Career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Build Your Profile',
                desc: 'Add academics, CGPA, technical skills, projects with GitHub links, and career ambitions.',
                icon: Code2,
              },
              {
                step: '02',
                title: 'SmartEdu AI Analyzes You',
                desc: 'Diagnostic engine determines your strengths, weakness areas, and baseline readiness score.',
                icon: BrainCircuit,
              },
              {
                step: '03',
                title: 'Discover Best Opportunities',
                desc: 'Get explainable match percentages (e.g. 91% TechNova) with matching vs missing requirements.',
                icon: Target,
              },
              {
                step: '04',
                title: 'Close Skill Gaps',
                desc: 'Identify priority gaps weighted by industry demand and career relevance formulas.',
                icon: Layers,
              },
              {
                step: '05',
                title: 'Follow Your Learning Path',
                desc: 'Complete interactive modular lessons that dynamically upgrade your verified skill levels in real-time.',
                icon: BookOpen,
              },
              {
                step: '06',
                title: 'Get Career Ready',
                desc: 'Validate improvements with timed skill tests, unlock higher match internships, and track applications.',
                icon: Rocket,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-indigo-600 font-mono">{item.step}</span>
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LIVE STATS COUNTER */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 font-mono">1,200+</div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-blue-600 font-mono">320+</div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Active Internships</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-purple-600 font-mono">150+</div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Industry Companies</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-mono">91.4%</div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Average Match Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Ready to experience the future of smart education?
          </h2>
          <p className="text-indigo-100 text-base max-w-xl mx-auto mb-8">
            Try the live interactive demo as Aryan Sharma or explore the Institutional Admin Portal today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-indigo-600 font-bold text-sm shadow-xl hover:bg-slate-50 transition"
            >
              1-Click Demo Login →
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-900/40 hover:bg-indigo-900/60 border border-white/30 text-white font-bold text-sm transition"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
