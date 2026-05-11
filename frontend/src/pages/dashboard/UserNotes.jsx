import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreVertical, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../services/api';

const UserNotes = () => {
  const [notes, setNotes] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const fetchNotes = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/notes?page=${page}&limit=6`);
      setNotes(res.data.data);
      setPagination({ currentPage: res.data.currentPage, totalPages: res.data.totalPages });
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">My Notes</h2>
        <button className="hidden md:flex items-center gap-2 bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-bold hover:bg-indigo-800 transition-all shadow-md">
          <Plus size={20} /> New Note
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 font-semibold">Loading notes...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {notes.map((note) => (
              <motion.div 
                key={note._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-800 text-lg">{note.title}</h3>
                  <button className="text-slate-400 hover:text-indigo-600"><MoreVertical size={18} /></button>
                </div>
                <p className="text-slate-600 text-sm mb-6 h-12 overflow-hidden">{note.content}</p>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <button className="hover:text-indigo-600"><Edit size={16} /></button>
                    <button className="hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-4">
              <button 
                disabled={pagination.currentPage === 1}
                onClick={() => fetchNotes(pagination.currentPage - 1)}
                className="p-2 bg-white rounded-xl border border-slate-200 disabled:opacity-50 hover:bg-slate-50"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-bold text-slate-700">Page {pagination.currentPage} of {pagination.totalPages}</span>
              <button 
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => fetchNotes(pagination.currentPage + 1)}
                className="p-2 bg-white rounded-xl border border-slate-200 disabled:opacity-50 hover:bg-slate-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}

      {/* FAB for Mobile */}
      <button className="md:hidden fixed bottom-6 right-6 bg-indigo-700 text-white p-4 rounded-full shadow-lg shadow-indigo-600/30">
        <Plus size={28} />
      </button>
    </div>
  );
};

export default UserNotes;
