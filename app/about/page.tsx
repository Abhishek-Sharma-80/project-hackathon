import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart India Hackathon 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About SmartEdu AI
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Problem Statement ID: <strong>26205</strong> • Theme: <strong>Smart Education</strong> • Organization: <strong>AICTE</strong>
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h3 className="text-lg font-bold text-slate-900">Our Core Vision</h3>
          <p>
            Higher education institutions produce millions of engineering graduates every year, yet over 70% of tech companies report difficulty finding industry-ready entry-level talent. Students learn foundational concepts in class but struggle to identify exactly what frameworks, tools, and best practices modern industry demands.
          </p>
          <p>
            <strong>SmartEdu AI</strong> bridges this critical gap. Rather than acting as a passive job board, SmartEdu AI analyzes each student's profile, calculates explainable match fitness, isolates specific skill gaps with priority mathematical formulas, and provides dynamic interactive learning roadmaps with live state synchronization.
          </p>
          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 space-y-2">
            <span className="text-xs font-bold text-indigo-900 block">The SmartEdu AI Pipeline:</span>
            <p className="text-xs text-indigo-800 font-semibold font-mono">
              Education → Skills → Learning → Internships → Career Success
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
