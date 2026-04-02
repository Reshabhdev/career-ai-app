import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateRoadmap } from './api';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowLeft, BrainCircuit, Activity, 
  Map as MapIcon, Sparkles, Target
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Roadmap() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  
  const [loading, setLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If user navigated here directly without state, redirect them.
    if (!state || !state.job || !state.userProfile) {
      navigate('/app', { replace: true });
      return;
    }

    const fetchRoadmap = async () => {
      try {
        const reqData = {
          user_profile: {
            interests: state.userProfile.interests || '',
            skills: state.userProfile.skills || '',
            age: parseInt(state.userProfile.age) || 25,
            education_level_id: parseInt(state.userProfile.education_level_id) || 1
          },
          job_title: state.job.title
        };
        const res = await generateRoadmap(reqData);
        setRoadmapData(res.roadmap);
      } catch (err) {
        console.error(err);
        setError("Failed to generate your personalized roadmap. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 relative font-sans text-slate-900 overflow-hidden">
      
      {/* Background decorations */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Role
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <MapIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">AI Roadmap Mode</span>
          </div>
        </div>

        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 mb-4 uppercase tracking-wider">
            <Target className="w-3 h-3" /> Target Trajectory
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            {state.job?.title} Roadmap
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Custom-generated based on your specific profile paramaters
          </p>
        </motion.div>

        {/* Content Section */}
        {loading && (
          <div className="bg-white p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                <BrainCircuit className="w-10 h-10 text-blue-500" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white">
                <Activity className="w-4 h-4 text-white animate-spin-slow" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Synthesizing Learning Path</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                Analyzing your existing technical skills to compute an optimal, step-by-step career progression...
              </p>
            </div>
            
            <div className="w-full max-w-sm h-1.5 bg-slate-100 rounded-full overflow-hidden mt-6">
              <motion.div 
                initial={{ width: "20%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 p-8 rounded-3xl border border-red-200">
            <h3 className="text-xl font-bold text-red-800 mb-2">Error Generating Roadmap</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2.5 bg-white text-red-700 rounded-lg font-bold border border-red-300 hover:bg-red-50 transition-colors shadow-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {roadmapData && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden"
          >
            <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 py-5">
              <div className="flex items-center gap-3 text-slate-300 font-mono text-sm">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Vector Generation Complete</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <ReactMarkdown 
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold text-slate-900 mt-8 mb-6 tracking-tight border-b border-slate-100 pb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 tracking-tight flex items-center gap-2 before:content-[''] before:w-1.5 before:h-6 before:bg-blue-500 before:rounded-full before:block" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3" {...props} />,
                  p: ({node, ...props}) => <p className="text-slate-600 leading-relaxed text-lg mb-6" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600 text-lg marker:text-blue-500" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-2 mb-8 text-slate-600 text-lg marker:text-blue-500 font-medium" {...props} />,
                  li: ({node, ...props}) => <li className="pl-2" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-slate-900 bg-blue-50/50 px-1 py-0.5 rounded" {...props} />,
                  a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-blue-300 underline-offset-2 transition-colors" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 bg-blue-50/50 p-6 rounded-r-xl my-6 italic text-slate-700 text-lg" {...props} />
                }}
              >
                {roadmapData}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
