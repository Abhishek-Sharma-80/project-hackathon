import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  BrainCircuit,
  FileText,
  Users,
  Target,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { StitchCard } from '../components/stitch/StitchComponents';

export const PortalSelectPage: React.FC = () => {
  const portals = [
    {
      id: 'student',
      title: 'Student Portal',
      subtitle: 'For Internship Seekers & Learners',
      description: 'Discover AI-matched internships, unlock personalized skill learning roadmaps, and optimize your ATS resume score.',
      icon: <GraduationCap className="w-8 h-8" />,
      link: '/student/login',
      registerLink: '/student/register',
      themeColor: 'from-blue-600 via-indigo-600 to-sky-400',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      glowColor: 'hover:border-blue-500/50 hover:shadow-blue-500/20',
      features: ['Explainable AI Match Gauge (91%)', 'ATS Resume Diagnostics (82/100)', '4-Stage Career Roadmap']
    },
    {
      id: 'recruiter',
      title: 'Recruiter Hub',
      subtitle: 'For Companies & Hiring Teams',
      description: 'Post verified internship openings, view AI-ranked candidate shortlists, and manage applicant hiring funnels.',
      icon: <Building2 className="w-8 h-8" />,
      link: '/recruiter/login',
      registerLink: '/recruiter/register',
      themeColor: 'from-emerald-600 via-teal-600 to-sky-400',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      glowColor: 'hover:border-emerald-500/50 hover:shadow-emerald-500/20',
      features: ['AI Candidate Match Scoring', '5-Stage Hiring Funnel', 'Shortlisting & Live Analytics']
    },
    {
      id: 'admin',
      title: 'Enterprise Admin',
      subtitle: 'For Institutional Super Admins',
      description: 'Oversee student talent, company accounts, internship approvals, AI matching accuracy, and platform analytics.',
      icon: <ShieldCheck className="w-8 h-8" />,
      link: '/admin/login',
      registerLink: null,
      themeColor: 'from-purple-600 via-indigo-600 to-sky-400',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      glowColor: 'hover:border-purple-500/50 hover:shadow-purple-500/20',
      features: ['Student Attention Flagging', 'Platform Metrics & Trends', 'Role & Access Management']
    }
  ];

  return (
    <div className="min-h-screen bg-[#070A11] text-white flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header */}
      <header className="h-20 px-6 sm:px-12 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md relative z-10">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-black text-lg tracking-tight text-white">InternDisha</span>
        </Link>

        <Link
          to="/"
          className="text-xs font-bold text-slate-400 hover:text-white flex items-center space-x-1 transition-colors px-3 py-2 rounded-xl hover:bg-slate-900"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Selection Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10 max-w-6xl mx-auto w-full space-y-10">
        
        <div className="text-center space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Role-Based Authentication</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Choose Your Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Select your destination portal to continue to your dedicated AI tools and workflows.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {portals.map((portal, idx) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex"
            >
              <div className={`w-full rounded-3xl bg-[#0F172A]/90 backdrop-blur-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-6 shadow-2xl transition-all hover:-translate-y-2 ${portal.glowColor}`}>
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${portal.themeColor} flex items-center justify-center text-white shadow-lg`}>
                    {portal.icon}
                  </div>

                  <div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${portal.badgeColor}`}>
                      {portal.subtitle}
                    </span>
                    <h3 className="text-xl font-black text-white tracking-tight mt-2">{portal.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {portal.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    {portal.features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Link
                    to={portal.link}
                    className={`w-full py-3 rounded-2xl bg-gradient-to-r ${portal.themeColor} text-white font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2 hover:opacity-95 transition-all`}
                  >
                    <span>Enter {portal.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {portal.registerLink && (
                    <Link
                      to={portal.registerLink}
                      className="block text-center text-xs font-bold text-slate-400 hover:text-white pt-1 transition-colors"
                    >
                      Create new account →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-800/60 text-center text-[11px] text-slate-500">
        InternDisha • Multi-Portal Enterprise Gateway
      </footer>
    </div>
  );
};
