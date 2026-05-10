import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-600">Welcome to your secure note-taking workspace.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
          >
            <h3 className="font-semibold text-slate-800 mb-2">My Secure Note {i}</h3>
            <p className="text-slate-600 text-sm mb-4">Snippet of your encrypted content goes here...</p>
            <span className="text-xs text-slate-400">Created: May 11, 2026</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
