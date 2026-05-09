import React, { useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronRight, ShieldCheck, Fingerprint, Key } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 text-slate-800">
            <main className="w-full max-w-lg flex flex-col gap-8 animate-in fade-in duration-700">
                <header className="flex flex-col items-center text-center gap-3">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-200 mb-2">
                        <Lock className="text-white h-10 w-10" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900">Welcome Back</h1>
                    <p className="text-lg text-slate-500">Sign in to access your secure workspace.</p>
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
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-bold text-slate-700">Password</label>
                                <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={24} />
                                <input className="w-full pl-16 pr-16 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all text-lg" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" type={showPassword ? 'text' : 'password'} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-extrabold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                            Sign In <ChevronRight size={24} />
                        </button>
                    </form>
                    
                    <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
                        <div className="flex w-full gap-4">
                            <button className="flex-1 flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-lg"><Key size={24} /> SSO</button>
                            <button className="flex-1 flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-lg"><Fingerprint size={24} /> Passkey</button>
                        </div>
                        <p className="text-base text-slate-600">Don't have an account? <Link to="/signup" className="text-blue-600 font-extrabold hover:underline">Sign up</Link></p>
                    </div>
                </div>

                <footer className="flex items-center justify-center py-4">
                    <div className="flex items-center gap-3 px-6 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold uppercase tracking-wider">
                        <ShieldCheck size={20} /> AES-256 ENCRYPTED
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Login;
