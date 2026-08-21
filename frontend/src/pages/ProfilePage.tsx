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
  const { user, profile } = useAuth();

  // Dynamic skills from profile, fallback to sample
  const skills = (profile?.skills && profile.skills.length > 0)
    ? profile.skills.slice(0, 6).map((s: string, i: number) => ({
        name: s,
        level: Math.max(50, 90 - i * 8),
        color: i < 3 ? 'from-emerald-500 to-teal-400' : i < 5 ? 'from-amber-500 to-orange-400' : 'from-purple-500 to-indigo-400'
      }))
    : [
        { name: 'Add your skills in profile settings', level: 0, color: 'from-slate-600 to-slate-500' }
      ];

  const certifications: { title: string; issuer: string; date: string; badge: string }[] = [];


  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto font-sans">
        
        {/* 🌟 1. PROFILE BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-[#070A11] border border-indigo-500/20 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-600/30 border-2 border-indigo-400/40">
                {(user?.name || profile?.fullName || 'ST')
                  .split(' ')
                  .map((w: string) => w[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {user?.name || profile?.fullName || 'Student'}
                  </h1>
                  <StitchBadge label="Verified Candidate" variant="success" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  {profile?.course || 'Computer Science'} {profile?.branch ? `• ${profile.branch}` : ''} {profile?.currentYear ? `• ${profile.currentYear}` : ''}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                  {profile?.preferredLocation && (
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{profile.preferredLocation}</span>
                    </span>
                  )}
                  {profile?.cgpa && (
                    <span className="flex items-center space-x-1">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                      <span>CGPA: <strong className="text-white">{profile.cgpa} / 10</strong></span>
                    </span>
                  )}
                  {profile?.college && (
                    <span className="flex items-center space-x-1">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{profile.college}</span>
                    </span>
                  )}
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
