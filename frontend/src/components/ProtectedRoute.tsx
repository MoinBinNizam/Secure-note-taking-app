import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
    allowedRoles?: Array<'User' | 'Admin'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Optionally, redirect to an unauthorized page or show a message
        return <Navigate to="/unauthorized" replace />; // You might want to create this page
    }

    return <Outlet />;
};

export default ProtectedRoute;
