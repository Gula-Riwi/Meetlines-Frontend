import api from './api';

export default {
    async register(userData) {
        // Esto hará un POST a: http://localhost:3000/api/auth/register
        // Ajusta '/auth/register' según la ruta que te de tu equipo de Backend
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    async login(credentials) {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    }
};