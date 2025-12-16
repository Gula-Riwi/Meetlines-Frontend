import api from './api';

export default {
    async getStats(projectId) {
        try {
            const response = await api.get(`/api/projects/${projectId}/dashboard/stats`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    },

    async getTasks(projectId, params = {}) {
        try {
            const response = await api.get(`/api/projects/${projectId}/dashboard/tasks`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard tasks:', error);
            throw error;
        }
    }
};
