import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';
import api from '../../services/api';

const Settings = () => {
    const [interests, setInterests] = useState([]);
    const [interest, setInterest] = useState('');
    const [loading, setLoading] = useState(false);
    const interestsRef = useRef([]);

    useEffect(() => {
        interestsRef.current = interests;
    }, [interests]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/me');
                const initialInterests = res.data.interests || [];
                setInterests(initialInterests);
                interestsRef.current = initialInterests;
            } catch (err) {
                console.error('Failed to fetch profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleAddInterest = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newInterest = interest.trim();
            if (newInterest && !interestsRef.current.includes(newInterest)) {
                const updated = [...interestsRef.current, newInterest];
                setInterests(updated);
                interestsRef.current = updated;
                setInterest('');
            }
        }
    };

    const removeInterest = (tag) => {
        const updated = interests.filter(i => i !== tag);
        setInterests(updated);
        interestsRef.current = updated;
    };

    const saveInterests = async () => {
        console.log('DEBUG - Interests state at click (Ref):', interestsRef.current);
        try {
            setLoading(true);
            await api.patch('/auth/interests', { interests: interestsRef.current });
            alert('Interests updated!');
        } catch (err) {
            console.error('Failed to save interests:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Settings</h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <label className="block text-sm font-semibold text-slate-700 mb-2">My Interests</label>
                <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl min-h-[120px] flex flex-wrap gap-2 items-start mb-6">
                    {interests.map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1.5 bg-indigo-700 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                            {tag}
                            <X size={14} className="cursor-pointer" onClick={() => removeInterest(tag)} />
                        </span>
                    ))}
                    <input className="flex-1 bg-transparent border-none focus:ring-0 p-1 text-sm" value={interest} onChange={e => setInterest(e.target.value)} onKeyDown={handleAddInterest} placeholder="Type an interest and press Enter..." />
                </div>
                <button onClick={saveInterests} disabled={loading} className="flex items-center gap-2 bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-800 transition-all">
                    <Save size={20} /> {loading ? 'Saving...' : 'Save Interests'}
                </button>
            </div>
        </motion.div>
    );
};

export default Settings;