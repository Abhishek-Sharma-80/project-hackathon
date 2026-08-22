import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-slate-500 text-sm max-w-md leading-relaxed">
              SmartEdu AI is an intelligent skill development and internship recommendation platform built for <strong>Smart India Hackathon 2026</strong>. Bridging the divide between what students learn and what industry needs.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Problem Statement ID: 26205 • Theme: Smart Education • AICTE</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-500">
              <li><Link href="/how-it-works" className="hover:text-indigo-600 transition">How It Works</Link></li>
              <li><Link href="/features" className="hover:text-indigo-600 transition">Core Features</Link></li>
              <li><Link href="/for-students" className="hover:text-indigo-600 transition">For Students</Link></li>
              <li><Link href="/for-colleges" className="hover:text-indigo-600 transition">For Colleges & Deans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Demo & Access</h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-500">
              <li><Link href="/login" className="hover:text-indigo-600 transition">Student Login (Aryan)</Link></li>
              <li><Link href="/login" className="hover:text-indigo-600 transition">Admin Portal Login</Link></li>
              <li><Link href="/register" className="hover:text-indigo-600 transition">Create Account</Link></li>
              <li><Link href="/about" className="hover:text-indigo-600 transition">About the Project</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© 2026 SmartEdu AI. Smart India Hackathon Submission.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Indian Higher Education Innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};
