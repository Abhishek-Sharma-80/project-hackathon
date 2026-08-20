import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Code, 
  Sliders, 
  Check, 
  Plus, 
  X, 
  Save, 
  Sparkles, 
  Link as LinkIcon, 
  Mail, 
  Phone, 
  Building2 
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { StudentProfile } from '../types';

export const ProfilePage: React.FC = () => {
  const { user, profile, updateProfileState } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'personal' | 'education' | 'skills' | 'preferences'>('personal');
  const [formData, setFormData] = useState<Partial<StudentProfile>>({
    fullName: '',
    phone: '',
    highestQualification: 'B.Tech',
    college: '',
    course: '',
    branch: '',
    currentYear: '3rd Year',
    cgpa: 8.4,
    skills: [],
    interests: [],
    preferredLocation: 'Bengaluru / Remote',
    workPreference: 'Remote',
    durationPreference: '3-6 Months',
    bio: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: ''
  });

  const [skillInput, setSkillInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || user?.name || '',
        phone: profile.phone || '',
        highestQualification: profile.highestQualification || 'B.Tech',
        college: profile.college || '',
        course: profile.course || '',
        branch: profile.branch || '',
        currentYear: profile.currentYear || '3rd Year',
        cgpa: profile.cgpa || 8.0,
        skills: profile.skills || [],
        interests: profile.interests || [],
        preferredLocation: profile.preferredLocation || 'Any',
        workPreference: profile.workPreference || 'Remote',
        durationPreference: profile.durationPreference || '3-6 Months',
        bio: profile.bio || '',
        linkedinUrl: profile.linkedinUrl || '',
        githubUrl: profile.githubUrl || '',
        portfolioUrl: profile.portfolioUrl || ''
      });
    }
  }, [profile, user]);

  const addSkill = () => {
    if (skillInput.trim() && !(formData.skills || []).includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: (formData.skills || []).filter(s => s !== skill)
    });
  };

  const toggleSector = (sector: string) => {
    const current = formData.interests || [];
    if (current.includes(sector)) {
      setFormData({ ...formData, interests: current.filter(s => s !== sector) });
    } else {
      setFormData({ ...formData, interests: [...current, sector] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');

    try {
      const res = await api.updateProfile(formData);
      if (res.success) {
        updateProfileState(res.profile);
        setSuccessMsg('Profile updated successfully! AI compatibility recalculating.');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
              <User className="w-6 h-6 text-indigo-500" />
              <span>Student Profile Settings</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your academic background, skills, and preferences to refine your AI recommendation accuracy.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 self-start sm:self-auto disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : t('btn_save_changes')}</span>
          </button>
        </div>

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center space-x-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-slate-200/80 dark:border-slate-800 text-xs">
          {[
            { id: 'personal', label: 'Personal Information', icon: User },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'skills', label: 'Skills & Tools', icon: Code },
            { id: 'preferences', label: 'Preferences & Work Mode', icon: Sliders },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 font-bold flex items-center space-x-2 border-b-2 transition-all ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 text-xs">
          
          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
                  alt="Avatar"
                  className="w-16 h-16 rounded-2xl border border-slate-200 dark:border-slate-700 object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</h3>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName || ''}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Short Bio</label>
                <textarea
                  rows={3}
                  value={formData.bio || ''}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Passionate student pursuing software engineering internships..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedinUrl || ''}
                    onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl || ''}
                    onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Portfolio Link</label>
                  <input
                    type="url"
                    value={formData.portfolioUrl || ''}
                    onChange={e => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://myportfolio.dev"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Degree / Qualification</label>
                  <input
                    type="text"
                    value={formData.highestQualification || ''}
                    onChange={e => setFormData({ ...formData, highestQualification: e.target.value })}
                    placeholder="e.g. B.Tech"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">College / University</label>
                  <input
                    type="text"
                    value={formData.college || ''}
                    onChange={e => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. Galgotias University"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Branch / Specialization</label>
                  <input
                    type="text"
                    value={formData.branch || ''}
                    onChange={e => setFormData({ ...formData, branch: e.target.value })}
                    placeholder="e.g. Computer Science & AI"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Year</label>
                  <select
                    value={formData.currentYear || '3rd Year'}
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
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">CGPA / Grade</label>
                  <input
                    type="number"
                    step="0.1"
                    min="4"
                    max="10"
                    value={formData.cgpa || 8.0}
                    onChange={e => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Add / Remove Skills
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Type skill & press Enter (e.g. TypeScript, React, Docker)..."
                    className="flex-1 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 min-h-[80px]">
                {(formData.skills || []).map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>{skill}</span>
                    <button type="button" onClick={() => removeSkill(skill)} className="text-indigo-200 hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Target Sectors
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Software Development',
                    'Artificial Intelligence',
                    'Data Science',
                    'Cybersecurity',
                    'Design',
                    'Marketing',
                    'Finance'
                  ].map(sec => {
                    const isSelected = (formData.interests || []).includes(sec);
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => toggleSector(sec)}
                        className={`px-3.5 py-2 rounded-xl font-bold border transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isSelected ? `✓ ${sec}` : `+ ${sec}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Mode</label>
                  <select
                    value={formData.workPreference || 'Remote'}
                    onChange={e => setFormData({ ...formData, workPreference: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Remote">Remote (Work From Home)</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                    <option value="Any">Any Mode</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Location</label>
                  <input
                    type="text"
                    value={formData.preferredLocation || ''}
                    onChange={e => setFormData({ ...formData, preferredLocation: e.target.value })}
                    placeholder="e.g. Bengaluru, Hyderabad, or Any"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Submit Row */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
};
