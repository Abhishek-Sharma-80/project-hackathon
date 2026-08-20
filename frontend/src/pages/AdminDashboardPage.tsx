import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  TrendingUp, 
  Sparkles, 
  Building2, 
  CheckCircle, 
  BarChart3, 
  MapPin 
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { AddEditInternshipModal } from '../components/admin/AddEditInternshipModal';
import { api } from '../services/api';
import { AdminStats, Internship, User, StudentProfile, Application } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [students, setStudents] = useState<(User & { profile: StudentProfile })[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'overview' | 'internships' | 'students' | 'applications'>('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, internsRes, studentsRes, appsRes] = await Promise.all([
        api.getAdminStats(),
        api.getInternships(),
        api.getAllStudents(),
        api.getAllApplicationsAdmin()
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (internsRes.success) setInternships(internsRes.internships);
      if (studentsRes.success) setStudents(studentsRes.students);
      if (appsRes.success) setApplications(appsRes.applications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteInternship = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await api.deleteInternship(id);
        setInternships(prev => prev.filter(i => i.id !== id));
      } catch (err) {
        alert('Failed to delete internship.');
      }
    }
  };

  const filteredInternships = internships.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.profile?.college || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/30">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Admin Control Center
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage internships, monitor student recommendation metrics, and track applicants.
            </p>
          </div>

          <button
            onClick={() => { setEditingInternship(null); setModalOpen(true); }}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/25 flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Internship</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex space-x-2 border-b border-slate-200/80 dark:border-slate-800 text-xs">
          {[
            { id: 'overview', label: 'Platform Overview', icon: BarChart3 },
            { id: 'internships', label: `Manage Internships (${internships.length})`, icon: Briefcase },
            { id: 'students', label: `Registered Students (${students.length})`, icon: Users },
            { id: 'applications', label: `Applications (${applications.length})`, icon: FileText },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 font-bold flex items-center space-x-2 border-b-2 transition-all ${
                  isActive
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Top 4 Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {stats?.totalStudents || 128}
                </span>
                <span className="text-xs text-slate-400 block">Total Students</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {stats?.totalInternships || internships.length}
                </span>
                <span className="text-xs text-slate-400 block">Active Internships</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {stats?.totalApplications || applications.length}
                </span>
                <span className="text-xs text-slate-400 block">Total Applications</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {stats?.totalRecommendationsGenerated || 450}+
                </span>
                <span className="text-xs text-slate-400 block">AI Match Computations</span>
              </div>
            </div>

            {/* In-Demand Skills & Sector Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Top Demanded Skills */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Top Skills Demanded by Companies
                  </h3>
                  <span className="text-[10px] text-purple-600 font-bold">AI Taxonomy</span>
                </div>

                <div className="space-y-2.5">
                  {(stats?.topDemandedSkills || [
                    { skill: 'React', count: 8 },
                    { skill: 'Python', count: 7 },
                    { skill: 'SQL', count: 6 },
                    { skill: 'JavaScript', count: 6 },
                    { skill: 'Figma', count: 4 },
                    { skill: 'Docker', count: 4 }
                  ]).map((item, idx) => (
                    <div key={item.skill} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{item.skill}</span>
                        <span className="font-bold text-slate-900 dark:text-white">{item.count} Listings</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                          style={{ width: `${(item.count / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sector Distribution */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Internship Sector Breakdown
                </h3>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {(stats?.sectorDistribution || [
                    { sector: 'Software Development', count: 7 },
                    { sector: 'Artificial Intelligence', count: 3 },
                    { sector: 'Data Science', count: 2 },
                    { sector: 'Design', count: 2 },
                    { sector: 'Cybersecurity', count: 1 },
                    { sector: 'Finance', count: 1 }
                  ]).map(sec => (
                    <div key={sec.sector} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">{sec.sector}</span>
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-extrabold">{sec.count} Openings</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: MANAGE INTERNSHIPS */}
        {activeTab === 'internships' && (
          <div className="space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search internships by title or company..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200/80 dark:border-slate-800 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3.5">Company & Role</th>
                      <th className="p-3.5">Sector</th>
                      <th className="p-3.5">Location & Mode</th>
                      <th className="p-3.5">Stipend</th>
                      <th className="p-3.5">Applicants</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredInternships.map(intern => (
                      <tr key={intern.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 dark:text-white">{intern.title}</div>
                          <div className="text-[11px] text-slate-400">{intern.companyName}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            {intern.sector}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-slate-700 dark:text-slate-300">{intern.location} ({intern.workMode})</span>
                        </td>
                        <td className="p-3.5 font-semibold text-indigo-600 dark:text-indigo-400">
                          {intern.stipend}
                        </td>
                        <td className="p-3.5 font-bold">
                          {intern.applicantCount || 0}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => { setEditingInternship(intern); setModalOpen(true); }}
                            className="p-1.5 text-slate-500 hover:text-purple-600 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteInternship(intern.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REGISTERED STUDENTS */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search students by name or university..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map(student => (
                <div
                  key={student.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(student.name)}`}
                      alt={student.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{student.name}</h4>
                      <p className="text-slate-400 text-[11px]">{student.email}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] space-y-1">
                    <p><strong>College:</strong> {student.profile?.college || 'Not set'}</p>
                    <p><strong>Branch:</strong> {student.profile?.branch || 'CS'} ({student.profile?.currentYear || '3rd Year'})</p>
                    <p><strong>CGPA:</strong> {student.profile?.cgpa || '8.0'}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Skills ({student.profile?.skills?.length || 0}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(student.profile?.skills || []).slice(0, 5).map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px]">
                          {s}
                        </span>
                      ))}
                      {(student.profile?.skills?.length || 0) > 5 && (
                        <span className="text-[10px] text-slate-400">+{student.profile!.skills.length - 5}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200/80 dark:border-slate-800 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3.5">Applicant</th>
                    <th className="p-3.5">Internship Applied</th>
                    <th className="p-3.5">Match %</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                        {app.studentName || 'Student'}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{app.internship?.title}</div>
                        <div className="text-[11px] text-slate-400">{app.internship?.companyName}</div>
                      </td>
                      <td className="p-3.5 font-extrabold text-indigo-600 dark:text-indigo-400">
                        {app.matchScoreAtApply || 85}%
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400 text-[11px]">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Add / Edit Internship Modal */}
      <AddEditInternshipModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        internshipToEdit={editingInternship}
        onSaved={loadData}
      />
    </DashboardLayout>
  );
};
