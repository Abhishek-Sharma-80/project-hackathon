import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  PlayCircle, 
  Sparkles, 
  Clock, 
  Award, 
  Layers, 
  ArrowRight, 
  ExternalLink,
  BookMarked,
  Video,
  FileCode2,
  BrainCircuit
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StitchCard, StitchProgressBar, StitchBadge } from '../components/stitch/StitchComponents';

export const LearningPathPage: React.FC = () => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(1);

  const modules = [
    {
      id: 1,
      number: '01',
      title: 'Spring Boot Fundamentals',
      status: 'Completed',
      progress: 100,
      description: 'Master core concepts of dependency injection, auto-configuration, application properties, and Maven build lifecycles.',
      lessons: '6 Lessons • 4h 30m',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 2,
      number: '02',
      title: 'Build Production REST APIs',
      status: 'In Progress',
      progress: 25,
      description: 'Design and implement RESTful microservices with Spring Web controllers, custom exception handlers, DTO mappers, and Swagger documentation.',
      lessons: '8 Lessons • 6h 15m (Active)',
      icon: <PlayCircle className="w-5 h-5 text-indigo-400" />
    },
    {
      id: 3,
      number: '03',
      title: 'Docker & Containerization',
      status: 'Locked',
      progress: 0,
      description: 'Containerize backend Java services, write optimized multi-stage Dockerfiles, configure Docker Compose networks, and manage container volumes.',
      lessons: '5 Lessons • 3h 45m',
      icon: <Lock className="w-5 h-5 text-slate-500" />
    },
    {
      id: 4,
      number: '04',
      title: 'Capstone: Cloud Backend Project',
      status: 'Locked',
      progress: 0,
      description: 'Architect a production-ready microservice deployed to AWS ECS/EKS with PostgreSQL RDS integration, Redis caching, and CI/CD pipelines.',
      lessons: 'Project • 10h Estimated',
      icon: <Lock className="w-5 h-5 text-slate-500" />
    }
  ];

  const resources = [
    {
      type: 'Book',
      icon: <BookMarked className="w-4 h-4 text-purple-400" />,
      title: 'Effective Java (3rd Edition)',
      author: 'Joshua Bloch',
      badge: 'Recommended Reading'
    },
    {
      type: 'Video Course',
      icon: <Video className="w-4 h-4 text-sky-400" />,
      title: 'REST API Design & Architecture Patterns',
      author: 'TechNova Engineering Labs',
      badge: 'Interactive Lab'
    }
  ];

  const skillChips = ['Java 17', 'Spring Boot 3', 'REST APIs', 'Docker', 'PostgreSQL', 'JUnit 5'];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto font-sans">
        
        {/* 🌟 1. HERO PATH HEADER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-[#070A11] border border-indigo-500/20 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase">
                  <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Personalized AI Curriculum</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight pt-1">
                  Your Path to Backend Development
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  Tailored progression designed to bridge your skill gap for TechNova Solutions and top tech internships.
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 shrink-0 text-right">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Roadmap Progress</span>
                <span className="text-2xl sm:text-3xl font-black text-indigo-400">42% Complete</span>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <StitchProgressBar value={42} showPercent={false} color="from-blue-500 via-indigo-500 to-purple-500" />
          </div>
        </div>

        {/* 💡 2. AI FOCUS INSIGHT */}
        <StitchCard className="p-6 bg-gradient-to-r from-indigo-950/40 via-blue-950/30 to-slate-900 border-indigo-500/30">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black text-indigo-300 uppercase tracking-wider">Next Step Strategy</span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                Focus on mastering <strong className="text-white">REST API principles</strong> next. It is a critical requirement for over <span className="text-emerald-400 font-extrabold">85%</span> of open backend engineering internships.
              </p>
            </div>
          </div>
        </StitchCard>

        {/* 📚 3. 4-MODULE CURRICULUM TIMELINE */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-white tracking-tight flex items-center space-x-2">
            <span>Curriculum Modules</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </h2>

          <div className="space-y-4">
            {modules.map((mod, idx) => (
              <StitchCard
                key={mod.id}
                hoverEffect={mod.status !== 'Locked'}
                className={`p-6 border transition-all ${
                  mod.status === 'In Progress'
                    ? 'border-indigo-500/40 bg-indigo-950/20 shadow-lg shadow-indigo-500/5'
                    : mod.status === 'Completed'
                    ? 'border-emerald-500/20 bg-slate-900/60'
                    : 'border-slate-800 bg-slate-900/40 opacity-75'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                      {mod.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-black text-slate-500">MODULE {mod.number}</span>
                        <StitchBadge
                          label={mod.status}
                          variant={
                            mod.status === 'Completed'
                              ? 'success'
                              : mod.status === 'In Progress'
                              ? 'info'
                              : 'neutral'
                          }
                        />
                      </div>
                      <h3 className="text-base font-extrabold text-white">{mod.title}</h3>
                      <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">{mod.description}</p>
                      <span className="text-[11px] font-bold text-slate-500 block pt-1">{mod.lessons}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center space-x-3">
                    {mod.status === 'In Progress' && (
                      <button className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-105">
                        <PlayCircle className="w-4 h-4" />
                        <span>Continue Lesson</span>
                      </button>
                    )}
                    {mod.status === 'Completed' && (
                      <button className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs">
                        Review Notes
                      </button>
                    )}
                    {mod.status === 'Locked' && (
                      <span className="text-xs text-slate-500 font-bold px-3 py-1 rounded-xl bg-slate-800/40">
                        Prerequisites Required
                      </span>
                    )}
                  </div>
                </div>

                {mod.status === 'In Progress' && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <StitchProgressBar value={mod.progress} label="Module Completion" color="from-blue-500 to-indigo-500" />
                  </div>
                )}
              </StitchCard>
            ))}
          </div>
        </div>

        {/* 📖 4. RECOMMENDED RESOURCES & SKILLS MAPPING */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Resources */}
          <StitchCard className="p-6 space-y-4">
            <h4 className="font-extrabold text-sm text-white">Recommended Resources</h4>
            <div className="space-y-3 text-xs">
              {resources.map((res, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center">
                      {res.icon}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-white">{res.title}</h5>
                      <span className="text-[11px] text-slate-400">{res.author}</span>
                    </div>
                  </div>
                  <StitchBadge label={res.badge} variant="purple" />
                </div>
              ))}
            </div>
          </StitchCard>

          {/* Target Skills Mapping */}
          <StitchCard className="p-6 space-y-4">
            <h4 className="font-extrabold text-sm text-white">Target Skills Validated in this Path</h4>
            <p className="text-xs text-slate-400">
              Completing all 4 modules will issue a verified credential and notify recruiters looking for these competencies.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {skillChips.map((chip, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-extrabold">
                  ✓ {chip}
                </span>
              ))}
            </div>
          </StitchCard>
        </div>

      </div>
    </DashboardLayout>
  );
};
