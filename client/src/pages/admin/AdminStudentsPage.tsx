import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { Search, Users, Eye, X, CheckCircle2, Award, Code2 } from 'lucide-react';

export const AdminStudentsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getStudents({ search });
      setStudents(res.data.students || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudents();
  };

  if (loading && !students.length) {
    return <LoadingScreen message="Loading institutional student cohort directory..." />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Institutional Registry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Student Cohort Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Directory of enrolled students, profile completion indices, and career alignments.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700">
          Total Enrolled: {students.length}
        </span>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, email, college, or target role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
          >
            Search
          </button>
        </form>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Branch & College</th>
                <th className="p-4">Target Career Goal</th>
                <th className="p-4">Profile Score</th>
                <th className="p-4">Career Readiness</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{st.user?.name}</div>
                    <div className="text-slate-400 text-[11px]">{st.user?.email}</div>
                  </td>
                  <td className="p-4">
                    <div>{st.branch}</div>
                    <div className="text-slate-400 text-[11px]">{st.college}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {st.targetRole}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-indigo-600">{st.profileScore}%</td>
                  <td className="p-4 font-mono font-bold text-emerald-600">{st.careerReadiness}%</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedStudent(st)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Drilldown Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedStudent.user?.name}</h3>
                <p className="text-xs text-slate-500">{selectedStudent.user?.email} • {selectedStudent.college}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50">
                <span className="text-slate-400 font-semibold block">Academic Standing</span>
                <span className="font-bold text-slate-900">CGPA: {selectedStudent.cgpa} • Semester {selectedStudent.semester}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50">
                <span className="text-slate-400 font-semibold block">Target Career Path</span>
                <span className="font-bold text-indigo-700">{selectedStudent.targetRole}</span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.skills?.map((sk: any) => (
                  <span key={sk.id} className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold">
                    {sk.skill?.name} ({sk.level}%)
                  </span>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Projects ({selectedStudent.projects?.length || 0})</h4>
              <div className="space-y-2">
                {selectedStudent.projects?.map((p: any) => (
                  <div key={p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="font-bold text-slate-900">{p.title}</div>
                    <div className="text-slate-500">{p.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
