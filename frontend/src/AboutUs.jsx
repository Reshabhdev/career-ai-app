import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Zap, Compass, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutUs() {
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
            CareerGuide <span className="text-blue-500 font-light">About</span>
          </span>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-10 md:p-14 rounded-3xl border backdrop-blur-md shadow-2xl ${isDarkMode ? 'bg-white/50 border-indigo-200/50' : 'bg-white border-slate-200'}`}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600">
              <Users className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900">About Us</h1>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                At CareerGuide AI, we believe that finding the right career path shouldn't be a guessing game. 
                Our mission is to democratize access to premium, data-driven career counseling by leveraging cutting-edge artificial intelligence and verified occupational data.
                We strive to empower individuals to make confident, informed decisions about their professional futures.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-white/40 border-indigo-100' : 'bg-slate-50 border-slate-200'}`}>
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Innovation</h3>
                <p className="text-slate-700">
                  We bypass generic advice by utilizing advanced vector embeddings and Retrieval-Augmented Generation (RAG). This ensures our recommendations are highly personalized and structurally sound.
                </p>
              </div>

              <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-white/40 border-indigo-100' : 'bg-slate-50 border-slate-200'}`}>
                <Compass className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Guidance</h3>
                <p className="text-slate-700">
                  By integrating directly with the O*NET database, we provide a reliable compass for your career journey. You're guided by standardized, real-world industry data, not just AI estimations.
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-rose-500" /> Who We Are
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                We are a team of technologists, data scientists, and career enthusiasts dedicated to bridging the gap between talent and opportunity. 
                We observed that many people feel lost navigating the modern job market, often relying on outdated advice or intuition.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                By combining our expertise in machine learning with comprehensive occupational frameworks, we built CareerGuide AI to be the definitive tool for precision career intelligence. Whether you are a recent graduate, a seasoned professional looking to pivot, or simply exploring your options, our platform is designed to illuminate your optimal path forward.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
