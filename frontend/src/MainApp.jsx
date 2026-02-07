import { useState } from 'react';
import { getCareerRecommendations } from './api';
import { BrainCircuit, Briefcase, GraduationCap, ArrowRight, Loader2, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function MainApp() {
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
    { id: 1, label: "High School / Entry" },
    { id: 2, label: "Some College" },
    { id: 3, label: "Associate / Vocational" },
    { id: 4, label: "Bachelor's Degree" },
    { id: 5, label: "Master's / PhD" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await getCareerRecommendations(formData);
      setResults(data);
    } catch (err) {
      setError('Backend not connected.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 relative font-sans">
      <Link to="/" className="absolute top-6 left-6 text-slate-400 hover:text-slate-800 transition-colors font-medium text-sm flex items-center gap-1">
        ← Back Home
      </Link>

      <div className="max-w-6xl mx-auto mt-8">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <BrainCircuit className="text-blue-600" />
            Career Compass AI
          </h1>
        </header>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Sticky Form */}
          <div className="md:col-span-4 sticky top-8 self-start z-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
              <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Your Profile
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Interests</label>
                  <textarea 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all resize-none"
                    rows="4"
                    placeholder="E.g. I love helping people..."
                    value={formData.interests}
                    onChange={(e) => setFormData({...formData, interests: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Skills</label>
                  <input 
                    type="text"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all"
                    placeholder="E.g. Math, Python..."
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Age</label>
                    <input 
                      type="number"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Education</label>
                    <select 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                      value={formData.education_level_id}
                      onChange={(e) => setFormData({...formData, education_level_id: parseInt(e.target.value)})}
                    >
                      {eduLevels.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4 shadow-lg shadow-slate-200"
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5"/> : "Analyze Profile"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: Results */}
          <div className="md:col-span-8 space-y-6 pb-20">
            {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">🚨 {error}</div>}

            {!results && !loading && (
              <div className="h-[400px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                <Briefcase className="w-12 h-12 mb-3 opacity-20" />
                <p>Waiting for your input...</p>
              </div>
            )}

            {results && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                
                {/* AI Summary */}
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-6 rounded-2xl shadow-xl shadow-blue-200 mb-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-bold flex items-center gap-2 mb-3 opacity-90">
                      <Sparkles className="w-4 h-4" /> AI Analysis
                    </h3>
                    <p className="leading-relaxed opacity-95 text-blue-50 text-lg">
                      {results.user_summary}
                    </p>
                  </div>
                </div>

                {/* Job Cards */}
                <h3 className="font-bold text-slate-900 mb-4 text-xl px-1">Top Recommendations</h3>
                <div className="space-y-4">
                  {results.recommendations.map((job) => (
                    <motion.div 
                      key={job.id} 
                      whileHover={{ y: -2 }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h4>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                          {job.match_score}% Match
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                         <span className="flex items-center gap-1 text-slate-400 text-xs font-medium uppercase tracking-wide">
                            <GraduationCap className="w-3 h-3" />
                            {job.education_requirement}
                         </span>
                      </div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {job.description}
                      </p>
                      <button className="text-blue-600 text-sm font-medium mt-3 hover:underline">
                        Read full overview →
                      </button>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedJob(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>

              <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedJob.title}</h2>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                  {selectedJob.match_score}% Compatibility
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                   <GraduationCap className="w-3 h-3" /> {selectedJob.education_requirement}
                </span>
              </div>

              <div className="prose prose-slate max-w-none">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Role Overview</h4>
                <p className="text-slate-700 leading-relaxed text-lg mb-8">
                  {selectedJob.description}
                </p>
                
                <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Why this fits you?
                  </h4>
                  <p className="text-blue-800/80 text-sm leading-relaxed">
                    Based on your profile, this role matches your interest in <strong>{formData.interests.split(' ').slice(0,3).join(' ')}...</strong> and aligns with your qualification level.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg"
                >
                  Close Overview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}