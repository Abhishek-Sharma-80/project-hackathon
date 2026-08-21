import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  Users, 
  ExternalLink, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Sparkles, 
  X,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { Company } from '../../types';

export const AdminCompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminCompanies();
      if (res.success) {
        setCompanies(res.companies);
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

  const handleToggleVerification = async (id: string, currentStatus: Company['status']) => {
    const nextStatus = currentStatus === 'Verified' ? 'Pending' : 'Verified';
    await api.updateCompanyStatus(id, nextStatus);
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: nextStatus } : c));
    showToast(`Company verification updated to ${nextStatus}.`);
  };

  const industries = ['All', 'Technology & Cloud Systems', 'Software Engineering', 'Artificial Intelligence & ML', 'Cloud Infrastructure & DevOps', 'Data Analytics & Business Intelligence', 'UI/UX & Product Design'];

  const filteredCompanies = companies.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchIndustry = industryFilter === 'All' || c.industry === industryFilter;
    return matchSearch && matchIndustry;
  });

  return (
    <AdminLayout
      pageTitle="Company & Recruiter Partner Management"
      pageSubtitle="Manage 320 verified enterprise hiring partners, corporate listings, and candidate screening pipelines."
      actionButton={
        <button
          onClick={() => showToast('Onboard New Corporate Partner Modal opened.')}
          className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Onboard Partner</span>
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
            
            <div className="w-full md:flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search partner companies by name, industry, or location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div className="w-full md:w-72">
              <select
                value={industryFilter}
                onChange={e => setIndustryFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                {industries.map(ind => <option key={ind} value={ind}>{ind === 'All' ? 'All Industries' : ind}</option>)}
              </select>
            </div>

          </div>
        </div>

        {/* 🏢 COMPANY GRID CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCompanies.map(company => (
            <div
              key={company.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-inner"
                  />
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center space-x-1 ${
                    company.status === 'Verified'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {company.status === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                    <span>{company.status}</span>
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">{company.industry}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-snug">
                    {company.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-3 gap-1 text-center bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl text-[11px]">
                  <div>
                    <span className="block font-black text-slate-900 dark:text-white">{company.activeInternshipsCount}</span>
                    <span className="text-[9px] text-slate-400 font-semibold uppercase">Listings</span>
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 dark:text-white">{company.totalApplicationsCount}</span>
                    <span className="text-[9px] text-slate-400 font-semibold uppercase">Applied</span>
                  </div>
                  <div>
                    <span className="block font-black text-emerald-600 dark:text-emerald-400">{company.averageMatchScore}%</span>
                    <span className="text-[9px] text-slate-400 font-semibold uppercase">Avg AI</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedCompany(company)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-300 hover:text-indigo-600 text-xs font-bold transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Portal</span>
                  </button>
                  <button
                    onClick={() => handleToggleVerification(company.id, company.status)}
                    className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 border border-slate-200 dark:border-slate-700 transition-colors"
                    title={company.status === 'Verified' ? 'Revoke Verification' : 'Verify Partner'}
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 📄 COMPANY DETAILS MODAL */}
      <AnimatePresence>
        {selectedCompany && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCompany(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={selectedCompany.logo}
                    alt={selectedCompany.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedCompany.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-[10px]">
                        {selectedCompany.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{selectedCompany.industry} • Founded {selectedCompany.foundedYear}</p>
                  </div>
                </div>

                <button onClick={() => setSelectedCompany(null)} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description & Metrics */}
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                  <h4 className="font-extrabold text-slate-800 dark:text-slate-200 uppercase text-[10px] tracking-wider">Company Profile</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedCompany.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-center">
                    <span className="text-xl font-black text-indigo-700 dark:text-indigo-300">{selectedCompany.activeInternshipsCount}</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">Active Roles</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900/60 text-center">
                    <span className="text-xl font-black text-sky-700 dark:text-sky-300">{selectedCompany.totalApplicationsCount}</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">Candidates Applied</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 text-center">
                    <span className="text-xl font-black text-emerald-700 dark:text-emerald-300">{selectedCompany.averageMatchScore}%</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">Avg Match Score</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                  <h4 className="font-extrabold text-slate-800 dark:text-slate-200 uppercase text-[10px] tracking-wider">Talent Acquisition Contact</h4>
                  <div className="space-y-1 text-slate-600 dark:text-slate-300">
                    <p className="flex items-center space-x-2">
                      <Users className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{selectedCompany.contactPerson}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{selectedCompany.contactEmail}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{selectedCompany.location}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Globe className="w-3.5 h-3.5 text-indigo-500" />
                      <a href={selectedCompany.website} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        {selectedCompany.website}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};
