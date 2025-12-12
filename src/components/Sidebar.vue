<template>
    <aside
        class="w-64 h-screen bg-gray-900 border-r border-white/10 flex flex-col text-white transition-all duration-300 hidden md:flex z-50 relative">

        <!-- Header / Proyecto Actual -->
        <div class="h-20 flex items-center justify-center border-b border-white/10 px-4">
            <div class="text-center w-full">
                <!-- Nombre del Proyecto Seleccionado -->
                <h3 class="text-4xl font-league italic tracking-wide truncate text-white">
                    {{ currentProject.name || 'Mi Proyecto' }}
                </h3>
                <!-- Subtítulo o link -->
                <a v-if="currentProject.subdomain" :href="`https://${currentProject.subdomain}.meet-lines.com`"
                    target="_blank" rel="noopener noreferrer"
                    class="text-xs text-indigo-400 truncate hover:text-indigo-300 hover:underline transition-colors block mt-1">
                    {{ currentProject.subdomain }}.meet-lines.com
                </a>
            </div>
        </div>

        <!-- INFO USUARIO -->
        <div class="p-6 pb-2 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] mb-3">
                <img :src="user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=random`"
                    class="w-full h-full rounded-full object-cover border-2 border-gray-900" alt="Avatar">
            </div>
            <h4 class="font-bold text-sm truncate w-full">{{ user.name || 'Usuario' }}</h4>
            <p class="text-xs text-gray-400 truncate w-full">{{ user.email }}</p>
        </div>

        <!-- BOTÓN CAMBIAR NEGOCIO (NUEVO) -->
        <div class="px-4 mb-2">
            <button @click="changeProject"
                class="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs font-bold border border-white/5 transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Cambiar Negocio
            </button>
        </div>

        <!-- Menú de Navegación -->
        <nav class="flex-1 overflow-y-auto py-4 px-3">
            <ul class="space-y-2">
                <li>
                    <router-link to="/dashboard" active-class="bg-indigo-600 shadow-lg shadow-indigo-500/20"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
                        <font-awesome-icon :icon="['fas', 'check']" class="text-lg" />
                        <span class="font-medium">Resumen</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/profile" active-class="bg-indigo-600 shadow-lg shadow-indigo-500/20"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
                        <font-awesome-icon :icon="['fas', 'user']" class="text-lg" />
                        <span class="font-medium">Mi Perfil</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/projects/' + currentProject.id + '/channels'"
                        active-class="bg-indigo-600 shadow-lg shadow-indigo-500/20"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
                        <!-- Icono temporal, idealmente usar font-awesome o svg -->
                        <span class="text-lg">📢</span>
                        <span class="font-medium">Mis Canales</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/employees" active-class="bg-indigo-600 shadow-lg shadow-indigo-500/20"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
                        <font-awesome-icon :icon="['fas', 'users']" class="text-lg" />
                        <span class="font-medium">Equipo</span>
                    </router-link>
                </li>
                <li>
                    <!-- Link dinámico a configuración del proyecto actual -->
                    <router-link :to="'/projects/' + currentProject.id + '/config'"
                        active-class="bg-indigo-600 shadow-lg shadow-indigo-500/20"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
                        <font-awesome-icon :icon="['fas', 'cog']" class="text-lg" />
                        <span class="font-medium">Configuración</span>
                    </router-link>
                </li>
            </ul>
        </nav>

        <!-- Footer / Logout -->
        <div class="p-4 border-t border-white/10">
            <button @click="Logout"
                class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                <span class="font-bold text-sm">Cerrar Sesión</span>
            </button>
        </div>
    </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import authService from '@/services/authService';

const router = useRouter();
const user = ref({ name: '', email: '', photo: '' });
const currentProject = ref({}); // Variable para el proyecto

onMounted(() => {
    // 1. Cargar Usuario
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const parsed = JSON.parse(storedUser);
        user.value.name = parsed.name;
        user.value.email = parsed.email;
        user.value.photo = parsed.profilePictureUrl || null;
    }

    // 2. Cargar Proyecto Seleccionado
    const storedProject = localStorage.getItem('currentProject');
    if (storedProject) {
        currentProject.value = JSON.parse(storedProject);
    } else {
        // Si no hay proyecto seleccionado, devolver a la lista
        // (Esto protege si alguien entra directo a /dashboard sin elegir)
        router.push('/projects');
    }
});

// Función para volver a la lista
const changeProject = () => {
    localStorage.removeItem('currentProject'); // Limpiamos selección
    router.push('/projects');
};

const Logout = async () => {
    if (confirm('¿Seguro que deseas salir?')) {
        try {
            const refreshToken = Cookies.get('refresh_token');
            if (refreshToken) await authService.logout(refreshToken);
        } catch (e) { console.error(e); }
        finally {
            Cookies.remove('auth_token');
            Cookies.remove('refresh_token');
            localStorage.clear(); // Borra user y currentProject
            router.push('/login');
        }
    }
}
</script>