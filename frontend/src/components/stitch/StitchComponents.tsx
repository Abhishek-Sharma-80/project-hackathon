import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

// 🔲 1. STITCH CONTAINER CARD
interface StitchCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const StitchCard: React.FC<StitchCardProps> = ({
  children,
  className = '',
  glow = false,
  hoverEffect = true,
  onClick
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={`rounded-3xl bg-[#0F172A]/90 backdrop-blur-xl border border-slate-800 shadow-xl ${
        glow ? 'shadow-indigo-500/10 border-indigo-500/30' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

// 📊 2. STITCH STATISTIC METRIC CARD
interface StitchStatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  trendPositive?: boolean;
  icon: React.ReactNode;
  iconBg?: string;
  accentColor?: string;
}

export const StitchStatCard: React.FC<StitchStatCardProps> = ({
  title,
  value,
  subtext,
  trend,
  trendPositive = true,
  icon,
  iconBg = 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
}) => {
  return (
    <StitchCard className="p-5 flex flex-col justify-between space-y-3 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{value}</span>
          {trend && (
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                trendPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
        {subtext && <p className="text-[11px] text-slate-400">{subtext}</p>}
      </div>
    </StitchCard>
  );
};

// 🎯 3. STITCH CIRCULAR MATCH GAUGE
interface StitchMatchGaugeProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  subtitle?: string;
}

export const StitchMatchGauge: React.FC<StitchMatchGaugeProps> = ({
  score,
  maxScore = 100,
  size = 120,
  strokeWidth = 10,
  label = 'AI Match Score',
  subtitle
}) => {
  const percentage = Math.min(Math.max((score / maxScore) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 85) return '#10B981'; // Emerald
    if (percentage >= 70) return '#6366F1'; // Indigo
    if (percentage >= 50) return '#F59E0B'; // Amber
    return '#F43F5E'; // Rose
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1E293B"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active Stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor()}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-white leading-none tracking-tight">
            {score}{maxScore === 100 ? '%' : `/${maxScore}`}
          </span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">
            {score >= 85 ? 'High Match' : score >= 70 ? 'Strong' : 'Moderate'}
          </span>
        </div>
      </div>

      {label && <p className="text-xs font-extrabold text-white mt-2">{label}</p>}
      {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  );
};

// 🏷️ 4. STITCH BADGE
interface StitchBadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'info' | 'purple' | 'danger' | 'neutral';
  className?: string;
}

export const StitchBadge: React.FC<StitchBadgeProps> = ({
  label,
  variant = 'info',
  className = ''
}) => {
  const getStyle = () => {
    switch (variant) {
      case 'success':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'warning':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'purple':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'danger':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'neutral':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'info':
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getStyle()} ${className}`}
    >
      {label}
    </span>
  );
};

// 📈 5. STITCH PROGRESS BAR
interface StitchProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  color?: string;
}

export const StitchProgressBar: React.FC<StitchProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercent = true,
  color = 'from-indigo-500 via-purple-500 to-sky-400'
}) => {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="space-y-1.5 w-full">
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="font-bold text-slate-300">{label}</span>}
          {showPercent && <span className="font-extrabold text-white">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
};
