import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MoreVertical, Edit, Trash2, ChevronLeft, ChevronRight, X, Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';
import api from '../../services/api';

const UserNotes = () => {
  const [notes, setNotes] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, note: null });
  const [formData, setFormData] = useState({ title: '', content: '' });
  const contentRef = useRef(null);

  const formatText = (command) => {
    document.execCommand(command, false, null);
    contentRef.current.focus();
  };

  const fetchNotes = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/notes?page=${page}&limit=6`);
      setNotes(res.data.data || []);
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

  useEffect(() => {
    if (modal.isOpen && contentRef.current) {
        contentRef.current.innerHTML = modal.note ? modal.note.content : '';
        setTimeout(() => contentRef.current?.focus(), 100);
    }
  }, [modal.isOpen, modal.note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = contentRef.current.innerHTML;
    try {
      if (modal.note) {
        await api.put(`/notes/${modal.note._id}`, { title: formData.title, content });
      } else {
        await api.post('/notes', { title: formData.title, content });
      }
      setModal({ isOpen: false, note: null });
      setFormData({ title: '', content: '' });
      await fetchNotes();
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div className="sticky top-0 z-40 bg-slate-50 py-6 flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-slate-800">My Notes</h2>
        <button onClick={() => setModal({ isOpen: true, note: null })} className="flex items-center gap-2 bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-bold hover:bg-indigo-800 transition-all shadow-md">
          <Plus size={20} /> New Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
           <div className="col-span-full text-center py-20 text-slate-500 font-semibold">Loading your notes...</div>
        ) : notes.length > 0 ? (
            notes.map((note) => (
              <motion.div key={note._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group flex flex-col">
                <h3 className="font-bold text-slate-800 text-lg mb-2">{note.title}</h3>
                <div 
                  className="text-slate-600 text-sm mb-6 break-words" 
                  dangerouslySetInnerHTML={{ __html: note.content }} 
                />
                <div className="flex justify-between items-center text-xs text-slate-400 mt-auto">
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <button onClick={() => { setModal({ isOpen: true, note }); setFormData({ title: note.title, content: note.content }); }} className="hover:text-indigo-600"><Edit size={16} /></button>
                    <button onClick={() => deleteNote(note._id)} className="hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </motion.div>
            ))
        ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-500 font-medium mb-4">No notes found. Start by creating one!</p>
                <button onClick={() => setModal({ isOpen: true, note: null })} className="bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-800 transition-all">
                    Create Your First Note
                </button>
            </div>
        )}
      </div>

      <AnimatePresence>
        {modal.isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-8 rounded-3xl w-full max-w-4xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">{modal.note ? 'Edit Note' : 'Create New Note'}</h3>
              <button type="button" onClick={() => setModal({ isOpen: false, note: null })}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl" placeholder="Note Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />

              <div className="border border-slate-200 rounded-2xl overflow-hidden min-h-[300px] flex flex-col">
                  <div className="flex bg-slate-100 p-2 gap-1 border-b border-slate-200">
                      <button type="button" onClick={() => formatText('bold')} className="p-2 hover:bg-slate-200 rounded"><Bold size={18} /></button>
                      <button type="button" onClick={() => formatText('italic')} className="p-2 hover:bg-slate-200 rounded"><Italic size={18} /></button>
                      <button type="button" onClick={() => formatText('underline')} className="p-2 hover:bg-slate-200 rounded"><Underline size={18} /></button>
                      <button type="button" onClick={() => formatText('insertUnorderedList')} className="p-2 hover:bg-slate-200 rounded"><List size={18} /></button>
                      <button type="button" onClick={() => formatText('insertOrderedList')} className="p-2 hover:bg-slate-200 rounded"><ListOrdered size={18} /></button>
                  </div>
                  <div 
                      ref={contentRef} 
                      contentEditable 
                      className="w-full px-4 py-4 bg-slate-50 flex-grow h-[200px] outline-none overflow-y-auto cursor-text border border-transparent focus:border-indigo-300"
                  />
              </div>
            </div>
            <button onClick={handleSubmit} className="w-full mt-6 bg-indigo-700 text-white py-4 rounded-2xl font-bold hover:bg-indigo-800 transition-all">Save Note</button>
            </motion.div>          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserNotes;