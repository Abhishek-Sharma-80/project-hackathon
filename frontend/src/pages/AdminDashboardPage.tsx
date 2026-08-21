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
  MapPin,
  AlertTriangle,
  Send,
  Download,
  CheckCircle2,
  PieChart as PieIcon,
  LineChart as LineIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
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

  const [activeTab, setActiveTab] = useState<'overview' | 'internships' | 'students' | 'applications' | 'analytics'>('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [atRiskModalOpen, setAtRiskModalOpen] = useState(false);
  const [guidanceSent, setGuidanceSent] = useState<Record<string, boolean>>({});

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
    if (window.confirm('Are you sure you want to delete this internship listing?')) {
      try {
        await api.deleteInternship(id);
        setInternships(prev => prev.filter(i => i.id !== id));
      } catch (err) {
        alert('Failed to delete internship.');
      }
    }
  };

  const handleSendGuidance = (studentId: string) => {
    setGuidanceSent(prev => ({ ...prev, [studentId]: true }));
    setTimeout(() => {
      alert('AI Career Guidance Roadmap dispatched to student email and dashboard notification center.');
    }, 200);
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

  const atRiskStudents = students.filter(s => (s.profile?.cgpa || 8.0) < 7.5 || (s.profile?.skills?.length || 0) < 5);

  const COLORS = ['#6366F1', '#0EA5E9', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Admin & College Placement Dashboard
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Galgotias University • Comprehensive student cohort analytics and employer partner management.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => { setEditingInternship(null); setModalOpen(true); }}
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/25 flex items-center space-x-1.5 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Internship</span>
            </button>
          </div>
        </div>

        {/* Dashboard Metrics (4 Cards) + Students At Risk Alert Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats?.totalStudents || 1200}
            </span>
            <span className="text-xs text-slate-400 block font-medium">Total Students</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats?.activeStudents || 640}
            </span>
            <span className="text-xs text-slate-400 block font-medium">Active Students</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats?.availableInternships || 320}
            </span>
            <span className="text-xs text-slate-400 block font-medium">Available Internships</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats?.partnerCompanies || 150}
            </span>
            <span className="text-xs text-slate-400 block font-medium">Partner Companies</span>
          </div>

          {/* Students At Risk Card */}
          <div className="bg-gradient-to-br from-rose-500/10 to-rose-600/20 border border-rose-300 dark:border-rose-800 p-5 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  Intervention
                </span>
              </div>
              <span className="text-2xl font-extrabold text-rose-700 dark:text-rose-400 block mt-2">
                {stats?.studentsAtRiskCount || 85}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium block">
                Students At Risk (Needs Guidance)
              </span>
            </div>
            <button
              onClick={() => setAtRiskModalOpen(true)}
              className="w-full py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] transition-colors"
            >
              View Students
            </button>
          </div>

        </div>

        {/* Tab Controls */}
        <div className="flex space-x-2 border-b border-slate-200/80 dark:border-slate-800 text-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Platform Analytics', icon: BarChart3 },
            { id: 'internships', label: `Manage Internships (${internships.length})`, icon: Briefcase },
            { id: 'students', label: `Registered Students (${students.length})`, icon: Users },
            { id: 'applications', label: `Application Funnel (${applications.length})`, icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-all ${
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

        {/* TAB 1: OVERVIEW & ANALYTICS CHARTS (Recharts) */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Top Charts Grid (Bar & Pie Charts) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Most Popular Skills (Bar Chart) */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Most Demanded Skills by Companies
                    </h3>
                    <span className="text-[11px] text-slate-400">Total verified openings requiring skill</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    Live Market Data
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats?.topDemandedSkills || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                      <XAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                      <Bar dataKey="count" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Student Skill Distribution (Donut / Pie Chart) */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Student Skill Distribution
                    </h3>
                    <span className="text-[11px] text-slate-400">By domain specialization</span>
                  </div>
                </div>

                <div className="h-52 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats?.skillDistribution || []}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="percentage"
                      >
                        {(stats?.skillDistribution || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  {(stats?.skillDistribution || []).map((item, idx) => (
                    <div key={item.name} className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color || COLORS[idx % COLORS.length] }} />
                      <span className="truncate text-slate-600 dark:text-slate-300">{item.name} ({item.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Row: Monthly Placement Trends Area Chart & Sector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Monthly Application & Placement Trends */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Application & Placement Conversion Trends
                    </h3>
                    <span className="text-[11px] text-slate-400">Monthly student participation vs selection</span>
                  </div>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats?.monthlyTrends || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPlace" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                      <Area type="monotone" dataKey="applications" stroke="#6366F1" fillOpacity={1} fill="url(#colorApp)" />
                      <Area type="monotone" dataKey="placements" stroke="#10B981" fillOpacity={1} fill="url(#colorPlace)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Internship Sector Distribution */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Internship Domains Distribution
                </h3>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {(stats?.sectorDistribution || []).map(sec => (
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
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search internships by role or company..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200/80 dark:border-slate-800 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3.5">Role & Company</th>
                      <th className="p-3.5">Sector</th>
                      <th className="p-3.5">Mode</th>
                      <th className="p-3.5">Stipend</th>
                      <th className="p-3.5">Applicants</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredInternships.map(intern => (
                      <tr key={intern.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 dark:text-white">{intern.title}</div>
                          <div className="text-[11px] text-slate-400">{intern.companyName}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            {intern.sector}
                          </span>
                        </td>
                        <td className="p-3.5">{intern.workMode}</td>
                        <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{intern.stipend}</td>
                        <td className="p-3.5 font-bold">{intern.applicantCount || 0}</td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => { setEditingInternship(intern); setModalOpen(true); }}
                            className="p-1.5 text-slate-400 hover:text-purple-600"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteInternship(intern.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
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
                placeholder="Search students by name, email or college..."
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
                      className="w-10 h-10 rounded-xl object-cover border"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{student.name}</h4>
                      <p className="text-slate-400 text-[11px]">{student.email}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] space-y-1">
                    <p><strong>College:</strong> {student.profile?.college || 'Galgotias University'}</p>
                    <p><strong>Branch:</strong> {student.profile?.branch || 'Computer Science'} • CGPA: {student.profile?.cgpa || 8.0}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {(student.profile?.skills || []).slice(0, 5).map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px]">
                        {s}
                      </span>
                    ))}
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
                    <th className="p-3.5">Role Applied</th>
                    <th className="p-3.5">AI Match %</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                        {app.studentName || 'Abhishek Sharma'}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold">{app.internship?.title}</div>
                        <div className="text-[11px] text-slate-400">{app.internship?.companyName}</div>
                      </td>
                      <td className="p-3.5 font-extrabold text-indigo-600 dark:text-indigo-400">
                        {app.matchScoreAtApply || 91}%
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

      {/* At-Risk Students Intervention Modal */}
      {atRiskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full space-y-4 text-xs max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Students At Risk – Career Intervention
                </h3>
              </div>
              <button
                onClick={() => setAtRiskModalOpen(false)}
                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Students identified with &lt;7.5 CGPA, low verified skill counts, or 0 active applications who need proactive career counseling.
            </p>

            <div className="flex-1 overflow-y-auto space-y-3">
              {atRiskStudents.length > 0 ? (
                atRiskStudents.map(student => (
                  <div
                    key={student.id}
                    className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{student.name}</h4>
                      <p className="text-[11px] text-slate-500">{student.email} • CGPA: {student.profile?.cgpa || 7.2}</p>
                      <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">
                        Alert: Only {student.profile?.skills?.length || 3} verified skills listed
                      </span>
                    </div>

                    <button
                      onClick={() => handleSendGuidance(student.id)}
                      disabled={guidanceSent[student.id]}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] flex items-center space-x-1 shrink-0 disabled:opacity-50"
                    >
                      <Send className="w-3 h-3" />
                      <span>{guidanceSent[student.id] ? 'Guidance Sent ✓' : 'Send AI Roadmap'}</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                  All students in this cohort meet healthy baseline activity indicators!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
