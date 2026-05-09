import React, { useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, X, Shield, CheckCircle } from 'lucide-react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [interest, setInterest] = useState('');
    const [interests, setInterests] = useState(['Productivity', 'Security']);
    const [error, setError] = useState(null);
    const { login } = useAuth();
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
            const response = await api.post('/auth/register', { email, password, interests });
            login(response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 text-slate-800">
            <main className="w-full max-w-lg flex flex-col gap-8 animate-in fade-in duration-700">
                <header className="flex flex-col items-center text-center gap-3">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-200 mb-2">
                        <Shield className="text-white h-10 w-10" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900">Create Account</h1>
                    <p className="text-lg text-slate-500">Secure your thoughts with end-to-end encryption.</p>
                </header>

                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={24} />
                                <input className="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all text-lg" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" type="email" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={24} />
                                <input className="w-full pl-16 pr-16 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all text-lg" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" type={showPassword ? 'text' : 'password'} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Interests</label>
                            <div className="w-full p-4 bg-white border border-slate-200 rounded-2xl min-h-[140px] flex flex-wrap gap-3 items-start focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-500 transition-all">
                                {interests.map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:scale-105 transition-transform">
                                        {tag}
                                        <X size={18} className="cursor-pointer hover:text-blue-200" onClick={() => removeInterest(tag)} />
                                    </span>
                                ))}
                                <input className="flex-1 bg-transparent border-none focus:ring-0 p-2 text-lg min-w-[120px]" value={interest} onChange={e => setInterest(e.target.value)} onKeyDown={handleAddInterest} placeholder="Add interest + Enter" type="text" />
                            </div>
                        </div>

                        <label className="flex items-center gap-4 px-1 mt-2">
                            <input type="checkbox" className="w-6 h-6 rounded border-slate-200 text-blue-600 focus:ring-blue-100" required />
                            <span className="text-base text-slate-600">I agree to Terms & Privacy Policy.</span>
                        </label>

                        <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-extrabold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Create Account</button>
                    </form>
                    
                    <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
                        <p className="text-base text-slate-600">Already have an account? <Link to="/login" className="text-blue-600 font-extrabold hover:underline">Log In</Link></p>
                    </div>
                </div>

                <footer className="flex items-center justify-center py-4">
                    <div className="flex items-center gap-3 px-6 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold uppercase tracking-wider">
                        <CheckCircle size={20} /> AES-256 ENCRYPTED
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Signup;
