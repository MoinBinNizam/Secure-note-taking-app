import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const AggregationView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/aggregations/interests');
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch aggregation data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 pt-[30px]">Users Grouped by Interests</h2>
      {loading ? (
        <div className="text-center py-20 text-slate-500 font-semibold">Loading data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-indigo-700 mb-2 uppercase">{item.interest}</h3>
              <p className="text-sm text-slate-600 mb-4">{item.count} users</p>
              <div className="space-y-2">
                {item.users.map(u => (
                  <div key={u._id} className="text-sm text-slate-700 bg-slate-50 p-2 rounded-lg">{u.email}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AggregationView;
