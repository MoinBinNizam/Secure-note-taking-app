import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
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
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main application layout */}
        <Route path="/dashboard" element={<Layout><Routes>
          <Route index element={<Dashboard />} />
          <Route path="notes" element={<UserNotes />} />
        </Routes></Layout>} />
        <Route path="/admin" element={<Layout><Routes>
            <Route index element={<AdminDashboard />} />
        </Routes></Layout>} />
        <Route path="/aggregations" element={<Layout><Routes>
            <Route index element={<AggregationView />} />
        </Routes></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
