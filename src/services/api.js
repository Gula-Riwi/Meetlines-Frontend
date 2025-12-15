import axios from 'axios';
import Cookies from 'js-cookie';
import { getApiBaseUrl } from './tenantService';

const getBaseURL = () => {
    // Si hay VITE_API_URL configurado, úsalo (tiene prioridad)
    if (import.meta.env.VITE_API_URL) {
        console.log('✅ Usando VITE_API_URL:', import.meta.env.VITE_API_URL);
        return import.meta.env.VITE_API_URL;
    }
    // Si no, usa la URL dinámica basada en el host actual (incluyendo subdominio)
    console.log('⚠️ VITE_API_URL no está configurado, usando URL dinámica');
    return getApiBaseUrl();
};

const api = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('auth_token');
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
    async (error) => {
        const originalRequest = error.config;

        // Check if this is a public endpoint (no auth redirect needed)
        const isPublicEndpoint = originalRequest?.url?.includes('/public') ||
            originalRequest?.url?.includes('/api/client/auth/');

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // For public endpoints, just reject without redirect
            if (isPublicEndpoint) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get('refresh_token');

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post(`${getBaseURL()}/api/auth/refresh-token`, {
                    refreshToken: refreshToken
                });

                const { success, data } = response.data;

                if (success && data) {
                    Cookies.set('auth_token', data.accessToken, { expires: 1, secure: false, sameSite: 'Lax' });
                    Cookies.set('refresh_token', data.refreshToken, { expires: 7, secure: false, sameSite: 'Lax' });

                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                    return api(originalRequest);
                }

            } catch (refreshError) {
                console.error("Sesión expirada, cerrando sesión...", refreshError);

                Cookies.remove('auth_token');
                Cookies.remove('refresh_token');
                localStorage.removeItem('user');

                // Check if we're on a customer route
                const isCustomerRoute = window.location.pathname.startsWith('/explore') ||
                    window.location.pathname.startsWith('/business') ||
                    window.location.pathname.startsWith('/customer') ||
                    window.location.pathname.startsWith('/book') ||
                    window.location.pathname.startsWith('/my-appointments');

                if (isCustomerRoute) {
                    window.location.href = '/customer/login';
                } else {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;