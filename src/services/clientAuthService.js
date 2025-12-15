import api from './api';

/**
 * Client Authentication Service
 * Handles customer (end-user) authentication separate from business owner auth.
 * Uses /api/client/auth/* endpoints.
 */
export default {
    /**
     * Register a new customer
     * @param {Object} data - Registration data
     * @param {string} data.email - Customer email
     * @param {string} data.password - Customer password
     * @param {string} data.name - Customer name
     * @param {string} [data.phone] - Customer phone (optional)
     */
    async register(data) {
        const response = await api.post('/api/client/auth/register', data);
        return response.data;
    },

    /**
     * Login a customer
     * @param {Object} credentials - Login credentials
     * @param {string} credentials.email - Customer email
     * @param {string} credentials.password - Customer password
     */
    async login(credentials) {
        const response = await api.post('/api/client/auth/login', credentials);
        return response.data;
    },

    /**
     * Request password reset for customer
     * @param {string} email - Customer email
     */
    async forgotPassword(email) {
        const response = await api.post('/api/client/auth/forgot-password', { email });
        return response.data;
    },

    /**
     * Reset customer password
     * @param {Object} data - Reset data
     * @param {string} data.token - Reset token from email
     * @param {string} data.newPassword - New password
     */
    async resetPassword(data) {
        const response = await api.post('/api/client/auth/reset-password', data);
        return response.data;
    },

    /**
     * Get current customer profile
     * Requires authentication token
     */
    async getMe() {
        const response = await api.get('/api/client/auth/me');
        return response.data;
    }
};
