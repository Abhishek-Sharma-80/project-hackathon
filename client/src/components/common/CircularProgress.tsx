import React from 'react';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  colorGradient?: 'blue-indigo' | 'purple-pink' | 'emerald-green' | 'amber-orange';
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  score,
  size = 140,
  strokeWidth = 10,
  label,
  sublabel,
  colorGradient = 'blue-indigo',
}) => {
  const normalizedScore = Math.min(100, Math.max(0, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedScore / 100) * circumference;

  const gradientId = `circ-grad-${colorGradient}-${size}`;

  const gradientColors = {
    'blue-indigo': { start: '#2563EB', end: '#4F46E5' },
    'purple-pink': { start: '#7C3AED', end: '#DB2777' },
    'emerald-green': { start: '#059669', end: '#10B981' },
    'amber-orange': { start: '#EA580C', end: '#F59E0B' },
  }[colorGradient];

  return (
    <div className="relative inline-flex items-center justify-center flex-col">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.start} />
            <stop offset="100%" stopColor={gradientColors.end} />
          </linearGradient>
        </defs>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="transition-all"
        />
        {/* Animated Progress Stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center Label */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
          {normalizedScore}%
        </span>
        {label && <span className="text-[11px] font-semibold text-slate-500 mt-0.5">{label}</span>}
      </div>
      {sublabel && <span className="text-xs text-slate-400 mt-2 font-medium">{sublabel}</span>}
    </div>
  );
};
