import React from 'react';
import { Logo } from './Logo';

export const LoadingScreen: React.FC<{ message?: string }> = ({
  message = 'Synthesizing recommendations & telemetry data...',
}) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
      <div className="relative">
        <Logo size="lg" showText={false} className="animate-pulse" />
        <div className="absolute -inset-4 rounded-full border-2 border-dashed border-indigo-400/40 animate-spin" style={{ animationDuration: '6s' }} />
      </div>

      <h3 className="text-base font-bold text-slate-800 mt-6 tracking-tight">SmartEdu AI Platform</h3>
      <p className="text-xs font-semibold text-slate-600 mt-1 max-w-sm">{message}</p>
    </div>
  );
};
