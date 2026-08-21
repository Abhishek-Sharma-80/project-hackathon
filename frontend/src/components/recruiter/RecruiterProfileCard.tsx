import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  CheckCircle2, 
  ChevronDown, 
  MoreVertical, 
  User, 
  LayoutDashboard, 
  Briefcase, 
  BarChart3, 
  Settings, 
  RefreshCw, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface RecruiterProfileCardProps {
  collapsed?: boolean;
  placement?: 'sidebar' | 'header' | 'pageHeader';
}

export const RecruiterProfileCard: React.FC<RecruiterProfileCardProps> = ({ 
  collapsed = false, 
  placement = 'sidebar' 
}) => {
  const { user, logout, demoLogin } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const recruiterName = user?.name || 'Demo Recruiter';
  const companyName = 'TechNova Solutions';

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* ┌─────────────────────────────────────────┐
          │  [TN]   Demo Recruiter              ⋮  │
          │         Talent Acquisition               │
          │         ✓ TechNova • Verified            │
          └─────────────────────────────────────────┘ */}
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`group relative flex items-center ${
          collapsed ? 'justify-center p-2' : 'justify-between px-3 py-2.5'
        } rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/90 hover:border-indigo-500/40 shadow-md hover:shadow-indigo-500/10 cursor-pointer transition-all duration-200 select-none`}
      >
        {/* Left Side: Avatar + Status */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className="relative shrink-0">
            {/* TechNova Gradient Logo Avatar with Glow */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-sky-400 p-0.5 shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center text-white font-black text-xs tracking-wider">
                <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-sky-300 bg-clip-text text-transparent">
                  TN
                </span>
              </div>
            </div>

            {/* Subtle Active Online Indicator */}
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0B0F19] shadow-sm animate-pulse"
              title="Active Recruiter"
            />
          </div>

          {/* Main Information (Hidden when sidebar is collapsed) */}
          {!collapsed && (
            <div className="truncate flex-1 pr-1 text-left">
              <div className="flex items-center space-x-1.5">
                <p className="text-xs font-black text-white group-hover:text-indigo-300 transition-colors truncate">
                  {recruiterName}
                </p>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-extrabold shrink-0">
                  Active
                </span>
              </div>

              <p className="text-[10px] font-semibold text-slate-400 truncate mt-0.5">
                Talent Acquisition
              </p>

              {/* Company Name + Verified Badge with Interactive Tooltip */}
              <div 
                className="relative inline-flex items-center space-x-1 mt-0.5 group/tooltip"
                onMouseEnter={() => setTooltipOpen(true)}
                onMouseLeave={() => setTooltipOpen(false)}
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-[10px] font-extrabold text-indigo-300 hover:text-indigo-200 truncate">
                  TechNova
                </span>
                <span className="text-[9px] text-slate-500">• Verified</span>

                {/* Company Hover Tooltip */}
                <AnimatePresence>
                  {tooltipOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-0 mb-2 w-52 p-3 rounded-2xl bg-[#0F172A] border border-slate-700 shadow-2xl text-white z-50 pointer-events-none text-left"
                    >
                      <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white text-[10px] font-black shrink-0">
                          TN
                        </div>
                        <div>
                          <h5 className="font-extrabold text-xs text-white leading-tight">TechNova</h5>
                          <p className="text-[9px] text-slate-400">Technology & Cloud Systems</p>
                        </div>
                      </div>

                      <div className="pt-2 space-y-1 text-[10px]">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Active Listings:</span>
                          <span className="font-bold text-white">12 Internships</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Applications:</span>
                          <span className="font-bold text-white">1,250 Received</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Recruiter Status:</span>
                          <span className="font-bold text-emerald-400">● Active</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Dropdown Menu Trigger */}
        {!collapsed && (
          <div className="p-1 rounded-lg text-slate-400 group-hover:text-white group-hover:bg-slate-700/60 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* 🚀 FLOATING RECRUITER PROFILE DROPDOWN MENU */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: placement === 'sidebar' ? 8 : -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === 'sidebar' ? 8 : -8, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`absolute ${
              placement === 'sidebar' ? 'bottom-full left-0 mb-2' : 'top-full right-0 mt-2'
            } w-72 rounded-3xl bg-[#0B0F19] text-white border border-slate-700/80 shadow-2xl p-2 z-50 overflow-hidden`}
          >
            {/* Top Identity Header */}
            <div className="p-3 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 rounded-2xl border border-indigo-500/20 mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-sky-400 p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center text-white font-black text-xs">
                    TN
                  </div>
                </div>
                <div className="truncate">
                  <h4 className="font-extrabold text-sm text-white truncate">{recruiterName}</h4>
                  <p className="text-[11px] text-indigo-300 font-medium truncate">Talent Acquisition Manager</p>
                  <p className="text-[10px] text-slate-400 flex items-center space-x-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="font-bold text-white">TechNova</span>
                    <span>• Verified Partner ✓</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-0.5 text-xs">
              
              <Link
                to="/recruiter"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center space-x-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
              >
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>Company Hiring Hub</span>
              </Link>

              <Link
                to="/admin/internships"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center space-x-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
              >
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>Manage Internships</span>
              </Link>

              <Link
                to="/admin/reports"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center space-x-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
              >
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Recruitment Analytics</span>
              </Link>

              <Link
                to="/admin/settings"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center space-x-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
              >
                <Settings className="w-4 h-4 text-purple-400" />
                <span>Account Settings</span>
              </Link>

              <div className="h-px bg-slate-800 my-1.5"></div>

              {/* Instant Role Switching */}
              <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Switch Perspective
              </div>

              <button
                onClick={() => {
                  demoLogin('student');
                  setDropdownOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors text-xs font-medium"
              >
                <span className="flex items-center space-x-2">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Student View (Demo)</span>
                </span>
                <span className="text-[10px] text-indigo-400 font-bold">Switch</span>
              </button>

              <button
                onClick={() => {
                  demoLogin('admin');
                  setDropdownOpen(false);
                  navigate('/admin');
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors text-xs font-medium"
              >
                <span className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin Portal</span>
                </span>
                <span className="text-[10px] text-purple-400 font-bold">Switch</span>
              </button>

              <div className="h-px bg-slate-800 my-1.5"></div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                  navigate('/');
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
