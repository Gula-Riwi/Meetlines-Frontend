<template>
    <!-- 1. SIDEBAR DESKTOP (Visible solo en md en adelante) -->
    <aside class="w-64 h-screen bg-gray-900 border-r border-white/10 flex-col text-white transition-all duration-300 hidden md:flex z-50 relative">

        <!-- Header / Proyecto Actual -->
        <div class="h-20 flex items-center justify-center border-b border-white/10 px-4">
            <div class="text-center w-full">
                <h3 class="text-2xl font-bold font-league italic tracking-wide truncate text-white">
                    {{ currentProject.name || 'Mi Proyecto' }}
                </h3>
                <a v-if="currentProject.subdomain" :href="`https://${currentProject.subdomain}.meet-lines.com`"
                    target="_blank" rel="noopener noreferrer"
                    class="text-xs text-indigo-400 truncate hover:text-indigo-300 hover:underline transition-colors block mt-1">
                    {{ currentProject.subdomain }}.meet-lines.com ↗
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

        <!-- BOTÓN CAMBIAR NEGOCIO -->
        <div class="px-4 mb-2">
            <button @click="changeProject"
                class="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs font-bold border border-white/5 transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Cambiar Negocio
            </button>
        </div>

        <!-- Menú Desktop -->
        <nav class="flex-1 overflow-y-auto py-4 px-3">
            <ul class="space-y-2">
                <li v-for="item in menuItems" :key="item.label">
                    <router-link :to="item.to" active-class="bg-indigo-600 shadow-lg shadow-indigo-500/20 text-white"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <font-awesome-icon :icon="item.icon" class="text-lg w-6" />
                        <span class="font-medium">{{ item.label }}</span>
                    </router-link>
                </li>
            </ul>
        </nav>

        <!-- Footer / Logout -->
        <div class="p-4 border-t border-white/10">
            <button @click="Logout"
                class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200">
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                <span class="font-bold text-sm">Cerrar Sesión</span>
            </button>
        </div>
    </aside>

    <!-- 2. NAVBAR MÓVIL INFERIOR (Visible solo en pantallas pequeñas) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-white/10 z-50 pb-safe">
        <ul class="flex justify-around items-center h-16 px-2">
            <!-- Iteramos los mismos items pero con diseño vertical -->
            <li v-for="item in menuItems" :key="item.label" class="flex-1">
                <router-link :to="item.to" active-class="text-indigo-400" 
                    class="flex flex-col items-center justify-center h-full text-gray-500 hover:text-gray-300 transition-colors py-2">
                    <font-awesome-icon :icon="item.icon" class="text-xl mb-1" />
                    <span class="text-[10px] font-medium">{{ item.shortLabel || item.label }}</span>
                </router-link>
            </li>
            
            <!-- Botón Menú Extra (Para Logout y Cambiar Proyecto en móvil) -->
            <li class="flex-1">
                <button @click="showMobileMenu = !showMobileMenu" :class="{'text-indigo-400': showMobileMenu}"
                    class="flex flex-col items-center justify-center h-full w-full text-gray-500 hover:text-gray-300">
                    <font-awesome-icon :icon="['fas', 'bars']" class="text-xl mb-1" />
                    <span class="text-[10px] font-medium">Más</span>
                </button>
            </li>
        </ul>
    </nav>

    <!-- 3. MENÚ FLOTANTE MÓVIL (Al presionar "Más") -->
    <div v-if="showMobileMenu" class="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" @click="showMobileMenu = false">
        <div class="absolute bottom-20 right-4 left-4 bg-gray-800 rounded-2xl p-4 border border-white/10 space-y-3" @click.stop>
            
            <!-- Info Usuario Móvil -->
            <div class="flex items-center gap-3 pb-3 border-b border-white/10">
                <img :src="user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=random`" class="w-10 h-10 rounded-full">
                <div class="overflow-hidden">
                    <p class="font-bold text-white truncate">{{ user.name }}</p>
                    <p class="text-xs text-gray-400 truncate">{{ user.email }}</p>
                </div>
            </div>

            <!-- Acciones Extra -->
            <button @click="changeProject" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white">
                <font-awesome-icon :icon="['fas', 'exchange-alt']" />
                Cambiar Negocio
            </button>
            
            <button @click="Logout" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400">
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                Cerrar Sesión
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import authService from '@/services/authService';

const router = useRouter();
const user = ref({ name: '', email: '', photo: '' });
const currentProject = ref({});
const showMobileMenu = ref(false);

// Definimos los items del menú en un array para reutilizarlos en Desktop y Móvil
const menuItems = computed(() => [
    { 
        label: 'Resumen', 
        to: '/dashboard', 
        icon: ['fas', 'chart-simple'] 
    },
    { 
        label: 'Perfil', 
        to: '/profile', 
        icon: ['fas', 'user'] 
    },
    { 
        label: 'Canales', 
        shortLabel: 'Canales',
        to: `/projects/${currentProject.value.id}/channels`, 
        icon: ['fas', 'tower-broadcast'] 
    },
    { 
        label: 'Equipo', 
        to: '/employees', 
        icon: ['fas', 'users'] 
    },
    { 
        label: 'Configuración', 
        shortLabel: 'Config',
        to: `/projects/${currentProject.value.id}/config`, 
        icon: ['fas', 'cog'] 
    }
]);

onMounted(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const parsed = JSON.parse(storedUser);
        user.value = { ...parsed, photo: parsed.profilePictureUrl || null };
    }

    const storedProject = localStorage.getItem('currentProject');
    if (storedProject) {
        currentProject.value = JSON.parse(storedProject);
    } else {
        router.push('/projects');
    }
});

const changeProject = () => {
    localStorage.removeItem('currentProject');
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
            localStorage.clear();
            router.push('/login');
        }
    }
}
</script>

<style scoped>
/* Ajuste para iPhones con notch/barra inferior */
.pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
}
</style>