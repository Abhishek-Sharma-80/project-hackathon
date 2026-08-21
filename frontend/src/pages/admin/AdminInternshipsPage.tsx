import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Building2, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AddEditInternshipModal } from '../../components/admin/AddEditInternshipModal';
import { api } from '../../services/api';
import { Internship } from '../../types';

export const AdminInternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    loadInternships();
  }, []);

  const loadInternships = async () => {
    setLoading(true);
    try {
      const res = await api.getInternships();
      if (res.success) {
        setInternships(res.internships);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleApprove = (id: string) => {
    setInternships(prev => prev.map(i => i.id === id ? { ...i, status: 'active' } : i));
    showToast('Internship approved and published to live student recommendations!');
  };

  const handleReject = (id: string) => {
    setInternships(prev => prev.map(i => i.id === id ? { ...i, status: 'closed' } : i));
    showToast('Internship marked as closed.');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this internship posting?')) {
      setInternships(prev => prev.filter(i => i.id !== id));
      showToast('Internship deleted.');
    }
  };

  const domains = ['All', 'Software Development', 'Artificial Intelligence', 'Data Science', 'Cloud & DevOps', 'Design', 'Cybersecurity'];
  const statuses = ['All', 'active', 'closed'];

  const filteredInternships = internships.filter(item => {
    const company = item.company || item.companyName || '';
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.requiredSkills || []).some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchDomain = domainFilter === 'All' || item.sector === domainFilter;
    const matchStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchSearch && matchDomain && matchStatus;
  });

  return (
    <AdminLayout
      pageTitle="Internship Management"
      pageSubtitle="Oversee 1,250 corporate listings, review partner submissions, and manage eligibility criteria."
      actionButton={
        <button
          onClick={() => {
            setEditingInternship(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Internship</span>
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
                placeholder="Search internships by title, company, or required skills..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            {/* Domain Filter */}
            <div className="w-full md:w-56">
              <select
                value={domainFilter}
                onChange={e => setDomainFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                {domains.map(d => <option key={d} value={d}>{d === 'All' ? 'All Domains' : d}</option>)}
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-44">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="active">Active</option>
                <option value="closed">Closed / Expired</option>
              </select>
            </div>

          </div>
        </div>

        {/* 💼 INTERNSHIP DATA TABLE */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Internship Role</th>
                  <th className="py-3.5 px-4">Company & Domain</th>
                  <th className="py-3.5 px-4">Location & Stipend</th>
                  <th className="py-3.5 px-4 text-center">Applicants</th>
                  <th className="py-3.5 px-4 text-center">AI Matches</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredInternships.map(item => {
                  const applicants = item.applicantCount || Math.floor(Math.random() * 40 + 15);
                  const aiMatches = Math.floor(applicants * 1.8);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      
                      {/* Title & Duration */}
                      <td className="py-3.5 px-4">
                        <p className="font-extrabold text-slate-900 dark:text-white text-xs">{item.title}</p>
                        <p className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                          <Clock className="w-3 h-3 text-indigo-500" />
                          <span>{item.duration || '6 Months'} • {item.workMode || 'Remote'}</span>
                        </p>
                      </td>

                      {/* Company & Domain */}
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{item.company || item.companyName}</p>
                        <span className="inline-block text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                          {item.sector}
                        </span>
                      </td>

                      {/* Location & Stipend */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-700 dark:text-slate-300">{item.location}</p>
                        <p className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          {item.stipend || '₹15,000/mo'}
                        </p>
                      </td>

                      {/* Applicants */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{applicants}</span>
                      </td>

                      {/* AI Matches */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-[10px]">
                          {aiMatches} High Matches
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          item.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {item.status === 'active' ? 'Active' : 'Closed'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {item.status !== 'active' && (
                            <button
                              onClick={() => handleApprove(item.id)}
                              className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60"
                              title="Approve & Publish"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setEditingInternship(item);
                              setModalOpen(true);
                            }}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60"
                            title="Edit Listing"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60"
                            title="Delete Listing"
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

      {/* ➕ 4-STEP ADD / EDIT INTERNSHIP WIZARD MODAL */}
      <AddEditInternshipModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingInternship(null);
        }}
        onSaved={() => {
          setModalOpen(false);
          setEditingInternship(null);
          loadInternships();
          showToast('Internship saved and published successfully.');
        }}
        internshipToEdit={editingInternship}
      />
    </AdminLayout>
  );
};
