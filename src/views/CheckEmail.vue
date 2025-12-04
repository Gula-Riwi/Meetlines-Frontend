<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-blue-950 relative overflow-hidden font-sans">

        <div
            class="relative z-10 w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4 text-center">

            <div
                class="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
                <svg class="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                    </path>
                </svg>
            </div>

            <h2 class="text-6xl md:text-7xlfont-bold font-league text-white mb-2">Verifica tu correo</h2>

            <p class="text-gray-300 mb-6 text-sm leading-relaxed">
                Hemos enviado un enlace de confirmación a:
                <br>
                <span class="text-white font-bold text-base">{{ email }}</span>
            </p>

            <p class="text-gray-400 text-xs mb-8">
                Por favor revisa tu bandeja de entrada (y spam) y haz clic en el enlace para activar tu cuenta.
            </p>

            <div class="space-y-4">
                <ShimmerButton class="w-full font-bold transition-all"
                    :class="{ 'opacity-50 cursor-not-allowed': isLoading || countdown > 0 }" shimmer-size="2px"
                    background="#312e81" shimmerColor="#818cf8" border-radius="12px" @click="resendEmail"
                    :disabled="isLoading || countdown > 0">
                    <span class="text-white tracking-wide flex items-center justify-center gap-2">
                        <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>

                        <span v-if="isLoading">Enviando...</span>
                        <span v-else-if="countdown > 0">Reenviar en {{ countdown }}s</span>
                        <span v-else>Reenviar correo</span>
                    </span>
                </ShimmerButton>
                <div v-if="message" :class="msgType === 'success' ? 'text-green-400' : 'text-red-400'"
                    class="text-sm font-medium animate-pulse">
                    {{ message }}
                </div>

                <div class="pt-4 border-t border-white/10">
                    <router-link to="/login"
                        class="text-indigo-400 hover:text-indigo-300 text-sm font-bold transition-colors">
                        ← Volver al Iniciar Sesión
                    </router-link>
                </div>
            </div>

        </div>

        <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
            squares-class-name="hover:fill-indigo-500/50"
            :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import ShimmerButton from '@/components/ShimmerButton.vue';
import authService from '@/services/authService';

const route = useRoute();
const email = ref('');
const isLoading = ref(false);
const message = ref('');
const msgType = ref(''); 
const countdown = ref(0);

onMounted(() => {
    email.value = route.query.email || 'tu correo';
});

const startCountdown = () => {
    countdown.value = 60; 
    const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) clearInterval(timer);
    }, 1000);
};

const resendEmail = async () => {
    if (!email.value || email.value === 'tu correo') return;

    message.value = '';
    isLoading.value = true;

    try {
        await authService.resendVerificationEmail(email.value);

        message.value = "¡Correo reenviado con éxito!";
        msgType.value = "success";
        startCountdown(); 

    } catch (error) {
        console.error(error);
        msgType.value = "error";
        if (error.response && error.response.data && error.response.data.message) {
            message.value = error.response.data.message;
        } else {
            message.value = "Error al reenviar. Intenta más tarde.";
        }
    } finally {
        isLoading.value = false;
    }
};
</script>