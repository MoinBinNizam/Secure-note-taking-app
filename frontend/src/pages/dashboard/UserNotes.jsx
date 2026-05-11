import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MoreVertical, Edit, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import api from '../../services/api';

const UserNotes = () => {
  const [notes, setNotes] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, note: null });
  const [formData, setFormData] = useState({ title: '', content: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modal.note) {
        await api.put(`/notes/${modal.note._id}`, formData);
      } else {
        await api.post('/notes', formData);
      }
      setModal({ isOpen: false, note: null });
      setFormData({ title: '', content: '' });
      fetchNotes();
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  };

  const deleteNote = async (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
        await api.delete(`/notes/${id}`);
        fetchNotes();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">My Notes</h2>
        <button onClick={() => setModal({ isOpen: true, note: null })} className="hidden md:flex items-center gap-2 bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-bold hover:bg-indigo-800 transition-all shadow-md">
          <Plus size={20} /> New Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {notes.map((note) => (
          <motion.div key={note._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-slate-800 text-lg">{note.title}</h3>
            </div>
            <p className="text-slate-600 text-sm mb-6 h-12 overflow-hidden">{note.content}</p>
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>{new Date(note.createdAt).toLocaleDateString()}</span>
              <div className="flex gap-2">
                <button onClick={() => { setModal({ isOpen: true, note }); setFormData({ title: note.title, content: note.content }); }} className="hover:text-indigo-600"><Edit size={16} /></button>
                <button onClick={() => deleteNote(note._id)} className="hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modal.isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.form onSubmit={handleSubmit} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">{modal.note ? 'Edit Note' : 'Create New Note'}</h3>
                <button type="button" onClick={() => setModal({ isOpen: false, note: null })}><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                <textarea required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl h-32" placeholder="Write something..." value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
              </div>
              <button type="submit" className="w-full mt-6 bg-indigo-700 text-white py-3 rounded-2xl font-bold hover:bg-indigo-800">Save Note</button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserNotes;
