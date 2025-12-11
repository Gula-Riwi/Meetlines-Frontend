import api from './api';

export default {
    async register(userData) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const payload = {
            ...userData,
            timezone: timezone
        };

        const response = await api.post('/api/auth/register', payload, {
            headers: {
                'Timezone': timezone,
            },
        });
        return response.data;
    },

    async login(credentials) {
        const response = await api.post('/api/auth/login', credentials);
        return response.data;
    },

    async verifyEmail(token) {
        const response = await api.post('/api/auth/verify-email', { token });
        return response.data;
    },

    async forgotPassword(email) {
        const response = await api.post('/api/auth/forgot-password', { email });
        return response.data;
    },

    async resetPassword(data) {
        const response = await api.post('/api/auth/reset-password', data);
        return response.data;
    },

    async logout(refreshToken) {
        const response = await api.post('/api/auth/logout', { refreshToken });
        return response.data;
    },

    async resendVerificationEmail(email) {
        const response = await api.post('/api/auth/resend-verification-email', { email });
        return response.data;
    },

    async refreshToken(currentRefreshToken) {
        const response = await api.post('/api/auth/refresh-token', { refreshToken: currentRefreshToken });
        return response.data;
    },

    async oauthLogin(oauthData) {
        const response = await api.post('/api/auth/oauth-login', oauthData);
        return response.data;
    },

    async employeeLogin(credentials) {
        const response = await api.post('/api/auth/employee-login', credentials);
        return response.data;
    },

    async employeeForgotPassword(email) {
        const response = await api.post('/api/Auth/employee-forgot-password', { email });
        return response.data;
    },

    async employeeResetPassword(data) {
        const response = await api.post('/api/Auth/employee-reset-password', data);
        return response.data;
    },

    async employeeChangePassword(data) {
        const response = await api.put('/api/Auth/employee-change-password', data);
        return response.data;
    },

    async getProfile() {
        const response = await api.get('/api/profile');
        return response.data;
    },

    async updateProfile(data) {
        const response = await api.put('/api/profile', data);
        return response.data;
    },

    async changePassword(data) {
        const response = await api.put('/api/profile/change-password', data);
        return response.data;
    },

    async discordOAuthExchange(data) {
        const response = await api.post('/api/auth/oauth/discord', data);
        return response.data;
    },

    async facebookOAuthExchange(data) {
        const response = await api.post('/api/auth/oauth/facebook', data);
        return response.data;
    }
};