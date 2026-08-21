import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Route, 
  Plus, 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  Edit3, 
  Copy, 
  Trash2, 
  BookOpen, 
  Sparkles,
  X
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { LearningPathAdmin } from '../../types';

export const AdminLearningPathsPage: React.FC = () => {
  const [paths, setPaths] = useState<LearningPathAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Software Development');
  const [newWeeks, setNewWeeks] = useState(6);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    loadPaths();
  }, []);

  const loadPaths = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminLearningPaths();
      if (res.success) {
        setPaths(res.paths);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleCreatePath = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await api.createLearningPath({
      title: newTitle,
      category: newCategory,
      durationWeeks: Number(newWeeks),
      description: `Automated ${newCategory} curriculum roadmap designed for student career readiness.`,
      steps: [
        { step: 1, title: 'Core Foundations & Setup', skills: ['Fundamentals', 'Git'], estimatedHours: 10 },
        { step: 2, title: 'Framework Architecture & Design', skills: ['Frameworks', 'Patterns'], estimatedHours: 14 },
        { step: 3, title: 'Capstone Real-World Project', skills: ['Deployment', 'Portfolio'], estimatedHours: 16 }
      ]
    });

    setCreateModalOpen(false);
    setNewTitle('');
    loadPaths();
    showToast('New Career Learning Path published!');
  };

  const handleDuplicate = (path: LearningPathAdmin) => {
    const dup: LearningPathAdmin = {
      ...path,
      id: `path-dup-${Date.now()}`,
      title: `${path.title} (Copy)`,
      totalStudents: 0,
      completionRate: 0
    };
    setPaths(prev => [dup, ...prev]);
    showToast('Learning path duplicated.');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this learning path curriculum?')) {
      setPaths(prev => prev.filter(p => p.id !== id));
      showToast('Learning path deleted.');
    }
  };

  return (
    <AdminLayout
      pageTitle="Learning Path & Roadmap Management"
      pageSubtitle="Curate guided 5-step industry career milestone roadmaps to bridge aggregate university skill gaps."
      actionButton={
        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Path</span>
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

        {/* 📚 ROADMAP CARDS LIST */}
        <div className="space-y-6">
          {paths.map(path => (
            <div
              key={path.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5"
            >
              {/* Header & Metrics */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-extrabold text-[10px] uppercase">
                      {path.category}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">• {path.durationWeeks} Weeks Estimated</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">{path.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{path.description}</p>
                </div>

                {/* Cohort Stats */}
                <div className="flex items-center space-x-6 text-xs shrink-0">
                  <div className="text-center">
                    <span className="block font-black text-slate-900 dark:text-white text-base">{path.totalStudents.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Enrolled</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-black text-emerald-600 dark:text-emerald-400 text-base">{path.completionRate}%</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Completion</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-black text-indigo-600 dark:text-indigo-400 text-base">{path.averageProgress}%</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Avg Progress</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Curriculum Timeline Nodes */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Curriculum Milestones
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {path.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2 relative group hover:border-indigo-400/50 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="w-5 h-5 rounded-lg bg-indigo-600 text-white font-extrabold flex items-center justify-center text-[10px]">
                          {st.step}
                        </span>
                        <span className="text-slate-400 font-semibold">{st.estimatedHours}h</span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{st.title}</h5>
                      <div className="flex flex-wrap gap-1">
                        {st.skills.slice(0, 2).map((sk, skIdx) => (
                          <span key={skIdx} className="px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[9px] font-semibold">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active in Student Recommendation Feed</span>
                </span>

                <div className="flex items-center space-x-2 text-xs">
                  <button
                    onClick={() => handleDuplicate(path)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Duplicate Path"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(path.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60"
                    title="Delete Path"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ➕ CREATE PATH MODAL */}
      <AnimatePresence>
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCreateModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Create New Career Learning Path</h3>
                <button onClick={() => setCreateModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePath} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Path Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="e.g. Flutter Mobile Engineer Path"
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category Domain</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                  >
                    <option value="Software Development">Software Development</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Estimated Duration (Weeks)</label>
                  <input
                    type="number"
                    min={2}
                    max={16}
                    value={newWeeks}
                    onChange={e => setNewWeeks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md shadow-indigo-600/30"
                  >
                    Create Path
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};
