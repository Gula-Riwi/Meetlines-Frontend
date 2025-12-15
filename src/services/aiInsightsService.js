import api from './api';

export default {
    async getProjectInsights(projectId) {
        try {
            const response = await api.get(`/api/projects/${projectId}/ai-insights`);
            return response.data;
        } catch (error) {
            console.error('Error fetching AI insights:', error);
            throw error;
        }
    }
};
