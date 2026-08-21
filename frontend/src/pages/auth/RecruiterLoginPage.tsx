import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  AlertCircle, 
  CheckCircle2, 
  ChevronLeft,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RecruiterLoginPage: React.FC = () => {
  const [email, setEmail] = useState('recruiter@technova.io');
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
      navigate('/recruiter/dashboard');
    } catch (err: any) {
      if (email.includes('student') || email.includes('galgotias')) {
        setError('This account belongs to the Student Portal. Please log in via the Student Portal.');
      } else if (email.includes('admin')) {
        setError('This account belongs to the Admin Portal. Please log in via the Admin Portal.');
      } else {
        // Fallback to demo recruiter login
        await demoLogin('recruiter');
        navigate('/recruiter/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoRecruiter = async () => {
    setLoading(true);
    await demoLogin('recruiter');
    navigate('/recruiter/dashboard');
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
    <div className="min-h-screen bg-[#070A11] text-white flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="h-20 px-6 sm:px-12 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md relative z-10">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base tracking-tight text-white">InternDisha</span>
            <span className="text-[9px] font-extrabold tracking-widest text-emerald-400 uppercase">Recruiter Portal</span>
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

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-emerald-500/20 p-6 sm:p-8 shadow-2xl space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white mx-auto shadow-md shadow-emerald-600/30">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight pt-2">Recruiter Portal</h1>
            <p className="text-xs text-slate-400 font-medium">Find the right talent with AI-powered candidate matching.</p>
          </div>

          {/* Quick Demo Button */}
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1.5">
            <span className="text-[10px] font-extrabold text-emerald-300 uppercase tracking-wider block">
              1-Click Recruiter Demo Access
            </span>
            <button
              onClick={handleDemoRecruiter}
              type="button"
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center space-x-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Login as Demo Recruiter (TechNova)</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 my-4">
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">or work email</span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <span>{error}</span>
                {error.includes('Student') && (
                  <Link to="/student/login" className="block text-emerald-400 hover:underline font-bold">
                    → Go to Student Login
                  </Link>
                )}
                {error.includes('Admin') && (
                  <Link to="/admin/login" className="block text-emerald-400 hover:underline font-bold">
                    → Go to Admin Login
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Corporate / Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
                  className="w-4 h-4 rounded accent-emerald-600"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setForgotModal(true)}
                className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Validating...' : 'Login to Recruiter Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Register Link */}
          <div className="text-center pt-2 text-xs text-slate-400">
            <span>New Company? </span>
            <Link to="/recruiter/register" className="font-extrabold text-emerald-400 hover:underline">
              Register Your Company & Start Hiring →
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 text-xs">
            <h3 className="font-black text-base text-white">Reset Recruiter Password</h3>
            <p className="text-slate-400">Enter your corporate email to receive recovery instructions.</p>
            
            {forgotSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Reset email dispatched to corporate inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  placeholder="recruiter@company.com"
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
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold"
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
        InternDisha Recruiter Portal • Corporate Talent Acquisition Hub
      </footer>
    </div>
  );
};
