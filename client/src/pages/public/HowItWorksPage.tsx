import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BrainCircuit, Target, Layers, BookOpen, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Algorithmic Pipeline
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            How SmartEdu AI Bridges the Education-Industry Divide
          </h1>
          <p className="text-slate-600 text-base">
            Our multi-factor recommendation and diagnostic pipeline transforms academic profiles into industry-ready career trajectories.
          </p>
        </div>

        {/* The 6-Stage Deep Dive */}
        <div className="space-y-12 max-w-4xl mx-auto">
          {[
            {
              step: 'Stage 1',
              title: 'Holistic Profile & Skill Aggregation',
              desc: 'Students input their academic records (CGPA, coursework), self-assessed technical proficiencies, real project repositories with GitHub links, and industry certifications.',
              icon: BrainCircuit,
              color: 'from-blue-600 to-indigo-600',
            },
            {
              step: 'Stage 2',
              title: 'Multi-Factor Recommendation Engine',
              desc: 'The engine evaluates active internship listings across 6 weighted criteria: Required Skill Overlap (40%), Proficiency Depth (20%), Career Interest (15%), CGPA (10%), Project Relevance (10%), and Certifications (5%).',
              icon: Target,
              color: 'from-indigo-600 to-purple-600',
            },
            {
              step: 'Stage 3',
              title: 'Explainable AI Diagnostic ("Why This Match?")',
              desc: 'Instead of opaque black-box scores, SmartEdu AI breaks down every match into Candidate Strengths, Missing Prerequisites, and Natural Language Rationale.',
              icon: Sparkles,
              color: 'from-purple-600 to-pink-600',
            },
            {
              step: 'Stage 4',
              title: 'Skill Gap Prioritization Formula',
              desc: 'Skill gaps are ranked using: PriorityScore = gapSize × industryDemand × careerRelevance. Urgent gaps with high employer demand are surfaced first.',
              icon: Layers,
              color: 'from-pink-600 to-rose-600',
            },
            {
              step: 'Stage 5',
              title: 'Dynamic Personalized Learning Roadmaps',
              desc: 'Interactive modules provide code exercises and documentation. Completing lessons immediately updates the student’s verified skill score and recalculates internship matches in real-time.',
              icon: BookOpen,
              color: 'from-emerald-600 to-teal-600',
            },
            {
              step: 'Stage 6',
              title: 'Verified Skill Assessments & Placement',
              desc: 'Timed multiple-choice assessments validate proficiencies, award verified skill badges, elevate profile scores, and empower confident applications.',
              icon: Rocket,
              color: 'from-blue-600 to-emerald-600',
            },
          ].map((s, idx) => (
            <div
              key={s.step}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start gap-6 hover:shadow-md transition"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                <s.icon className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-mono">{s.step}</span>
                <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:opacity-95 transition"
          >
            <span>Experience the Product Loop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
