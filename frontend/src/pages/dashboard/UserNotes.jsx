import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';

const UserNotes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Project Roadmap', snippet: 'Define Q3 goals and milestones...', date: 'May 11, 2026' },
    { id: 2, title: 'Security Audit', snippet: 'Review AES-256 implementation details...', date: 'May 10, 2026' },
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">My Notes</h2>
        <button className="hidden md:flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">
          <Plus size={20} /> New Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {notes.map((note) => (
          <motion.div 
            key={note.id}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-slate-800 text-lg">{note.title}</h3>
              <button className="text-slate-400 hover:text-indigo-600"><MoreVertical size={18} /></button>
            </div>
            <p className="text-slate-600 text-sm mb-6">{note.snippet}</p>
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>{note.date}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="hover:text-indigo-600"><Edit size={16} /></button>
                <button className="hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAB for Mobile */}
      <button className="md:hidden fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-600/30">
        <Plus size={28} />
      </button>
    </div>
  );
};

export default UserNotes;
