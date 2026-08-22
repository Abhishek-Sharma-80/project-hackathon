import React, { useEffect, useState } from 'react';
import { internshipApi, adminApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { Plus, Trash2, Edit3, Briefcase, Check, X } from 'lucide-react';

export const AdminInternshipsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    companyName: 'TechNova',
    description: '',
    location: 'Bangalore / Remote',
    workMode: 'Remote',
    stipend: '₹35,000 / month',
    duration: '6 Months',
    careerCategory: 'Backend',
    skills: [{ name: 'Java', requiredLevel: 75 }, { name: 'Spring Boot', requiredLevel: 70 }],
  });

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const res = await internshipApi.getInternships();
      setInternships(res.data.internships || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.createInternship(formData);
      setShowModal(false);
      fetchInternships();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminApi.deleteInternship(id);
      setInternships(internships.filter((i) => i.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && !internships.length) {
    return <LoadingScreen message="Loading institutional internship listings and recruiter partnerships..." />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Employer Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Internship Listings & Role Requirements
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            CRUD manager for enterprise job postings, prerequisite weights, and active recruitment status.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Internship</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Role & Company</th>
              <th className="p-4">Domain Track</th>
              <th className="p-4">Location & Stipend</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {internships.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="p-4">
                  <div className="font-bold text-slate-900">{item.title}</div>
                  <div className="text-indigo-600 font-semibold">{item.company?.name}</div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    {item.careerCategory}
                  </span>
                </td>
                <td className="p-4">
                  <div>{item.location} ({item.workMode})</div>
                  <div className="text-slate-400 text-[11px]">{item.stipend}</div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition"
                    title="Delete internship"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Post New Internship</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role Title</label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Systems Intern"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Career Category</label>
                  <select
                    value={formData.careerCategory}
                    onChange={(e) => setFormData({ ...formData, careerCategory: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Cloud">Cloud</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="CyberSecurity">CyberSecurity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Role responsibilities and engineering requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Stipend</label>
                  <input
                    type="text"
                    value={formData.stipend}
                    onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={formData.workMode}
                    onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
                >
                  Publish Internship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
