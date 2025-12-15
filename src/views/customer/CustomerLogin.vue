<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-blue-950 relative overflow-hidden font-sans">

        <!-- Back button -->
        <router-link to="/explore"
            class="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6" />
            </svg>
            <span class="font-medium">Explorar negocios</span>
        </router-link>

        <div
            class="relative z-10 w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4">

            <div class="text-center mb-8">
                <h2 class="text-5xl md:text-6xl font-bold font-league text-white mb-2">
                    Iniciar
                    <span class="block sm:inline-block">
                        <LineShadowText shadowColor="white">Sesión</LineShadowText>
                    </span>
                </h2>
                <p class="text-gray-200 text-sm">Accede a tu cuenta de cliente</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-5">

                <!-- Email -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Correo Electrónico</label>
                    <input type="email" v-model="email" required placeholder="tu@email.com"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Password -->
                <div class="space-y-1">
                    <div class="flex justify-between items-center">
                        <label class="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
                        <router-link to="/customer/forgot-password"
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

                <!-- Submit button -->
                <div class="pt-4">
                    <ShimmerButton class="w-full font-bold transition-opacity"
                        :class="{ 'opacity-50 cursor-not-allowed': isLoading }" shimmer-size="2px" background="#312e81"
                        shimmerColor="#818cf8" border-radius="12px" @click="handleLogin" :disabled="isLoading">
                        <span class="text-white tracking-wide flex items-center gap-2">
                            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
                        </span>
                    </ShimmerButton>
                </div>
            </form>

            <!-- OAuth Divider -->
            <div class="relative my-6">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-700"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                    <span class="bg-gray-900 px-4 text-gray-400">O continúa con</span>
                </div>
            </div>

            <!-- Google OAuth Button -->
            <!-- TODO: Implement backend endpoint /api/client/auth/oauth/google for customer OAuth -->
            <div class="flex justify-center">
                <button @click="loginWithGoogle" type="button"
                    class="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg w-full max-w-xs">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google Logo">
                    <span class="text-sm">Continuar con Google</span>
                </button>
            </div>

            <!-- Footer -->
            <div class="mt-6 text-center text-sm text-gray-400">
                <p>¿No tienes cuenta?
                    <router-link to="/customer/register"
                        class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Regístrate aquí
                    </router-link>
                </p>
            </div>

            <!-- Separator for business owners -->
            <div class="mt-6 pt-6 border-t border-white/10">
                <p class="text-center text-sm text-gray-500">
                    ¿Eres dueño de negocio?
                    <router-link to="/login" class="text-indigo-400 hover:text-indigo-300 transition-colors">
                        Ingresa aquí
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
import Cookies from 'js-cookie';
import axios from 'axios';
import { googleTokenLogin } from 'vue3-google-login';

// Components
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import ShimmerButton from '@/components/ShimmerButton.vue';
import LineShadowText from '@/components/LineShadowText.vue';

// Services
import clientAuthService from '@/services/clientAuthService';
import authService from '@/services/authService';

const router = useRouter();

// Reactive state
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMsg = ref('');

const handleLogin = async () => {
    errorMsg.value = '';

    if (!email.value || !password.value) {
        errorMsg.value = "Por favor ingresa tus credenciales";
        return;
    }

    try {
        isLoading.value = true;

        const response = await clientAuthService.login({
            email: email.value,
            password: password.value
        });

        console.log("Login response:", response);

        // Handle different response formats - token may be directly on response or nested in data
        const loginData = response.data || response;
        const accessToken = loginData.accessToken || loginData.token;
        const refreshToken = loginData.refreshToken;
        const userName = loginData.name || loginData.fullName;
        const userEmail = loginData.email || email.value;
        const userId = loginData.userId || loginData.id;

        if (accessToken) {
            Cookies.set('customer_token', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
            if (refreshToken) {
                Cookies.set('customer_refresh_token', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });
            }

            const userData = {
                name: userName,
                email: userEmail,
                id: userId,
                isCustomer: true
            };
            localStorage.setItem('customer', JSON.stringify(userData));

            router.push('/explore');
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

// TODO: Backend needs to implement /api/client/auth/oauth/google endpoint for customer OAuth
// Currently using business owner OAuth endpoint as temporary workaround
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
                    provider: 'Google'
                };

                // TODO: Replace with clientAuthService.oauthLogin when backend endpoint is ready
                const apiResponse = await authService.oauthLogin(oauthData);

                if (apiResponse.success && apiResponse.data) {
                    const { accessToken, refreshToken, name, email, userId } = apiResponse.data;
                    Cookies.set('customer_token', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
                    Cookies.set('customer_refresh_token', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });
                    localStorage.setItem('customer', JSON.stringify({ name, email, id: userId, isCustomer: true }));
                    router.push('/explore');
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
