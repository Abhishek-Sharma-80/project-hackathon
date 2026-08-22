import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, Target, Award, Rocket } from 'lucide-react';

export const ForStudentsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-wider">
            Student Centric Innovation
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Stop Applying Blindly. Learn What Gets You Hired.
          </h1>
          <p className="text-slate-600 text-base">
            SmartEdu AI provides students with clarity, actionable skill roadmaps, and high-probability internship recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900">Understand Your Standings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get an objective 0–100 profile score and career readiness score reflecting your competitive eligibility for tier-1 tech internships.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900">Close Precise Skill Gaps</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Follow curated lessons in Spring Boot, Docker, REST APIs, and Cloud that immediately update your profile score upon completion.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900">Accelerate Placements</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apply to opportunities where your match percentage is 85%+, verify your competencies with timed tests, and track recruiter stages.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:opacity-95 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start as a Student Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
