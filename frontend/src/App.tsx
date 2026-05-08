import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UserNotes from './pages/UserNotes';
import AdminDashboard from './pages/AdminDashboard';
import AggregationView from './pages/AggregationView';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/unauthorized" element={
                    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                        <div className="bg-white p-8 border border-gray-300 shadow-lg w-full max-w-md rounded-none text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized Access</h2>
                            <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
                            <Link to="/dashboard/notes" className="font-medium text-indigo-600 hover:text-indigo-500">Go to Dashboard</Link>
                        </div>
                    </div>
                } />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<Dashboard />}>
                        <Route index element={<Navigate to="notes" replace />} />
                        <Route path="notes" element={<UserNotes />} />
                        <Route path="admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>} />
                        <Route path="aggregations" element={<AggregationView />} />
                    </Route>
                </Route>

                {/* Redirect any unmatched routes */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
