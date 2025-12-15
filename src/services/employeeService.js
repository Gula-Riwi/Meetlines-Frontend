import api from './api';

export default {
    /**
     * Obtener empleados por Proyecto
     * @param {string} projectId 
     */
    async getByProject(projectId) {
        // Axios permite pasar parámetros query así: /api/Employees?projectId=...
        const response = await api.get('/api/Employees', {
            params: { projectId }
        });
        return response.data;
    },

    /**
     * Crear nuevo empleado
     * @param {object} employeeData 
     */
    async create(employeeData) {
        // employeeData ya debe incluir projectId
        const response = await api.post('/api/Employees', employeeData);
        return response.data;
    },

    /**
     * Actualizar empleado
     * @param {string} id 
     * @param {object} data { name, role, area }
     */
    async update(id, data) {
        const response = await api.put(`/api/Employees/${id}`, data);
        return response.data;
    },

    /**
     * Cambiar estado (Habilitar/Deshabilitar)
     * @param {string} id 
     * @param {boolean} isActive
     */
    async updateStatus(id, isActive) {
        // Enviar el booleano directamente habilitará Content-Type: application/json
        const response = await api.patch(`/api/Employees/${id}/status`, isActive, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },
    /**
     * Obtener conversaciones asignadas al empleado
     * @param {string} projectId 
     * @param {string} employeeId
     * @param {object} filters { page, pageSize, etc }
     */
    async getConversations(projectId, employeeId, filters = {}) {
        const response = await api.get(`/api/projects/${projectId}/conversations`, {
            params: {
                ...filters,
                assignedToEmployeeId: employeeId
            }
        });
        return response.data;
    }
};