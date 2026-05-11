import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Lock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-700">SecureNotes</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            <Link to="/admin" className="hover:text-indigo-600">Admin</Link>
            <Link to="/aggregations" className="hover:text-indigo-600">Aggregations</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">Login</Link>
            <Link to="/signup" className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all">Sign Up</Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            Your notes, <span className="text-indigo-600">securely</span> stored.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
            The encrypted workspace for your most important ideas. Fast, responsive, and completely private.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all text-lg shadow-lg shadow-indigo-200">
              Get Started Now <ChevronRight size={20} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        {[
          { icon: Lock, title: 'AES-256 Encryption', desc: 'Industry standard security for all your notes.' },
          { icon: Zap, title: 'Lightning Fast', desc: 'Built for speed with real-time sync.' },
          { icon: ShieldCheck, title: 'Private by Default', desc: 'Your data stays yours, always.' }
        ].map((feat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <feat.icon className="text-indigo-600 mb-6" size={32} />
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
            <p className="text-slate-600">{feat.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Landing;
