import React, { useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ChevronRight, Key, Fingerprint } from 'lucide-react';

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
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">SecureNotes</h1>
                    <p className="mt-2 text-slate-600">Access your encrypted workspace.</p>
                </div>
                {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input type="email" placeholder="Email Address" className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-12 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    <div className="text-right">
                        <a href="#" className="text-sm font-semibold text-indigo-600">Forgot?</a>
                    </div>
                    <button type="submit" className="flex w-full items-center justify-center rounded-2xl bg-indigo-600 py-3.5 font-bold text-white transition hover:bg-indigo-700">
                        Sign In to Vault <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                </form>
                <div className="mt-6 flex gap-3">
                    <button className="flex flex-1 items-center justify-center rounded-2xl border border-slate-200 py-3 font-semibold text-slate-700 hover:bg-slate-50">
                        <Key className="mr-2 h-5 w-5" /> SSO
                    </button>
                    <button className="flex flex-1 items-center justify-center rounded-2xl border border-slate-200 py-3 font-semibold text-slate-700 hover:bg-slate-50">
                        <Fingerprint className="mr-2 h-5 w-5" /> Passkey
                    </button>
                </div>
                <p className="mt-8 text-center text-sm text-slate-600">
                    Don't have an account? <Link to="/signup" className="font-bold text-indigo-600 hover:underline">Create a vault</Link>
                </p>
                <div className="mt-8 flex justify-center">
                    <span className="flex items-center rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
                        <ShieldCheck className="mr-1.5 h-4 w-4" /> AES-256 ENCRYPTED
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
