import React, { useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [interest, setInterest] = useState('');
    const [interests, setInterests] = useState<string[]>([]);
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
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-emerald-100 p-6">
            <div className="w-full max-w-sm rounded-[2rem] border-4 border-emerald-300 bg-white p-10 shadow-2xl">
                <h2 className="mb-8 text-center text-3xl font-extrabold text-emerald-950">Create Account</h2>
                {error && <div className="mb-6 rounded-2xl bg-red-100 p-4 text-center text-sm font-bold text-red-800">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-5 py-4 placeholder-emerald-600 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-5 py-4 placeholder-emerald-600 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Interests (Press Enter)"
                        className="w-full rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-5 py-4 placeholder-emerald-600 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        onKeyDown={handleAddInterest}
                    />
                    <div className="flex flex-wrap gap-2">
                        {interests.map((tag) => (
                            <span key={tag} className="flex items-center rounded-full bg-emerald-200 px-4 py-1 text-xs font-bold text-emerald-900">
                                {tag}
                                <button type="button" onClick={() => removeInterest(tag)} className="ml-2 font-bold hover:text-emerald-950">&times;</button>
                            </span>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white transition hover:bg-emerald-700 active:scale-95"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-emerald-900">
                    Already have an account? <Link to="/login" className="font-extrabold underline hover:text-emerald-700">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
