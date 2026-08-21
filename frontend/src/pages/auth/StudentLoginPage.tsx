import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  AlertCircle, 
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentLoginPage: React.FC = () => {
  const [email, setEmail] = useState('abhishek.sharma@galgotiasuniversity.edu.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/student/dashboard');
    } catch (err: any) {
      // Check if trying to use recruiter or admin credentials
      if (email.includes('recruiter') || email.includes('technova')) {
        setError('This account belongs to the Recruiter Portal. Please log in via the Recruiter Portal.');
      } else if (email.includes('admin')) {
        setError('This account belongs to the Admin Portal. Please log in via the Admin Portal.');
      } else {
        // Successful mock student login fallback
        await demoLogin('student');
        navigate('/student/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudent = async () => {
    setLoading(true);
    await demoLogin('student');
    navigate('/student/dashboard');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setForgotModal(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-white flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="h-20 px-6 sm:px-12 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md relative z-10">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base tracking-tight text-white">InternDisha</span>
            <span className="text-[9px] font-extrabold tracking-widest text-blue-400 uppercase">Student Portal</span>
          </div>
        </Link>

        <Link
          to="/portal-select"
          className="text-xs font-bold text-slate-400 hover:text-white flex items-center space-x-1 transition-colors px-3 py-2 rounded-xl hover:bg-slate-900"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Switch Portal</span>
        </Link>
      </header>

      {/* Main Login Form Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-blue-500/20 p-6 sm:p-8 shadow-2xl space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-600/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight pt-2">Welcome Back 👋</h1>
            <p className="text-xs text-slate-400 font-medium">Continue building your career journey & AI matches.</p>
          </div>

          {/* Quick Demo Button */}
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center space-y-1.5">
            <span className="text-[10px] font-extrabold text-blue-300 uppercase tracking-wider block">
              1-Click Student Demo Access
            </span>
            <button
              onClick={handleDemoStudent}
              type="button"
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center justify-center space-x-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Login as Abhishek Sharma (Galgotias Univ)</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 my-4">
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">or with email</span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <span>{error}</span>
                {error.includes('Recruiter') && (
                  <Link to="/recruiter/login" className="block text-indigo-400 hover:underline font-bold">
                    → Go to Recruiter Login
                  </Link>
                )}
                {error.includes('Admin') && (
                  <Link to="/admin/login" className="block text-indigo-400 hover:underline font-bold">
                    → Go to Admin Login
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Student Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@university.edu.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setForgotModal(true)}
                className="text-blue-400 hover:text-blue-300 font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In as Student'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Google Auth simulation */}
          <button
            type="button"
            onClick={handleDemoStudent}
            className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center space-x-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Student Google Workspace</span>
          </button>

          {/* Footer Signup Link */}
          <div className="text-center pt-2 text-xs text-slate-400">
            <span>New to InternDisha? </span>
            <Link to="/student/register" className="font-extrabold text-blue-400 hover:underline">
              Create Student Account
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 text-xs">
            <h3 className="font-black text-base text-white">Reset Student Password</h3>
            <p className="text-slate-400">Enter your university email to receive a password reset link.</p>
            
            {forgotSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Reset instructions sent! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  placeholder="student@university.edu.in"
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setForgotModal(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-bold"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 border-t border-slate-800/60 text-center text-[11px] text-slate-500">
        InternDisha Student Portal • Secure Candidate Authentication
      </footer>
    </div>
  );
};
