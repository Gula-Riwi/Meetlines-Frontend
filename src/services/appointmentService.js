import api from './api';

const appointmentService = {
    getAll: async (projectId) => {
        return await api.get(`/api/projects/${projectId}/appointments`);
    },
    updateStatus: async (projectId, appointmentId, status) => {
        return await api.patch(`/api/projects/${projectId}/appointments/${appointmentId}/status`, { status });
    }
};

export default appointmentService;
