import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import api from '../../services/api';

const Interests = () => {
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/me');
                console.log('DEBUG - User profile fetched for interests:', res.data);
                setInterests(res.data.interests || []);
            } catch (err) {
                console.error('Failed to fetch profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">My Interests</h2>
            {loading ? (
                <div className="text-slate-500">Loading interests...</div>
            ) : interests.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {interests.map((interest, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all">
                            <Tag className="text-indigo-600" size={32} />
                            <span className="font-bold text-slate-800 text-lg uppercase tracking-wide">{interest}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-10 rounded-3xl border border-dashed border-slate-300 text-center text-slate-500">
                    No interests added yet. Go to <a href="/dashboard/settings" className="text-indigo-700 font-bold hover:underline">Settings</a> to add some!
                </div>
            )}
        </motion.div>
    );
};

export default Interests;