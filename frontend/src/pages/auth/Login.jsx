import React, { useState } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
            <motion.main 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[360px] flex flex-col gap-6"
            >
                <header className="text-center">
                    <div className="w-16 h-16 bg-indigo-700 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-600/20 mx-auto mb-4">
                        <Shield className="text-white h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 text-sm mt-1">Access your secure workspace.</p>
                </header>

                <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold">{error}</div>}
                        
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-base" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" type="email" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
                                <a href="#" className="text-xs font-bold text-indigo-700 hover:underline">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-base" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" type={showPassword ? 'text' : 'password'} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-700">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full mt-2 bg-indigo-700 text-white py-3 rounded-2xl font-bold hover:bg-indigo-800 transition-all flex items-center justify-center gap-2">
                            Sign In <ArrowRight size={18} />
                        </button>
                    </form>
                    
                    <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">OR CONTINUE WITH</div>
                        <div className="flex w-full gap-3">
                            <button className="flex-1 flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-xs">Google</button>
                            <button className="flex-1 flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-xs">Facebook</button>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">Don't have an account? <Link to="/signup" className="text-indigo-700 font-bold hover:underline">Create a vault</Link></p>
                    </div>
                </div>
            </motion.main>
        </div>
    );
};

export default Login;
