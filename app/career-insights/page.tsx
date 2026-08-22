'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { CircularProgress } from '@/components/common/CircularProgress';
import { profileApi } from '@/services/api';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  AlertCircle,
  BarChart3,
} from 'lucide-react';

export default function CareerInsightsPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const res = await profileApi.getProfile();
        setProfile(res.profile);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <LoadingScreen message="Synthesizing multidimensional career readiness telemetry..." />
      </StudentLayout>
    );
  }

  const skillComparisonData = [
    { skill: 'Java', studentLevel: 90, industryDemand: 92 },
    { skill: 'SQL', studentLevel: 85, industryDemand: 90 },
    { skill: 'DSA & Algorithms', studentLevel: 80, industryDemand: 94 },
    { skill: 'Git & Workflows', studentLevel: 75, industryDemand: 88 },
    { skill: 'React & Frontend', studentLevel: 55, industryDemand: 92 },
    { skill: 'Cloud & AWS', studentLevel: 50, industryDemand: 90 },
    { skill: 'REST APIs & Security', studentLevel: 40, industryDemand: 91 },
    { skill: 'Docker Containers', studentLevel: 30, industryDemand: 93 },
    { skill: 'Spring Boot 3', studentLevel: 20, industryDemand: 89 },
    { skill: 'System Design', studentLevel: 25, industryDemand: 86 },
  ];

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Strategic Career Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Career Insights & Industry Alignment
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Compare your current technical competencies against current industry hiring demands.
          </p>
        </div>

        {/* Top Readiness & Alignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Career Readiness Index */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Career Readiness Index</span>
            <CircularProgress
              score={profile?.careerReadiness || 76}
              size={130}
              label="Industry Index"
              colorGradient="emerald-green"
            />
            <p className="text-xs text-slate-500 mt-2">Based on skills, verified tests & projects</p>
          </div>

          {/* Strongest Career Track */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">Strongest Career Match</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Backend Development</h3>
              <p className="text-xs text-slate-500 mt-1">88% suitability based on Java & SQL foundations.</p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/recommendations"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Explore Backend Positions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Growing Opportunity */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-2">Growing Opportunities</span>
              <h3 className="text-xl font-bold text-slate-900">Cloud & DevOps Engineering</h3>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Current Eligibility:</span>
                  <span className="text-amber-600">52%</span>
                </div>
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Learn AWS & Docker:</span>
                  <span className="text-emerald-600">78% Potential</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/learning-path"
                className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1"
              >
                <span>Bridge Cloud Gaps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Industry Demand vs Student Level Bar Visualization */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Industry Demand vs Your Skill Proficiency
              </h3>
              <p className="text-xs text-slate-500">Live benchmark against 40+ active technology internship postings.</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-600" /> Your Level</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-300" /> Market Demand</span>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {skillComparisonData.map((item) => (
              <div key={item.skill} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800">{item.skill}</span>
                  <span className="text-slate-500 font-mono">
                    You: <strong className="text-indigo-600">{item.studentLevel}%</strong> • Demand: <strong>{item.industryDemand}%</strong>
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"
                      style={{ width: `${item.studentLevel}%` }}
                    />
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden opacity-60">
                    <div
                      className="h-full bg-slate-400 rounded-full"
                      style={{ width: `${item.industryDemand}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
