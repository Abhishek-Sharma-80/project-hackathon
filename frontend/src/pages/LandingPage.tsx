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
  ChevronRight,
  Code,
  Building2,
  Lock,
  PlayCircle,
  Star,
  Activity,
  Check,
  Briefcase,
  Map as MapIcon
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
  const [selectedDemoSkills, setSelectedDemoSkills] = useState<string[]>(['Java', 'SQL', 'Git']);
  const [selectedDemoSector, setSelectedDemoSector] = useState<string>('Software Development');

  // Explainable Modal preview state
  const [selectedPreview, setSelectedPreview] = useState<{
    internship: Internship;
    breakdown: RecommendationBreakdown;
  } | null>(null);

  const [applyModalIntern, setApplyModalIntern] = useState<Internship | null>(null);

  // Available skills in simulator
  const simulatorSkills = ['Java', 'SQL', 'Git', 'Spring Boot', 'REST APIs', 'Docker', 'Python', 'React', 'DSA'];

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
      (selectedDemoSkills.filter(s => ['Java', 'SQL', 'Git', 'Spring Boot', 'REST APIs'].includes(s)).length / 5) * 40 +
      (selectedDemoSector === 'Software Development' ? 30 : 15) +
      20 + // Education
      8    // Location
    )
  );

  const samplePreviewInternships: { internship: Internship; breakdown: RecommendationBreakdown }[] = [
    {
      internship: {
        id: 'sample-1',
        companyName: 'TechNova',
        companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&crop=faces&q=80',
        title: 'Backend Developer Intern',
        description: 'Architect scalable Java Spring Boot microservices and optimize PostgreSQL queries for 2M+ daily active requests.',
        responsibilities: ['Build REST APIs', 'Optimize database performance', 'Implement Redis caching'],
        requiredSkills: ['Java', 'SQL', 'Git', 'Spring Boot'],
        preferredSkills: ['Docker', 'REST APIs'],
        sector: 'Software Development',
        roleCategory: 'Backend',
        location: 'Remote',
        workMode: 'Remote',
        duration: '6 Months',
        stipend: '₹15,000 / month',
        stipendAmount: 15000,
        openings: 4,
        minQualification: 'B.Tech / MCA',
        preferredBranches: ['Computer Science', 'IT'],
        postedAt: '2025-02-18',
        status: 'active'
      },
      breakdown: {
        skillsScore: 92,
        sectorScore: 100,
        educationScore: 90,
        locationScore: 85,
        finalMatchScore: 91,
        selectionProbability: 88,
        probabilityLevel: 'High',
        matchedSkills: ['Java', 'SQL', 'Git', 'OOP', 'Communication', 'Problem Solving'],
        missingSkills: ['Spring Boot', 'REST APIs', 'Docker'],
        reasons: [
          'Java skills strongly match requirements with demonstrated project proficiency',
          'SQL knowledge matches requirements and database schema design needs',
          'Your career interest aligns directly with backend software development',
          'Your projects demonstrate relevant experience in building scalable API systems'
        ],
        improvementTips: [
          'Complete the Spring Boot Basics module on your roadmap to reach 98% compatibility'
        ]
      }
    },
    {
      internship: {
        id: 'sample-2',
        companyName: 'CodeCraft Solutions',
        companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop&crop=faces&q=80',
        title: 'Java Developer Intern',
        description: 'Develop enterprise cloud applications, implement data structures, and write clean unit-tested Java code for financial clients.',
        responsibilities: ['Write clean Java modules', 'Automated JUnit testing'],
        requiredSkills: ['Java', 'OOP', 'DSA', 'SQL'],
        preferredSkills: ['Spring MVC', 'Hibernate'],
        sector: 'Software Development',
        roleCategory: 'Java Development',
        location: 'Bengaluru / Hybrid',
        workMode: 'Hybrid',
        duration: '6 Months',
        stipend: '₹20,000 / month',
        stipendAmount: 20000,
        openings: 3,
        minQualification: 'B.Tech / B.E.',
        preferredBranches: ['Computer Science', 'IT'],
        postedAt: '2025-02-17',
        status: 'active'
      },
      breakdown: {
        skillsScore: 90,
        sectorScore: 95,
        educationScore: 85,
        locationScore: 80,
        finalMatchScore: 87,
        selectionProbability: 84,
        probabilityLevel: 'High',
        matchedSkills: ['Java', 'OOP', 'DSA', 'SQL', 'Git'],
        missingSkills: ['Spring MVC'],
        reasons: [
          'Strong core Java OOP fundamentals and DSA competitive score',
          'Verified student certifications in Java SE 17'
        ],
        improvementTips: ['Learn Spring MVC dependency injection']
      }
    },
    {
      internship: {
        id: 'sample-3',
        companyName: 'NexGen AI Labs',
        companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&crop=faces&q=80',
        title: 'Machine Learning & AI Intern',
        description: 'Train cutting-edge transformer models, build evaluation benchmarks, and deploy FastAPI inference endpoints.',
        responsibilities: ['Train PyTorch models', 'Build vector database pipelines'],
        requiredSkills: ['Python', 'Machine Learning', 'PyTorch', 'FastAPI'],
        preferredSkills: ['Docker', 'HuggingFace'],
        sector: 'Artificial Intelligence',
        roleCategory: 'AI & Data Science',
        location: 'Bengaluru / Hybrid',
        workMode: 'Hybrid',
        duration: '6 Months',
        stipend: '₹35,000 / month',
        stipendAmount: 35000,
        openings: 3,
        minQualification: 'B.Tech / MCA',
        preferredBranches: ['CS', 'AI', 'Data Science'],
        postedAt: '2025-02-15',
        status: 'active'
      },
      breakdown: {
        skillsScore: 92,
        sectorScore: 100,
        educationScore: 95,
        locationScore: 85,
        finalMatchScore: 94,
        selectionProbability: 86,
        probabilityLevel: 'High',
        matchedSkills: ['Python', 'SQL', 'Git', 'DSA', 'OOP'],
        missingSkills: ['PyTorch', 'FastAPI'],
        reasons: [
          'Python foundation and career interest in AI align seamlessly with NexGen roadmap',
          'Academic CGPA (8.4) exceeds minimum threshold of 8.0'
        ],
        improvementTips: ['Complete a PyTorch model deployment project on GitHub']
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        
        {/* Background Glowing Gradient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-sky-500/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-sky-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 text-xs font-bold text-indigo-600 dark:text-indigo-300 shadow-sm animate-pulse-slow">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Find the Right Internship. Build the Right Skills. Shape Your Future.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Your AI Guide to the{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent">
                  Right Internship
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover internships that match your skills, interests, education and career goals. Understand your skill gaps and get a personalized learning roadmap.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/explore"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Explore Internships</span>
                </Link>
              </div>

              {/* Trust Micro-Metrics */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Explainable AI Formulas</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Free For Students</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Personalized Roadmaps</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Futuristic Animated AI Dashboard Preview */}
            <div className="lg:col-span-5">
              <div className="relative">
                
                {/* Glowing Aura Behind Card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-600/30 rounded-3xl blur-2xl transform rotate-1"></div>

                <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-5">
                  
                  {/* Top Dashboard Preview Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                        <BrainCircuit className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                          AI Recommendation Preview
                        </h3>
                        <span className="text-[10px] text-slate-400">Live 4-Factor Matching</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                      <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                      <span>Live Simulation</span>
                    </div>
                  </div>

                  {/* Feature Card: Backend Developer Internship */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-purple-50/40 to-sky-50/40 dark:from-slate-800/90 dark:to-slate-800/40 border border-indigo-100 dark:border-slate-700 space-y-3 shadow-inner">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Target Internship</span>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">Backend Developer Intern</h4>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">TechNova • Remote • 6 Months</span>
                      </div>

                      {/* AI Match Score Ring Indicator (91%) */}
                      <div className="px-3 py-1.5 rounded-2xl bg-indigo-600 text-white text-right shrink-0 shadow-md shadow-indigo-600/30">
                        <span className="text-lg font-extrabold">{simScore}%</span>
                        <span className="text-[8px] uppercase tracking-wider block opacity-90">AI Match</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                        <span>Selection Probability: <strong className="text-emerald-600 dark:text-emerald-400">High (88%)</strong></span>
                        <span>{simScore}% Compatibility</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <motion.div
                          animate={{ width: `${simScore}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-sky-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Matched vs Missing Skills Chips */}
                    <div className="space-y-2 pt-1 text-[11px]">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                          ✓ Skills Matched:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {['Java', 'SQL', 'Git', 'OOP'].map(s => (
                            <span key={s} className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-semibold">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 block mb-1">
                          ⚠️ Missing Skills (To Improve):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {['Spring Boot', 'REST APIs', 'Docker'].map(s => (
                            <span key={s} className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-[10px] font-semibold">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Learning Roadmap Preview Node */}
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[11px] flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapIcon className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Roadmap: <strong>Spring Boot Basics</strong> (10h)</span>
                      </div>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">In Progress</span>
                    </div>
                  </div>

                  {/* Interactive Skill Selector */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Toggle skills to see score formula in action:
                    </span>
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

                  <button
                    onClick={() => navigate('/signup')}
                    className="w-full py-3 text-xs font-extrabold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                  >
                    <span>Analyze My Full Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trusted Statistics Section (10K+ Students, 500+ Internships, 1,200+ Skills Analyzed, 85% Better Matches) */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white block">
                {t('stats_students')}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('stats_students_sub')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white block">
                {t('stats_internships')}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('stats_internships_sub')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2">
                <Code className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white block">
                {t('stats_skills')}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('stats_skills_sub')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white block">
                {t('stats_matches')}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('stats_matches_sub')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works 6-Step Overview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Intelligent 6-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How InternDisha Works
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            From profile discovery to skill growth roadmaps and final placement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { num: 1, title: 'Build Profile', desc: 'Education, skills, projects, preferences' },
            { num: 2, title: 'AI Analysis', desc: '4-factor similarity matching formula' },
            { num: 3, title: 'Smart Match', desc: 'Ranked recommendations & selection probability' },
            { num: 4, title: 'Skill Gap', desc: 'Detect missing & developing competencies' },
            { num: 5, title: 'Learning Path', desc: 'Visual timeline roadmap from beginner to capstone' },
            { num: 6, title: 'Apply & Track', desc: '1-click quick apply & Kanban stage tracking' }
          ].map(s => (
            <div
              key={s.num}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 text-center hover:border-indigo-400 transition-all hover:scale-102"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-sm mx-auto shadow-md shadow-indigo-600/25">
                {s.num}
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">{s.title}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            to="/how-it-works"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Explore Complete Interactive AI Flow & Simulation</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why InternDisha? (6 Feature Cards) */}
      <section className="py-20 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
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
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('why_f5_title')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_f5_desc')}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('why_f6_title')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_f6_desc')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Recommendation Preview Section */}
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
                  <span>Explain Score</span>
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-navy-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Find the Right Internship. Build the Right Skills. Shape Your Future.
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
