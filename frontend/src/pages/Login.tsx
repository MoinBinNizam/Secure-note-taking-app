import React, { useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-emerald-50 p-8 rounded-3xl shadow-2xl border border-emerald-100">
                <h1 className="text-3xl font-bold mb-8 text-slate-800 text-center">Login</h1>
                {error && <p className="mb-4 p-3 bg-red-50 text-red-700 border border-red-100 rounded-xl text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-emerald-800 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-emerald-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-emerald-800 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-emerald-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-8 text-sm text-center text-emerald-800">
                    Don't have an account? <Link to="/signup" className="text-emerald-600 font-bold hover:underline">Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
