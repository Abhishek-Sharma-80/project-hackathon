import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Check, Sparkles, Building2 } from 'lucide-react';
import { Internship } from '../../types';
import { api } from '../../services/api';

interface AddEditInternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  internshipToEdit?: Internship | null;
  onSaved: () => void;
}

export const AddEditInternshipModal: React.FC<AddEditInternshipModalProps> = ({
  isOpen,
  onClose,
  internshipToEdit,
  onSaved
}) => {
  const [formData, setFormData] = useState<Partial<Internship>>({
    companyName: '',
    title: '',
    description: '',
    sector: 'Software Development',
    roleCategory: 'Frontend',
    location: 'Bengaluru / Remote',
    workMode: 'Remote',
    duration: '3 Months',
    stipend: '₹25,000 / month',
    stipendAmount: 25000,
    openings: 2,
    minQualification: 'B.Tech / BCA / MCA',
    minCgpa: 7.0,
    requiredSkills: ['React', 'JavaScript'],
    preferredSkills: ['TypeScript', 'Git & GitHub'],
    responsibilities: ['Develop clean frontend web features.', 'Collaborate with team on code reviews.']
  });

  const [reqSkillInput, setReqSkillInput] = useState('');
  const [prefSkillInput, setPrefSkillInput] = useState('');
  const [respInput, setRespInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (internshipToEdit) {
      setFormData({ ...internshipToEdit });
    } else {
      setFormData({
        companyName: '',
        title: '',
        description: '',
        sector: 'Software Development',
        roleCategory: 'Frontend',
        location: 'Bengaluru / Remote',
        workMode: 'Remote',
        duration: '3 Months',
        stipend: '₹25,000 / month',
        stipendAmount: 25000,
        openings: 2,
        minQualification: 'B.Tech / BCA / MCA',
        minCgpa: 7.0,
        requiredSkills: ['React', 'JavaScript'],
        preferredSkills: ['TypeScript', 'Git & GitHub'],
        responsibilities: ['Develop clean frontend web features.', 'Collaborate with team on code reviews.']
      });
    }
  }, [internshipToEdit, isOpen]);

  if (!isOpen) return null;

  const addRequiredSkill = () => {
    if (reqSkillInput.trim() && !(formData.requiredSkills || []).includes(reqSkillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...(prev.requiredSkills || []), reqSkillInput.trim()]
      }));
      setReqSkillInput('');
    }
  };

  const removeRequiredSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: (prev.requiredSkills || []).filter(s => s !== skill)
    }));
  };

  const addPreferredSkill = () => {
    if (prefSkillInput.trim() && !(formData.preferredSkills || []).includes(prefSkillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        preferredSkills: [...(prev.preferredSkills || []), prefSkillInput.trim()]
      }));
      setPrefSkillInput('');
    }
  };

  const removePreferredSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      preferredSkills: (prev.preferredSkills || []).filter(s => s !== skill)
    }));
  };

  const addResponsibility = () => {
    if (respInput.trim()) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...(prev.responsibilities || []), respInput.trim()]
      }));
      setRespInput('');
    }
  };

  const removeResponsibility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: (prev.responsibilities || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.title || !formData.sector) {
      alert('Please fill company name, title, and sector.');
      return;
    }

    setIsSaving(true);
    try {
      if (internshipToEdit) {
        await api.updateInternshipAdmin(internshipToEdit.id, formData);
      } else {
        await api.createInternship(formData);
      }
      onSaved();
      onClose();
    } catch (err: any) {
      alert(err.message || 'Failed to save internship.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 p-6 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {internshipToEdit ? 'Edit Internship Opportunity' : 'Post New Internship Opportunity'}
                </h3>
                <p className="text-xs text-slate-400">Internship listings will be instantly analyzed by AI for all students.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="overflow-y-auto py-4 space-y-4 flex-1 pr-1 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName || ''}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. NexGen AI Labs"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Internship Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Machine Learning & AI Intern"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea
                rows={2}
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Overview of the internship role and impact..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Sector *</label>
                <select
                  value={formData.sector || 'Software Development'}
                  onChange={e => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Software Development">Software Development</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Design">UI/UX Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Mode *</label>
                <select
                  value={formData.workMode || 'Remote'}
                  onChange={e => setFormData({ ...formData, workMode: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bengaluru / Remote"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Duration</label>
                <input
                  type="text"
                  value={formData.duration || ''}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. 3 Months"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Stipend (Display)</label>
                <input
                  type="text"
                  value={formData.stipend || ''}
                  onChange={e => setFormData({ ...formData, stipend: e.target.value })}
                  placeholder="e.g. ₹25,000 / month"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Openings</label>
                <input
                  type="number"
                  value={formData.openings || 1}
                  onChange={e => setFormData({ ...formData, openings: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Required Skills Management */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Required Skills (Key for AI Match)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={reqSkillInput}
                  onChange={e => setReqSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addRequiredSkill())}
                  placeholder="Type skill & press Enter (e.g. React, Python)"
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={addRequiredSkill}
                  className="px-3 py-1.5 bg-purple-600 text-white rounded-xl font-bold flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(formData.requiredSkills || []).map(skill => (
                  <span key={skill} className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium flex items-center space-x-1">
                    <span>{skill}</span>
                    <button type="button" onClick={() => removeRequiredSkill(skill)} className="text-slate-400 hover:text-rose-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Key Responsibilities</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={respInput}
                  onChange={e => setRespInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                  placeholder="Add bullet point responsibility..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1">
                {(formData.responsibilities || []).map((resp, i) => (
                  <li key={i} className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <span>• {resp}</span>
                    <button type="button" onClick={() => removeResponsibility(i)} className="text-slate-400 hover:text-rose-500">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-md shadow-purple-600/30 flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : internshipToEdit ? 'Update Internship' : 'Publish Internship'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
