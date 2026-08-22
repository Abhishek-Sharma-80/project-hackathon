import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  GraduationCap,
  BookOpen,
  Code2,
  Award,
  Compass,
} from 'lucide-react';
import { LoadingScreen } from '../../components/common/LoadingScreen';

export const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  // Onboarding Form Data
  const [personal, setPersonal] = useState({
    college: 'Galgotias University',
    course: 'B.Tech',
    branch: 'Computer Science & Engineering',
    graduationYear: 2026,
  });

  const [academic, setAcademic] = useState({
    cgpa: 8.7,
    semester: 6,
  });

  const [skills, setSkills] = useState([
    { name: 'Java', level: 90, category: 'Programming' },
    { name: 'SQL', level: 85, category: 'Database' },
    { name: 'Data Structures & Algorithms', level: 80, category: 'Core CS' },
    { name: 'Git', level: 75, category: 'Tools' },
  ]);

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(60);

  const [projects, setProjects] = useState([
    {
      title: 'Distributed Task Queue & Job Scheduler',
      description: 'High-throughput async job execution service with priority queues and worker pools.',
      technologies: 'Java, SQL, Concurrency, Git',
      githubUrl: 'https://github.com/aryan-sharma/distributed-task-queue',
      projectUrl: '',
    },
  ]);

  const [certifications, setCertifications] = useState([
    {
      name: 'Oracle Certified Professional: Java SE 17 Developer',
      provider: 'Oracle University',
      completionDate: '2025-11-15',
    },
  ]);

  const [targetRole, setTargetRole] = useState('Backend Developer');

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    setSkills([...skills, { name: newSkillName.trim(), level: newSkillLevel, category: 'Technical' }]);
    setNewSkillName('');
    setNewSkillLevel(60);
  };

  const removeSkill = (idx: number) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  const handleFinish = async () => {
    setIsAnalyzing(true);
    try {
      await profileApi.saveOnboarding({
        ...personal,
        ...academic,
        skills,
        projects,
        certifications,
        targetRole,
      });
      await refreshUser();
      // Simulate intelligent AI profile analysis time for UX presentation
      setTimeout(() => {
        setIsAnalyzing(false);
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
      navigate('/dashboard');
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
        <LoadingScreen message="SmartEdu AI is analyzing your profile, evaluating 40+ internships, and computing your personalized skill roadmap..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Progress Indicator */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Profile Setup Wizard • Step {step} of 6
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Build Your Career DNA
          </h2>
          <div className="w-full bg-slate-200 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
          {/* STEP 1: Personal & University */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <GraduationCap className="w-5 h-5" />
                <span>Step 1 — College & Enrollment Details</span>
              </div>
              <p className="text-xs text-slate-500">Provide your higher education details to calculate college eligibility.</p>
              
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">College / University Name</label>
                  <input
                    type="text"
                    value={personal.college}
                    onChange={(e) => setPersonal({ ...personal, college: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Degree / Course</label>
                    <input
                      type="text"
                      value={personal.course}
                      onChange={(e) => setPersonal({ ...personal, course: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Branch / Major</label>
                    <input
                      type="text"
                      value={personal.branch}
                      onChange={(e) => setPersonal({ ...personal, branch: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Graduation Year</label>
                  <select
                    value={personal.graduationYear}
                    onChange={(e) => setPersonal({ ...personal, graduationYear: parseInt(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                    <option value={2028}>2028</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Standing */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <BookOpen className="w-5 h-5" />
                <span>Step 2 — Academic Performance & CGPA</span>
              </div>
              <p className="text-xs text-slate-500">Academic criteria accounts for 10% of the recommendation matching index.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cumulative CGPA (out of 10.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={academic.cgpa}
                    onChange={(e) => setAcademic({ ...academic, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Semester</label>
                  <select
                    value={academic.semester}
                    onChange={(e) => setAcademic({ ...academic, semester: parseInt(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Skills & Proficiencies */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <Code2 className="w-5 h-5" />
                <span>Step 3 — Technical Skills & Self-Assessment</span>
              </div>
              <p className="text-xs text-slate-500">Add your core technical skills and estimate your current proficiency (0-100%).</p>

              {/* Skills List */}
              <div className="space-y-3 pt-2">
                {skills.map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>{s.name}</span>
                        <span className="text-indigo-600">{s.level}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={s.level}
                        onChange={(e) => {
                          const updated = [...skills];
                          updated[i].level = parseInt(e.target.value);
                          setSkills(updated);
                        }}
                        className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSkill(i)}
                      className="p-1.5 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Skill */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="e.g. Docker, Python, AWS..."
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 text-sm"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs hover:bg-indigo-100 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Projects */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <Code2 className="w-5 h-5" />
                <span>Step 4 — Technical Projects Portfolio</span>
              </div>
              <p className="text-xs text-slate-500">Demonstrate practical software engineering with project descriptions and GitHub repositories.</p>

              <div className="space-y-4 pt-2">
                {projects.map((p, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-indigo-600 uppercase">Project #{i + 1}</span>
                      {projects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setProjects(projects.filter((_, idx) => idx !== i))}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={p.title}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[i].title = e.target.value;
                          setProjects(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        placeholder="Project Description & Architecture..."
                        value={p.description}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[i].description = e.target.value;
                          setProjects(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Technologies (e.g. Java, SQL, Docker)"
                        value={p.technologies}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[i].technologies = e.target.value;
                          setProjects(updated);
                        }}
                        className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="GitHub Repository URL"
                        value={p.githubUrl}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[i].githubUrl = e.target.value;
                          setProjects(updated);
                        }}
                        className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setProjects([
                      ...projects,
                      { title: '', description: '', technologies: '', githubUrl: '', projectUrl: '' },
                    ])
                  }
                  className="w-full py-2.5 border-2 border-dashed border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Another Project
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Certifications */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <Award className="w-5 h-5" />
                <span>Step 5 — Verified Certifications</span>
              </div>
              <p className="text-xs text-slate-500">Add credentials from AWS, Oracle, Google Cloud, Meta, or Coursera.</p>

              <div className="space-y-3 pt-2">
                {certifications.map((c, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-indigo-600">Certificate #{i + 1}</span>
                      {certifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setCertifications(certifications.filter((_, idx) => idx !== i))}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Certificate Name (e.g. AWS Certified Cloud Practitioner)"
                      value={c.name}
                      onChange={(e) => {
                        const updated = [...certifications];
                        updated[i].name = e.target.value;
                        setCertifications(updated);
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Provider (e.g. Amazon Web Services)"
                        value={c.provider}
                        onChange={(e) => {
                          const updated = [...certifications];
                          updated[i].provider = e.target.value;
                          setCertifications(updated);
                        }}
                        className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                      />
                      <input
                        type="date"
                        value={c.completionDate}
                        onChange={(e) => {
                          const updated = [...certifications];
                          updated[i].completionDate = e.target.value;
                          setCertifications(updated);
                        }}
                        className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCertifications([
                      ...certifications,
                      { name: '', provider: '', completionDate: new Date().toISOString().split('T')[0] },
                    ])
                  }
                  className="w-full py-2.5 border-2 border-dashed border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Another Certificate
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Target Career Goal */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <Compass className="w-5 h-5" />
                <span>Step 6 — Target Career Goal & AI Alignment</span>
              </div>
              <p className="text-xs text-slate-500">SmartEdu AI will generate tailored skill gap roadmaps specifically for this role.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Backend Developer',
                  'Frontend Developer',
                  'Full Stack Developer',
                  'Data Scientist',
                  'AI Engineer',
                  'Cloud Engineer',
                  'Cybersecurity',
                ].map((role) => {
                  const isSelected = targetRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setTargetRole(role)}
                      className={`p-4 rounded-2xl text-left border-2 transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{role}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Wizard Bottom Navigation Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-100 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:opacity-95 transition"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition animate-pulse-slow"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch SmartEdu AI Analysis</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
