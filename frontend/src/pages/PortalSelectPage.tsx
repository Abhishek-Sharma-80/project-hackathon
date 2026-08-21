import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Compass, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  TrendingUp, 
  Briefcase, 
  Users, 
  Sun, 
  Moon,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const PortalSelectPage: React.FC = () => {
  const { demoLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const portals = [
    {
      id: 'student',
      title: 'Student Portal',
      roleName: 'Student',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600',
      accentBorder: 'border-blue-500/30 hover:border-blue-500',
      accentGlow: 'hover:shadow-blue-500/20',
      badge: 'Career & Learning',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      tagline: 'Discover AI-powered internship recommendations, analyze your skills, build your career profile and follow personalized learning paths.',
      features: [
        'AI Internship Recommendations (91%+ Matches)',
        'Interactive Skill Gap Radar Analysis',
        'Personalized 5-Step Career Roadmaps',
        'Kanban Application Tracking Board',
        'Real-time ATS Resume Keyword Scoring'
      ],
      loginPath: '/student/login',
      registerPath: '/student/register',
      ctaText: 'Continue as Student',
      demoAction: () => {
        demoLogin('student');
        navigate('/student/dashboard');
      }
    },
    {
      id: 'recruiter',
      title: 'Recruiter / Company Portal',
      roleName: 'Recruiter',
      icon: Building2,
      color: 'from-emerald-600 to-teal-600',
      accentBorder: 'border-emerald-500/30 hover:border-emerald-500',
      accentGlow: 'hover:shadow-emerald-500/20',
      badge: 'Corporate Talent Hub',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      tagline: 'Post internships, discover AI-matched candidates, review verified technical skills, and manage hiring pipelines efficiently.',
      features: [
        'Post & Manage Multi-City Internship Listings',
        'AI Candidate Matching & Suitability Scoring',
        '1-Click Shortlist, Interview & Offer Pipeline',
        'Recruiter Performance & Hiring Analytics',
        'Verified Partner Company Profile'
      ],
      loginPath: '/recruiter/login',
      registerPath: '/recruiter/register',
      ctaText: 'Continue as Recruiter',
      demoAction: () => {
        demoLogin('recruiter');
        navigate('/recruiter/dashboard');
      }
    },
    {
      id: 'admin',
      title: 'Admin / College Portal',
      roleName: 'Administrator',
      icon: ShieldCheck,
      color: 'from-purple-600 to-indigo-700',
      accentBorder: 'border-purple-500/30 hover:border-purple-500',
      accentGlow: 'hover:shadow-purple-500/20',
      badge: 'Enterprise Governance',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      tagline: 'Manage students, internships, companies, AI recommendation algorithms, institutional analytics and platform operations.',
      features: [
        'Student Cohort & Verification Management',
        'Corporate Internship Approval Workflows',
        'AI Recommendation Formula Weight Tuner',
        'University Skill Gap & Bottleneck Matrix',
        'Executive PDF & CSV Placement Reports'
      ],
      loginPath: '/admin/login',
      registerPath: null, // No public admin registration
      ctaText: 'Continue as Admin',
      demoAction: () => {
        demoLogin('admin');
        navigate('/admin/dashboard');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#070A11] text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Background Glow Blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 🧭 TOP NAVBAR */}
      <header className="relative z-20 h-20 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-6 sm:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              InternDisha
            </span>
            <span className="text-[9px] font-extrabold tracking-widest text-indigo-400 uppercase">
              AI Career Platform
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-slate-900"
          >
            ← Back to Homepage
          </Link>
          
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </header>

      {/* 🌟 HERO HEADING & SELECTION CARDS */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        
        {/* Title Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-extrabold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Role-Based Authentication</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Welcome to <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-300 bg-clip-text text-transparent">InternDisha</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-medium max-w-xl mx-auto">
            Choose your dedicated portal below to access customized dashboards, tools, and AI recommendation workflows.
          </p>
        </div>

        {/* 🗂️ 3 LARGE INTERACTIVE PORTAL CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {portals.map(portal => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={portal.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className={`rounded-3xl bg-slate-900/70 backdrop-blur-xl border ${portal.accentBorder} p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl ${portal.accentGlow} transition-all duration-300 relative group overflow-hidden`}
              >
                {/* Top Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${portal.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border ${portal.badgeBg}`}>
                      {portal.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">{portal.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed font-normal">
                      {portal.tagline}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                    {portal.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  <Link
                    to={portal.loginPath}
                    className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${portal.color} text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg hover:opacity-95 transition-all group/btn`}
                  >
                    <span>{portal.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
                    <button
                      onClick={portal.demoAction}
                      className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center space-x-1"
                    >
                      <span>⚡ Instant Demo ({portal.roleName})</span>
                    </button>

                    {portal.registerPath ? (
                      <Link
                        to={portal.registerPath}
                        className="font-semibold text-slate-400 hover:text-white hover:underline"
                      >
                        Register →
                      </Link>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">🔒 Internal Access</span>
                    )}
                  </div>
                </div>

                {/* Subtle bottom gradient glow */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${portal.color}`} />
              </motion.div>
            );
          })}
        </div>

        {/* Security & Multi-Role Note */}
        <div className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center space-x-2">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>Role-isolated session security: Student, Recruiter, and Admin portals are securely partitioned.</span>
        </div>

      </main>

      {/* 📄 FOOTER */}
      <footer className="relative z-20 py-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
        InternDisha AI Platform • Find the Right Internship. Build the Right Skills. Shape Your Future.
      </footer>

    </div>
  );
};
