import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { internshipApi, applicationApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import {
  Search,
  Filter,
  Sparkles,
  MapPin,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Building2,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

export const InternshipsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [workMode, setWorkMode] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'recommended' | 'saved'>('all');
  const [appliedMap, setAppliedMap] = useState<Record<string, boolean>>({});

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const params: any = { tab: activeTab };
      if (search) params.search = search;
      if (category !== 'all') params.category = category;
      if (workMode !== 'all') params.workMode = workMode;

      const res = await internshipApi.getInternships(params);
      setInternships(res.data.internships || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [category, workMode, activeTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInternships();
  };

  const handleSaveToggle = async (internshipId: string, currentSaved: boolean) => {
    try {
      if (currentSaved) {
        // Find app and delete
        // Optimistic update
        setInternships(internships.map((i) => (i.id === internshipId ? { ...i, isSaved: false } : i)));
      } else {
        await applicationApi.createApplication({ internshipId, status: 'SAVED' });
        setInternships(internships.map((i) => (i.id === internshipId ? { ...i, isSaved: true } : i)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = async (internshipId: string) => {
    try {
      await applicationApi.createApplication({ internshipId, status: 'APPLIED' });
      setAppliedMap({ ...appliedMap, [internshipId]: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Discover Opportunities
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse 40+ curated tech internships with dynamically ranked AI match percentages.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex p-1 rounded-2xl bg-white border border-slate-200 shadow-sm self-start sm:self-auto">
          {(['all', 'recommended', 'saved'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'recommended' ? 'AI Recommended' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role, company, or tech stack (e.g. Java, TechNova, Backend)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-500">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Cloud">Cloud & DevOps</option>
            <option value="AI/ML">AI & Machine Learning</option>
            <option value="CyberSecurity">Cybersecurity</option>
          </select>

          <select
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none"
          >
            <option value="all">All Work Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          <span className="ml-auto font-bold text-slate-400">
            Showing {internships.length} Results
          </span>
        </div>
      </div>

      {/* Internships Grid */}
      {loading ? (
        <LoadingScreen message="Filtering matching opportunities..." />
      ) : internships.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No matching internships found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria, or explore our personalized learning roadmaps to unlock more positions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internships.map((item) => {
            const isApplied = appliedMap[item.id];
            return (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.matchScore || 75}% Match</span>
                    </span>

                    <button
                      onClick={() => handleSaveToggle(item.id, item.isSaved)}
                      className={`p-2 rounded-xl transition ${
                        item.isSaved
                          ? 'text-indigo-600 bg-indigo-50'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                      title={item.isSaved ? 'Saved' : 'Save for later'}
                    >
                      {item.isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{item.title}</h3>
                  <p className="text-xs font-bold text-indigo-600 mt-0.5">{item.company?.name}</p>

                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {item.stipend}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Skills preview */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.requiredSkills?.slice(0, 4).map((req: any) => (
                      <span
                        key={req.id}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700"
                      >
                        {req.skill?.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    to={`/internships/${item.id}`}
                    className="flex-1 text-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                  >
                    Details & Match
                  </Link>
                  <button
                    onClick={() => handleApply(item.id)}
                    disabled={isApplied}
                    className={`flex-1 text-center py-2.5 rounded-xl font-bold text-xs transition ${
                      isApplied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-95 text-white shadow-sm'
                    }`}
                  >
                    {isApplied ? 'Applied ✓' : 'Quick Apply'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
