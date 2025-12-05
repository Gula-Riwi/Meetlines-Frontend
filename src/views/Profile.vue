<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">

        <Sidebar />

        <main class="flex-1 flex flex-col overflow-hidden relative bg-blue-950">

            <!-- Header -->
            <header
                class="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-gray-950/50 backdrop-blur-sm z-10">
                <h2 class="text-4xl font-league italic tracking-wide font-bold">Mi Perfil</h2>
            </header>

            <div class="flex-1 overflow-y-auto p-8 z-10">

                <!-- CARD DE PERFIL -->
                <div
                    class="max-w-4xl mx-auto bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">

                    <!-- Fondo de portada decorativo -->
                    <div class="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

                    <div class="px-8 pb-8">

                        <!-- Avatar Flotante -->
                        <div class="relative -mt-16 mb-6 flex justify-between items-end">
                            <div class="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800">
                                <img :src="profile.profilePictureUrl || `https://ui-avatars.com/api/?name=${profile.name}&background=random`"
                                    class="w-full h-full object-cover" alt="Profile">
                            </div>

                            <!-- Badge de Verificado -->
                            <div v-if="profile.isEmailVerified"
                                class="mb-4 px-4 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-sm font-bold flex items-center gap-2">
                                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Cuenta Verificada
                            </div>
                        </div>

                        <!-- Información -->
                        <div class="space-y-6">

                            <div>
                                <h1 class="text-3xl font-bold text-white mb-1">{{ profile.name }}</h1>
                                <p class="text-gray-400">{{ profile.email }}</p>
                            </div>

                            <!-- Grid de Datos -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">

                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Teléfono</label>
                                    <p class="text-lg text-gray-200">{{ profile.phone || 'No registrado' }}</p>
                                </div>

                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Zona Horaria</label>
                                    <p class="text-lg text-gray-200">{{ profile.timezone || 'UTC' }}</p>
                                </div>

                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Método de Registro</label>
                                    <p class="text-lg text-gray-200 flex items-center gap-2">
                                        <span v-if="profile.authProvider === 0">Google / OAuth</span>
                                        <span v-else>Correo y Contraseña</span>
                                    </p>
                                </div>

                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Miembro Desde</label>
                                    <p class="text-lg text-gray-200">{{ formatDate(profile.createdAt) }}</p>
                                </div>

                            </div>

                        </div>
                    </div>

                    <!-- Botón de Editar (Futura funcionalidad) -->
                    <div class=" p-4 flex justify-end ">
                        <button
                            class="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors">
                            Editar Perfil
                        </button>
                    </div>

                </div>
            </div>

            <!-- Fondo Animado -->
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import authService from '@/services/authService';

const profile = ref({});

onMounted(async () => {
    try {
        const response = await authService.getProfile();
        if (response.success) {
            profile.value = response.data;
        }
    } catch (error) {
        console.error("Error cargando perfil:", error);
    }
});

const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
};
</script>