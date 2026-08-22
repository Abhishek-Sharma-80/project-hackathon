import React from 'react';
import { Logo } from './Logo';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Preparing your intelligent learning experience...',
}) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        {/* Glowing Neural Ring */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 blur-xl opacity-40 animate-pulse-slow" />
        <div className="relative p-3 bg-white rounded-2xl shadow-xl border border-slate-100">
          <Logo size="xl" showText={false} />
        </div>
      </div>

      <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-2 animate-bounce">
        <Sparkles className="w-4 h-4" />
        <span>SmartEdu AI Intelligence Engine</span>
      </div>

      <h3 className="text-xl font-bold text-slate-800 tracking-tight max-w-md">
        {message}
      </h3>

      <div className="mt-6 flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping delay-100" />
        <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping delay-200" />
      </div>
    </div>
  );
};
