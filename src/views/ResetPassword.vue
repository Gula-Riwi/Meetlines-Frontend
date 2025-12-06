<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-blue-950 relative overflow-hidden font-sans">

        <div
            class="relative z-10 w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4">

            <div class="text-center mb-8">
                <h2 class="text-6xl md:text-7xl font-bold font-league text-white mb-2">Cambiar Contraseña</h2>
                <p class="text-gray-400 text-sm">Ingresa tu nueva contraseña segura</p>
            </div>

            <form @submit.prevent="resetPassword" class="space-y-5">

                <!-- Nueva Contraseña -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Nueva Contraseña</label>
                    <input type="password" v-model="newPassword" required placeholder="••••••••"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Confirmar Contraseña -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Confirmar Contraseña</label>
                    <input type="password" v-model="confirmPassword" required placeholder="••••••••"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <div v-if="errorMsg"
                    class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                    {{ errorMsg }}
                </div>

                <div class="pt-4">
                    <ShimmerButton class="w-full font-bold transition-opacity"
                        :class="{ 'opacity-50 cursor-not-allowed': isLoading }" shimmer-size="2px" background="#312e81"
                        shimmerColor="#818cf8" border-radius="12px" @click="resetPassword" :disabled="isLoading">
                        <span class="text-white tracking-wide flex items-center justify-center gap-2">
                            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ isLoading ? 'Cambiando...' : 'Cambiar Contraseña' }}
                        </span>
                    </ShimmerButton>
                </div>
            </form>
        </div>

        <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
            squares-class-name="hover:fill-indigo-500/50"
            :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import ShimmerButton from '@/components/ShimmerButton.vue';
import authService from '@/services/authService';

const route = useRoute();
const router = useRouter();

const token = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const errorMsg = ref('');

onMounted(() => {
    // 1. Extraer el token de la URL (ej: /reset-password?token=XYZ)
    token.value = route.query.token || '';

    if (!token.value) {
        errorMsg.value = "Token inválido o faltante.";
        // Opcional: redirigir a login si no hay token
    }
});

const resetPassword = async () => {
    errorMsg.value = '';

    if (!newPassword.value || !confirmPassword.value) {
        errorMsg.value = "Completa los campos";
        return;
    }
    if (newPassword.value !== confirmPassword.value) {
        errorMsg.value = "Las contraseñas no coinciden";
        return;
    }
    if (!token.value) {
        errorMsg.value = "Error: No hay token de verificación.";
        return;
    }

    try {
        isLoading.value = true;

        // 2. Enviar al Backend
        await authService.resetPassword({
            token: token.value,
            newPassword: newPassword.value,
            confirmPassword: confirmPassword.value
        });

        alert("¡Contraseña cambiada con éxito!");
        router.push('/login');

    } catch (error) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
            errorMsg.value = error.response.data.message;
        } else {
            errorMsg.value = "El token ha expirado o hubo un error.";
        }
    } finally {
        isLoading.value = false;
    }
};
</script>