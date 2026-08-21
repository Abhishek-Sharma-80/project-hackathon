import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Calendar, 
  ExternalLink, 
  Clock, 
  X,
  Mail,
  Phone,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CircularProgress } from '../../components/common/CircularProgress';
import { api } from '../../services/api';
import { User, StudentProfile } from '../../types';

export const AdminStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<(User & { profile: StudentProfile })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<(User & { profile: StudentProfile }) | null>(null);
  const [statusMap, setStatusMap] = useState<Record<string, 'Active' | 'Suspended'>>({});
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.getAllStudentsAdmin();
        if (res.success) {
          setStudents(res.students);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleToggleStatus = (id: string) => {
    const current = statusMap[id] || 'Active';
    const next = current === 'Active' ? 'Suspended' : 'Active';
    setStatusMap(prev => ({ ...prev, [id]: next }));
    showToast(`Student account marked as ${next}.`);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student record?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
      if (selectedStudent?.id === id) setSelectedStudent(null);
      showToast('Student deleted successfully.');
    }
  };

  const colleges = ['All', 'Galgotias University', 'IIT Delhi', 'Delhi Technological University', 'BITS Pilani', 'NIT Surathkal', 'Nirma University', 'Anna University', 'Thapar University'];
  const branches = ['All', 'Software Engineering', 'Information Technology', 'Computer Engineering', 'Electronics & CS', 'Computer Science'];

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.profile?.skills || []).some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCollege = collegeFilter === 'All' || s.profile?.college === collegeFilter;
    const matchBranch = branchFilter === 'All' || s.profile?.branch === branchFilter;
    return matchSearch && matchCollege && matchBranch;
  });

  return (
    <AdminLayout
      pageTitle="Student Management"
      pageSubtitle="Manage and monitor all 12,480 registered students, verified skills, and AI placement readiness."
      actionButton={
        <button
          onClick={() => showToast('Student Registration Wizard opened.')}
          className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Student</span>
        </button>
      }
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="p-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* 🔍 SEARCH AND FILTERS */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="w-full md:flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search students by name, email, or skills (e.g. Java, Python, React)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            {/* College Filter */}
            <div className="w-full md:w-56">
              <select
                value={collegeFilter}
                onChange={e => setCollegeFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                {colleges.map(c => <option key={c} value={c}>{c === 'All' ? 'All Colleges' : c}</option>)}
              </select>
            </div>

            {/* Branch Filter */}
            <div className="w-full md:w-52">
              <select
                value={branchFilter}
                onChange={e => setBranchFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                {branches.map(b => <option key={b} value={b}>{b === 'All' ? 'All Branches' : b}</option>)}
              </select>
            </div>

          </div>
        </div>

        {/* 📋 STUDENT DATA TABLE */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">College & Branch</th>
                  <th className="py-3.5 px-4">Skills</th>
                  <th className="py-3.5 px-4 text-center">Profile Strength</th>
                  <th className="py-3.5 px-4 text-center">AI Readiness</th>
                  <th className="py-3.5 px-4 text-center">Applications</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredStudents.map(student => {
                  const status = statusMap[student.id] || 'Active';
                  const profileStrength = student.name === 'Abhishek Sharma' ? 82 : (student.profile?.resumeScore || 85);
                  const readinessScore = student.name === 'Abhishek Sharma' ? 91 : Math.min(96, (student.profile?.resumeScore || 80) + 4);
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      
                      {/* Student Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                            alt={student.name}
                            className="w-9 h-9 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                          />
                          <div>
                            <p className="font-extrabold text-slate-900 dark:text-white">{student.name}</p>
                            <p className="text-[11px] text-slate-400">{student.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* College & Branch */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{student.profile?.college || 'Galgotias University'}</p>
                        <p className="text-[11px] text-slate-400">{student.profile?.course || 'B.Tech'} • {student.profile?.branch || 'CSE'}</p>
                      </td>

                      {/* Skills Chips */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {(student.profile?.skills || ['Java', 'SQL', 'React']).slice(0, 3).map((skill, sIdx) => (
                            <span key={sIdx} className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">
                              {skill}
                            </span>
                          ))}
                          {(student.profile?.skills || []).length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-semibold">
                              +{(student.profile?.skills || []).length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Profile Strength */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center space-x-1.5">
                          <span className="font-extrabold text-slate-900 dark:text-white">{profileStrength}%</span>
                          <div className="w-12 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div
                              className="h-full bg-indigo-600 rounded-full"
                              style={{ width: `${profileStrength}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* AI Readiness Score */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-[11px]">
                          {readinessScore}% Match
                        </span>
                      </td>

                      {/* Applications */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {student.name === 'Abhishek Sharma' ? '12 Applications' : '6 Applications'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          status === 'Active'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60"
                            title="View Student Profile Dashboard"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(student.id)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/60"
                            title={status === 'Active' ? 'Suspend Student' : 'Activate Student'}
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60"
                            title="Delete Student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 👤 STUDENT DETAILS DASHBOARD MODAL / DRAWER */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudent(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedStudent.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedStudent.name}`}
                    alt={selectedStudent.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/30"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">{selectedStudent.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-extrabold text-[10px]">
                        Verified Student
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{selectedStudent.email}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">
                      {selectedStudent.profile?.college || 'Galgotias University'} • {selectedStudent.profile?.course || 'B.Tech'} {selectedStudent.profile?.branch || 'CSE'} (CGPA: {selectedStudent.profile?.cgpa || 8.4}/10.0)
                    </p>
                  </div>
                </div>

                <button onClick={() => setSelectedStudent(null)} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Strength & AI Readiness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Profile Strength Circular Progress */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center space-x-4">
                  <CircularProgress
                    value={selectedStudent.name === 'Abhishek Sharma' ? 82 : 88}
                    size={72}
                    strokeWidth={8}
                    colorClass="text-indigo-600 dark:text-indigo-400"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Profile Strength</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">82% Verified completeness with 4 projects & 6 certifications</p>
                  </div>
                </div>

                {/* AI Selection Readiness */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center space-x-4">
                  <CircularProgress
                    value={selectedStudent.name === 'Abhishek Sharma' ? 91 : 94}
                    size={72}
                    strokeWidth={8}
                    colorClass="text-emerald-500"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">AI Selection Readiness</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">High probability match for TechNova & CodeCraft Backend roles</p>
                  </div>
                </div>

              </div>

              {/* Student Skills with Proficiency Levels */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Verified Skill Proficiencies
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {[
                    { skill: 'Java', level: 90, color: 'bg-emerald-500' },
                    { skill: 'SQL', level: 85, color: 'bg-emerald-500' },
                    { skill: 'DSA', level: 75, color: 'bg-indigo-500' },
                    { skill: 'Spring Boot', level: 30, color: 'bg-rose-500' }
                  ].map(s => (
                    <div key={s.skill} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-slate-800 dark:text-slate-200">{s.skill}</span>
                        <span className="text-slate-900 dark:text-white">{s.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights Panel */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white border border-indigo-500/30 space-y-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <h4 className="font-extrabold text-xs tracking-wider uppercase text-indigo-300">Disha AI Diagnostic Insight</h4>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  "This student is highly suitable for backend development internships but needs improvement in Spring Boot and REST APIs to reach a 98% compatibility ceiling."
                </p>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Recent Career Activity Timeline
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { step: 'Profile Created', date: 'Jan 10, 2025', status: 'Completed', icon: CheckCircle2 },
                    { step: 'Skills & Projects Verified', date: 'Jan 15, 2025', status: 'Completed', icon: CheckCircle2 },
                    { step: 'Internship Recommended (TechNova 91% Match)', date: 'Feb 02, 2025', status: 'Active', icon: Sparkles },
                    { step: 'Internship Applied (TechNova Backend Dev)', date: 'Feb 10, 2025', status: 'Submitted', icon: Briefcase },
                    { step: 'Shortlisted for Round 1 Interview', date: 'Feb 18, 2025', status: 'In Progress', icon: Clock }
                  ].map((act, idx) => {
                    const Icon = act.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
                        <div className="flex items-center space-x-2.5">
                          <Icon className="w-4 h-4 text-indigo-500" />
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{act.step}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                          <span>{act.date}</span>
                          <span className="font-extrabold text-indigo-600 dark:text-indigo-400">• {act.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Close Action */}
              <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Close Profile
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};
