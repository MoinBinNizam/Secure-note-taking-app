import React, { useState } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, X, Shield } from 'lucide-react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [interest, setInterest] = useState('');
    const [interests, setInterests] = useState(['Productivity', 'Security']);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddInterest = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (interest.trim() && !interests.includes(interest.trim())) {
                setInterests([...interests, interest.trim()]);
                setInterest('');
            }
        }
    };

    const removeInterest = (interestToRemove) => {
        setInterests(interests.filter(i => i !== interestToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await api.post('/auth/register', { email, password, interests });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
            <main className="w-full max-w-md flex flex-col gap-6 animate-in fade-in duration-700">
                <header className="flex flex-col items-center text-center gap-2">
                    <div className="w-16 h-16 bg-indigo-700 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-600/20 mb-4">
                        <Shield className="text-white h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h1>
                    <p className="text-slate-600">Secure your thoughts with end-to-end encryption.</p>
                </header>

                <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-700 transition-colors" size={20} />
                                <input className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-700/20 focus:border-indigo-700 transition-all" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" type="email" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-700 transition-colors" size={20} />
                                <input className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-700/20 focus:border-indigo-700 transition-all" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" type={showPassword ? 'text' : 'password'} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-700">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Interests</label>
                            <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl min-h-[120px] flex flex-wrap gap-2 items-start focus-within:ring-2 focus-within:ring-indigo-700/20 focus-within:border-indigo-700 transition-all">
                                {interests.map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-1.5 bg-indigo-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                                        {tag}
                                        <X size={14} className="cursor-pointer hover:text-indigo-200" onClick={() => removeInterest(tag)} />
                                    </span>
                                ))}
                                <input className="flex-1 bg-transparent border-none focus:ring-0 p-1 text-sm min-w-[80px]" value={interest} onChange={e => setInterest(e.target.value)} onKeyDown={handleAddInterest} placeholder="Add interest..." type="text" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-indigo-700 text-white py-3.5 rounded-2xl font-bold hover:bg-indigo-800 transition-all">Create Account</button>
                    </form>
                    
                    <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
                        <p className="text-sm text-slate-600">Already have an account? <Link to="/login" className="text-indigo-700 font-bold hover:underline">Log In</Link></p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Signup;
