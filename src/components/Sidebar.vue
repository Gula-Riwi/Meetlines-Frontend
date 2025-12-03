<template>
    <aside
        class="w-64 h-screen bg-gray-900 border-r border-white/10 flex-col text-white transition-all duration-300 hidden md:flex">

        <!-- Header / Logo -->
        <div class="h-20 flex items-center justify-center border-b border-white/10">
            <h3 class="text-2xl font-league tracking-wider flex items-center gap-2">
                Panel Administrativo
            </h3>
        </div>

        <!-- Menú de Navegación -->
        <nav class="flex-1 overflow-y-auto py-6 px-3">
            <ul class="space-y-2">

                <!-- Item: Resumen (Activo por defecto visualmente) -->
                <li>
                    <a href="#"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition-all">
                        <span class="text-lg">📊</span>
                        <span class="font-medium">Resumen</span>
                    </a>
                </li>

                <!-- Item: Chatbots -->
                <li>
                    <a href="#"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <span class="text-lg">💬</span>
                        <span class="font-medium">Mis Chatbots</span>
                    </a>
                </li>

                <!-- Item: Pedidos -->
                <li>
                    <a href="#"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <span class="text-lg">📦</span>
                        <span class="font-medium">Pedidos</span>
                    </a>
                </li>

                <!-- Item: Configuración -->
                <li>
                    <a href="#"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <span class="text-lg">⚙️</span>
                        <span class="font-medium">Configuración</span>
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
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const router = useRouter();

const Logout = () => {
    if (confirm('¿Seguro que deseas salir?')) {
        Cookies.remove('auth_token');
        localStorage.removeItem('user');
        router.push('/login');
    }
}
</script>