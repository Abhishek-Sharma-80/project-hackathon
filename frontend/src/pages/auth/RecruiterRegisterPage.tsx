import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  ChevronLeft,
  Users,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RecruiterRegisterPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 - Company Information
  const [companyName, setCompanyName] = useState('TechNova Solutions');
  const [industry, setIndustry] = useState('Technology & Cloud Systems');
  const [companySize, setCompanySize] = useState('500-1000 employees');
  const [website, setWebsite] = useState('https://technova.io');
  const [location, setLocation] = useState('Bengaluru / Greater Noida');

  // Step 2 - Recruiter Information
  const [recruiterName, setRecruiterName] = useState('Pooja Nair');
  const [designation, setDesignation] = useState('Talent Acquisition Lead');
  const [workEmail, setWorkEmail] = useState('recruiter@technova.io');
  const [phone, setPhone] = useState('+91 98765 43210');

  // Step 3 - Account Setup
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (!companyName.trim()) { setError('Company Name is required.'); return; }
      setStep(2);
    } else if (step === 2) {
      if (!recruiterName.trim() || !workEmail.trim()) { setError('Recruiter Name and Work Email are required.'); return; }
      setStep(3);
    } else if (step === 3) {
      if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
      setLoading(true);
      setTimeout(async () => {
        setLoading(false);
        setStep(4);
      }, 1000);
    }
  };

  const handleFinish = async () => {
    await demoLogin('recruiter');
    navigate('/recruiter/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-white flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="h-20 px-6 sm:px-12 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md relative z-10">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base tracking-tight text-white">InternDisha</span>
            <span className="text-[9px] font-extrabold tracking-widest text-emerald-400 uppercase">Corporate Partner Onboarding</span>
          </div>
        </Link>

        <Link
          to="/recruiter/login"
          className="text-xs font-bold text-slate-400 hover:text-white flex items-center space-x-1 px-3 py-2 rounded-xl hover:bg-slate-900"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Already registered? Recruiter Sign In</span>
        </Link>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-emerald-500/20 p-6 sm:p-8 shadow-2xl space-y-6"
        >
          {/* Multi-step progress indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-emerald-400">Step {step} of 4</span>
              <span className="text-slate-400">
                {step === 1 && 'Company Information'}
                {step === 2 && 'Recruiter Profile'}
                {step === 3 && 'Security & Account Setup'}
                {step === 4 && 'Partner Verification'}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: COMPANY INFORMATION */}
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNextStep}
                className="space-y-4 text-xs"
              >
                <div>
                  <h2 className="text-lg font-black text-white">Company Information</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Tell us about your organization and hiring goals.</p>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Company / Organization Name</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      placeholder="e.g. TechNova Solutions"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Industry Sector</label>
                    <select
                      value={industry}
                      onChange={e => setIndustry(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    >
                      <option value="Technology & Cloud Systems">Technology & Cloud</option>
                      <option value="Artificial Intelligence">AI & Machine Learning</option>
                      <option value="Data Science & Analytics">Data Science</option>
                      <option value="FinTech & Banking">FinTech</option>
                      <option value="EdTech">EdTech</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Company Size</label>
                    <select
                      value={companySize}
                      onChange={e => setCompanySize(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    >
                      <option value="1-50 employees">1-50 employees (Startup)</option>
                      <option value="50-200 employees">50-200 employees</option>
                      <option value="200-1000 employees">200-1000 employees</option>
                      <option value="1000+ employees">1000+ employees (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Company Website</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        required
                        value={website}
                        onChange={e => setWebsite(e.target.value)}
                        placeholder="https://company.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">HQ / Office Location</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        placeholder="e.g. Bengaluru, India"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Continue to Recruiter Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            )}

            {/* STEP 2: RECRUITER INFORMATION */}
            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNextStep}
                className="space-y-4 text-xs"
              >
                <div>
                  <h2 className="text-lg font-black text-white">Recruiter / Point of Contact</h2>
                  <p className="text-slate-400 text-xs mt-0.5">The primary hiring manager for this account.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={recruiterName}
                        onChange={e => setRecruiterName(e.target.value)}
                        placeholder="e.g. Pooja Nair"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Designation</label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={designation}
                        onChange={e => setDesignation(e.target.value)}
                        placeholder="e.g. Talent Acquisition Lead"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Work Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={workEmail}
                        onChange={e => setWorkEmail(e.target.value)}
                        placeholder="recruiter@company.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Continue to Security Setup</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 3: ACCOUNT SETUP */}
            {step === 3 && (
              <motion.form
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNextStep}
                className="space-y-4 text-xs"
              >
                <div>
                  <h2 className="text-lg font-black text-white">Account Security</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Set a secure password for corporate dashboard access.</p>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Create Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>{loading ? 'Submitting Application...' : 'Submit Company Registration'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 4: VERIFICATION PENDING */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 py-4"
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h2 className="text-xl font-black text-white">Company Registration Received!</h2>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Your partner verification request for <strong className="text-white">{companyName}</strong> has been submitted.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-left text-xs space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Instant Demo Approval Active</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    You can immediately access the TechNova Hiring Hub to post internships, test AI candidate matching, and review student applicants.
                  </p>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Enter TechNova Recruiter Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-800/60 text-center text-[11px] text-slate-500">
        InternDisha • Corporate Partner Onboarding
      </footer>
    </div>
  );
};
