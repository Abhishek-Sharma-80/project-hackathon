import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
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
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@interndisha.gov.in');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
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
      navigate('/admin/dashboard');
    } catch (err: any) {
      if (email.includes('student') || email.includes('galgotias')) {
        setError('This account is not authorized for the Admin Portal. Please use the Student Login.');
      } else if (email.includes('recruiter') || email.includes('technova')) {
        setError('This account is not authorized for the Admin Portal. Please use the Recruiter Login.');
      } else {
        // Fallback to demo admin login
        await demoLogin('admin');
        navigate('/admin/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = async () => {
    setLoading(true);
    await demoLogin('admin');
    navigate('/admin/dashboard');
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
    <div className="min-h-screen bg-[#060810] text-white flex flex-col justify-between font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* Security Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="h-20 px-6 sm:px-12 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md relative z-10">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base tracking-tight text-white">InternDisha</span>
            <span className="text-[9px] font-extrabold tracking-widest text-purple-400 uppercase">Enterprise Admin</span>
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
          className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-purple-500/20 p-6 sm:p-8 shadow-2xl space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-purple-600/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight pt-2">Admin Portal</h1>
            <p className="text-xs text-slate-400 font-medium">Secure access to the InternDisha management system.</p>
          </div>

          {/* Quick Demo Button */}
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center space-y-1.5">
            <span className="text-[10px] font-extrabold text-purple-300 uppercase tracking-wider block">
              1-Click Administrator Access
            </span>
            <button
              onClick={handleDemoAdmin}
              type="button"
              className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/25 flex items-center justify-center space-x-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Login as Dr. Ramesh Mehta (Super Admin)</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 my-4">
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">or credentials</span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          {/* Error Message with Role Mismatch Redirection */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <span>{error}</span>
                {error.includes('Student') && (
                  <Link to="/student/login" className="block text-purple-400 hover:underline font-extrabold">
                    → Go to Student Login
                  </Link>
                )}
                {error.includes('Recruiter') && (
                  <Link to="/recruiter/login" className="block text-purple-400 hover:underline font-extrabold">
                    → Go to Recruiter Login
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Administrative Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@interndisha.gov.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Security Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
                  checked={rememberDevice}
                  onChange={e => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded accent-purple-600"
                />
                <span>Remember this device</span>
              </label>

              <button
                type="button"
                onClick={() => setForgotModal(true)}
                className="text-purple-400 hover:text-purple-300 font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Verifying Credentials...' : 'Secure Admin Login'}</span>
            </button>
          </form>

          {/* Security Notice */}
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-slate-400 text-[11px] flex items-center space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Protected administrative environment. All authentication attempts are logged for security auditing.</span>
          </div>
        </motion.div>
      </main>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 text-xs">
            <h3 className="font-black text-base text-white">Reset Administrative Credentials</h3>
            <p className="text-slate-400">Contact the Super Admin or enter your authorized admin email.</p>
            
            {forgotSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Security reset token sent to your registered address.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  placeholder="admin@interndisha.gov.in"
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
                    className="px-4 py-1.5 rounded-xl bg-purple-600 text-white font-bold"
                  >
                    Request Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 border-t border-slate-800/60 text-center text-[11px] text-slate-500">
        InternDisha • Super Administrator Security Gateway
      </footer>
    </div>
  );
};
