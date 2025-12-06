import api from './api';

export default {
    async register(userData) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const payload = {
            ...userData,
            timezone: timezone
        };

        const response = await api.post('/Auth/register', payload, {
            headers: {
                'Timezone': timezone,
            },
        });
        return response.data;
    },

    async login(credentials) {
        const response = await api.post('/Auth/login', credentials);
        return response.data;
    },

    async verifyEmail(token) {
        const response = await api.post('/Auth/verify-email', { token });
        return response.data;
    },

    async forgotPassword(email) {
        const response = await api.post('/Auth/forgot-password', { email });
        return response.data;
    },

    async resetPassword(data) {
        const response = await api.post('/Auth/reset-password', data);
        return response.data;
    },

    async logout(refreshToken) {
        const response = await api.post('/Auth/logout', { refreshToken });
        return response.data;
    },

    async resendVerificationEmail(email) {
        const response = await api.post('/Auth/resend-verification-email', { email });
        return response.data;
    },

    async refreshToken(currentRefreshToken) {
        const response = await api.post('/Auth/refresh-token', { refreshToken: currentRefreshToken });
        return response.data;
    },

    async oauthLogin(oauthData) {
        const response = await api.post('/Auth/oauth-login', oauthData);
        return response.data;
    },

    async getProfile() {
        const response = await api.get('/Profile');
        return response.data;
    },

    async updateProfile(data) {
        const response = await api.put('/Profile', data);
        return response.data;
    },

    async changePassword(data) {
        const response = await api.put('/Profile/change-password', data);
        return response.data;
    }
};