import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            // Optionally, try to refresh token or redirect to login
            localStorage.removeItem('token');
            // window.location.href = '/login'; // Redirect to login page
            console.error('Unauthorized: Token expired or invalid, please log in again.');
        } else if (error.response.status === 403) {
            // window.location.href = '/forbidden'; // Redirect to forbidden page
            console.error('Forbidden: You do not have permission to access this resource.');
        }
        return Promise.reject(error);
    }
);

export default api;
