import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Target, Cpu, ShieldCheck,
  Hexagon, Sun, Moon, ArrowRight, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

export default function Landing() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [previousResult, setPreviousResult] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (!isLoaded) return;

    let saved = null;
    if (isSignedIn && user) {
      saved = localStorage.getItem(`career_result_${user.id}`);
    }

    if (!saved) {
      saved = localStorage.getItem('career_result_latest');
    }

    if (saved) {
      try {
        setPreviousResult(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse previous result", e);
      }
    } else {
      setPreviousResult(null);
    }
  }, [isLoaded, isSignedIn, user]);

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

      {/* Desktop Background Ambient (removed to show the pure wave image) */}

      {/* Sticky Glass Navbar */}
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 backdrop-blur-xl border-b ${isDarkMode ? 'border-indigo-200/60 bg-white/40' : 'border-slate-200/80 bg-white/70'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
              <Hexagon className="w-6 h-6 text-slate-900" strokeWidth={2} />
            </div>
            <span className={`text-xl font-extrabold tracking-tight transition-colors ${isDarkMode ? 'text-slate-900' : 'text-slate-900'}`}>
              CareerGuide <span className="text-blue-500 font-light">AI</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
            <a href="#platform" className={`transition-all hover:-translate-y-0.5 ${isDarkMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Platform</a>
            <Link to="/about" className={`transition-all hover:-translate-y-0.5 ${isDarkMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>About Us</Link>
            <a href="#data" className={`transition-all hover:-translate-y-0.5 ${isDarkMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>O*NET Engine</a>
          </div>

          {/* Auth Actions & Theme Toggle */}
          <div className="flex items-center gap-5">

            <SignedIn>
              <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 border-2 border-slate-200" } }} />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className={`text-sm font-semibold transition-colors ${isDarkMode ? 'text-slate-700 hover:text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="px-5 py-2.5 text-sm font-bold text-white bg-[#C68E58]/80 hover:bg-[#C68E58] transition-all rounded-lg flex items-center gap-2 shadow-[0_4px_14px_0_rgba(198,142,88,0.39)] hover:shadow-[0_6px_20px_rgba(198,142,88,0.4)] active:scale-95">
                  Get Started <ChevronRight className="w-4 h-4" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16">

        {/* Hero Section */}
        <section id="platform" className="py-16 md:py-24 grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase mb-8 transition-colors ${isDarkMode ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'}`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              Engine V2.0 Operational
            </div>

            <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 transition-colors ${isDarkMode ? 'text-slate-900' : 'text-slate-900'}`}>
              Precision Career <br className="hidden md:block" />
              <span className="text-[#5E2B2B]">
                Intelligence.
              </span>
            </h1>

            <p className={`text-lg md:text-xl mb-10 leading-relaxed transition-colors max-w-lg ${isDarkMode ? 'text-slate-600' : 'text-slate-600'}`}>
              Bypass generic advice. Our engine utilizes semantic vector embeddings to map your unique technical and soft skills to optimal industry roles with pinpoint accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <SignedIn>
                <Link to="/app" className="h-14 px-8 inline-flex items-center justify-center text-sm font-bold text-white bg-[#C68E58]/80 hover:bg-[#C68E58] transition-all rounded-xl gap-2 shadow-[0_4px_14px_0_rgba(198,142,88,0.39)] hover:shadow-[0_6px_20px_rgba(198,142,88,0.4)] active:scale-95">
                  Launch Analysis <ArrowRight className="w-4 h-4" />
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="h-14 px-8 inline-flex items-center justify-center text-sm font-bold text-white bg-[#C68E58]/80 hover:bg-[#C68E58] transition-all rounded-xl gap-2 shadow-[0_4px_14px_0_rgba(198,142,88,0.39)] hover:shadow-[0_6px_20px_rgba(198,142,88,0.4)] active:scale-95">
                    Initialize Profile <ArrowRight className="w-4 h-4" />
                  </button>
                </SignInButton>
              </SignedOut>
              <a href="#technology" className={`h-14 px-8 inline-flex items-center justify-center text-sm font-bold border transition-all rounded-xl active:scale-95 ${isDarkMode ? 'text-slate-900 bg-white/60 border-indigo-200 hover:bg-white' : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'}`}>
                View Architecture
              </a>
            </div>
          </motion.div>

          {/* Right Visual: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
            className="hidden lg:flex justify-center relative perspective-[1000px] w-full"
          >
            {/* 
              Instruction to User:
              I am unable to directly extract the image from your prompt onto your filesystem.
              Please rename the image you uploaded to 'hero-image.png' (or .jpg), place it in the
              'frontend/src/assets' folder, and update the 'src' below to import it.
              Example: import heroImage from '../assets/hero-image.png'; src={heroImage}
            */}
            <img
              src="/carrer_image.jpeg"
              alt="Career Intelligence Dashboard"
              className={`w-full max-w-lg object-cover rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 ${isDarkMode ? 'shadow-indigo-200/50 ring-1 ring-indigo-200' : 'shadow-[0_20px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/5'}`}
            />
          </motion.div>
        </section>

        {/* Features / Architecture Section */}
        <section id="technology" className="py-24 border-t border-slate-200/10 mt-12">
          <div className="text-center mb-16 max-w-2xl mx-auto transition-colors">
            <h2 className={`text-3xl font-extrabold tracking-tight mb-4 ${isDarkMode ? 'text-slate-900' : 'text-slate-900'}`}>Enterprise Architecture</h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-600' : 'text-slate-600'}`}>Engineered for high-fidelity accuracy, secure scalability, and absolute zero AI hallucination.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className={`p-8 border rounded-2xl transition-all duration-300 hover:-translate-y-1 group ${isDarkMode ? 'border-indigo-200 bg-white/40 hover:bg-white/60 hover:border-blue-300' : 'border-slate-200 bg-white hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200'}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${isDarkMode ? 'bg-blue-900/30 text-blue-700' : 'bg-blue-50 text-blue-600'}`}>
                <Cpu className="w-7 h-7 group-hover:scale-110 transition-transform" strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-slate-900' : 'text-slate-900'}`}>RAG Implementation</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-600' : 'text-slate-600'}`}>
                Utilizes strict Retrieval-Augmented Generation to ground all AI recommendations exclusively in verified O*NET occupational data.
              </p>
            </div>

            {/* Card 2 */}
            <div className={`p-8 border rounded-2xl transition-all duration-300 hover:-translate-y-1 group ${isDarkMode ? 'border-indigo-200 bg-white/40 hover:bg-white/60 hover:border-indigo-300' : 'border-slate-200 bg-white hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200'}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${isDarkMode ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-50 text-indigo-600'}`}>
                <Target className="w-7 h-7 group-hover:scale-110 transition-transform" strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-slate-900' : 'text-slate-900'}`}>Semantic Matching</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-600' : 'text-slate-600'}`}>
                Converts profiles into 384-dimensional vectors, searching across 900+ careers based on deep contextual meaning rather than raw keywords.
              </p>
            </div>

            {/* Card 3 */}
            <div className={`p-8 border rounded-2xl transition-all duration-300 hover:-translate-y-1 group ${isDarkMode ? 'border-indigo-200 bg-white/40 hover:bg-white/60 hover:border-emerald-300' : 'border-slate-200 bg-white hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200'}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${isDarkMode ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-50 text-emerald-600'}`}>
                <ShieldCheck className="w-7 h-7 group-hover:scale-110 transition-transform" strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-slate-900' : 'text-slate-900'}`}>Zero-Trust Security</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-600' : 'text-slate-600'}`}>
                Protected session management engineered with Clerk, ensuring your parameter data and recommendation history remain entirely encrypted.
              </p>
            </div>
          </div>
        </section>

        {/* Data / O*NET Engine Section */}
        <section id="data" className="py-24 border-t border-slate-200/10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className={`p-8 rounded-3xl border transition-colors ${isDarkMode ? 'bg-white/40 border-indigo-200/50 backdrop-blur-md' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-blue-100 text-blue-600' : 'bg-blue-50 text-blue-500'}`}>
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-900' : 'text-slate-900'}`}>Verified Database</h3>
                </div>
                <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-slate-600' : 'text-slate-600'}`}>
                  Our intelligent engine is directly integrated with the <strong>O*NET (Occupational Information Network)</strong> database, the primary source of occupational information in the United States. 
                </p>
                <ul className={`space-y-3 text-sm ${isDarkMode ? 'text-slate-600' : 'text-slate-600'}`}>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    Over 900 distinct career profiles
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    Continuously updated skill requirements
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Real-world task and technology mappings
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className={`text-3xl font-extrabold tracking-tight mb-6 ${isDarkMode ? 'text-slate-900' : 'text-slate-900'}`}>Powered by <br/><span className="text-blue-600">O*NET Data</span></h2>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-600' : 'text-slate-600'}`}>
                By combining advanced vector embeddings with official O*NET taxonomy, CareerGuide AI achieves unprecedented accuracy. The AI doesn't hallucinate paths; it intelligently maps your unique profile onto a rigorous, standardized occupational framework.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={`border-t py-10 transition-colors ${isDarkMode ? 'border-indigo-200/60 bg-white/40 backdrop-blur-md' : 'border-slate-200 bg-[#F8FAFC]'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Hexagon className={`w-5 h-5 ${isDarkMode ? 'text-slate-600' : 'text-slate-700'}`} fill="currentColor" />
            <span className={isDarkMode ? 'text-slate-500' : 'text-slate-600'}>
              © {new Date().getFullYear()} CareerGuide AI. System Operational.
            </span>
          </div>
          <div className={`flex gap-8 text-sm font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
            <Link to="/docs" className={`transition-colors ${isDarkMode ? 'hover:text-slate-700' : 'hover:text-slate-800'}`}>Documentation</Link>
            <Link to="/privacy" className={`transition-colors ${isDarkMode ? 'hover:text-slate-700' : 'hover:text-slate-800'}`}>Privacy Policy</Link>
            <Link to="/terms" className={`transition-colors ${isDarkMode ? 'hover:text-slate-700' : 'hover:text-slate-800'}`}>Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}