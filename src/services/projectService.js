import api from './api';

export default {
    async getAll() {
        const response = await api.get('/Projects');
        return response.data;
    },

    async create(projectData) {
        const response = await api.post('/Projects', projectData);
        return response.data;
    }
};