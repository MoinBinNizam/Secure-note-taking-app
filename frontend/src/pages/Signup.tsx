import React, { useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, X, CheckCircle } from 'lucide-react';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [interest, setInterest] = useState('');
    const [interests, setInterests] = useState<string[]>(['Productivity', 'Journaling', 'Security', 'SaaS']);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (interest.trim() && !interests.includes(interest.trim())) {
                setInterests([...interests, interest.trim()]);
                setInterest('');
            }
        }
    };

    const removeInterest = (interestToRemove: string) => {
        setInterests(interests.filter(i => i !== interestToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await api.post('/auth/register', { email, password, interests });
            login(response.data.token);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#fcf8ff] text-[#1b1b24]">
            <main className="w-full max-w-[440px] flex flex-col gap-6 animate-in fade-in duration-700">
                <header className="flex flex-col items-center text-center gap-2">
                    <div className="w-14 h-14 bg-[#3525cd] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20 mb-4">
                        <Shield className="text-white h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight">Create Account</h1>
                    <p className="text-sm text-[#464555] max-w-[280px]">Secure your thoughts with end-to-end encryption.</p>
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
                            <label className="text-sm font-medium text-[#3525cd] ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777587] group-focus-within:text-[#3525cd]" size={20} />
                                <input className="w-full pl-12 pr-12 py-3.5 bg-[#f5f2ff] border border-[#c7c4d8] rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" type={showPassword ? 'text' : 'password'} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777587] hover:text-[#3525cd]">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-medium text-[#3525cd]">Interests</label>
                                <span className="text-xs text-[#777587]">Press Enter to add</span>
                            </div>
                            <div className="w-full p-3 bg-[#f5f2ff] border border-[#c7c4d8] rounded-xl min-h-[120px] flex flex-wrap gap-2 items-start focus-within:ring-2 focus-within:ring-[#3525cd]/20 focus-within:border-[#3525cd] transition-all">
                                {interests.map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-1.5 bg-[#3525cd] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all">
                                        {tag}
                                        <X size={14} className="cursor-pointer" onClick={() => removeInterest(tag)} />
                                    </span>
                                ))}
                                <input className="flex-1 bg-transparent border-none focus:ring-0 p-1 text-sm min-w-[80px]" value={interest} onChange={e => setInterest(e.target.value)} onKeyDown={handleAddInterest} placeholder="Add more..." type="text" />
                            </div>
                        </div>

                        <label className="flex items-start gap-3 px-1 mt-2">
                            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-[#c7c4d8] text-[#3525cd] focus:ring-[#3525cd]/30" required />
                            <span className="text-sm text-[#464555] leading-relaxed">I agree to the <a className="text-[#3525cd] font-bold hover:underline" href="#">Terms of Service</a> and <a className="text-[#3525cd] font-bold hover:underline" href="#">Privacy Policy</a>.</span>
                        </label>

                        <button type="submit" className="mt-4 w-full bg-[#3525cd] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-indigo-900/20 hover:bg-[#3323cc] transition-all">Get Started</button>
                    </form>
                    
                    <div className="mt-6 pt-6 border-t border-[#c7c4d8]/30 flex flex-col items-center gap-4">
                        <p className="text-sm text-[#464555]">Already have an account? <Link to="/login" className="text-[#3525cd] font-bold hover:underline">Log In</Link></p>
                    </div>
                </div>

                <footer className="flex items-center justify-center py-4">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-[#dcfce7] text-[#00714d] rounded-full text-xs font-semibold uppercase tracking-wider">
                        <CheckCircle size={16} /> AES-256 ENCRYPTED
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Signup;
