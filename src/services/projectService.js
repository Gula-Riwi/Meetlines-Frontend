import api from './api';

export default {
    async getAll() {
        const response = await api.get('/api/projects');
        return response.data;
    },

    async create(projectData) {
        const response = await api.post('/api/projects', projectData);
        return response.data;
    }
};