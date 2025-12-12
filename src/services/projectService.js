import api from './api';

export default {
    // Proyectos del usuario autenticado
    async getAll() {
        const response = await api.get('/api/projects');
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/api/projects/${id}`);
        return response.data;
    },

    async create(projectData) {
        const response = await api.post('/api/projects', projectData);
        return response.data;
    },

    async update(id, projectData) {
        const response = await api.put(`/api/projects/${id}`, projectData);
        return response.data;
    },

    async delete(id) {
        await api.delete(`/api/projects/${id}`);
    },

    // Integraciones
    async configureWhatsapp(id, configData) {
        const response = await api.patch(`/api/projects/${id}/whatsapp`, configData);
        return response.data;
    },

    // Si en el futuro se implementa el endpoint de Telegram en ProjectsController:
    // async configureTelegram(id, configData) {
    //     const response = await api.patch(`/api/projects/${id}/telegram`, configData);
    //     return response.data;
    // },

    // Endpoints públicos
    async getPublicProjects(latitude, longitude) {
        let url = '/api/projects/public';
        if (latitude && longitude) {
            url += `?latitude=${latitude}&longitude=${longitude}`;
        }
        const response = await api.get(url);
        return response.data;
    },

    async getPublicProjectDetails(id) {
        const response = await api.get(`/api/projects/${id}/details/public`);
        return response.data;
    },

    async getPublicProjectEmployees(id) {
        const response = await api.get(`/api/projects/${id}/employees/public`);
        return response.data;
    }
};