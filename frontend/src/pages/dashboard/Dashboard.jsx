import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Clock, Plus, BarChart2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalNotes: 0, recentNotes: [] });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/notes?limit=3');
        setStats({ 
          totalNotes: res.data.totalNotes, 
          recentNotes: res.data.data 
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };
    fetchData();
  }, []);

  const statItems = [
    { label: 'Total Notes', value: stats.totalNotes, icon: FileText, color: 'text-indigo-600' },
    { label: 'Encrypted', value: stats.totalNotes, icon: ShieldCheck, color: 'text-emerald-600' },
    { label: 'Recent', value: stats.recentNotes.length, icon: Clock, color: 'text-blue-600' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6">
      {/* Welcome & Stats */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-600">Your secure workspace overview.</p>
        </div>
        <div className="flex items-center gap-4">
            <Link to="/dashboard/notes" className="flex items-center gap-2 bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-200">
            <Plus size={20} /> Create New Note
            </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statItems.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-4 bg-slate-50 rounded-2xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Activity */}
      <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="text-indigo-600" /> Recent Activity
          </h3>
        </div>
        <div className="space-y-4">
          {stats.recentNotes.map((note) => (
            <div key={note._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg border border-slate-100"><FileText size={20} className="text-slate-400" /></div>
                <div>
                  <p className="font-semibold text-slate-800">{note.title}</p>
                  <p className="text-xs text-slate-500">{new Date(note.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <Link to="/dashboard/notes" className="text-sm font-bold text-indigo-700 hover:underline">View</Link>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Dashboard;
