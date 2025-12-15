import api from './api';

/**
 * Booking Service
 * Handles business discovery, service browsing, and appointment booking for customers.
 */
export default {
    // =====================
    // DISCOVERY (Public)
    // =====================

    /**
     * Get all public businesses (projects)
     * @param {number} [latitude] - Optional latitude for geo-filtering
     * @param {number} [longitude] - Optional longitude for geo-filtering
     */
    async getPublicProjects(latitude, longitude) {
        const params = {};
        if (latitude !== undefined) params.latitude = latitude;
        if (longitude !== undefined) params.longitude = longitude;

        const response = await api.get('/api/Projects/public', { params });
        return response.data;
    },

    /**
     * Get public details of a specific business
     * @param {string} projectId - Project UUID
     */
    async getProjectPublic(projectId) {
        const response = await api.get(`/api/projects/${projectId}/details/public`);
        return response.data;
    },

    /**
     * Get public services offered by a business
     * @param {string} projectId - Project UUID
     */
    async getProjectServices(projectId) {
        const response = await api.get(`/api/projects/${projectId}/services/public`);
        return response.data;
    },

    /**
     * Get public employees of a business
     * @param {string} projectId - Project UUID
     */
    async getProjectEmployees(projectId) {
        const response = await api.get(`/api/Projects/${projectId}/employees/public`);
        return response.data;
    },

    /**
     * Get public contact channels of a business
     * @param {string} projectId - Project UUID
     */
    async getProjectChannels(projectId) {
        const response = await api.get(`/api/projects/${projectId}/channels/public`);
        return response.data;
    },

    // =====================
    // BOOKING
    // =====================

    /**
     * Get available appointment slots
     * @param {string} projectId - Project UUID
     * @param {string} date - Date in YYYY-MM-DD format
     * @param {number} [serviceId] - Optional service ID to filter by duration
     */
    async getAvailableSlots(projectId, date, serviceId) {
        const params = { date };
        if (serviceId !== undefined) params.serviceId = serviceId;

        const response = await api.get(`/api/projects/${projectId}/appointments/available-slots`, { params });
        return response.data;
    },

    /**
     * Book a new appointment
     * @param {string} projectId - Project UUID
     * @param {Object} data - Appointment data
     * @param {number} data.serviceId - Service ID
     * @param {string} [data.employeeId] - Optional employee UUID
     * @param {string} data.startTime - Start time (ISO format)
     * @param {string} data.endTime - End time (ISO format)
     * @param {string} [data.notes] - Optional notes
     */
    async bookAppointment(projectId, data) {
        const response = await api.post(`/api/projects/${projectId}/appointments`, data);
        return response.data;
    },

    // =====================
    // CUSTOMER APPOINTMENTS
    // =====================

    /**
     * Get customer's appointments
     * @param {boolean} [pendingOnly=false] - If true, only return pending appointments
     */
    async getMyAppointments(pendingOnly = false) {
        const response = await api.get('/api/client/appointments', {
            params: { pendingOnly }
        });
        return response.data;
    },

    /**
     * Cancel an appointment
     * @param {number} appointmentId - Appointment ID
     */
    async cancelAppointment(appointmentId) {
        const response = await api.post(`/api/client/appointments/${appointmentId}/cancel`);
        return response.data;
    }
};
