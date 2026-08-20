import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  SlidersHorizontal, 
  ArrowUpDown, 
  DollarSign, 
  X 
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Navbar } from '../components/common/Navbar';
import { InternshipCard } from '../components/internships/InternshipCard';
import { MatchBreakdownModal } from '../components/dashboard/MatchBreakdownModal';
import { QuickApplyModal } from '../components/dashboard/QuickApplyModal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Internship, RecommendationBreakdown } from '../types';

export const ExploreInternshipsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [minStipend, setMinStipend] = useState(0);
  const [sortBy, setSortBy] = useState('newest');

  const [selectedBreakdown, setSelectedBreakdown] = useState<{ internship: Internship; breakdown: RecommendationBreakdown } | null>(null);
  const [applyModalIntern, setApplyModalIntern] = useState<Internship | null>(null);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const res = await api.getInternships({
        search: searchTerm || undefined,
        sector: selectedSector !== 'All' ? selectedSector : undefined,
        workMode: selectedMode !== 'All' ? selectedMode : undefined,
        minStipend: minStipend > 0 ? minStipend : undefined,
        sort: sortBy
      });
      if (res.success) {
        setInternships(res.internships);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInternships();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedSector, selectedMode, minStipend, sortBy]);

  const content = (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
          <Briefcase className="w-6 h-6 text-indigo-500" />
          <span>Explore All Opportunities</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Search through verified tech, AI, design, and business internships with live AI compatibility scores.
        </p>
      </div>

      {/* Search & Filter Header Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search Input Row */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by internship title, company name, required skill (e.g. React, Python, ML)..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Badges & Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          {/* Sector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sector</label>
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="All">All Sectors</option>
              <option value="Software Development">Software Development</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">UI/UX Design</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Work Mode</label>
            <select
              value={selectedMode}
              onChange={e => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="All">All Modes</option>
              <option value="Remote">Remote (Work From Home)</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Min Stipend */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Min Stipend (₹{minStipend.toLocaleString()}+)
            </label>
            <select
              value={minStipend}
              onChange={e => setMinStipend(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value={0}>Any Stipend</option>
              <option value={15000}>₹15,000+ / mo</option>
              <option value={25000}>₹25,000+ / mo</option>
              <option value={30000}>₹30,000+ / mo</option>
              <option value={35000}>₹35,000+ / mo</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
            >
              <option value="newest">Newest Listed</option>
              <option value="best-match">Best AI Match</option>
              <option value="highest-stipend">Highest Stipend</option>
              <option value="selection-prob">Selection Probability</option>
            </select>
          </div>

        </div>
      </div>

      {/* Internships Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Found <strong>{internships.length}</strong> available internships</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : internships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map(intern => (
              <InternshipCard
                key={intern.id}
                internship={intern}
                breakdown={intern.breakdown}
                onOpenBreakdown={(internship, breakdown) => setSelectedBreakdown({ internship, breakdown })}
                onApply={(internship) => setApplyModalIntern(internship)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <Search className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Internships Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching with different keywords or clearing some filters.
            </p>
          </div>
        )}
      </div>

      {/* Explainable Modal */}
      {selectedBreakdown && (
        <MatchBreakdownModal
          isOpen={!!selectedBreakdown}
          onClose={() => setSelectedBreakdown(null)}
          internship={selectedBreakdown.internship}
          breakdown={selectedBreakdown.breakdown}
          onApply={() => {
            setApplyModalIntern(selectedBreakdown.internship);
            setSelectedBreakdown(null);
          }}
        />
      )}

      {/* Quick Apply Modal */}
      {applyModalIntern && (
        <QuickApplyModal
          isOpen={!!applyModalIntern}
          onClose={() => setApplyModalIntern(null)}
          internship={applyModalIntern}
        />
      )}
    </div>
  );

  return isAuthenticated ? (
    <DashboardLayout>{content}</DashboardLayout>
  ) : (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">{content}</div>
    </div>
  );
};
