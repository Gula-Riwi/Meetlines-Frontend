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

            <div class="flex justify-center mb-6">
                <BrandLogo />
            </div>

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
                    <span class="text-gray-500 text-xs uppercase">O inicia sesión con</span>
                    <div class="h-px bg-white/10 flex-1"></div>
                </div>

                <div class="grid grid-cols-3 gap-3">
                    <!-- Google -->
                    <button @click="loginWithGoogle" type="button"
                        class="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google Logo">
                        <span class="hidden sm:inline text-sm">Google</span>
                    </button>

                    <!-- Discord -->
                    <button @click="loginWithDiscord" type="button"
                        class="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.975 14.975 0 0 0 1.293-2.1a.07.07 0 0 0-.038-.098a13.11 13.11 0 0 1-1.872-.892a.072.072 0 0 1-.007-.12a10.149 10.149 0 0 0 .372-.294a.074.074 0 0 1 .076-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .076.009c.12.098.246.195.372.294a.072.072 0 0 1-.006.12a12.296 12.296 0 0 1-1.873.892a.077.077 0 0 0-.037.098c.36.698.772 1.362 1.294 2.1a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.057c.5-4.761-.838-8.898-3.549-12.562a.06.06 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-.967-2.157-2.156c0-1.193.964-2.157 2.157-2.157c1.193 0 2.156.964 2.157 2.157c0 1.19-.964 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.967-2.157-2.156c0-1.193.964-2.157 2.157-2.157c1.192 0 2.156.964 2.157 2.157c0 1.19-.965 2.156-2.157 2.156z"></path>
                        </svg>
                        <span class="hidden sm:inline text-sm">Discord</span>
                    </button>

                    <!-- Facebook -->
                    <!-- Facebook OAuth login with public_profile and email scopes -->
                    <button @click="loginWithFacebook" type="button"
                        class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669c1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                        </svg>
                        <span class="hidden sm:inline text-sm">Facebook</span>
                    </button>
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
import { useRouter } from 'vue-router';
// Componentes
import BrandLogo from '@/components/BrandLogo.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import ShimmerButton from '@/components/ShimmerButton.vue';
import LineShadowText from '@/components/LineShadowText.vue';
// Servicios
import authService from '@/services/authService';
import { isInProjectSubdomain, getCurrentSubdomain } from '@/services/tenantService';
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
            // Si estamos en un subdominio de proyecto, redirigir al dashboard de ese tenant
            if (isInProjectSubdomain()) {
                router.push('/dashboard');
            } else {
                router.push('/projects');
            }

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
                    provider: 0, // Google
                    profilePictureUrl: user.picture
                };
                const apiResponse = await authService.oauthLogin(oauthData);

                if (apiResponse.success && apiResponse.data) {
                    const { accessToken, refreshToken, name, email, userId } = apiResponse.data;
                    Cookies.set('auth_token', accessToken, { expires: 1, secure: false, sameSite: 'Lax' });
                    Cookies.set('refresh_token', refreshToken, { expires: 7, secure: false, sameSite: 'Lax' });
                    localStorage.setItem('user', JSON.stringify({ name, email, id: userId }));
                    if (isInProjectSubdomain()) {
                        router.push('/dashboard');
                    } else {
                        router.push('/projects');
                    }
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

const loginWithDiscord = () => {
    errorMsg.value = '';
    isLoading.value = true;
    
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/discord/callback`;
    
    if (!clientId) {
        errorMsg.value = 'Discord no está configurado';
        isLoading.value = false;
        return;
    }
    
    const scope = 'identify email';
    const responseType = 'code';
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;
    
    window.location.href = discordAuthUrl;
};

const loginWithFacebook = () => {
    errorMsg.value = '';
    isLoading.value = true;
    
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
    const redirectUri = `${window.location.origin}/auth/facebook/callback`;
    
    if (!appId) {
        errorMsg.value = 'Facebook no está configurado';
        isLoading.value = false;
        return;
    }
    
    // Request both public_profile and email scopes
    const scope = 'public_profile,email';
    const responseType = 'code';
    const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;
    
    window.location.href = facebookAuthUrl;
};
</script>