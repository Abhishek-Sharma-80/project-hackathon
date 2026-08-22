'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { internshipApi } from '@/services/api';
import {
  Search,
  Building2,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Filter,
  CheckCircle2,
} from 'lucide-react';

export default function InternshipsPage() {
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [workMode, setWorkMode] = useState('');

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (workMode) params.workMode = workMode;

      const res = await internshipApi.getInternships(params);
      setInternships(res.internships || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [category, workMode]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInternships();
  };

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Verified Opportunities Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Discover Verified Internships ({internships.length})
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse and filter through open technology positions with live match ratings.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by role, keyword, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none"
            >
              <option value="">All Categories</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Cloud">Cloud & DevOps</option>
              <option value="AI/ML">AI & Data Science</option>
              <option value="CyberSecurity">CyberSecurity</option>
            </select>

            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none"
            >
              <option value="">All Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <LoadingScreen message="Searching internship listings..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internships.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                      {item.careerCategory}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black font-mono ${
                        item.matchScore >= 85
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.matchScore >= 70
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.matchScore}% Match
                    </span>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-xs font-semibold text-indigo-600 mt-0.5">{item.company?.name}</p>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs text-slate-500 pt-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location} ({item.workMode})</span>
                    <span className="flex items-center gap-1 font-bold text-slate-700">{item.stipend}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/recommendations/${item.id}`}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why Match?</span>
                  </Link>
                  <Link
                    href={`/internships/${item.id}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
                  >
                    View & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
