import React, { useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronRight, ShieldCheck, Fingerprint, Key } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#fcf8ff] text-[#1b1b24]">
            <main className="w-full max-w-[440px] flex flex-col gap-6 animate-in fade-in duration-700">
                <header className="flex flex-col items-center text-center gap-2">
                    <div className="w-14 h-14 bg-[#3525cd] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20 mb-4">
                        <Lock className="text-white h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight">Log In</h1>
                    <p className="text-sm text-[#464555] max-w-[280px]">Access your encrypted workspace.</p>
                </header>

                <div className="bg-white rounded-[32px] p-6 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c7c4d8]/30">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-[#3525cd] ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777587] group-focus-within:text-[#3525cd]" size={20} />
                                <input className="w-full pl-12 pr-4 py-3.5 bg-[#f5f2ff] border border-[#c7c4d8] rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@securenotes.com" type="email" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-medium text-[#3525cd]">Password</label>
                                <a href="#" className="text-xs font-bold text-[#3525cd] hover:underline">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777587] group-focus-within:text-[#3525cd]" size={20} />
                                <input className="w-full pl-12 pr-12 py-3.5 bg-[#f5f2ff] border border-[#c7c4d8] rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" type={showPassword ? 'text' : 'password'} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777587] hover:text-[#3525cd]">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="mt-4 w-full bg-[#3525cd] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-indigo-900/20 hover:bg-[#3323cc] transition-all flex items-center justify-center gap-2">
                            Sign In to Vault <ChevronRight size={20} />
                        </button>
                    </form>
                    
                    <div className="mt-6 pt-6 border-t border-[#c7c4d8]/30 flex flex-col items-center gap-4">
                        <div className="flex w-full gap-4">
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#c7c4d8] rounded-xl hover:bg-[#f5f2ff] transition-colors"><Key size={20} /> SSO</button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#c7c4d8] rounded-xl hover:bg-[#f5f2ff] transition-colors"><Fingerprint size={20} /> Passkey</button>
                        </div>
                        <p className="text-sm text-[#464555]">Don't have an account? <Link to="/signup" className="text-[#3525cd] font-bold hover:underline">Create a vault</Link></p>
                    </div>
                </div>

                <footer className="flex items-center justify-center py-4">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-[#dcfce7] text-[#00714d] rounded-full text-xs font-semibold uppercase tracking-wider">
                        <ShieldCheck size={16} /> AES-256 ENCRYPTED
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Login;
