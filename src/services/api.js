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
        // Check if this is a public endpoint that doesn't need auth
        const isPublicEndpoint = config.url?.includes('/public');

        // Skip auth for public endpoints
        if (isPublicEndpoint) {
            return config;
        }

        // Determine which token to use based on the endpoint AND current page context
        const isClientEndpoint = config.url?.startsWith('/api/client/');

        // Check if user is on a customer-facing route
        const isCustomerRoute = window.location.pathname.startsWith('/explore') ||
            window.location.pathname.startsWith('/business') ||
            window.location.pathname.startsWith('/book') ||
            window.location.pathname.startsWith('/my-appointments') ||
            window.location.pathname.startsWith('/customer');

        let token;
        if (isClientEndpoint || isCustomerRoute) {
            // Use customer token for /api/client/* endpoints or when on customer routes
            token = Cookies.get('customer_token');
            // Fallback to auth_token if no customer_token
            if (!token) {
                token = Cookies.get('auth_token');
            }
        } else {
            // Use business owner token for other endpoints
            token = Cookies.get('auth_token');
            // Fallback to customer token if no auth_token
            if (!token) {
                token = Cookies.get('customer_token');
            }
        }

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

        // Check if this is a public/booking endpoint (no auth redirect needed)
        const isPublicEndpoint = originalRequest?.url?.includes('/public') ||
            originalRequest?.url?.includes('/api/client/auth/');

        // Check if we're on a customer route
        const isCustomerRoute = window.location.pathname.startsWith('/explore') ||
            window.location.pathname.startsWith('/business') ||
            window.location.pathname.startsWith('/customer') ||
            window.location.pathname.startsWith('/book') ||
            window.location.pathname.startsWith('/my-appointments');

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // For public endpoints, just reject without redirect
            if (isPublicEndpoint) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                // Use appropriate refresh token based on route
                const refreshToken = isCustomerRoute
                    ? Cookies.get('customer_refresh_token')
                    : Cookies.get('refresh_token');

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Use appropriate refresh endpoint
                // Note: The backend currently uses the same refresh endpoint for both users and clients
                const refreshEndpoint = '/api/Auth/refresh-token';

                const response = await axios.post(`${getBaseURL()}${refreshEndpoint}`, {
                    refreshToken: refreshToken
                });

                const { success, data } = response.data;
                const tokenData = data || response.data;

                if (success || tokenData.accessToken || tokenData.token) {
                    const newAccessToken = tokenData.accessToken || tokenData.token;
                    const newRefreshToken = tokenData.refreshToken;

                    if (isCustomerRoute) {
                        Cookies.set('customer_token', newAccessToken, { expires: 1, secure: true, sameSite: 'Strict' });
                        if (newRefreshToken) {
                            Cookies.set('customer_refresh_token', newRefreshToken, { expires: 7, secure: true, sameSite: 'Strict' });
                        }
                    } else {
                        Cookies.set('auth_token', newAccessToken, { expires: 1, secure: false, sameSite: 'Lax' });
                        if (newRefreshToken) {
                            Cookies.set('refresh_token', newRefreshToken, { expires: 7, secure: false, sameSite: 'Lax' });
                        }
                    }

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }

            } catch (refreshError) {
                console.error("Sesión expirada, cerrando sesión...", refreshError);

                // Clear appropriate cookies based on route
                if (isCustomerRoute) {
                    Cookies.remove('customer_token');
                    Cookies.remove('customer_refresh_token');
                    localStorage.removeItem('customer');
                    window.location.href = '/customer/login';
                } else {
                    Cookies.remove('auth_token');
                    Cookies.remove('refresh_token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;