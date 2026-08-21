import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  FileText, 
  Calendar, 
  ArrowRight,
  Filter,
  Check,
  Send,
  Eye,
  Star
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { AddEditInternshipModal } from '../components/admin/AddEditInternshipModal';
import { api } from '../services/api';
import { RecruiterCandidate, Internship } from '../types';

export const RecruiterDashboardPage: React.FC = () => {
  const [candidates, setCandidates] = useState<RecruiterCandidate[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<RecruiterCandidate | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [candRes, internRes] = await Promise.all([
        api.getRecruiterCandidates(),
        api.getInternships()
      ]);
      if (candRes.success) setCandidates(candRes.candidates);
      if (internRes.success) setInternships(internRes.internships);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (candidateId: string, newStatus: RecruiterCandidate['status']) => {
    try {
      await api.updateCandidateStatus(candidateId, newStatus);
      setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, status: newStatus } : c));
    } catch (e) {
      alert('Failed to update status.');
    }
  };

  const filteredCandidates = candidates.filter(cand => {
    const matchSearch = cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchRole = selectedRoleFilter === 'All' || cand.targetRole.toLowerCase().includes(selectedRoleFilter.toLowerCase());
    const matchStatus = selectedStatusFilter === 'All' || cand.status === selectedStatusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-indigo-200 border border-white/10">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Company Hiring Partner Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                TechNova Hiring Hub
              </h1>
              <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
                Review AI-matched student talent, filter verified skill proficiencies, and schedule technical interviews.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-1.5 transition-all hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Internship</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {candidates.length}
            </span>
            <span className="text-xs text-slate-400 block">AI Recommended Applicants</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {candidates.filter(c => c.matchScore >= 90).length}
            </span>
            <span className="text-xs text-slate-400 block">High Matches (&gt;90% Score)</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {internships.length}
            </span>
            <span className="text-xs text-slate-400 block">Active Listings</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {candidates.filter(c => c.status === 'Shortlisted' || c.status === 'Interview Scheduled').length}
            </span>
            <span className="text-xs text-slate-400 block">In Interview Pipeline</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search candidate, college, or skill (e.g. Java, Python)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedRoleFilter}
              onChange={e => setSelectedRoleFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
            >
              <option value="All">All Roles</option>
              <option value="Backend">Backend Development</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Frontend">Frontend Development</option>
              <option value="Cloud">Cloud & DevOps</option>
            </select>

            <select
              value={selectedStatusFilter}
              onChange={e => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offered">Offered</option>
            </select>
          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing <strong>{filteredCandidates.length}</strong> top AI-matched candidates</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-44 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : filteredCandidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCandidates.map(cand => (
                <motion.div
                  key={cand.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{cand.name}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                            {cand.targetRole}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {cand.college} • {cand.branch} ({cand.graduationYear}) • <strong>{cand.cgpa} CGPA</strong>
                        </p>
                      </div>
                    </div>

                    {/* Circular AI Match Score Badge */}
                    <div className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-right shrink-0 shadow-md shadow-indigo-600/25">
                      <span className="text-base font-extrabold">{cand.matchScore}%</span>
                      <span className="text-[8px] uppercase tracking-wider block opacity-90">AI Match</span>
                    </div>
                  </div>

                  {/* Skills Chips */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Candidate Verified Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cand.skills.map(s => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Applied For & Status Controls */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Applied: <strong>{cand.appliedFor}</strong>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px] flex items-center space-x-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Profile</span>
                      </button>

                      {cand.status === 'New' && (
                        <button
                          onClick={() => handleStatusChange(cand.id, 'Shortlisted')}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center space-x-1 shadow-sm"
                        >
                          <Check className="w-3 h-3" />
                          <span>Shortlist</span>
                        </button>
                      )}

                      {cand.status === 'Shortlisted' && (
                        <button
                          onClick={() => handleStatusChange(cand.id, 'Interview Scheduled')}
                          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] flex items-center space-x-1"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>Schedule Interview</span>
                        </button>
                      )}

                      {cand.status === 'Interview Scheduled' && (
                        <button
                          onClick={() => handleStatusChange(cand.id, 'Offered')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center space-x-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send Offer</span>
                        </button>
                      )}

                      {cand.status === 'Offered' && (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[11px]">
                          ✓ Offer Extended
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Users className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No Candidates Matching Filters</h3>
              <p className="text-xs text-slate-500">Try adjusting role or status filters.</p>
            </div>
          )}
        </div>

      </div>

      {/* Post Internship Modal */}
      <AddEditInternshipModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        internshipToEdit={null}
        onSaved={fetchData}
      />

      {/* Candidate Profile Details Quick View Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full space-y-4 text-xs">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                className="w-14 h-14 rounded-2xl object-cover border"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedCandidate.name}</h3>
                <p className="text-slate-400">{selectedCandidate.email}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {selectedCandidate.matchScore}% Match for {selectedCandidate.appliedFor}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1.5">
              <p><strong>University:</strong> {selectedCandidate.college}</p>
              <p><strong>Department:</strong> {selectedCandidate.branch} (Class of {selectedCandidate.graduationYear})</p>
              <p><strong>Cumulative CGPA:</strong> {selectedCandidate.cgpa} / 10.0</p>
              <p><strong>Status:</strong> {selectedCandidate.status}</p>
            </div>

            <div>
              <strong className="block mb-1.5 text-slate-700 dark:text-slate-300">Verified Technical Skills:</strong>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.skills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleStatusChange(selectedCandidate.id, 'Shortlisted');
                  setSelectedCandidate(null);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold"
              >
                Shortlist Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
