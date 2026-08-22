import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Sparkles, ArrowRight, UserCheck, Layers, Award, Kanban, Compass, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Multidimensional Student Profile Diagnostic',
      desc: 'Build your academic and technical profile. SmartEdu AI computes a live 0–100 Profile Completeness Score based on verified skills, projects, and credentials.',
      icon: UserCheck,
    },
    {
      step: '02',
      title: 'Explainable 6-Factor Internship Matching',
      desc: 'Our deterministic algorithm evaluates skill overlap, proficiency, career trajectory, CGPA, projects, and certifications to score internship fitness with natural language explanations.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'Skill Gap Intelligence Matrix',
      desc: 'Gaps are dynamically prioritized using Gap Size × Industry Demand × Career Relevance, categorizing competencies into Strong, Developing, and Priority Gaps.',
      icon: Layers,
    },
    {
      step: '04',
      title: 'Personalized Dynamic Learning Roadmap',
      desc: 'Follow curated modules with code architecture snippets, tasks, and documentation. Completing lessons immediately upgrades verified skills in the database!',
      icon: Compass,
    },
    {
      step: '05',
      title: 'Timed Competency Assessments',
      desc: 'Take timed technical MCQ tests in Java, SQL, Python, DSA, and Spring Boot to earn verified skill badges and increase match ratings.',
      icon: Award,
    },
    {
      step: '06',
      title: 'Kanban Application Tracking & Offers',
      desc: 'Track internship applications across recruitment stages (Saved → Applied → Shortlisted → Interview → Selected) with recruiter feedback.',
      icon: Kanban,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
            Platform Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How SmartEdu AI Works
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            A continuous intelligent feedback loop from classroom learning to industry employment.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start gap-6 hover:shadow-md transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-black shrink-0 font-mono">
                  {s.step}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition"
          >
            <span>Experience the Live Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
