<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">
        <Sidebar />

        <main class="flex-1 flex flex-col overflow-hidden relative bg-blue-950">
            <!-- Header -->
            <header
                class="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-gray-950/50 backdrop-blur-sm z-10">
                <div>
                    <h2 class="text-2xl font-bold">Bienvenido, {{ employeeName }} 👋</h2>
                    <p class="text-sm text-gray-400">Panel de Empleado - {{ projectName }}</p>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right hidden md:block">
                        <p class="text-sm font-bold text-white">{{ employeeName }}</p>
                        <p class="text-sm text-indigo-400">{{ employeeRole }}</p>
                    </div>
                    <div
                        class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white/20 flex items-center justify-center font-bold text-lg">
                        {{ employeeInitials }}
                    </div>
                </div>
            </header>

            <div class="flex-1 overflow-y-auto p-8 z-10 scrollbar-hide">
                <!-- Welcome Section -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <!-- Card 1: Chats -->
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold">Mis Chats</h3>
                        </div>
                        <p class="text-gray-400 text-sm">Gestiona tus conversaciones asignadas y atiende a los clientes.</p>
                    </div>

                    <!-- Card 2: Citas -->
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold">Mis Citas</h3>
                        </div>
                        <p class="text-gray-400 text-sm">Revisa tu agenda y las próximas citas programadas.</p>
                    </div>
                    
                     <!-- Card 3: Perfil -->
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="p-3 rounded-xl bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold">Mi Perfil</h3>
                        </div>
                        <p class="text-gray-400 text-sm">Actualiza tu información personal y contraseña.</p>
                    </div>
                </div>

                <div class="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 text-center">
                    <h3 class="text-lg font-bold text-indigo-300 mb-2">🚀 Estamos preparando más herramientas para ti</h3>
                    <p class="text-gray-400">Pronto verás aquí métricas de desempeño y más utilidades.</p>
                </div>

            </div>
            
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import { getCurrentUser, getCurrentProject } from '@/services/authService'; // Asumiendo que existen o usando localStorage directo

const employeeName = ref('');
const employeeRole = ref('');
const projectName = ref('');

const employeeInitials = computed(() => {
    if (!employeeName.value) return 'E';
    return employeeName.value.substring(0, 2).toUpperCase();
});

onMounted(() => {
    // Cargar datos del usuario desde localStorage (guardados en login)
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            employeeName.value = user.name || 'Empleado';
            // El rol a veces viene en el JWT o respuesta login, asumimos algo simple si no está
            employeeRole.value = 'Colaborador'; 
        }

        // Cargar proyecto actual (si existe contexto) o detectar por subdominio si fuera necesario
        // En Employee Dashboard, el contexto del proyecto es implícito al subdominio
        const sub = window.location.hostname.split('.')[0];
        projectName.value = sub.charAt(0).toUpperCase() + sub.slice(1);
        
    } catch (e) {
        console.error('Error cargando datos de empleado', e);
    }
});
</script>
