import React from 'react';

interface CircularProgressProps {
  score: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  colorGradient?: 'blue-indigo' | 'emerald-green' | 'amber-orange' | 'purple-pink';
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  score,
  size = 140,
  strokeWidth = 12,
  label = 'Score',
  sublabel,
  colorGradient = 'blue-indigo',
}) => {
  const clampedScore = Math.min(100, Math.max(0, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  const gradientMap = {
    'blue-indigo': { start: '#2563EB', end: '#4F46E5', track: '#E0E7FF' },
    'emerald-green': { start: '#10B981', end: '#059669', track: '#D1FAE5' },
    'amber-orange': { start: '#F59E0B', end: '#D97706', track: '#FEF3C7' },
    'purple-pink': { start: '#8B5CF6', end: '#EC4899', track: '#F3E8FF' },
  };

  const g = gradientMap[colorGradient];
  const gradientId = `grad-${colorGradient}-${size}`;

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={g.start} />
            <stop offset="100%" stopColor={g.end} />
          </linearGradient>
        </defs>

        {/* Track Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={g.track}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Active Animated Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Centered Score Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className="text-3xl font-black text-slate-900 tracking-tight font-mono leading-none">
          {clampedScore}%
        </span>
        {label && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">
            {label}
          </span>
        )}
      </div>

      {sublabel && (
        <span className="text-xs font-semibold text-slate-500 mt-2 text-center">{sublabel}</span>
      )}
    </div>
  );
};
