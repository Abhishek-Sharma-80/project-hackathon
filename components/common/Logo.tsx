import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', icon: 18, text: 'text-lg', sub: 'text-[9px]' },
    md: { box: 'w-9 h-9', icon: 22, text: 'text-xl', sub: 'text-[10px]' },
    lg: { box: 'w-12 h-12', icon: 28, text: 'text-2xl', sub: 'text-xs' },
  };

  const s = sizeMap[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Brand Icon combining Cap, Neural Mesh, and Growth Vector */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#312E81] via-[#2563EB] to-[#7C3AED] text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300 ${s.box}`}>
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
        >
          {/* Graduation Cap Base */}
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          {/* AI Neural Vector Indicator */}
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M12 9v1.5M12 13.5V15" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1 leading-none">
            <span className={`font-black tracking-tight text-slate-900 ${s.text}`}>SmartEdu</span>
            <span className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ${s.text}`}>AI</span>
          </div>
          <span className={`font-semibold tracking-wider text-slate-600 uppercase ${s.sub}`}>
            SIH 2026 • AICTE
          </span>
        </div>
      )}
    </Link>
  );
};
