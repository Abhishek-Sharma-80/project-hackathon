import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Shield, Sparkles, Award, Globe, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">InternDisha</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart AI-Powered Internship Recommendation & Skill Gap Analysis platform dedicated to youth empowerment and career transparency.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent & Explainable AI</span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform Features</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/explore" className="hover:text-indigo-400 transition-colors">
                  Explore Internships
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="hover:text-indigo-400 transition-colors">
                  AI Recommendation Engine
                </Link>
              </li>
              <li>
                <Link to="/skill-gap" className="hover:text-indigo-400 transition-colors">
                  Skill Gap & Growth Path
                </Link>
              </li>
              <li>
                <Link to="/learning-path" className="hover:text-indigo-400 transition-colors">
                  Personalized Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-indigo-400 transition-colors">
                  Kanban Application Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sectors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Target Sectors</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/explore?sector=Software Development" className="hover:text-indigo-400 transition-colors">
                  Software & Web Development
                </Link>
              </li>
              <li>
                <Link to="/explore?sector=Artificial Intelligence" className="hover:text-indigo-400 transition-colors">
                  Artificial Intelligence & ML
                </Link>
              </li>
              <li>
                <Link to="/explore?sector=Data Science" className="hover:text-indigo-400 transition-colors">
                  Data Science & Analytics
                </Link>
              </li>
              <li>
                <Link to="/explore?sector=Design" className="hover:text-indigo-400 transition-colors">
                  UI/UX & Product Design
                </Link>
              </li>
              <li>
                <Link to="/explore?sector=Cybersecurity" className="hover:text-indigo-400 transition-colors">
                  Cybersecurity & Networks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Youth Support</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>support@interndisha.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>+91 1800-INTERN-DISHA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Govt & Academic Partner Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} InternDisha. All rights reserved. Empowering youth with smart career matches.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
