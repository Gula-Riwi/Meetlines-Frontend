<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-blue-950 relative overflow-hidden font-sans">

        <!-- 1. BOTÓN VOLVER -->
        <router-link to="/"
            class="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6" />
            </svg>
            <span class="font-medium">Volver al inicio</span>
        </router-link>

        <!-- 2. CARD DE LOGIN -->
        <div
            class="relative z-10 w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4">

            <div class="text-center mb-8">
                <h2 class="text-6xl md:text-7xl font-bold font-league text-white mb-2">
                    Iniciar
                    <span class="block sm:inline-block">
                        <LineShadowText shadowColor="white">Sesión</LineShadowText>
                    </span>
                </h2>
                <p class="text-gray-200 text-sm">Bienvenido de nuevo al panel de control</p>
            </div>

            <form @submit.prevent="Login" class="space-y-5">

                <!-- Correo -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Correo Electrónico</label>
                    <input type="email" v-model="email" required placeholder="ejemplo@empresa.com"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Contraseña -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
                    <input type="password" v-model="password" required placeholder="••••••••"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <div v-if="errorMsg"
                    class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                    {{ errorMsg }}
                </div>

                <!-- Botón de Entrar -->
                <div class="pt-4">
                    <ShimmerButton class="w-full font-bold transition-opacity"
                        :class="{ 'opacity-50 cursor-not-allowed': isLoading }" shimmer-size="2px" background="#312e81"
                        shimmerColor="#818cf8" border-radius="12px" @click="Login" :disabled="isLoading">
                        <span class="text-white tracking-wide flex items-center gap-2">
                            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ isLoading ? 'Verificando...' : 'Entrar' }}
                        </span>
                    </ShimmerButton>
                </div>
            </form>

            <!-- Footer -->
            <div class="mt-6 text-center text-sm text-gray-400">
                <p>¿No tienes cuenta?
                    <router-link to="/register"
                        class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Regístrate aquí
                    </router-link>
                </p>
            </div>
        </div>

        <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
            squares-class-name="hover:fill-indigo-500/50"
            :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import ShimmerButton from '@/components/ShimmerButton.vue';
import LineShadowText from '@/components/LineShadowText.vue';

// Servicios
import authService from '@/services/authService';
// Cookies
import Cookies from 'js-cookie';

const router = useRouter();

// Variables reactivas
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMsg = ref('');

const Login = async () => {
    errorMsg.value = '';

    if (!email.value || !password.value) {
        errorMsg.value = "Por favor ingresa tus credenciales";
        return;
    }

    try {
        isLoading.value = true;

        // Llamada real (descomentar cuando haya back)
        // const response = await authService.login({ email: email.value, password: password.value });

        // --- SIMULACIÓN ---
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = { token: 'simulacion-jwt-xyz123', user: { name: 'Admin' } };
        // ------------------

        if (response.token) {
            // --- AQUÍ GUARDAMOS EN COOKIE ---
            Cookies.set('auth_token', response.token, { expires: 7, secure: true, sameSite: 'Strict' });

            // Datos no sensibles en localStorage
            localStorage.setItem('user', JSON.stringify(response.user));

            router.push('/dashboard');
        } else {
            errorMsg.value = "Error: El servidor no devolvió un token.";
        }

    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
            errorMsg.value = "Correo o contraseña incorrectos.";
        } else if (error.response && error.response.data && error.response.data.message) {
            errorMsg.value = error.response.data.message;
        } else {
            errorMsg.value = "Error de conexión con el servidor.";
        }
    } finally {
        isLoading.value = false;
    }
};
</script>