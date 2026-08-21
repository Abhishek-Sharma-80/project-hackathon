import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  BrainCircuit, 
  Sparkles, 
  TrendingUp, 
  Map, 
  Briefcase, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  Sliders, 
  Compass, 
  ChevronRight, 
  ShieldCheck, 
  Layers, 
  Target, 
  Zap 
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const HowItWorksPage: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      id: 'profile',
      title: 'Step 1 – Build Your Profile',
      icon: User,
      color: 'from-blue-500 to-indigo-600',
      tag: 'Student Profile Setup',
      headline: 'Capture your complete academic and technical baseline',
      description: 'Students provide structured details to help the AI engine understand their background:',
      points: [
        'Education & Academic Standing (College, Branch, Year, CGPA)',
        'Technical & Core Skills (Java, Python, React, SQL, DSA, etc.)',
        'Hands-on Projects & GitHub Repositories',
        'Career Domain Interests & Preferred Role Specializations',
        'Location, Remote / Hybrid / On-site Preferences, and Duration'
      ],
      interactivePreview: {
        label: 'Student Input Vector',
        data: ['Galgotias University • B.Tech CSE (8.4 CGPA)', 'Skills: Java, SQL, Git, OOP, DSA, React', 'Goal: Backend Developer Intern (Remote)']
      }
    },
    {
      number: 2,
      id: 'analysis',
      title: 'Step 2 – AI Analysis',
      icon: BrainCircuit,
      color: 'from-indigo-600 to-purple-600',
      tag: 'Multi-Vector Matching',
      headline: 'Multi-dimensional mathematical similarity engine',
      description: 'Our explainable recommendation engine evaluates 4 distinct compatibility dimensions with weighted formulas:',
      points: [
        'Skill Similarity Match (40% Weight) – compares verified vs required competencies',
        'Sector & Role Alignment (30% Weight) – matches career track intent',
        'Educational Eligibility (20% Weight) – checks branch and qualification criteria',
        'Location & Work Mode Fit (10% Weight) – aligns semester availability'
      ],
      interactivePreview: {
        label: 'Weighted Scoring Engine',
        data: ['Skills (40%): 92%', 'Sector (30%): 100%', 'Education (20%): 90%', 'Location (10%): 85%']
      }
    },
    {
      number: 3,
      id: 'recommendations',
      title: 'Step 3 – Smart Recommendations',
      icon: Sparkles,
      color: 'from-purple-600 to-pink-600',
      tag: 'Explainable AI Ranking',
      headline: 'Ranked top matching opportunities with complete transparency',
      description: 'Students receive high-compatibility internship recommendations with explainability reasons:',
      points: [
        'Top 3-5 ranked internship opportunities',
        'Exact AI Match Percentage (e.g. 91% Match at TechNova)',
        'Human-readable explainability checklist explaining why it fits',
        'Selection probability indicator (High / Medium / Low)'
      ],
      interactivePreview: {
        label: 'Ranked Output Match',
        data: ['Backend Developer Intern @ TechNova (91% Match)', 'Selection Probability: High (88%)', '✓ Java, SQL and backend interests match requirements']
      }
    },
    {
      number: 4,
      id: 'skill-gap',
      title: 'Step 4 – Skill Gap Detection',
      icon: TrendingUp,
      color: 'from-pink-600 to-rose-600',
      tag: 'Competency Analysis',
      headline: 'Pinpointing high-impact missing competencies',
      description: 'The recommendation engine analyzes requirement gaps across shortlisted listings:',
      points: [
        'Identifies missing required and preferred skills',
        'Highlights weak or developing areas (e.g. Spring Boot, REST APIs, Docker)',
        'Calculates exact number of new internships unlocked by learning each skill',
        'Curates free industry documentation and tutorials'
      ],
      interactivePreview: {
        label: 'Gap Detection Radar',
        data: ['Missing: Spring Boot (Unlocks +15 Roles)', 'Missing: Docker (Unlocks +10 Roles)', 'AI Action: "Focus on Spring Boot & Docker to reach 98% match"']
      }
    },
    {
      number: 5,
      id: 'learning-path',
      title: 'Step 5 – Personalized Learning Path',
      icon: Map,
      color: 'from-amber-500 to-orange-600',
      tag: 'Milestone Roadmap',
      headline: 'Step-by-step career milestones from beginner to advanced',
      description: 'Generates an interactive visual timeline that guides students to internship readiness:',
      points: [
        'Step 1: Spring Boot Basics (10 Hours)',
        'Step 2: Build REST APIs & JPA Persistence (12 Hours)',
        'Step 3: Docker Fundamentals & Containerization (8 Hours)',
        'Step 4: Build a Backend Capstone Project (15 Hours)',
        'Step 5: Apply for Recommended Internships & Interview Prep'
      ],
      interactivePreview: {
        label: 'Milestone Progress Tracker',
        data: ['5 Connected Timeline Nodes', 'Interactive Mark-as-Complete with Confetti', 'Project Ideas & Free Documentation Links']
      }
    },
    {
      number: 6,
      id: 'apply-track',
      title: 'Step 6 – Apply and Track',
      icon: Briefcase,
      color: 'from-emerald-500 to-teal-600',
      tag: 'Kanban Application Suite',
      headline: 'End-to-end application lifecycle management',
      description: 'Streamlined application workflow with real-time status tracking:',
      points: [
        '1-Click Quick Apply with prefilled verified credentials',
        'Bookmark and save favorite internship listings',
        'Visual Kanban board stages: Saved → Applied → Under Review → Shortlisted → Selected',
        'Interview reminders, preparation notes, and status notifications'
      ],
      interactivePreview: {
        label: 'Kanban Lifecycle Board',
        data: ['Saved (2) • Applied (4) • Shortlisted (1) • Interview (1)', 'Instant Status Transition Dropdown', 'Custom Cover Note Generator']
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Header Hero */}
      <section className="relative pt-16 pb-20 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-sky-500/15 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-600 dark:text-indigo-300 shadow-sm">
            <BrainCircuit className="w-4 h-4 text-indigo-500" />
            <span>Explainable AI Engine Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent">InternDisha</span> Works
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover the complete 6-step intelligent workflow that turns your academic background and skills into high-paying internship offers.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-1.5 transition-all hover:scale-[1.02]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/explore"
              className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Explore Internships
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Step Navigator Bar */}
      <div className="sticky top-16 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-y border-slate-200/80 dark:border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto gap-2 no-scrollbar">
          {steps.map(s => {
            const Icon = s.icon;
            const isCurrent = activeStep === s.number;
            return (
              <button
                key={s.number}
                onClick={() => {
                  setActiveStep(s.number);
                  const el = document.getElementById(`flow-step-${s.number}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shrink-0 transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isCurrent ? 'bg-white text-indigo-600 font-extrabold' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                  {s.number}
                </span>
                <span>{s.title.split('–')[1] || s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed 6 Steps Animated Flow */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isEven = idx % 2 === 1;

          return (
            <div
              id={`flow-step-${step.number}`}
              key={step.number}
              className="relative"
            >
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden transition-all hover:border-indigo-400 dark:hover:border-indigo-600">
                
                {/* Background Glow */}
                <div className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${step.color} opacity-10 rounded-full blur-3xl pointer-events-none`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Step Description */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {step.tag}
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {step.title}
                    </h2>
                    <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      {step.headline}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-2 pt-2">
                      {step.points.map((pt, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual Simulation Card */}
                  <div className="lg:col-span-5">
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60 text-xs">
                        <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
                          {step.interactivePreview.label}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          Live Engine State
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        {step.interactivePreview.data.map((item, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Connecting Down Arrow */}
              {idx < steps.length - 1 && (
                <div className="flex justify-center my-6">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-md animate-bounce">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white text-center space-y-6">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready to experience AI-powered career recommendations?
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-xl mx-auto">
            Create your student profile in under 2 minutes and unlock explainable matches tailored for you.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate(isAuthenticated ? '/recommendations' : '/signup')}
              className="px-8 py-3.5 rounded-xl bg-white text-indigo-900 font-extrabold text-xs shadow-2xl hover:bg-indigo-50 transition-all hover:scale-105"
            >
              Generate My Recommendations Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
