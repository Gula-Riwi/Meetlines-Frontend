<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-blue-950 relative overflow-hidden font-sans">
        <div
            class="relative z-10 w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4 text-center">

            <!-- 1. ESTADO: CARGANDO -->
            <div v-if="status === 'loading'" class="flex flex-col items-center">
                <div class="mb-6 relative">
                    <div class="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin">
                    </div>
                </div>
                <h2 class="text-2xl font-bold text-white mb-2">Verificando tu cuenta...</h2>
                <p class="text-gray-400">Por favor espera un momento.</p>
            </div>

            <!-- 2. ESTADO: ÉXITO -->
            <div v-else-if="status === 'success'" class="flex flex-col items-center animate-fade-in-up">
                <div
                    class="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                    <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 class="text-3xl font-bold font-league text-white mb-2">¡Correo Verificado!</h2>
                <p class="text-gray-300 mb-6">Tu cuenta ha sido activada correctamente.</p>
                <p class="text-sm text-indigo-400 animate-pulse">Redirigiendo al login...</p>
            </div>

            <!-- 3. ESTADO: ERROR -->
            <div v-else-if="status === 'error'" class="flex flex-col items-center">
                <div
                    class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                    <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-white mb-2">Enlace no válido</h2>
                <p class="text-gray-400 mb-6">{{ errorMessage }}</p>

                <router-link to="/login"
                    class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors">
                    Ir al Iniciar Sesión
                </router-link>
            </div>

        </div>

        <!-- Fondo -->
        <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
            squares-class-name="hover:fill-indigo-500/50"
            :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import authService from '@/services/authService';

const route = useRoute();
const router = useRouter();

// Estados: 'loading', 'success', 'error'
const status = ref('loading');
const errorMessage = ref('El token ha expirado o es inválido.');

onMounted(async () => {
    // 1. Obtener token de la URL (ej: ?token=xyz)
    const token = route.query.token;

    if (!token) {
        status.value = 'error';
        errorMessage.value = "No se encontró el token de verificación.";
        return;
    }

    try {
        // 2. Llamar al Backend
        await authService.verifyEmail(token);

        // 3. Éxito
        status.value = 'success';

        // Esperar 3 segundos para que el usuario lea el mensaje y redirigir
        setTimeout(() => {
            router.push('/login');
        }, 3000);

    } catch (error) {
        console.error(error);
        status.value = 'error';

        // Si el backend manda un mensaje específico
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message;
        }
    }
});
</script>

<style scoped>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out;
}
</style>