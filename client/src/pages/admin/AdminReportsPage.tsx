import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/api';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { FileBarChart, Download, Printer, Filter, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState('skill-gap');
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<any>(null);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getReports(reportType);
      setReportData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [reportType]);

  const handleExportCSV = () => {
    if (!reportData?.data || !reportData.data.length) return;
    const headers = Object.keys(reportData.data[0]);
    const csvRows = [
      headers.join(','),
      ...reportData.data.map((row: any) =>
        headers.map((h) => `"${row[h] || ''}"`).join(',')
      ),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SmartEdu_AI_${reportType}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Accreditation & Analytics Data
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Institutional Reports & Data Exports
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Downloadable reports formatted for NAAC, NIRF, and academic governance meetings.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-sm transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print View</span>
          </button>
        </div>
      </div>

      {/* Report Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        {[
          { id: 'skill-gap', label: 'Institutional Skill Gap Intelligence' },
          { id: 'career-readiness', label: 'Department-Wise Career Readiness' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              reportType === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Report Content Table */}
      {loading ? (
        <LoadingScreen message="Compiling institutional dataset..." />
      ) : (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{reportData?.title}</h3>
              <p className="text-xs text-slate-500">Institution: Galgotias University (NAAC A+ Accredited)</p>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">
              Generated: {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  {reportData?.data?.[0] &&
                    Object.keys(reportData.data[0]).map((key) => (
                      <th key={key} className="p-3.5 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {reportData?.data?.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    {Object.values(row).map((val: any, j: number) => (
                      <td key={j} className="p-3.5 font-semibold">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
