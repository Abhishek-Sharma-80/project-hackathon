import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Sparkles, ArrowRight, CheckCircle2, Award, Compass, Target } from 'lucide-react';

export default function ForStudentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
            Student Centric Innovation
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Built for Ambitious Engineering Students
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Stop applying blindly to generic job postings. Build the exact skills top engineering teams are hiring for right now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Why Students Love SmartEdu AI</h3>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>See exact matching scores (e.g. 91% TechNova) and transparent reasons why.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Isolate critical missing skills like Spring Boot and Docker.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complete lessons with code sandboxes and watch your profile score upgrade live.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chat anytime with your personal Groq LLaMA 3.3 70B AI Career Coach.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase">Ready to Begin?</span>
              <h3 className="text-2xl font-black">Test the Aryan Sharma Demo Account</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Experience a live student profile with 8.7 CGPA, 10 technical skills, 4 projects, 6 certifications, and a 91% TechNova backend internship match.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
            >
              <span>Login as Aryan Sharma</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
