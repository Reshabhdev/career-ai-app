import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
            CareerGuide <span className="text-blue-500 font-light">Privacy</span>
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
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-indigo-100 text-indigo-600">
              <FileText className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
          </div>

          <div className="space-y-8 text-slate-700 leading-relaxed">
            <p className="text-sm text-slate-500">Last Updated: May 14, 2026</p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you create an account, complete your profile, or interact with our career analysis tools. This may include your name, email address, educational background, professional skills, and career preferences.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
              <p>Your information is used strictly to provide and improve the CareerGuide AI service. Specifically, your profile data is converted into vector embeddings to match you with appropriate career paths within the O*NET database. We do not sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Data Security and Authentication</h2>
              <p>We utilize Clerk for robust identity and session management. Your authentication data is handled securely off-site. Our API endpoints are protected by Zero-Trust architecture, ensuring your recommendation history and profile parameters remain private and encrypted in transit.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. AI and Third-Party Services</h2>
              <p>We use third-party APIs, including Google's Gemini, for natural language processing. Any data sent to these APIs is stripped of personally identifiable information (PII) to the maximum extent possible, focusing solely on technical skills and structural career parameters to generate your roadmap.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information at any time via your account settings. For specific data removal requests, please contact our support team.</p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
