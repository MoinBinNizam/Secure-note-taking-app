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
        <div className="flex min-h-screen items-center justify-center bg-emerald-100 p-6">
            <div className="w-full max-w-sm rounded-[2rem] border-4 border-emerald-300 bg-white p-10 shadow-2xl">
                <h2 className="mb-8 text-center text-3xl font-extrabold text-emerald-950">Welcome Back</h2>
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
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white transition hover:bg-emerald-700 active:scale-95"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-emerald-900">
                    Need an account? <Link to="/signup" className="font-extrabold underline hover:text-emerald-700">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
