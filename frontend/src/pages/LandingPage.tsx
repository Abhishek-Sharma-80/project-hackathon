import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  Languages, 
  MapPin, 
  Users, 
  BrainCircuit, 
  Award, 
  Zap, 
  BookOpen, 
  FileText, 
  ChevronRight 
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { MatchBreakdownModal } from '../components/dashboard/MatchBreakdownModal';
import { QuickApplyModal } from '../components/dashboard/QuickApplyModal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Internship, RecommendationBreakdown } from '../types';

export const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Interactive Live AI Simulator State in Hero
  const [selectedDemoSkills, setSelectedDemoSkills] = useState<string[]>(['React', 'JavaScript']);
  const [selectedDemoSector, setSelectedDemoSector] = useState<string>('Software Development');

  // Explainable Modal preview state
  const [selectedPreview, setSelectedPreview] = useState<{
    internship: Internship;
    breakdown: RecommendationBreakdown;
  } | null>(null);

  const [applyModalIntern, setApplyModalIntern] = useState<Internship | null>(null);

  // Available skills in simulator
  const simulatorSkills = ['React', 'JavaScript', 'TypeScript', 'Python', 'Machine Learning', 'Node.js', 'SQL', 'Figma', 'Docker'];

  const toggleSkill = (skill: string) => {
    if (selectedDemoSkills.includes(skill)) {
      if (selectedDemoSkills.length > 1) {
        setSelectedDemoSkills(selectedDemoSkills.filter(s => s !== skill));
      }
    } else {
      setSelectedDemoSkills([...selectedDemoSkills, skill]);
    }
  };

  // Dynamic calculated score for simulator
  const simScore = Math.min(
    98,
    Math.round(
      (selectedDemoSkills.filter(s => ['React', 'JavaScript', 'TypeScript', 'Node.js'].includes(s)).length / 4) * 40 +
      (selectedDemoSector === 'Software Development' ? 30 : 15) +
      20 + // Education
      8    // Location
    )
  );

  const samplePreviewInternships: { internship: Internship; breakdown: RecommendationBreakdown }[] = [
    {
      internship: {
        id: 'sample-1',
        companyName: 'NexGen AI Labs',
        companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&crop=faces&q=80',
        title: 'Machine Learning & AI Intern',
        description: 'Train predictive deep learning models and build FastAPI inference microservices.',
        responsibilities: ['Train PyTorch models', 'Build evaluation datasets'],
        requiredSkills: ['Python', 'Machine Learning', 'Pandas', 'NumPy'],
        preferredSkills: ['PyTorch', 'FastAPI'],
        sector: 'Artificial Intelligence',
        roleCategory: 'AI & Data Science',
        location: 'Bengaluru / Remote',
        workMode: 'Hybrid',
        duration: '6 Months',
        stipend: '₹35,000 / month',
        stipendAmount: 35000,
        openings: 3,
        minQualification: 'B.Tech / MCA',
        preferredBranches: ['Computer Science', 'AI'],
        postedAt: '2025-02-15',
        status: 'active'
      },
      breakdown: {
        skillsScore: 92,
        sectorScore: 100,
        educationScore: 90,
        locationScore: 85,
        finalMatchScore: 94,
        selectionProbability: 82,
        probabilityLevel: 'High',
        matchedSkills: ['Python', 'Machine Learning', 'Pandas'],
        missingSkills: ['PyTorch'],
        reasons: [
          'Your Python and ML fundamentals directly match 90% of requirements.',
          'Your preferred sector is Artificial Intelligence.',
          'Hybrid work mode in Bengaluru fits your preference.'
        ],
        improvementTips: ['Learn PyTorch tensor basics to maximize your interview selection chances.']
      }
    },
    {
      internship: {
        id: 'sample-2',
        companyName: 'CloudScale Technologies',
        companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop&crop=faces&q=80',
        title: 'Frontend Developer Intern (React)',
        description: 'Build modern responsive React and TypeScript UI components with high performance.',
        responsibilities: ['Build modular React components', 'Integrate REST APIs'],
        requiredSkills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
        preferredSkills: ['TypeScript', 'Next.js'],
        sector: 'Software Development',
        roleCategory: 'Frontend',
        location: 'Remote',
        workMode: 'Remote',
        duration: '3 Months',
        stipend: '₹25,000 / month',
        stipendAmount: 25000,
        openings: 5,
        minQualification: 'B.Tech / BCA',
        preferredBranches: ['Computer Science', 'IT'],
        postedAt: '2025-02-18',
        status: 'active'
      },
      breakdown: {
        skillsScore: 95,
        sectorScore: 100,
        educationScore: 85,
        locationScore: 100,
        finalMatchScore: 96,
        selectionProbability: 88,
        probabilityLevel: 'High',
        matchedSkills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
        missingSkills: ['TypeScript'],
        reasons: [
          'Strong proficiency in modern React and Tailwind CSS.',
          '100% remote work mode matches your semester schedule perfectly.',
          'Software Development aligns with your primary career track.'
        ],
        improvementTips: ['Explore TypeScript interfaces to unlock full-stack advancement.']
      }
    },
    {
      internship: {
        id: 'sample-3',
        companyName: 'Aura Studio UI/UX',
        companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&h=128&fit=crop&crop=faces&q=80',
        title: 'UI/UX Product Design Intern',
        description: 'Create human-centric wireframes, user journeys, interactive Figma prototypes, and design systems.',
        responsibilities: ['Create Figma wireframes', 'Conduct usability interviews'],
        requiredSkills: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
        preferredSkills: ['Adobe XD', 'HTML5'],
        sector: 'Design',
        roleCategory: 'Design',
        location: 'Pune',
        workMode: 'On-site',
        duration: '4 Months',
        stipend: '₹20,000 / month',
        stipendAmount: 20000,
        openings: 2,
        minQualification: 'Any Graduate',
        preferredBranches: ['Design', 'CS', 'Any'],
        postedAt: '2025-02-14',
        status: 'active'
      },
      breakdown: {
        skillsScore: 85,
        sectorScore: 90,
        educationScore: 80,
        locationScore: 70,
        finalMatchScore: 84,
        selectionProbability: 74,
        probabilityLevel: 'Medium',
        matchedSkills: ['Figma', 'UI/UX Design'],
        missingSkills: ['Prototyping'],
        reasons: [
          'Your Figma and wireframing portfolio demonstrates strong UI aesthetics.',
          'Great launchpad for students targeting product design.'
        ],
        improvementTips: ['Include an end-to-end interactive Figma prototype in your portfolio.']
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        
        {/* Background Subtle Gradient Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-sky-500/20 to-purple-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-bold text-indigo-600 dark:text-indigo-300 shadow-sm animate-pulse-slow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('hero_badge')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {t('hero_title_1')}{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 bg-clip-text text-transparent">
                  {t('hero_title_2')}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('hero_subtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
                >
                  <span>{t('hero_btn_find')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/explore"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>{t('hero_btn_explore')}</span>
                </Link>
              </div>

              {/* Trust Micro-Metrics */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No Blind Applying</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Free For Students</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Actionable Skill Roadmaps</span>
                </div>
              </div>
            </div>

            {/* Hero Visual: Interactive AI Simulator Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                
                {/* Glow behind card */}
                <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-600/30 rounded-3xl blur-2xl transform rotate-1"></div>

                <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-5">
                  
                  {/* Simulator Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                        <BrainCircuit className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                          {t('hero_interactive_title')}
                        </h3>
                        <span className="text-[10px] text-slate-400">Live Formula Calculation</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Live Simulation
                    </span>
                  </div>

                  {/* Simulator Controls */}
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t('hero_interactive_desc')}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {simulatorSkills.map(skill => {
                        const isSelected = selectedDemoSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                              isSelected
                                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 scale-105'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Simulation Output Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-sky-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-indigo-100 dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Target Role</span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Frontend Developer Intern</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">{simScore}%</span>
                        <span className="block text-[9px] font-bold text-slate-400">AI Compatibility</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <motion.div
                        animate={{ width: `${simScore}%` }}
                        transition={{ duration: 0.4 }}
                        className="h-full bg-gradient-to-r from-indigo-600 to-sky-500 rounded-full"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 pt-1">
                      <span>Skills Match: <strong>{selectedDemoSkills.length * 15}%</strong></span>
                      <span>Sector Fit: <strong>100%</strong></span>
                      <span>Education: <strong>95%</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/signup')}
                    className="w-full py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/25 flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <span>Analyze Full Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 1. Trusted / Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('stats_recommendations')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('stats_recommendations_sub')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('stats_skills')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('stats_skills_sub')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('stats_ai')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('stats_ai_sub')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('stats_multilingual')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('stats_multilingual_sub')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* 2. How It Works (4-Step Process Timeline) */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('hiw_title')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('hiw_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative space-y-4 hover:border-indigo-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-indigo-600/30">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('hiw_step1_title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('hiw_step1_desc')}</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative space-y-4 hover:border-indigo-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-sky-500/30">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('hiw_step2_title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('hiw_step2_desc')}</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative space-y-4 hover:border-indigo-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-emerald-500/30">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('hiw_step3_title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('hiw_step3_desc')}</p>
          </div>

          {/* Step 4 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative space-y-4 hover:border-indigo-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-purple-600/30">
              4
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('hiw_step4_title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('hiw_step4_desc')}</p>
          </div>

        </div>
      </section>

      {/* 3. Why InternDisha? (6 Features Grid) */}
      <section id="why-us" className="py-20 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('why_title')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('why_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('why_f1_title')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_f1_desc')}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('why_f2_title')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_f2_desc')}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('why_f3_title')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_f3_desc')}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('why_f4_title')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_f4_desc')}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('why_f5_title')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_f5_desc')}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('why_f6_title')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_f6_desc')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Recommendation Preview Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Sample Opportunities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('dash_top_matches_title')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg">
              Explore how our algorithm breaks down matches with complete explainability.
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center space-x-1"
          >
            <span>{t('dash_view_all_rec')}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {samplePreviewInternships.map(item => (
            <div
              key={item.internship.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400">{item.internship.companyName}</span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{item.internship.title}</h3>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-extrabold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    {item.breakdown.finalMatchScore}% Match
                  </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p><strong>Matched Skills:</strong> {item.breakdown.matchedSkills.join(', ')}</p>
                  <p><strong>Missing Skill:</strong> {item.breakdown.missingSkills.join(', ') || 'None'}</p>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  "{item.breakdown.reasons[0]}"
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPreview(item)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Recommendation</span>
                </button>

                <button
                  onClick={() => setApplyModalIntern(item.internship)}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {t('cta_title')}
          </h2>
          <p className="text-sm sm:text-base text-indigo-200 max-w-xl mx-auto">
            {t('cta_subtitle')}
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate(isAuthenticated ? '/recommendations' : '/signup')}
              className="px-8 py-4 rounded-xl bg-white text-indigo-900 font-extrabold text-sm shadow-2xl hover:bg-indigo-50 transition-all hover:scale-105"
            >
              {t('cta_button')}
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Preview Modal */}
      {selectedPreview && (
        <MatchBreakdownModal
          isOpen={!!selectedPreview}
          onClose={() => setSelectedPreview(null)}
          internship={selectedPreview.internship}
          breakdown={selectedPreview.breakdown}
          onApply={() => {
            setApplyModalIntern(selectedPreview.internship);
            setSelectedPreview(null);
          }}
        />
      )}

      {/* Quick Apply Modal */}
      {applyModalIntern && (
        <QuickApplyModal
          isOpen={!!applyModalIntern}
          onClose={() => setApplyModalIntern(null)}
          internship={applyModalIntern}
        />
      )}
    </div>
  );
};
