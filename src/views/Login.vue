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
                    <div class="flex justify-between items-center">
                        <label class="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
                        <router-link to="/forgot-password"
                            class="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                            ¿Olvidaste tu contraseña?
                        </router-link>
                    </div>
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

            <div class="mb-6">
                <!-- Separador -->
                <div class="flex items-center gap-4 my-6">
                    <div class="h-px bg-white/10 flex-1"></div>
                    <span class="text-gray-500 text-xs uppercase">O inicia sesión con Google</span>
                    <div class="h-px bg-white/10 flex-1"></div>
                </div>

                <button @click="loginWithGoogle" type="button"
                    class="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-6 h-6" alt="Google Logo">
                    <span>Continuar con Google</span>
                </button>
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
// Componentes
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import ShimmerButton from '@/components/ShimmerButton.vue';
import LineShadowText from '@/components/LineShadowText.vue';
// Servicios
import authService from '@/services/authService';
// Cookies
import Cookies from 'js-cookie';

//Google and JWT
import { googleTokenLogin } from 'vue3-google-login';
import axios from 'axios';


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

        const response = await authService.login({ email: email.value, password: password.value });
        if (response.success && response.data) {
            const { accessToken, refreshToken, name, email, userId } = response.data;

            Cookies.set('auth_token', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });

            Cookies.set('refresh_token', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });

            const userData = {
                name: name,
                email: email,
                id: userId
            };
            localStorage.setItem('user', JSON.stringify(userData));
            router.push('/projects');

        } else {
            errorMsg.value = response.message || "Credenciales incorrectas.";
        }

    } catch (error) {
        console.error("Error en login:", error);

        if (error.response && error.response.data) {
            errorMsg.value = error.response.data.message || "Error al iniciar sesión.";
        } else {
            errorMsg.value = "Error de conexión con el servidor.";
        }
    } finally {
        isLoading.value = false;
    }
};

const loginWithGoogle = () => {
    errorMsg.value = '';

    googleTokenLogin().then(async (response) => {
        if (response.access_token) {
            try {
                isLoading.value = true;
                const googleUserInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${response.access_token}` }
                });

                const user = googleUserInfo.data;

                const oauthData = {
                    externalProviderId: user.sub,
                    email: user.email,
                    name: user.name,
                    provider: 0,
                    profilePictureUrl: user.picture
                };
                const apiResponse = await authService.oauthLogin(oauthData);

                if (apiResponse.success && apiResponse.data) {
                    const { accessToken, refreshToken, name, email, userId } = apiResponse.data;
                    Cookies.set('auth_token', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
                    Cookies.set('refresh_token', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });
                    localStorage.setItem('user', JSON.stringify({ name, email, id: userId }));
                    router.push('/projects');
                } else {
                    errorMsg.value = apiResponse.message || "Error al iniciar con Google.";
                }

            } catch (err) {
                console.error("Error en proceso Google:", err);
                errorMsg.value = "No se pudieron obtener los datos de Google.";
            } finally {
                isLoading.value = false;
            }
        }
    }).catch(err => {
        console.error("Popup cerrado o error:", err);
        isLoading.value = false;
    });
};
</script>