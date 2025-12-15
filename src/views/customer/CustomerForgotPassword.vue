<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-blue-950 relative overflow-hidden font-sans">

        <router-link to="/customer/login"
            class="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6" />
            </svg>
            <span class="font-medium">Volver</span>
        </router-link>

        <div
            class="relative z-10 w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4">
            <div v-if="emailSent" class="text-center py-8">
                <div
                    class="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                    <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">¡Correo Enviado!</h3>
                <p class="text-gray-400 mb-6">Revisa tu bandeja de entrada para restablecer tu contraseña.</p>
                <router-link to="/customer/login" class="text-indigo-400 font-bold hover:text-indigo-300">Ir al
                    Login</router-link>
            </div>

            <!-- Formulario Normal -->
            <div v-else>
                <div class="text-center mb-8">
                    <h2 class="text-4xl md:text-5xl font-bold tracking-normal text-white mb-2">Restablecer contraseña</h2>
                    <p class="text-gray-400 text-sm">Ingresa tu correo para recibir instrucciones</p>
                </div>

                <form @submit.prevent="sendResetLink" class="space-y-5">
                    <div class="space-y-1">
                        <label class="text-sm font-medium text-gray-300 ml-1">Correo Electrónico</label>
                        <input type="email" v-model="email" required placeholder="tu@email.com"
                            class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                    </div>

                    <div v-if="errorMsg"
                        class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                        {{ errorMsg }}
                    </div>

                    <div v-if="successMsg"
                        class="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
                        {{ successMsg }}
                    </div>

                    <div class="pt-4">
                        <ShimmerButton class="w-full font-bold transition-opacity"
                            :class="{ 'opacity-50 cursor-not-allowed': isLoading }" shimmer-size="2px"
                            background="#312e81" shimmerColor="#818cf8" border-radius="12px" @click="sendResetLink"
                            :disabled="isLoading">
                            <span class="text-white tracking-wide flex items-center justify-center gap-2">
                                <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                {{ isLoading ? 'Enviando...' : 'Enviar enlace' }}
                            </span>
                        </ShimmerButton>
                    </div>
                </form>

                <!-- Footer -->
                <div class="mt-6 text-center text-sm text-gray-400">
                    <p>¿Recordaste tu contraseña?
                        <router-link to="/customer/login"
                            class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                            Inicia sesión
                        </router-link>
                    </p>
                </div>
            </div>
        </div>

        <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
            squares-class-name="hover:fill-indigo-500/50"
            :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import ShimmerButton from '@/components/ShimmerButton.vue';
import clientAuthService from '@/services/clientAuthService';

const email = ref('');
const isLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');
const emailSent = ref(false);

const sendResetLink = async () => {
    if (!email.value) return;
    errorMsg.value = '';
    successMsg.value = '';

    try {
        isLoading.value = true;
        await clientAuthService.forgotPassword(email.value);
        emailSent.value = true;
    } catch (error) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
            errorMsg.value = error.response.data.message;
        } else {
            errorMsg.value = "Error al enviar el correo. Intenta de nuevo.";
        }
    } finally {
        isLoading.value = false;
    }
};
</script>
