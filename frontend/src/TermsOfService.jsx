import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  const isDarkMode = true;

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
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 backdrop-blur-xl border-b border-indigo-200/60 bg-white/40`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            CareerGuide <span className="text-blue-500 font-light">Terms</span>
          </span>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-10 md:p-14 rounded-3xl border backdrop-blur-md shadow-2xl ${isDarkMode ? 'bg-white/50 border-indigo-200/50' : 'bg-white border-slate-200'}`}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-emerald-100 text-emerald-600">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900">Terms of Service</h1>
          </div>

          <div className="space-y-8 text-slate-700 leading-relaxed">
            <p className="text-sm text-slate-500">Last Updated: May 14, 2026</p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using CareerGuide AI, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
              <p>CareerGuide AI provides an AI-powered career recommendation and roadmap generation service. The service utilizes O*NET data and machine learning algorithms to map user skills to potential career paths.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Disclaimer of AI Accuracy</h2>
              <p>While our engine uses strict Retrieval-Augmented Generation to minimize inaccuracies, artificial intelligence can produce unexpected results. The career roadmaps and recommendations provided are for informational and guidance purposes only. They do not constitute professional career counseling, and we make no guarantees regarding future employment or salary.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. User Accounts</h2>
              <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party and to notify us immediately upon becoming aware of any breach of security.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Acceptable Use</h2>
              <p>You agree not to misuse the service. This includes attempting to reverse-engineer our vector embeddings, scraping O*NET data through our endpoints, or submitting malicious prompts designed to breach our system security.</p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
