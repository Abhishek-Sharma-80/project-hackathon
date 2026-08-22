'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { profileApi } from '@/services/api';
import { Logo } from '@/components/common/Logo';
import { Sparkles, ArrowRight, CheckCircle2, Award, Code2, GraduationCap } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [targetRole, setTargetRole] = useState('Backend Developer');
  const [cgpa, setCgpa] = useState('8.5');
  const [skills, setSkills] = useState(['Java', 'SQL', 'Data Structures & Algorithms', 'Git']);
  const [selectedSkillInput, setSelectedSkillInput] = useState('');

  const availableSkills = ['Java', 'Python', 'SQL', 'Data Structures & Algorithms', 'Git', 'React', 'Docker', 'AWS', 'Spring Boot', 'TypeScript', 'Node.js'];

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await profileApi.updateProfile({
        targetRole,
        cgpa: parseFloat(cgpa) || 8.5,
      });

      for (const sk of skills) {
        await profileApi.addSkill({ name: sk, level: 75 });
      }

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <Logo size="sm" />
          <span className="text-xs font-bold font-mono text-indigo-600">Step {step} of 3</span>
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Career Trajectory</span>
              <h2 className="text-xl font-black text-slate-900 mt-1">What is your primary career goal?</h2>
              <p className="text-xs text-slate-500">SmartEdu AI tailors recommendation formulas to your target role.</p>
            </div>

            <div className="space-y-2 pt-2">
              {[
                { title: 'Backend Developer', desc: 'Java, Spring Boot, REST APIs, Databases, Scalability' },
                { title: 'Frontend Developer', desc: 'React, Next.js, TypeScript, UI/UX Architecture' },
                { title: 'Full Stack Developer', desc: 'End-to-end web apps, JavaScript, Node.js, SQL' },
                { title: 'AI & Data Scientist', desc: 'Python, Machine Learning, Deep Learning, SQL' },
                { title: 'Cloud & DevOps Engineer', desc: 'AWS, Docker, Kubernetes, CI/CD, Infrastructure' },
              ].map((role) => (
                <button
                  key={role.title}
                  type="button"
                  onClick={() => setTargetRole(role.title)}
                  className={`w-full p-4 rounded-2xl text-left text-xs transition border-2 flex items-center justify-between ${
                    targetRole === role.title
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900">{role.title}</div>
                    <div className="text-[11px] text-slate-500">{role.desc}</div>
                  </div>
                  {targetRole === role.title && <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 mt-4"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Skills Baseline</span>
              <h2 className="text-xl font-black text-slate-900 mt-1">Select your current skills</h2>
              <p className="text-xs text-slate-500">Pick technologies you have studied or used in projects.</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {availableSkills.map((sk) => {
                const isSelected = skills.includes(sk);
                return (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => toggleSkill(sk)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {sk}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-2xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Academic Standing</span>
              <h2 className="text-xl font-black text-slate-900 mt-1">Cumulative CGPA</h2>
              <p className="text-xs text-slate-500">Used for academic alignment and eligibility scoring.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CGPA (out of 10.0)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 text-base font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>SmartEdu AI is ready to initialize your personalized learning roadmap and match index.</span>
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-2xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                disabled={loading}
                className="w-2/3 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Initializing AI Engine...' : 'Launch Student Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
