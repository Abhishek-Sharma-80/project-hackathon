import React from 'react';
import { Sparkles, BrainCircuit, Target, Layers, BookOpen, Rocket, ShieldCheck, Kanban, Award, BarChart3 } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      title: '6-Factor Recommendation Engine',
      desc: 'Deterministic weighted matching combining skill overlap (40%), proficiency (20%), career goal (15%), CGPA (10%), projects (10%), and certifications (5%).',
      icon: Target,
    },
    {
      title: 'Explainable AI Breakdown',
      desc: 'Instant clarity on why an internship was recommended, identifying exact missing skills and projected match improvement after roadmap completion.',
      icon: Sparkles,
    },
    {
      title: 'Skill Gap Prioritization Formula',
      desc: 'Mathematical formula (gapSize × industryDemand × careerRelevance) that surfaces high-impact bottlenecks for immediate action.',
      icon: Layers,
    },
    {
      title: 'Dynamic Learning Roadmaps',
      desc: 'Personalized course modules where completing hands-on lessons updates student skills and boosts profile scores in real time.',
      icon: BookOpen,
    },
    {
      title: 'Timed Skill Assessments',
      desc: 'Interactive MCQ test suite in Java, Python, SQL, DSA, React, and Spring Boot that validates proficiency and awards verified skill badges.',
      icon: Award,
    },
    {
      title: 'Interactive Application Kanban',
      desc: 'Visual career funnel allowing students to track opportunities from Saved → Applied → Shortlisted → Interview → Offer.',
      icon: Kanban,
    },
    {
      title: 'SmartEdu AI Career Assistant',
      desc: 'Context-grounded assistant aware of student profile scores, weak areas, and active applications for personalized guidance.',
      icon: BrainCircuit,
    },
    {
      title: 'Institutional Dean Analytics',
      desc: 'Macro dashboards for colleges to inspect demanded skills, student skill distributions, application conversion funnels, and at-risk students.',
      icon: BarChart3,
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Comprehensive Capabilities
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Engineered for Real-World Career Intelligence
          </h1>
          <p className="text-slate-600 text-base">
            Every feature in SmartEdu AI works in harmony to bridge the gap between classroom theory and industry requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
