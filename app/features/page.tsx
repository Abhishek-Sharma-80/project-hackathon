import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Sparkles, ArrowRight, Target, Layers, Compass, Award, Kanban, MessageSquareCode, ShieldCheck, FileBarChart } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      title: 'Explainable AI Matching Engine',
      desc: 'Transparent 6-factor algorithm that shows candidate strengths, missing prerequisites, and projected match improvements.',
      icon: Target,
    },
    {
      title: 'Skill Gap Intelligence Matrix',
      desc: 'Calculates skill priority with formulas combining gap size, employer market demand, and target role relevance.',
      icon: Layers,
    },
    {
      title: 'Dynamic Learning Roadmaps',
      desc: 'Modular lessons with code snippets, tasks, and documentation that dynamically update student database levels upon completion.',
      icon: Compass,
    },
    {
      title: 'Timed Competency Assessments',
      desc: 'Timed MCQ evaluations in Java, SQL, Python, DSA, and Spring Boot that award verified badges.',
      icon: Award,
    },
    {
      title: 'Recruitment Kanban Board',
      desc: 'Full stage tracking (Saved, Applied, Shortlisted, Interview, Selected) with recruiter notes.',
      icon: Kanban,
    },
    {
      title: 'Groq LLaMA 3.3 70B AI Coach',
      desc: 'Ultra-fast context-aware career coach grounded in student profile data, active applications, and skill gaps.',
      icon: MessageSquareCode,
    },
    {
      title: 'Dean & Admin Governance Portal',
      desc: 'Macro KPIs on 1,200+ students, demanded skills analytics, and placement conversion funnels.',
      icon: ShieldCheck,
    },
    {
      title: 'NIRF & NAAC Accreditation Reports',
      desc: 'Downloadable institutional reports and CSV data exports formatted for academic governance.',
      icon: FileBarChart,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
            Platform Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Comprehensive Platform Features
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Everything students and colleges need to navigate modern technology hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
