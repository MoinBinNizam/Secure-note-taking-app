import React from 'react';
import { motion } from 'framer-motion';

const AggregationView = () => {
  const groups = [
    { title: 'Productivity', count: 12 },
    { title: 'Security', count: 8 },
    { title: 'Journaling', count: 15 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Aggregations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <h4 className="text-lg font-bold text-slate-800 mb-2">{group.title}</h4>
            <p className="text-slate-600 text-sm">Total Users: {group.count}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AggregationView;
