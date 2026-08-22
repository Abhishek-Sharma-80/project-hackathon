'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { internshipApi, applicationApi } from '@/services/api';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  AlertCircle,
} from 'lucide-react';

export default function InternshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await internshipApi.getInternshipById(id);
          setData(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);
      await applicationApi.apply({
        internshipId: id,
        status: 'APPLIED',
        matchScore: data?.matchAnalysis?.matchScore || 85,
        notes: `Applied to ${data?.internship?.title} with ${data?.matchAnalysis?.matchScore || 85}% SmartEdu AI Match.`,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      setApplied(true);
    } catch (err) {
      console.error(err);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <LoadingScreen message="Loading position requirements and company information..." />
      </StudentLayout>
    );
  }

  const { internship, matchAnalysis } = data || {};

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
        <div>
          <Link
            href="/internships"
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Internships
          </Link>
        </div>

        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 uppercase tracking-wider">
                {internship?.careerCategory} Track
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                {internship?.title}
              </h1>
              <p className="text-sm font-bold text-indigo-600 mt-1">
                {internship?.company?.name} • {internship?.location} ({internship?.workMode})
              </p>
            </div>

            {matchAnalysis && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center shrink-0">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">SmartEdu AI Match</span>
                <span className="text-3xl font-black text-emerald-700 font-mono">
                  {matchAnalysis.matchScore}%
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 font-bold block">Monthly Stipend</span>
              <span className="font-bold text-slate-900">{internship?.stipend}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block">Duration</span>
              <span className="font-bold text-slate-900">{internship?.duration}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block">Work Mode</span>
              <span className="font-bold text-slate-900">{internship?.workMode}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block">Application Deadline</span>
              <span className="font-bold text-slate-900">{internship?.deadline || 'Rolling'}</span>
            </div>
          </div>
        </div>

        {/* Description & Responsibilities */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Role Overview</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {internship?.description}
            </p>
          </div>

          {internship?.responsibilities && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Key Responsibilities</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {internship.responsibilities}
              </p>
            </div>
          )}

          {/* Required Skills Matrix */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">Required Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {internship?.requiredSkills?.map((req: any) => (
                <div
                  key={req.id}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold flex items-center gap-2"
                >
                  <span className="font-bold text-slate-800">{req.skill?.name}</span>
                  <span className="text-[10px] text-indigo-600 font-mono">({req.requiredLevel}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Button Action */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/recommendations/${internship?.id}`}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>View Explainable Match Diagnostic</span>
            </Link>

            <button
              onClick={handleApply}
              disabled={applying || applied}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 ${
                applied
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20 cursor-default'
                  : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:opacity-95 text-white shadow-indigo-500/25'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{applied ? 'Application Submitted ✓' : applying ? 'Submitting...' : 'Apply for this Internship'}</span>
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
