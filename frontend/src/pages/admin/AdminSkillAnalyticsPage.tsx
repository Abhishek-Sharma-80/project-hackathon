import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Sparkles, 
  Flame, 
  Layers, 
  BarChart3, 
  ArrowUpRight, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  Cell 
} from 'recharts';
import { AdminLayout } from '../../components/admin/AdminLayout';

export const AdminSkillAnalyticsPage: React.FC = () => {
  const commonStudentSkills = [
    { skill: 'Java', count: 3840, fill: '#6366F1' },
    { skill: 'Python', count: 3200, fill: '#0EA5E9' },
    { skill: 'SQL', count: 2890, fill: '#8B5CF6' },
    { skill: 'React', count: 2450, fill: '#10B981' },
    { skill: 'DSA', count: 2100, fill: '#F59E0B' },
    { skill: 'Git', count: 1980, fill: '#EC4899' },
    { skill: 'JavaScript', count: 1840, fill: '#3B82F6' },
    { skill: 'C++', count: 1420, fill: '#64748B' }
  ];

  const skillGaps = [
    {
      skill: 'Spring Boot & Microservices',
      gapPct: 72,
      affectedStudents: '8,980 Students',
      impact: 'Blocks 420 High-Stipend Backend Roles (Avg ₹25,000/mo)',
      color: 'from-rose-500 to-pink-500',
      status: 'Critical Bottleneck'
    },
    {
      skill: 'Docker Containerization',
      gapPct: 68,
      affectedStudents: '8,480 Students',
      impact: 'Required in 68% of Fullstack & DevOps Postings',
      color: 'from-orange-500 to-amber-500',
      status: 'High Priority'
    },
    {
      skill: 'Cloud Computing (AWS / GCP)',
      gapPct: 61,
      affectedStudents: '7,610 Students',
      impact: 'Essential for scalable enterprise internship roles',
      color: 'from-amber-500 to-yellow-500',
      status: 'Moderate Gap'
    },
    {
      skill: 'System Design & High-Level Architecture',
      gapPct: 58,
      affectedStudents: '7,230 Students',
      impact: 'Required for Tier-1 Product Company Shortlisting',
      color: 'from-purple-500 to-indigo-500',
      status: 'Moderate Gap'
    }
  ];

  const trendingSkills = [
    { name: 'Generative AI & LLMs', change: '+42%', period: 'last 90 days', demand: 'High', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
    { name: 'Cloud Infrastructure (AWS)', change: '+31%', period: 'last 90 days', demand: 'High', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
    { name: 'Data Analytics & Power BI', change: '+28%', period: 'last 90 days', demand: 'Medium', color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20' },
    { name: 'Cybersecurity & Infosec', change: '+25%', period: 'last 90 days', demand: 'Growing', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' }
  ];

  return (
    <AdminLayout
      pageTitle="Skill Analytics & University Competency Matrix"
      pageSubtitle="Analyze aggregate student competencies against corporate hiring requirements to identify curriculum bottlenecks."
    >
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* 🔥 TRENDING SKILLS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingSkills.map(item => (
            <motion.div
              key={item.name}
              whileHover={{ y: -3 }}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-black text-rose-500">
                  <Flame className="w-4 h-4 fill-rose-500" />
                  <span>TRENDING</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${item.color}`}>
                  ↑ {item.change}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">{item.name}</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Corporate demand surge in {item.period}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <span>Demand Level:</span>
                <span className="font-bold text-slate-900 dark:text-white">{item.demand}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 📊 MOST COMMON STUDENT SKILLS (BAR CHART) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                <span>Most Common Student Skills Across Cohort</span>
              </h3>
              <p className="text-xs text-slate-400">Aggregated from 12,480 verified student profile databases</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">12,480 Total Profiles</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={commonStudentSkills} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="skill" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    borderColor: '#1E293B', 
                    borderRadius: '12px', 
                    color: '#FFF',
                    fontSize: '12px' 
                  }} 
                />
                <Bar dataKey="count" name="Verified Students" radius={[8, 8, 0, 0]}>
                  {commonStudentSkills.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ⚠️ SKILL GAPS ACROSS ALL STUDENTS (DIAGNOSTIC MATRIX) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Critical Skill Gaps Identified Across Students</span>
              </h3>
              <p className="text-xs text-slate-400">Percentage of registered students lacking mandatory skills for top corporate listings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillGaps.map(gap => (
              <div
                key={gap.skill}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">{gap.skill}</h4>
                    <span className="text-xs font-black text-rose-600 dark:text-rose-400">{gap.gapPct}% Need Improvement</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${gap.color}`}
                      style={{ width: `${gap.gapPct}%` }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    {gap.impact}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
                  <span className="text-slate-400 font-semibold">{gap.affectedStudents}</span>
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{gap.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
