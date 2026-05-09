import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col rounded-none">
            {/* Header */}
            <header className="bg-white shadow-md p-4 flex justify-between items-center rounded-none">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Note-Taking App</h1>
                    {user && (
                        <span className="ml-4 text-gray-600 text-sm">Welcome, {user.email} ({user.role})</span>
                    )}
                </div>
                <nav className="flex space-x-4">
                    {user?.role === 'Admin' && (
                        <>
                            <Link to="/admin" className="text-blue-600 hover:text-blue-800 font-medium">Admin Dashboard</Link>
                            <Link to="/aggregations" className="text-blue-600 hover:text-blue-800 font-medium">Aggregations</Link>
                        </>
                    )}
                    <Link to="/notes" className="text-blue-600 hover:text-blue-800 font-medium">My Notes</Link>
                    <button
                        onClick={logout}
                        className="py-1 px-3 bg-red-600 text-white rounded-none hover:bg-red-700"
                    >
                        Logout
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-6">
                <Outlet /> {/* Renders child routes */}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center text-sm rounded-none">
                © {new Date().getFullYear()} Note-Taking Application. All rights reserved.
            </footer>
        </div>
    );
};

export default Dashboard;
