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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm bg-white border border-gray-900 p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-900 pb-4">Login</h1>
                {error && <p className="mb-4 p-2 bg-red-100 text-red-800 border border-red-800 text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-900 uppercase">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-2 border border-gray-900 rounded-none focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 uppercase">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-2 border border-gray-900 rounded-none focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-6 py-2 bg-gray-900 text-white font-bold uppercase hover:bg-gray-700 transition-colors"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-6 text-sm text-center">
                    Don't have an account? <Link to="/signup" className="text-gray-900 underline font-bold">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
