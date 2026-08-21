import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Award, 
  FileText, 
  Github, 
  Linkedin, 
  Sparkles, 
  CheckCircle2, 
  Edit3, 
  Plus, 
  Download, 
  UploadCloud,
  ExternalLink,
  Code2
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StitchCard, StitchProgressBar, StitchBadge } from '../components/stitch/StitchComponents';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const skills = [
    { name: 'Java Programming', level: 90, color: 'from-emerald-500 to-teal-400' },
    { name: 'SQL & Database Architecture', level: 85, color: 'from-emerald-500 to-teal-400' },
    { name: 'Python Scripting', level: 80, color: 'from-emerald-500 to-teal-400' },
    { name: 'Git & Version Control', level: 80, color: 'from-emerald-500 to-teal-400' },
    { name: 'REST API Architecture', level: 60, color: 'from-amber-500 to-orange-400' },
    { name: 'Docker & Containerization', level: 50, color: 'from-purple-500 to-indigo-400' }
  ];

  const certifications = [
    { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Dec 2025', badge: 'Active' },
    { title: 'Oracle Certified Java SE 11 Developer', issuer: 'Oracle Corporation', date: 'Aug 2025', badge: 'Verified' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto font-sans">
        
        {/* 🌟 1. PROFILE BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-[#070A11] border border-indigo-500/20 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-600/30 border-2 border-indigo-400/40">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AM'}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {user?.name || 'Alex Mercer'}
                  </h1>
                  <StitchBadge label="Verified Candidate" variant="success" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Computer Science Student • Class of 2026
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>San Francisco, CA</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>GPA: <strong className="text-white">3.8 / 4.0</strong></span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center space-x-1.5 transition-all"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>github.com/alex-mercer</span>
              </a>
            </div>
          </div>
        </div>

        {/* 📊 2. SKILLS MATRIX & CREDENTIALS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Skills Matrix (2 Cols) */}
          <StitchCard className="lg:col-span-2 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Skill Inventory</span>
                <h3 className="text-base font-extrabold text-white mt-1">Verified Technical Competencies</h3>
              </div>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                6 Verified Skills
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">{s.name}</span>
                    <span className="text-indigo-400 font-extrabold">{s.level}%</span>
                  </div>
                  <StitchProgressBar value={s.level} showPercent={false} color={s.color} />
                </div>
              ))}
            </div>
          </StitchCard>

          {/* Certifications & ATS Resume (1 Col) */}
          <div className="space-y-6">
            <StitchCard className="p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-white">Professional Certifications</h3>
              <div className="space-y-3 text-xs">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white">{cert.title}</h4>
                      <StitchBadge label={cert.badge} variant="success" />
                    </div>
                    <span className="text-[11px] text-slate-400 block">{cert.issuer} • {cert.date}</span>
                  </div>
                ))}
              </div>
            </StitchCard>

            <StitchCard className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white">ATS Master Resume</h3>
                <StitchBadge label="82/100 ATS" variant="info" />
              </div>
              <p className="text-xs text-slate-400">
                Uploaded as <strong className="text-slate-200">Alex_Mercer_Resume.pdf</strong> (1.2 MB).
              </p>
              <div className="pt-2 flex items-center space-x-2">
                <a
                  href="/student/ats-resume"
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs text-center block transition-all"
                >
                  View ATS Diagnostic Report →
                </a>
              </div>
            </StitchCard>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
