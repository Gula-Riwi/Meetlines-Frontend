import api from './api';

export default {
    /**
     * Get bot configuration for a project (authenticated user endpoint)
     * @param {string} projectId - Project UUID
     * @returns {Promise} Bot configuration or null if not found
     */
    async getByProjectId(projectId) {
        try {
            const response = await api.get(`/api/projects/${projectId}/bot-config/my-config`);
            
            // 204 No Content means config not exists yet
            if (response.status === 204) return null;
            
            return response.data;
        } catch (error) {
            // 404 means config doesn't exist yet
            // 401 means user doesn't have permission
            if (error.response?.status === 404 || error.response?.status === 401) {
                return null; // Config doesn't exist yet or not accessible
            }
            throw error;
        }
    },

    /**
     * Create bot configuration with industry defaults
     * @param {string} projectId - Project UUID
     * @param {object} data - Configuration data
     * @returns {Promise} Created bot configuration
     */
    async create(projectId, data) {
        const payload = {
            projectId,
            ...data
        };
        const response = await api.post(`/api/projects/${projectId}/bot-config`, payload);
        return response.data;
    },

    /**
     * Update bot configuration
     * @param {string} projectId - Project UUID
     * @param {object} data - Updated configuration data
     * @returns {Promise} Updated bot configuration
     */
    async update(projectId, data) {
        const response = await api.put(`/api/projects/${projectId}/bot-config`, data);
        return response.data;
    },

    /**
     * Delete bot configuration
     * @param {string} projectId - Project UUID
     * @returns {Promise}
     */
    async delete(projectId) {
        const response = await api.delete(`/api/projects/${projectId}/bot-config`);
        return response.data;
    },

    /**
     * Get industry default configuration
     * @param {string} projectId - Project UUID
     * @param {string} industry - Industry name
     * @returns {Promise} Default configuration for industry
     */
    async getIndustryDefaults(projectId, industry) {
        const response = await api.get(`/api/projects/${projectId}/bot-config/defaults/${industry}`);
        return response.data;
    }
};
