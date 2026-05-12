import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../services/api';

const AdminUserNotes = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // We need to fetch notes for a specific user.
                // Assuming backend supports /api/notes?userId=... or similar.
                // Based on previous code, Admins can view everything. 
                // Let's assume a query param for filtering.
                const res = await api.get(`/notes?ownerId=${userId}`);
                setNotes(res.data.data || []);
            } catch (err) {
                console.error('Failed to fetch user notes:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, [userId]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-6 pt-[30px]">
                <button onClick={() => navigate('/admin')} className="p-2 text-slate-500 hover:text-slate-800 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-3xl font-bold text-slate-800">User Notes</h2>
            </div>
            {loading ? (
                <div className="text-center py-20 text-slate-500 font-semibold">Loading notes...</div>
            ) : notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {notes.map(note => (
                        <div key={note._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-800 text-lg mb-2">{note.title}</h3>
                            <div className="text-slate-600 text-sm mb-6 break-words" dangerouslySetInnerHTML={{ __html: note.content }} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-slate-500">No notes found for this user.</div>
            )}
        </motion.div>
    );
};

export default AdminUserNotes;