'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import {
  Sparkles,
  ArrowRight,
  Target,
  Compass,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Award,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building2,
  Users,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-indigo-50/60 via-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              {/* SIH 2026 Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-200/80 shadow-xs text-xs font-bold text-indigo-700">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span>Smart India Hackathon 2026 • Problem Statement ID: 26205</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Find the Right Internship.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
                  Build the Right Skills.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                SmartEdu AI analyzes your skills, recommends the right opportunities, identifies your skill gaps, and creates a personalized path to make you industry-ready.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <Link
                  href="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Try Interactive Demo (Aryan Sharma)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm shadow-xs transition"
                >
                  <span>Explore Recommendation Engine</span>
                </Link>
              </div>

              <p className="text-xs text-slate-600 font-semibold">
                Instant 1-Click Login • 40+ Internships Seeded • LLaMA 3.3 70B AI Coach
              </p>
            </div>

            {/* ================= INTERACTIVE PREVIEW MOCKUP ================= */}
            <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-slate-200/80 to-slate-300/40 border border-slate-300/60 shadow-2xl">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-inner">
                {/* Mockup Top Window Controls */}
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-slate-600 ml-2 font-semibold">
                      smartedu.ai/dashboard — Aryan Sharma (82% Profile Score)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    Active Telemetry • Live Database
                  </span>
                </div>

                {/* Dashboard Snapshot Preview */}
                <div className="p-6 sm:p-8 bg-[#F8FAFC] space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Card 1: 91% Match */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Top AI Match</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                          91% Match
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Backend Developer Intern</h4>
                        <p className="text-xs text-slate-500 font-semibold">TechNova • Bangalore / Remote</p>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Java, SQL, DSA (Advanced)
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                          <Compass className="w-3.5 h-3.5" /> Missing: Spring Boot 3 & Docker
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Skill Gap */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Priority Skill Gap</span>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Spring Boot 3 & REST APIs</h4>
                        <p className="text-xs text-slate-500 font-semibold">Gap Size: 50% • Demand: 89%</p>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-indigo-600 h-2 rounded-full w-[25%]" />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Completing Module 1 raises TechNova match to <strong>97%</strong>.
                      </p>
                    </div>

                    {/* Card 3: AI Assistant Insight */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-sm space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span>Groq LLaMA 3.3 70B AI Coach</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        "Aryan, your Java foundation is strong (90%). Focus next on Spring MVC & Docker containerization to maximize your offer probabilities!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3 CORE VALUE PILLARS ================= */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
                Systemic Innovation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                How SmartEdu AI Solves the Employability Crisis
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Traditional job portals leave students guessing. SmartEdu AI provides an end-to-end intelligent feedback loop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1: Discover */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">1. Discover (Explainable Matching)</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Deterministic 6-factor algorithm that matches students to internships based on skill proficiencies, projects, CGPA, and goals. Explains <em>why</em> each role was recommended.
                </p>
              </div>

              {/* Pillar 2: Improve */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">2. Improve (Skill Gap & Roadmaps)</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Identifies missing technical prerequisites with prioritized scoring. Generates step-by-step interactive lessons with code snippets, tasks, and verified MCQ evaluations.
                </p>
              </div>

              {/* Pillar 3: Succeed */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">3. Succeed (Hired with Confidence)</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Interactive Kanban tracker for application stages, real-time verified skill badges, and institutional oversight dashboards for academic deans and placement cells.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= THE MAIN DIFFERENTIATOR ================= */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                The SmartEdu AI Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Traditional Job Boards vs SmartEdu AI
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Traditional */}
              <div className="p-8 rounded-3xl bg-slate-800/80 border border-red-500/30 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-red-400">Traditional Job Boards</h3>
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Students apply blindly without knowing actual match fitness.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Silent rejections with zero feedback on missing technical skills.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Disconnected from learning — no guidance on how to fix gaps.</span>
                  </li>
                </ul>
              </div>

              {/* SmartEdu AI */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 to-blue-900 border border-indigo-400/40 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-emerald-400">SmartEdu AI Platform</h3>
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <ul className="space-y-4 text-xs text-indigo-100">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Explainable 6-Factor AI matching showing strength breakdown & gaps.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Dynamic personalized roadmap: learn Spring Boot & Docker to boost match to 97%.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Real-time state sync: completing lessons immediately upgrades verified database skills!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS COUNTER ================= */}
        <section className="py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">1,200+</div>
                <p className="text-xs font-bold text-slate-500 uppercase mt-1">Students Enrolled</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-indigo-600 font-mono">320+</div>
                <p className="text-xs font-bold text-slate-500 uppercase mt-1">Active Internships</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-purple-600 font-mono">150+</div>
                <p className="text-xs font-bold text-slate-500 uppercase mt-1">Corporate Partners</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-mono">91.4%</div>
                <p className="text-xs font-bold text-slate-500 uppercase mt-1">Match Accuracy</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
