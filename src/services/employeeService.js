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
    }
};