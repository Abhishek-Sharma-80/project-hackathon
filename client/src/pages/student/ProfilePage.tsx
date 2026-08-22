import React, { useEffect, useState } from 'react';
import { profileApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { CircularProgress } from '../../components/common/CircularProgress';
import {
  User,
  GraduationCap,
  Code2,
  Award,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [scoreBreakdown, setScoreBreakdown] = useState<any>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // New item modals / inputs
  const [newSkill, setNewSkill] = useState({ name: '', level: 70, category: 'Technical' });
  const [newProject, setNewProject] = useState({ title: '', description: '', technologies: '', githubUrl: '', projectUrl: '' });
  const [newCert, setNewCert] = useState({ name: '', provider: '', completionDate: '' });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await profileApi.getProfile();
      setProfile(res.data.profile);
      setScoreBreakdown(res.data.scoreBreakdown);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await profileApi.updateProfile({
        name: profile.user?.name,
        college: profile.college,
        course: profile.course,
        branch: profile.branch,
        graduationYear: profile.graduationYear,
        cgpa: profile.cgpa,
        semester: profile.semester,
        bio: profile.bio,
        targetRole: profile.targetRole,
      });
      setProfile(res.data.profile);
      setScoreBreakdown(res.data.scoreBreakdown);
      setNotification('Profile details updated and score recalculated successfully!');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) return;
    try {
      await profileApi.addSkill(newSkill);
      setNewSkill({ name: '', level: 70, category: 'Technical' });
      await fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await profileApi.deleteSkill(id);
      await fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = async () => {
    if (!newProject.title.trim()) return;
    try {
      await profileApi.createProject(newProject);
      setNewProject({ title: '', description: '', technologies: '', githubUrl: '', projectUrl: '' });
      await fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await profileApi.deleteProject(id);
      await fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCert = async () => {
    if (!newCert.name.trim()) return;
    try {
      await profileApi.createCertification(newCert);
      setNewCert({ name: '', provider: '', completionDate: '' });
      await fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCert = async (id: string) => {
    try {
      await profileApi.deleteCertification(id);
      await fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading full student profile and scoring breakdown..." />;
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Candidate Portfolio
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            My Profile & Career Settings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Every verified modification updates your Profile Score (0-100) and recommendation matching.
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Profile Score Card & Suggestions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0">
            <CircularProgress
              score={profile?.profileScore || 82}
              size={135}
              label="Profile Score"
              colorGradient="blue-indigo"
            />
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Score Optimization Suggestions:
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {scoreBreakdown?.suggestions?.map((sugg: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{sugg}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Personal & Academic Form */}
      <form onSubmit={handleUpdateProfile} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span>Academic & Target Role Info</span>
          </h3>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save Details'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={profile.user?.name || ''}
              onChange={(e) => setProfile({ ...profile, user: { ...profile.user, name: e.target.value } })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Career Role</label>
            <select
              value={profile.targetRole || 'Backend Developer'}
              onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Backend Developer">Backend Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="AI Engineer">AI Engineer</option>
              <option value="Cloud Engineer">Cloud Engineer</option>
              <option value="Cybersecurity">Cybersecurity Specialist</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">College / University</label>
            <input
              type="text"
              value={profile.college || ''}
              onChange={(e) => setProfile({ ...profile, college: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Branch / Degree</label>
            <input
              type="text"
              value={profile.branch || ''}
              onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Cumulative CGPA (out of 10.0)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={profile.cgpa || 8.5}
              onChange={(e) => setProfile({ ...profile, cgpa: parseFloat(e.target.value) || 0 })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current Semester</label>
            <select
              value={profile.semester || 6}
              onChange={(e) => setProfile({ ...profile, semester: parseInt(e.target.value) })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {/* SKILLS CRUD SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-600" />
          <span>Technical Skills Portfolio ({profile?.skills?.length || 0})</span>
        </h3>

        {/* Add Skill */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <input
            type="text"
            placeholder="Skill Name (e.g. Docker, Python, Redis)"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
          />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Level: {newSkill.level}%</span>
            <input
              type="range"
              min="10"
              max="100"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
              className="accent-indigo-600"
            />
          </div>
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition"
          >
            Add Skill
          </button>
        </div>

        {/* Existing Skills List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {profile?.skills?.map((sk: any) => (
            <div key={sk.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">{sk.skill?.name}</span>
                <span className="text-[11px] font-semibold text-indigo-600">Proficiency: {sk.level}%</span>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteSkill(sk.id)}
                className="p-1 text-slate-400 hover:text-red-500 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS CRUD SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-600" />
          <span>Projects Portfolio ({profile?.projects?.length || 0})</span>
        </h3>

        {/* Add Project Form */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold"
          />
          <textarea
            rows={2}
            placeholder="Architecture description..."
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Tech Stack (e.g. Java, SQL, Docker)"
              value={newProject.technologies}
              onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
              className="w-full p-2 rounded-xl border border-slate-200 text-xs"
            />
            <input
              type="text"
              placeholder="GitHub Repository URL"
              value={newProject.githubUrl}
              onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
              className="w-full p-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>
          <button
            type="button"
            onClick={handleAddProject}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl"
          >
            Save Project
          </button>
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          {profile?.projects?.map((proj: any) => (
            <div key={proj.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{proj.description}</p>
                <span className="text-[11px] font-semibold text-indigo-600 block">Stack: {proj.technologies}</span>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteProject(proj.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 ml-4"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS CRUD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <span>Certifications ({profile?.certifications?.length || 0})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <input
            type="text"
            placeholder="Certificate Name"
            value={newCert.name}
            onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
            className="p-2 rounded-xl border border-slate-200 text-xs"
          />
          <input
            type="text"
            placeholder="Provider (e.g. AWS, Oracle)"
            value={newCert.provider}
            onChange={(e) => setNewCert({ ...newCert, provider: e.target.value })}
            className="p-2 rounded-xl border border-slate-200 text-xs"
          />
          <button
            type="button"
            onClick={handleAddCert}
            className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl"
          >
            Add Certification
          </button>
        </div>

        <div className="space-y-2">
          {profile?.certifications?.map((c: any) => (
            <div key={c.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">{c.name}</span>
                <span className="text-[11px] text-slate-500">{c.provider} • Completed {c.completionDate}</span>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteCert(c.id)}
                className="p-1 text-slate-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
