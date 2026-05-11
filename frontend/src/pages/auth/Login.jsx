import React, { useState } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
            <motion.main 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm flex flex-col gap-6"
            >
                <header className="text-center">
                    <div className="w-16 h-16 bg-indigo-700 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-600/20 mx-auto mb-4">
                        <Shield className="text-white h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-600 mt-2">Access your secure workspace.</p>
                </header>

                <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-semibold">{error}</div>}
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                                <input className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-700/20 focus:border-indigo-700 transition-all text-base" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" type="email" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-semibold text-slate-700">Password</label>
                                <a href="#" className="text-xs font-bold text-indigo-700 hover:underline">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                                <input className="w-full pl-14 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-700/20 focus:border-indigo-700 transition-all text-base" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" type={showPassword ? 'text' : 'password'} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-700">
                                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-indigo-700 text-white py-4 rounded-2xl font-bold hover:bg-indigo-800 transition-all flex items-center justify-center gap-2 text-base">
                            Sign In <ArrowRight size={20} />
                        </button>
                    </form>
                    
                    <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">OR CONTINUE WITH</div>
                        <div className="flex w-full gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-sm">Google</button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-sm">Facebook</button>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">Don't have an account? <Link to="/signup" className="text-indigo-700 font-bold hover:underline">Create a vault</Link></p>
                    </div>
                </div>
            </motion.main>
        </div>
    );
};

export default Login;
