import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import UserNotes from './pages/dashboard/UserNotes';
import AdminDashboard from './pages/admin/AdminDashboard';
import AggregationView from './pages/aggregations/AggregationView';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main application layout */}
        <Route path="/" element={<Layout><Routes>
          <Route index element={<Dashboard />} />
          <Route path="notes" element={<UserNotes />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="aggregations" element={<AggregationView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;

