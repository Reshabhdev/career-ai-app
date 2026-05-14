import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Cpu, Database, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Documentation() {
  const isDarkMode = true; // Matching landing page theme

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 selection:bg-orange-500/30 text-slate-800`}
      style={{
        backgroundImage: "url('/begground1.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Navbar */}
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 backdrop-blur-xl border-b border-indigo-200/60 bg-white/40`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            CareerGuide <span className="text-blue-500 font-light">Docs</span>
          </span>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-10 md:p-14 rounded-3xl border backdrop-blur-md shadow-2xl ${isDarkMode ? 'bg-white/50 border-indigo-200/50' : 'bg-white border-slate-200'}`}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600">
              <BookOpen className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900">System Documentation</h1>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-indigo-500" /> Platform Architecture
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                CareerGuide AI is built on a modern, decoupled architecture designed for high performance and scalability. The frontend utilizes React and Vite, heavily leveraging Tailwind CSS for a responsive, fluid user interface. State management and authentication are handled securely through Clerk.
              </p>
              <p className="text-slate-700 leading-relaxed">
                The backend is powered by FastAPI, ensuring asynchronous request handling and high throughput. Our infrastructure is completely serverless, allowing seamless scaling depending on load.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-emerald-500" /> O*NET Integration & RAG
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                To guarantee zero AI hallucination, our system employs a strict Retrieval-Augmented Generation (RAG) pipeline. All career recommendations are grounded in verified data from the <strong>O*NET (Occupational Information Network)</strong> database.
              </p>
              <p className="text-slate-700 leading-relaxed">
                User inputs (skills, experience, preferences) are converted into 384-dimensional vector embeddings. These embeddings are then queried against our vectorized O*NET database, identifying the highest semantic matches out of 900+ distinct career profiles. The Gemini API is solely used for natural language synthesis, formatting the retrieved data into personalized roadmaps.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-500" /> Security & Privacy
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Security is implemented at the edge via Clerk. Sessions are heavily encrypted, and our backend verifies JWT tokens on every critical API request. We employ a Zero-Trust architecture, meaning no request is implicitly trusted, regardless of origin.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
