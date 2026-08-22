import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  theme?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  theme = 'light',
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 46, text: 'text-2xl' },
    xl: { icon: 56, text: 'text-3xl' },
  };

  const { icon, text } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-900 via-indigo-600 to-purple-600 p-1.5 shadow-md shadow-indigo-500/20"
        style={{ width: icon, height: icon }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Graduation Cap Base & Diamond Top */}
          <path
            d="M24 6L42 16L24 26L6 16L24 6Z"
            fill="url(#cap-grad)"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Cap Cap Lower Shell */}
          <path
            d="M12 20V29C12 33 17 37 24 37C31 37 36 33 36 29V20"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Neural AI Nodes & Growth Circuit */}
          <circle cx="24" cy="16" r="3" fill="#60A5FA" />
          <circle cx="16" cy="28" r="2.5" fill="#C084FC" />
          <circle cx="32" cy="28" r="2.5" fill="#38BDF8" />
          <circle cx="24" cy="33" r="2.5" fill="#4ADE80" />
          
          <line x1="24" y1="16" x2="16" y2="28" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="24" y1="16" x2="32" y2="28" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="16" y1="28" x2="24" y2="33" stroke="#86EFAC" strokeWidth="1.5" />
          <line x1="32" y1="28" x2="24" y2="33" stroke="#86EFAC" strokeWidth="1.5" />

          {/* Tassel */}
          <path
            d="M40 18V28C40 29.5 38.5 31 37 31"
            stroke="#FDE047"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="37" cy="32" r="1.5" fill="#FDE047" />

          <defs>
            <linearGradient id="cap-grad" x1="6" y1="6" x2="42" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            <span className={`${text} font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              SmartEdu
            </span>
            <span className={`${text} font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent ml-1`}>
              AI
            </span>
          </div>
          <span className="text-[9px] tracking-widest uppercase font-semibold text-indigo-500">
            Education • Skills • Career
          </span>
        </div>
      )}
    </div>
  );
};
