import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Bookmark, 
  ArrowLeft, 
  Share2, 
  Briefcase, 
  GraduationCap, 
  Send, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { MatchBreakdownModal } from '../components/dashboard/MatchBreakdownModal';
import { QuickApplyModal } from '../components/dashboard/QuickApplyModal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Internship, RecommendationBreakdown } from '../types';

export const InternshipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, profile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [similarInternships, setSimilarInternships] = useState<Internship[]>([]);

  const fetchDetails = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.getInternshipById(id);
      if (res.success) {
        setInternship(res.internship);
        
        // Fetch similar
        const allRes = await api.getInternships({ sector: res.internship.sector });
        if (allRes.success) {
          setSimilarInternships(allRes.internships.filter(i => i.id !== id).slice(0, 3));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const toggleSave = async () => {
    if (!isAuthenticated) {
      alert('Please log in to save internships.');
      return;
    }
    if (!internship) return;

    setIsSaving(true);
    try {
      if (isSaved) {
        await api.removeSaved(internship.id);
        setIsSaved(false);
      } else {
        await api.saveInternship(internship.id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Internship link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-slate-400">Loading internship details...</p>
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Internship Not Found</h2>
        <Link to="/explore" className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">
          Back to Explore
        </Link>
      </div>
    );
  }

  const breakdown = internship.breakdown;
  const matchScore = breakdown?.finalMatchScore || internship.matchScore;

  const content = (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Internship Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          
          {/* Company Logo & Titles */}
          <div className="flex items-start space-x-4">
            <img
              src={internship.companyLogo || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop&crop=faces&q=80'}
              alt={internship.companyName}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                  {internship.companyName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {internship.sector}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {internship.title}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Posted on {new Date(internship.postedAt).toLocaleDateString()} • {internship.applicantCount || 0} applicants
              </p>
            </div>
          </div>

          {/* Action Buttons (Apply, Save, Share) */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleShare}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share internship link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={toggleSave}
              disabled={isSaving}
              className={`p-3 rounded-2xl border transition-colors ${
                isSaved
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-500'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={() => setApplyModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Apply Now</span>
            </button>
          </div>

        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Location & Mode</span>
            <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
              <MapPin className="w-4 h-4 text-indigo-500" />
              <span>{internship.location} ({internship.workMode})</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Monthly Stipend</span>
            <div className="flex items-center space-x-1.5 font-bold text-indigo-600 dark:text-indigo-400">
              <DollarSign className="w-4 h-4" />
              <span>{internship.stipend}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Duration</span>
            <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>{internship.duration}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Openings</span>
            <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
              <Users className="w-4 h-4 text-emerald-500" />
              <span>{internship.openings} Position{internship.openings > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Live AI Compatibility Banner */}
        {matchScore !== undefined && matchScore !== null && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-transparent border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center font-extrabold shadow-md">
                <span className="text-lg">{matchScore}%</span>
                <span className="text-[8px] uppercase tracking-wider opacity-80">Match</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Your Profile Compatibility
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {internship.probabilityLevel || 'High'} Selection Chance
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Calculated based on your education, technical skills, and work preferences.
                </p>
              </div>
            </div>

            {breakdown && (
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/40 flex items-center space-x-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explain Match Formula</span>
              </button>
            )}
          </div>
        )}

      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Description, Responsibilities & Skills */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* About Role */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              <span>About the Internship Role</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {internship.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Key Responsibilities</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {internship.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Required vs Preferred */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Required Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {internship.requiredSkills.map(skill => {
                  const studentHas = (profile?.skills || []).some(s => s.toLowerCase() === skill.toLowerCase());
                  return (
                    <span
                      key={skill}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 ${
                        studentHas
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {studentHas ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
                      <span>{skill}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {internship.preferredSkills.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Bonus / Preferred Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {internship.preferredSkills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-medium"
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Company Snapshot & Eligibility */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Eligibility Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <span>Candidate Eligibility</span>
            </h3>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Min Qualification</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{internship.minQualification}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Branches</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{internship.preferredBranches.join(', ')}</span>
              </div>
              {internship.minCgpa && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Min CGPA</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{internship.minCgpa} CGPA or equivalent</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setApplyModalOpen(true)}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/30 flex items-center justify-center space-x-1.5 transition-all"
              >
                <span>Submit Application</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Company About Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-indigo-500" />
              <h3 className="font-bold text-slate-900 dark:text-white">About {internship.companyName}</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Verified corporate hiring partner on the InternDisha network dedicated to providing real-world project mentorship for students.
            </p>
          </div>

        </div>

      </div>

      {/* Explainable Modal */}
      {breakdown && (
        <MatchBreakdownModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          internship={internship}
          breakdown={breakdown}
          onApply={() => {
            setModalOpen(false);
            setApplyModalOpen(true);
          }}
        />
      )}

      {/* Quick Apply Modal */}
      <QuickApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        internship={internship}
      />
    </div>
  );

  return isAuthenticated ? (
    <DashboardLayout>{content}</DashboardLayout>
  ) : (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">{content}</div>
      <Footer />
    </div>
  );
};
