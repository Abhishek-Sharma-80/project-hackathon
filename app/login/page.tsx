'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/common/Logo';
import { Sparkles, ArrowRight, ShieldCheck, User, Lock, Mail, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudent = async () => {
    setError(null);
    setLoading(true);
    try {
      await demoLogin('STUDENT');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = async () => {
    setError(null);
    setLoading(true);
    try {
      await demoLogin('ADMIN');
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">
        <div className="max-w-md w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Logo size="md" className="justify-center" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-4">
              Welcome back to SmartEdu AI
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Enter your credentials or use the 1-click jury demo accounts below.
            </p>
          </div>

          {/* Quick 1-Click Demo Section for Hackathon Jury */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>SIH 2026 Jury 1-Click Quick Access</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoStudent}
                disabled={loading}
                className="flex items-center justify-center gap-1.5 p-3 rounded-2xl bg-white hover:bg-slate-50 border border-indigo-200 text-indigo-700 font-bold text-xs shadow-xs transition"
              >
                <User className="w-4 h-4 text-indigo-600" />
                <span>Aryan (Student)</span>
              </button>

              <button
                type="button"
                onClick={handleDemoAdmin}
                disabled={loading}
                className="flex items-center justify-center gap-1.5 p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admin / Dean</span>
              </button>
            </div>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link href="/register" className="font-bold text-indigo-600 hover:underline">
              Create student account
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
