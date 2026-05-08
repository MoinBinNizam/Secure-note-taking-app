import React, { useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [interests, setInterests] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const interestsArray = interests.split(',').map(s => s.trim()).filter(s => s.length > 0);
            const response = await api.post('/auth/register', { email, password, interests: interestsArray });
            login(response.data.token);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl p-8 rounded-2xl">
                <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Sign Up</h1>
                {error && <p className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Interests (comma-separated)</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            placeholder="chess, reading, coding"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-2 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md"
                    >
                        Create Account
                    </button>
                </form>
                <p className="mt-6 text-sm text-center text-slate-600">
                    Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
