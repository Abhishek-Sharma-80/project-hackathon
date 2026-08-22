import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Award, Heart, Shield, Sparkles, ExternalLink, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: Brand & Accreditation */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" theme="dark" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              SmartEdu AI is an AI-powered personalized learning, skill development, and internship recommendation platform bridging the critical gap between academia and industry expectations.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/30 text-xs text-indigo-300 font-medium">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Smart India Hackathon 2026 • Problem Statement 26205 (AICTE)</span>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link to="/features" className="hover:text-white transition">AI Features</Link></li>
              <li><Link to="/internships" className="hover:text-white transition">Explore Internships</Link></li>
              <li><Link to="/for-students" className="hover:text-white transition">For Students</Link></li>
              <li><Link to="/for-colleges" className="hover:text-white transition">For Colleges & Deans</Link></li>
            </ul>
          </div>

          {/* Column 3: AI Ecosystem */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">AI Intelligence</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-blue-400" /> 6-Factor Matching</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-purple-400" /> Skill Gap Detection</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Dynamic Roadmaps</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> Explainable AI Panel</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-indigo-400" /> SmartEdu AI Assistant</li>
            </ul>
          </div>

          {/* Column 4: Quick Demo Access */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Jury & Demo Access</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <span className="block font-semibold text-slate-200">Demo Student:</span>
                <span className="text-indigo-400 font-mono">aryan@smartedu.ai</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <span className="block font-semibold text-slate-200">Demo Admin:</span>
                <span className="text-emerald-400 font-mono">admin@smartedu.ai</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SmartEdu AI. Built for Smart India Hackathon. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Indian Higher Education
            </span>
            <Link to="/about" className="hover:text-slate-300">About Initiative</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
