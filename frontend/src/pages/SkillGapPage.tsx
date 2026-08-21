import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Sparkles, 
  Target, 
  TrendingUp, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Layers,
  Cpu,
  BrainCircuit,
  Compass
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StitchCard, StitchStatCard, StitchProgressBar, StitchBadge } from '../components/stitch/StitchComponents';

export const SkillGapPage: React.FC = () => {
  const competencies = [
    { skill: 'Java Programming', current: 90, target: 85, color: 'from-emerald-500 to-teal-400' },
    { skill: 'SQL & Database Design', current: 85, target: 80, color: 'from-emerald-500 to-teal-400' },
    { skill: 'Git & Version Control', current: 80, target: 75, color: 'from-emerald-500 to-teal-400' },
    { skill: 'REST API Architecture', current: 60, target: 85, color: 'from-amber-500 to-orange-400' },
    { skill: 'Spring Boot Framework', current: 55, target: 80, color: 'from-rose-500 to-amber-400' },
    { skill: 'Docker Containerization', current: 50, target: 75, color: 'from-purple-500 to-indigo-400' }
  ];

  const targetGrowthAreas = [
    {
      skill: 'Spring Boot',
      current: 55,
      required: 80,
      gap: '-25%',
      priority: 'Urgent Priority',
      variant: 'danger' as const,
      impact: '+8% Match Uplift'
    },
    {
      skill: 'REST APIs',
      current: 60,
      required: 85,
      gap: '-25%',
      priority: 'High Priority',
      variant: 'warning' as const,
      impact: '+6% Match Uplift'
    },
    {
      skill: 'Docker & Microservices',
      current: 50,
      required: 75,
      gap: '-25%',
      priority: 'Medium Priority',
      variant: 'info' as const,
      impact: '+4% Match Uplift'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto font-sans">
        
        {/* 🌟 1. HERO BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-[#070A11] border border-indigo-500/20 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase">
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                <span>Skill Intelligence & Gap Analytics</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Core Competency Matrix</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Visualizing your skills versus top industry job posting requirements to generate personalized learning paths.
              </p>
            </div>

            <Link
              to="/student/learning-path"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-105 shrink-0"
            >
              <span>Generate Learning Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 💡 2. STITCH AI INSIGHT HIGHLIGHT BANNER */}
        <StitchCard className="p-6 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border-indigo-500/30">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black text-indigo-300 uppercase tracking-wider">AI Copilot Recommendation</span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                You are highly prepared for <strong className="text-white">Backend Developer</strong> internships. Improving <span className="text-amber-300 font-bold">Spring Boot</span>, <span className="text-amber-300 font-bold">REST APIs</span>, and <span className="text-amber-300 font-bold">Docker</span> could increase your average AI match score by <strong className="text-emerald-400 font-extrabold">+18%</strong> across 1,200+ listings.
              </p>
            </div>
          </div>
        </StitchCard>

        {/* 📊 3. COMPETENCY BARS & TARGET GROWTH AREAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left: Complete Skill Proficiency Breakdown */}
          <StitchCard className="p-6 space-y-5">
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Skill Inventory</span>
              <h3 className="text-base font-extrabold text-white mt-1">Demonstrated vs Industry Requirement</h3>
            </div>

            <div className="space-y-4">
              {competencies.map((c, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{c.skill}</span>
                    <div className="flex items-center space-x-2 text-[11px]">
                      <span className="text-slate-400">Req: {c.target}%</span>
                      <span className={`font-extrabold ${c.current >= c.target ? 'text-emerald-400' : 'text-amber-400'}`}>
                        Current: {c.current}%
                      </span>
                    </div>
                  </div>
                  <StitchProgressBar value={c.current} color={c.color} showPercent={false} />
                </div>
              ))}
            </div>
          </StitchCard>

          {/* Right: Target Growth Areas */}
          <StitchCard className="p-6 space-y-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Actionable Priorities</span>
              <h3 className="text-base font-extrabold text-white mt-1">High-Impact Target Growth Areas</h3>
            </div>

            <div className="space-y-3">
              {targetGrowthAreas.map((area, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-sm text-white">{area.skill}</span>
                      <StitchBadge label={area.priority} variant={area.variant} />
                    </div>
                    <p className="text-xs text-slate-400">
                      Score: <strong className="text-amber-400">{area.current}%</strong> / {area.required}% target ({area.gap})
                    </p>
                  </div>

                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
                    {area.impact}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/student/learning-path"
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs text-center flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/25 transition-all mt-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Begin Personalized Learning Path</span>
            </Link>
          </StitchCard>
        </div>

      </div>
    </DashboardLayout>
  );
};
