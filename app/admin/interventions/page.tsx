'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { adminApi } from '@/services/api';
import { AlertTriangle, ShieldCheck, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AdminInterventionsPage() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchInterventions = async () => {
      try {
        setLoading(true);
        const res = await adminApi.getInterventions();
        setStudents(res.students || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInterventions();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <LoadingScreen message="Scanning student population for career readiness anomalies..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 uppercase tracking-wider">
            Early Warning System
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Students Needing Academic & Skill Intervention
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Automated flagging of students with low profile completeness, low career readiness, or critical prerequisite bottlenecks.
          </p>
        </div>

        {/* Intervention Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Student & Email</th>
                  <th className="p-4">Branch & Sem</th>
                  <th className="p-4">Profile Score</th>
                  <th className="p-4">Career Readiness</th>
                  <th className="p-4">Critical Skill Gaps</th>
                  <th className="p-4">Recommended Dean Action</th>
                  <th className="p-4">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{st.name}</div>
                      <div className="text-slate-400 text-[11px]">{st.email}</div>
                    </td>
                    <td className="p-4">
                      <div>{st.branch}</div>
                      <div className="text-slate-400 text-[11px]">CGPA: {st.cgpa}</div>
                    </td>
                    <td className="p-4 font-mono font-bold text-indigo-600">{st.profileScore}%</td>
                    <td className="p-4 font-mono font-bold text-amber-600">{st.careerReadiness}%</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {st.criticalGaps?.map((g: string) => (
                          <span key={g} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-700 border border-red-100">
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 max-w-xs font-semibold text-[11px]">
                      {st.recommendedAction}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          st.riskLevel === 'HIGH'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {st.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
