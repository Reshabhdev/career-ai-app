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
    <div className={`min-h-screen font-sans transition-colors duration-500 selection:bg-blue-500/30 ${isDarkMode ? 'bg-[#0B1120] text-slate-300' : 'bg-[#F8FAFC] text-slate-600'}`}>

      {/* Premium Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-opacity duration-1000 ${isDarkMode ? 'bg-blue-600/20' : 'bg-blue-400/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-opacity duration-1000 ${isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-400/10'}`} />
        <div className={`absolute inset-0 bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 ${isDarkMode ? 'bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)]'}`} />
      </div>

      {/* Sticky Glass Navbar */}
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 backdrop-blur-xl border-b ${isDarkMode ? 'border-slate-800/60 bg-[#0B1120]/80' : 'border-slate-200/80 bg-white/70'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
              <Hexagon className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <span className={`text-xl font-extrabold tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              CareerGuide <span className="text-blue-500 font-light">AI</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
            <a href="#platform" className={`transition-all hover:-translate-y-0.5 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>Platform</a>
            <a href="#technology" className={`transition-all hover:-translate-y-0.5 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>Architecture</a>
            <a href="#data" className={`transition-all hover:-translate-y-0.5 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>O*NET Engine</a>
          </div>

          {/* Auth Actions & Theme Toggle */}
          <div className="flex items-center gap-5">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all active:scale-95 border ${isDarkMode ? 'bg-slate-800/50 border-slate-700 text-amber-400 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600 shadow-sm'}`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <SignedIn>
              <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 border-2 border-slate-200" } }} />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className={`text-sm font-semibold transition-colors ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all rounded-lg flex items-center gap-2 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] active:scale-95">
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
        <section className={`py-16 md:py-24 grid ${previousResult ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-4xl mx-auto text-center'} gap-16 items-center`}>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={!previousResult ? "flex flex-col items-center" : ""}
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase mb-8 transition-colors ${isDarkMode ? 'bg-blue-900/20 border-blue-800/50 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'}`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              Engine V2.0 Operational
            </div>

            <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Precision Career <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                Intelligence.
              </span>
            </h1>

            <p className={`text-lg md:text-xl mb-10 leading-relaxed transition-colors ${!previousResult ? 'max-w-2xl' : 'max-w-lg'} ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Bypass generic advice. Our engine utilizes semantic vector embeddings to map your unique technical and soft skills to optimal industry roles with pinpoint accuracy.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${!previousResult ? 'justify-center' : ''}`}>
              <SignedIn>
                <Link to="/app" className="h-14 px-8 inline-flex items-center justify-center text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all rounded-xl gap-2 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] active:scale-95">
                  Launch Analysis <ArrowRight className="w-4 h-4" />
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="h-14 px-8 inline-flex items-center justify-center text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all rounded-xl gap-2 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] active:scale-95">
                    Initialize Profile <ArrowRight className="w-4 h-4" />
                  </button>
                </SignInButton>
              </SignedOut>
              <a href="#technology" className={`h-14 px-8 inline-flex items-center justify-center text-sm font-bold border transition-all rounded-xl active:scale-95 ${isDarkMode ? 'text-white bg-slate-900/50 border-slate-700 hover:bg-slate-800' : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'}`}>
                View Architecture
              </a>
            </div>
          </motion.div>

          {/* Right Visual: Premium Dashboard Widget - ONLY VISIBLE IF PREVIOUS RESULT EXISTS */}
          {previousResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
              className="hidden lg:flex justify-center relative perspective-[1000px]"
            >
              <div className={`relative w-full max-w-md border backdrop-blur-md rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all duration-500 transform hover:rotate-y-[-5deg] hover:rotate-x-[5deg] ${isDarkMode ? 'border-slate-700 bg-slate-900/60 shadow-blue-900/20' : 'border-slate-200 bg-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.08)]'}`}>

                {/* Window Header (macOS style) */}
                <div className={`flex items-center gap-2 px-4 py-3 border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-100 bg-slate-50/80'}`}>
                  <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/20" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/20" />
                  <div className={`ml-auto text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Vector.Log</div>
                </div>

                <div className="p-6 space-y-4 font-mono text-sm">
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    <Activity className="w-4 h-4 animate-spin-slow" /> Connecting to Qdrant DB...
                  </div>
                  <div className="text-emerald-500 font-medium">&gt; Connection established.</div>
                  <div className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>&gt; Retrieving historical parameters...</div>
                  <div className="text-blue-500 font-medium">&gt; Vector profile loaded.</div>

                  {/* Results Card inside Terminal */}
                  <div className={`mt-6 p-5 border rounded-xl transition-colors shadow-sm ${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Latest Match</div>
                        <div className={`font-bold text-lg font-sans leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {previousResult.title}
                        </div>
                      </div>

                      {/* Circular Progress SVG */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center relative">
                        <div className={`absolute inset-0 rounded-full border-4 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}></div>
                        <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 36 36">
                          <path
                            className="text-blue-500"
                            strokeDasharray={`${previousResult.match_score}, 100`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className={`w-full h-1.5 rounded-full overflow-hidden mb-2 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${previousResult.match_score}%` }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full"
                      />
                    </div>
                    <div className={`text-xs font-bold font-sans flex justify-between ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span>Confidence Score</span>
                      <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>{previousResult.match_score}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* Features / Architecture Section */}
        <section id="technology" className="py-24 border-t border-slate-200/10 mt-12">
          <div className={`text-center mb-16 max-w-2xl mx-auto transition-colors ${!previousResult ? 'mt-12' : ''}`}>
            <h2 className={`text-3xl font-extrabold tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Enterprise Architecture</h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Engineered for high-fidelity accuracy, secure scalability, and absolute zero AI hallucination.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className={`p-8 border rounded-2xl transition-all duration-300 hover:-translate-y-1 group ${isDarkMode ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-blue-500/30' : 'border-slate-200 bg-white hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200'}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Cpu className="w-7 h-7 group-hover:scale-110 transition-transform" strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>RAG Implementation</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Utilizes strict Retrieval-Augmented Generation to ground all AI recommendations exclusively in verified O*NET occupational data.
              </p>
            </div>

            {/* Card 2 */}
            <div className={`p-8 border rounded-2xl transition-all duration-300 hover:-translate-y-1 group ${isDarkMode ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-indigo-500/30' : 'border-slate-200 bg-white hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200'}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${isDarkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                <Target className="w-7 h-7 group-hover:scale-110 transition-transform" strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Semantic Matching</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Converts profiles into 384-dimensional vectors, searching across 900+ careers based on deep contextual meaning rather than raw keywords.
              </p>
            </div>

            {/* Card 3 */}
            <div className={`p-8 border rounded-2xl transition-all duration-300 hover:-translate-y-1 group ${isDarkMode ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-emerald-500/30' : 'border-slate-200 bg-white hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200'}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${isDarkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                <ShieldCheck className="w-7 h-7 group-hover:scale-110 transition-transform" strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Zero-Trust Security</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Protected session management engineered with Clerk, ensuring your parameter data and recommendation history remain entirely encrypted.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={`border-t py-10 transition-colors ${isDarkMode ? 'border-slate-800/60 bg-[#0B1120]' : 'border-slate-200 bg-[#F8FAFC]'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Hexagon className={`w-5 h-5 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} fill="currentColor" />
            <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>
              © {new Date().getFullYear()} CareerGuide AI. System Operational.
            </span>
          </div>
          <div className={`flex gap-8 text-sm font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-slate-300' : 'hover:text-slate-800'}`}>Documentation</a>
            <a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-slate-300' : 'hover:text-slate-800'}`}>Privacy Policy</a>
            <a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-slate-300' : 'hover:text-slate-800'}`}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}