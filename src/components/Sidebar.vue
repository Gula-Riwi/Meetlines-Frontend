<template>
    <aside
        class="w-64 h-screen bg-gray-900 border-r border-white/10 flex-col text-white transition-all duration-300 hidden md:flex z-50 relative">
        <!-- Header / Logo -->
        <div class="h-20 flex items-center justify-center border-b border-white/10">
            <router-link to="/dashboard"
                class="text-5xl font-league tracking-wider flex items-center gap-2 hover:text-indigo-400 transition-colors">
                Panel Admin
            </router-link>
        </div>

        <!-- INFO USUARIO (Nuevo) -->
        <div class="p-6 pb-2 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] mb-3">
                <!-- Mostramos la foto real o un placeholder -->
                <img :src="user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=random`"
                    class="w-full h-full rounded-full object-cover border-2 border-gray-900" alt="Avatar">
            </div>
            <h4 class="font-bold text-sm truncate w-full">{{ user.name || 'Usuario' }}</h4>
            <p class="text-xs text-gray-400 truncate w-full">{{ user.email }}</p>
        </div>

        <!-- Menú de Navegación -->
        <nav class="flex-1 overflow-y-auto py-6 px-3">
            <ul class="space-y-2">
                <!-- Dashboard -->
                <li>
                    <router-link to="/dashboard" active-class="bg-indigo-600 shadow-lg shadow-indigo-500/20"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
                        <span class="text-lg">📊</span>
                        <span class="font-medium">Resumen</span>
                    </router-link>
                </li>

                <!-- NUEVO: Perfil -->
                <li>
                    <router-link to="/profile" active-class="bg-indigo-600 shadow-lg shadow-indigo-500/20"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
                        <span class="text-lg"><font-awesome-icon :icon="['fas', 'user']"
                                        class="relative z-10 text-gray-300 text-2xl" /></span>
                        <span class="font-medium">Mi Perfil</span>
                    </router-link>
                </li>

                <!-- Otros items (Desactivados visualmente por ahora si no tienen ruta) -->
                <li>
                    <a href="#"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <span class="text-lg">💬</span>
                        <span class="font-medium">Chatbots</span>
                    </a>
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

onMounted(() => {
    // Cargar datos básicos del localStorage para mostrar rápido
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const parsed = JSON.parse(storedUser);
        user.value.name = parsed.name;
        user.value.email = parsed.email;
        // Si tienes la foto en localStorage úsala, si no, null
        user.value.photo = parsed.profilePictureUrl || null;
    }
});

const Logout = async () => {
    if (confirm('¿Seguro que deseas salir?')) {
        try {
            const refreshToken = Cookies.get('refresh_token');
            if (refreshToken) await authService.logout(refreshToken);
        } catch (e) { console.error(e); }
        finally {
            Cookies.remove('auth_token');
            Cookies.remove('refresh_token');
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
}
</script>