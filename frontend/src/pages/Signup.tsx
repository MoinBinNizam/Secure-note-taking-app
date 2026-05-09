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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
                <h1 className="text-3xl font-bold mb-8 text-slate-800 text-center">Create Account</h1>
                {error && <p className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-500 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-slate-100 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-500 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-slate-100 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-500 mb-2">Interests</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-slate-100 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                            onKeyDown={handleAddInterest}
                            placeholder="Press Enter to add tags..."
                        />
                        <div className="flex flex-wrap gap-2 mt-3">
                            {interests.map((tag) => (
                                <span key={tag} className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                                    {tag}
                                    <button type="button" onClick={() => removeInterest(tag)} className="ml-2 hover:text-indigo-900">&times;</button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-8 text-sm text-center text-slate-500">
                    Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
