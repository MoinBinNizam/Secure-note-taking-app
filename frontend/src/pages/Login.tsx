import React, { useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronRight, ShieldCheck, Fingerprint, Key, Shield } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
            <main className="w-full max-w-md flex flex-col gap-6 animate-in fade-in duration-700">
                <header className="flex flex-col items-center text-center gap-2">
                    <div className="w-16 h-16 bg-indigo-700 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-600/20 mb-4">
                        <Shield className="text-white h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">SecureNotes</h1>
                    <p className="text-slate-600">Access your encrypted workspace.</p>
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
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-semibold text-slate-700">Password</label>
                                <a href="#" className="text-xs font-bold text-indigo-700 hover:underline">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-700 transition-colors" size={20} />
                                <input className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-700/20 focus:border-indigo-700 transition-all" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" type={showPassword ? 'text' : 'password'} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-700">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-indigo-700 text-white py-3.5 rounded-2xl font-bold hover:bg-indigo-800 transition-all flex items-center justify-center gap-2">
                            Sign In to Vault <ChevronRight size={20} />
                        </button>
                    </form>
                    
                    <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">OR CONTINUE WITH</div>
                        <div className="flex w-full gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold"><Key size={18} /> SSO</button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold"><Fingerprint size={18} /> Passkey</button>
                        </div>
                        <p className="text-sm text-slate-600">Don't have an account? <Link to="/signup" className="text-indigo-700 font-bold hover:underline">Create a vault</Link></p>
                    </div>
                </div>

                <footer className="flex items-center justify-center py-2">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                        <ShieldCheck size={16} /> 256-bit End-to-End Encryption
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Login;
