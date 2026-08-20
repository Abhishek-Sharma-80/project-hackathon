import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Code, 
  Heart, 
  Sliders, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Plus, 
  X, 
  BrainCircuit, 
  Compass, 
  Check, 
  Zap 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Navbar } from '../components/common/Navbar';

export const OnboardingPage: React.FC = () => {
  const { user, profile, updateProfileState, refreshProfile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [skillInput, setSkillInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    highestQualification: 'B.Tech',
    college: 'Galgotias University',
    course: 'Computer Science & Engineering',
    branch: 'Software Engineering',
    currentYear: '3rd Year',
    cgpa: 8.4,
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'SQL'],
    interests: ['Software Development', 'Artificial Intelligence'],
    preferredRoles: ['Frontend Developer', 'Software Engineer'],
    preferredLocation: 'Bengaluru / Remote',
    workPreference: 'Remote' as 'Remote' | 'Hybrid' | 'On-site' | 'Any',
    durationPreference: '3-6 Months',
    experienceLevel: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced'
  });

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        highestQualification: profile.highestQualification || prev.highestQualification,
        college: profile.college || prev.college,
        course: profile.course || prev.course,
        branch: profile.branch || prev.branch,
        currentYear: profile.currentYear || prev.currentYear,
        cgpa: profile.cgpa || prev.cgpa,
        skills: profile.skills?.length ? profile.skills : prev.skills,
        interests: profile.interests?.length ? profile.interests : prev.interests,
        preferredLocation: profile.preferredLocation || prev.preferredLocation,
        workPreference: profile.workPreference || prev.workPreference,
      }));
    }
  }, [profile]);

  const suggestedSkills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'SQL',
    'Machine Learning', 'Tailwind CSS', 'Figma', 'Docker', 'Git & GitHub',
    'C++', 'Pandas', 'REST APIs', 'Communication', 'Problem Solving'
  ];

  const suggestedSectors = [
    'Software Development',
    'Artificial Intelligence',
    'Data Science',
    'Cybersecurity',
    'Design',
    'Marketing',
    'Finance',
    'Mobile Development',
    'Cloud & DevOps'
  ];

  const toggleSkill = (skill: string) => {
    if (formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    } else {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const addCustomSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const toggleInterest = (sector: string) => {
    if (formData.interests.includes(sector)) {
      setFormData({ ...formData, interests: formData.interests.filter(s => s !== sector) });
    } else {
      setFormData({ ...formData, interests: [...formData.interests, sector] });
    }
  };

  const startAIAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisPhase(1);

    // Save profile to backend in background
    try {
      const res = await api.updateProfile({
        ...formData,
        fullName: user?.name || 'Student',
        onboardingCompleted: true
      });
      if (res.success) {
        updateProfileState(res.profile);
      }
    } catch (err) {
      console.error(err);
    }

    // Simulate animated AI processing steps
    setTimeout(() => setAnalysisPhase(2), 800);
    setTimeout(() => setAnalysisPhase(3), 1600);
    setTimeout(() => setAnalysisPhase(4), 2400);

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        navigate('/recommendations');
      }, 1000);
    }, 3200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Top Progress Tracker */}
          {!isAnalyzing && (
            <div className="mb-8 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-indigo-600 dark:text-indigo-400">Step {step} of 5</span>
                <span className="text-slate-400">
                  {step === 1 && 'Education'}
                  {step === 2 && 'Skills & Competencies'}
                  {step === 3 && 'Career Interests'}
                  {step === 4 && 'Work Preferences'}
                  {step === 5 && 'Profile Summary'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  animate={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-sky-500"
                />
              </div>
            </div>
          )}

          {/* AI Analysis Overlay Screen */}
          {isAnalyzing ? (
            <div className="py-12 px-4 text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400 animate-pulse">
                <BrainCircuit className="w-10 h-10 animate-spin-slow" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Analyzing Your Profile...
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Our explainable recommendation engine is computing compatibility scores.
                </p>
              </div>

              {/* Animated Checklist Steps */}
              <div className="max-w-md mx-auto space-y-2.5 text-left text-xs">
                <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  analysisPhase >= 1 
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300' 
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  <span>✓ Understanding your skills ({formData.skills.length} skills parsed)</span>
                  {analysisPhase >= 1 && <Check className="w-4 h-4 text-emerald-500" />}
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  analysisPhase >= 2 
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300' 
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  <span>✓ Matching your interests & sector alignments</span>
                  {analysisPhase >= 2 && <Check className="w-4 h-4 text-emerald-500" />}
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  analysisPhase >= 3 
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300' 
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  <span>✓ Comparing live internship criteria & requirements</span>
                  {analysisPhase >= 3 && <Check className="w-4 h-4 text-emerald-500" />}
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  analysisPhase >= 4 
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300 font-bold' 
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  <span>✓ Calculating 4-factor compatibility scores</span>
                  {analysisPhase >= 4 && <Check className="w-4 h-4 text-emerald-500" />}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: EDUCATION */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                      <GraduationCap className="w-5 h-5 text-indigo-500" />
                      <span>Your Academic Background</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      We match educational qualifications and branches with company requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Highest Qualification</label>
                      <select
                        value={formData.highestQualification}
                        onChange={e => setFormData({ ...formData, highestQualification: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="B.Tech">B.Tech / B.E.</option>
                        <option value="BCA">BCA (Computer Applications)</option>
                        <option value="B.Sc">B.Sc / B.Sc CS / IT</option>
                        <option value="MCA">MCA (Master of Computer Applications)</option>
                        <option value="M.Tech">M.Tech / M.E.</option>
                        <option value="BBA / B.Com">BBA / B.Com / Commerce</option>
                        <option value="Other">Other Graduate / Diploma</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Year</label>
                      <select
                        value={formData.currentYear}
                        onChange={e => setFormData({ ...formData, currentYear: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="Final Year">Final Year</option>
                        <option value="Recent Graduate">Recent Graduate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">College / University *</label>
                      <input
                        type="text"
                        required
                        value={formData.college}
                        onChange={e => setFormData({ ...formData, college: e.target.value })}
                        placeholder="e.g. Galgotias University"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Branch / Specialization *</label>
                      <input
                        type="text"
                        required
                        value={formData.branch}
                        onChange={e => setFormData({ ...formData, branch: e.target.value })}
                        placeholder="e.g. Computer Science, AI, IT"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">CGPA / Percentage</label>
                      <input
                        type="number"
                        step="0.1"
                        min="4"
                        max="10"
                        value={formData.cgpa}
                        onChange={e => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                        placeholder="e.g. 8.4"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: SKILLS */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                      <Code className="w-5 h-5 text-indigo-500" />
                      <span>Select Your Technical & Soft Skills</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Skills carry a 40% weight in the recommendation matching formula.
                    </p>
                  </div>

                  {/* Add Custom Skill Input */}
                  <div className="flex gap-2 text-xs">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
                      placeholder="Type a skill and press Enter (e.g. Next.js, FastAPI)..."
                      className="flex-1 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={addCustomSkill}
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  {/* Selected Skills Tags */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Your Selected Skills:</span>
                    <div className="flex flex-wrap gap-2 min-h-[48px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                      {formData.skills.length > 0 ? (
                        formData.skills.map(s => (
                          <span key={s} className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-semibold text-xs flex items-center space-x-1 shadow-sm">
                            <span>{s}</span>
                            <button type="button" onClick={() => toggleSkill(s)} className="text-indigo-200 hover:text-white">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">Select from suggested list below or type your skills above</span>
                      )}
                    </div>
                  </div>

                  {/* Suggested Skills List */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Suggested Popular Skills:</span>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map(s => {
                        const selected = formData.skills.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleSkill(s)}
                            className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${
                              selected
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {selected ? `✓ ${s}` : `+ ${s}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: INTERESTS & SECTORS */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-indigo-500" />
                      <span>Select Preferred Sectors & Domains</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Sector alignment carries a 30% weight in the recommendation matching formula.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {suggestedSectors.map(sec => {
                      const isSelected = formData.interests.includes(sec);
                      return (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => toggleInterest(sec)}
                          className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                            isSelected
                              ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span>{sec}</span>
                            {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: PREFERENCES */}
              {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                      <Sliders className="w-5 h-5 text-indigo-500" />
                      <span>Work & Location Preferences</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Customize work mode, duration, and target city preferences.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Work Mode Preference</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Remote', 'Hybrid', 'On-site'].map(mode => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setFormData({ ...formData, workPreference: mode as any })}
                            className={`py-3 rounded-xl font-bold border text-center transition-all ${
                              formData.workPreference === mode
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25'
                                : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            {mode === 'Remote' ? '🏠 Work from Home (Remote)' : mode === 'Hybrid' ? '⚡ Hybrid' : '🏢 On-site'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Location</label>
                      <input
                        type="text"
                        value={formData.preferredLocation}
                        onChange={e => setFormData({ ...formData, preferredLocation: e.target.value })}
                        placeholder="e.g. Bengaluru, Hyderabad, Delhi NCR, or Remote"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Internship Duration</label>
                      <select
                        value={formData.durationPreference}
                        onChange={e => setFormData({ ...formData, durationPreference: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="1-3 Months">1 - 3 Months</option>
                        <option value="3-6 Months">3 - 6 Months (Standard)</option>
                        <option value="6+ Months">6+ Months (Full Semester)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: REVIEW PROFILE */}
              {step === 5 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-indigo-500" />
                      <span>Review Your Profile</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Review your details before generating explainable AI recommendations.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Education</span>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {formData.highestQualification} in {formData.branch} ({formData.currentYear})
                      </p>
                      <p className="text-slate-500">{formData.college} • CGPA: {formData.cgpa}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Skills ({formData.skills.length})</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {formData.skills.map(s => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-medium text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sectors & Preferences</span>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {formData.interests.join(', ')} • {formData.workPreference} • {formData.preferredLocation}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={startAIAnalysis}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Analyze My Profile & Recommend Internships</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Bottom Step Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {step < 5 && (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 flex items-center space-x-1.5"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
