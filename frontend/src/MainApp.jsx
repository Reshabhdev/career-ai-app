import { useState } from 'react';
import { getCareerRecommendations } from './api';
import {
  BrainCircuit, Briefcase, GraduationCap, ArrowRight,
  Sparkles, X, ChevronLeft, Target, Lightbulb,
  Calendar, Award, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export default function MainApp() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    interests: '',
    skills: '',
    age: 25,
    education_level_id: 4
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const eduLevels = [
    { id: 1, label: "High School / Entry Level" },
    { id: 2, label: "Some College / Certificate" },
    { id: 3, label: "Associate's Degree" },
    { id: 4, label: "Bachelor's Degree" },
    { id: 5, label: "Master's Degree or Higher" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await getCareerRecommendations(formData);
      setResults(data);
      if (data.recommendations && data.recommendations.length > 0) {
        localStorage.setItem(`career_result_latest`, JSON.stringify(data.recommendations[0]));
        if (user && user.id) {
          localStorage.setItem(`career_result_${user.id}`, JSON.stringify(data.recommendations[0]));
        }
      }
    } catch (err) {
      console.error('Full connection error:', err);
      const details = err.response?.data?.detail || err.message || 'Unknown network error';
      const apiUrl = err.config?.url || 'Unknown URL';
      setError(`Unable to connect to the analysis engine (tried: ${apiUrl}). Details: ${details}. Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 relative font-sans text-slate-900">

      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-12">
        <Link to="/" className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <div className="p-2 rounded-full bg-white border border-slate-200 group-hover:border-slate-300 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Return to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">CareerGuide AI</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT SIDE: Input Form */}
          <div className="lg:col-span-4 sticky top-8 z-10">
            <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <div className="mb-8">
                <h2 className="font-bold text-xl mb-2 flex items-center gap-2">
                  Profile Parameters
                </h2>
                <p className="text-sm text-slate-500">Provide your details to generate a highly calibrated career vector.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Interests Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    Core Interests
                  </label>
                  <textarea
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-sm transition-all resize-none placeholder:text-slate-400"
                    rows="3"
                    placeholder="E.g., I enjoy analyzing data, solving complex problems, and leading small teams..."
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    required
                  />
                </div>

                {/* Skills Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <Target className="w-4 h-4 text-emerald-500" />
                    Technical & Soft Skills
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-sm transition-all placeholder:text-slate-400"
                    placeholder="E.g., Python, React, Public Speaking, Agile..."
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    required
                  />
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      Age
                    </label>
                    <input
                      type="number"
                      className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-sm transition-all"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <Award className="w-4 h-4 text-purple-500" />
                      Education
                    </label>
                    <select
                      className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-sm transition-all appearance-none cursor-pointer"
                      value={formData.education_level_id}
                      onChange={(e) => setFormData({ ...formData, education_level_id: parseInt(e.target.value) })}
                    >
                      {eduLevels.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.98]"
                  >
                    {loading ? (
                      <>
                        <Activity className="animate-pulse w-5 h-5 text-cyan-400" />
                        Processing Vector Data...
                      </>
                    ) : (
                      <>
                        Run Analysis <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: Results Engine */}
          <div className="lg:col-span-8 space-y-6 pb-20">

            {/* Error State */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <X className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-red-800 text-sm">System Error</h4>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!results && !loading && !error && (
              <div className="h-[500px] flex flex-col items-center justify-center text-slate-400 bg-white rounded-2xl border border-slate-200 border-dashed shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">Awaiting Parameters</h3>
                <p className="text-sm text-center max-w-sm">Fill out your profile on the left to initiate the recommendation engine and discover optimal career paths.</p>
              </div>
            )}

            {/* Skeleton Loading State */}
            {loading && (
              <div className="space-y-6">
                <div className="h-40 bg-slate-200 animate-pulse rounded-2xl"></div>
                <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-md mb-4"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex justify-between">
                      <div className="h-6 w-1/3 bg-slate-200 animate-pulse rounded"></div>
                      <div className="h-6 w-16 bg-slate-200 animate-pulse rounded-full"></div>
                    </div>
                    <div className="h-4 w-1/4 bg-slate-100 animate-pulse rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-slate-100 animate-pulse rounded"></div>
                      <div className="h-4 w-5/6 bg-slate-100 animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Populated Results */}
            {results && !loading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>



                {/* Recommendation Header */}
                <div className="flex items-center justify-between mb-6 px-1">
                  <h3 className="font-bold text-xl tracking-tight">Optimized Career Paths</h3>
                  <span className="text-sm font-medium text-slate-500 bg-slate-200/50 px-3 py-1 rounded-md">
                    {results.recommendations.length} Matches Found
                  </span>
                </div>

                {/* Job Cards */}
                <div className="space-y-5">
                  {results.recommendations.map((job) => (
                    <motion.div
                      key={job.id}
                      whileHover={{ y: -2 }}
                      className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:border-blue-200 transition-all group cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h4 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h4>

                        {/* Visual Match Score Indicator */}
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm font-bold text-slate-900">{job.match_score}%</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Match</div>
                          </div>
                          <div className="w-12 h-12 rounded-full border-4 border-slate-50 flex items-center justify-center relative bg-white shadow-sm">
                            <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 36 36">
                              <path
                                className="text-blue-500"
                                strokeDasharray={`${job.match_score}, 100`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-600 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-slate-200">
                          <GraduationCap className="w-3.5 h-3.5" />
                          {job.education_requirement}
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {job.description}
                      </p>

                      <div className="mt-5 flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-200">
                        View Complete Profile <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL POPUP - OVERLAY */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedJob(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 mb-3">
                    <Target className="w-3 h-3" /> {selectedJob.match_score}% Profile Match
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedJob.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500 hover:text-slate-900 bg-white shadow-sm border border-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-8 py-8 overflow-y-auto">
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 border border-slate-200">
                    <GraduationCap className="w-4 h-4" /> Requirement: {selectedJob.education_requirement}
                  </span>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Role Overview</h4>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      {selectedJob.description}
                    </p>
                  </section>

                  <section className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/50">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-500" /> System Justification
                    </h4>
                    <p className="text-blue-900/80 text-base leading-relaxed">
                      This role was flagged by the vector engine because it strongly aligns with your stated interests in <strong className="text-blue-900 font-semibold">{formData.interests.split(' ').slice(0, 5).join(' ')}...</strong> while perfectly matching your current qualification parameters.
                    </p>
                  </section>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <button
                  onClick={() => navigate('/roadmap', { state: { job: selectedJob, userProfile: formData } })}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] active:scale-95 flex items-center gap-2"
                >
                  <BrainCircuit className="w-4 h-4" /> Generate Detailed Roadmap
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-2.5 bg-white text-slate-700 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 transition-colors shadow-sm"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}