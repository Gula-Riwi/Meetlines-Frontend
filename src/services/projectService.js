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
        const config = {};
        if (projectData instanceof FormData) {
            config.headers = { 'Content-Type': 'multipart/form-data' };
        }
        const response = await api.post('/api/projects', projectData, config);
        return response.data;
    },

    async update(id, projectData) {
        const config = {};
        if (projectData instanceof FormData) {
            config.headers = { 'Content-Type': 'multipart/form-data' };
        }
        const response = await api.put(`/api/projects/${id}`, projectData, config);
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
    async configureTelegram(id, configData) {
        const response = await api.patch(`/api/projects/${id}/telegram`, configData);
        return response.data;
    },

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
    },

    // Configuración Adicional
    async uploadPhoto(id, file) {
        const formData = new FormData();
        formData.append('File', file);
        const response = await api.post(`/api/projects/${id}/photos`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    async getPhotos(id) {
        const response = await api.get(`/api/projects/${id}/photos`);
        return response.data;
    },

    async deletePhoto(projectId, photoId) {
        await api.delete(`/api/projects/${projectId}/photos/${photoId}`);
    },

    // Services Management
    async getProjectServices(projectId) {
        const response = await api.get(`/api/management/projects/${projectId}/services`);
        return response.data;
    },

    async createService(projectId, serviceData) {
        const response = await api.post(`/api/projects/${projectId}/services`, serviceData);
        return response.data;
    },

    async getServiceById(serviceId) {
        const response = await api.get(`/api/services/${serviceId}`);
        return response.data;
    },

    async updateService(serviceId, serviceData) {
        const response = await api.put(`/api/services/${serviceId}`, serviceData);
        return response.data;
    },

    async deleteService(serviceId) {
        await api.delete(`/api/services/${serviceId}`);
    }
};