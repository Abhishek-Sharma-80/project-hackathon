import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Download, 
  FileText, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Clock, 
  FileSpreadsheet, 
  Share2 
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { AdminReport } from '../../types';

export const AdminReportsPage: React.FC = () => {
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminReports();
      if (res.success) {
        setReports(res.reports);
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

  const handleGenerateReport = async (category: AdminReport['category'], format: 'PDF' | 'CSV') => {
    setIsGenerating(true);
    const title = `Automated ${category} Intelligence Audit (${new Date().toLocaleDateString()})`;
    const res = await api.generateNewReport(title, category, format);
    setIsGenerating(false);
    if (res.success) {
      loadReports();
      showToast(`${category} Report generated in ${format} format!`);
    }
  };

  const handleDownload = (report: AdminReport) => {
    showToast(`Downloading "${report.title}" (${report.format})...`);
  };

  const categories = ['All', 'Students', 'Internships', 'Applications', 'Skill Gap', 'AI Performance', 'Companies'];

  const filteredReports = reports.filter(r => selectedCategory === 'All' || r.category === selectedCategory);

  return (
    <AdminLayout
      pageTitle="Reports & Executive Insights"
      pageSubtitle="Generate, preview, and export comprehensive enterprise placement analytics across all institutional metrics."
      actionButton={
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleGenerateReport('Students', 'PDF')}
            disabled={isGenerating}
            className="px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Compiling...' : '+ Generate New Report'}</span>
          </button>
        </div>
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

        {/* 🔍 FILTER BAR */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto w-full no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600'
                }`}
              >
                {cat === 'All' ? 'All Reports' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 shrink-0 text-xs">
            <button
              onClick={() => handleGenerateReport('Applications', 'PDF')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Quick PDF</span>
            </button>
            <button
              onClick={() => handleGenerateReport('Internships', 'CSV')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              <span>Quick CSV</span>
            </button>
          </div>
        </div>

        {/* 📊 REPORTS GRID CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map(report => (
            <div
              key={report.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-[10px] uppercase">
                    {report.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                    report.format === 'PDF' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {report.format} • {report.fileSize}
                  </span>
                </div>

                <h3 className="text-sm font-black text-slate-900 dark:text-white mt-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {report.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {report.metricsSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-medium flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{report.generatedDate}</span>
                </span>

                <button
                  onClick={() => handleDownload(report)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 flex items-center space-x-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
};
