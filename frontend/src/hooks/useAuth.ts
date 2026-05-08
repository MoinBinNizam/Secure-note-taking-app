import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Named import for jwt-decode

interface AuthState {
    isAuthenticated: boolean;
    user: { id: string; email: string; role: 'User' | 'Admin' } | null;
    token: string | null;
}

const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        token: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token) as { id: string; email: string; role: 'User' | 'Admin' };
                setAuthState({
                    isAuthenticated: true,
                    user: decodedUser,
                    token: token,
                });
            } catch (error) {
                console.error('Failed to decode token:', error);
                localStorage.removeItem('token');
                setAuthState({ isAuthenticated: false, user: null, token: null });
            }
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token) as { id: string; email: string; role: 'User' | 'Admin' };
        setAuthState({
            isAuthenticated: true,
            user: decodedUser,
            token: token,
        });
        navigate('/dashboard'); // Redirect to dashboard after login
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({ isAuthenticated: false, user: null, token: null });
        navigate('/login'); // Redirect to login after logout
    };

    return { ...authState, login, logout };
};

export default useAuth;
