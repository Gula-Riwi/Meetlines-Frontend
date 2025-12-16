import api from './api';

const aiInsightsService = {
    async getProjectInsights(projectId, period = 'month') {
        try {
            const response = await api.get(`/api/projects/${projectId}/ai-insights`, { params: { period } });
            return response.data;
        } catch (error) {
            console.error('Error fetching AI insights:', error);
            throw error;
        }
    },

    async getReactivationCandidates(projectId) {
        try {
            const response = await api.get(`/api/dashboard/${projectId}/reactivation-candidates`);
            return response.data;
        } catch (error) {
            console.error('Error fetching reactivation candidates:', error);
            throw error;
        }
    },

    async sendSmartAlertsReport(projectId) {
        try {
            const response = await api.post(`/api/ai-insights/${projectId}/send-report`);
            return response.data;
        } catch (error) {
            console.error('Error sending smart report:', error);
            throw error;
        }
    }
};

export default aiInsightsService;
