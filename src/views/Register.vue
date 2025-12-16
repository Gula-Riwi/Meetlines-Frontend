<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-blue-950 relative overflow-hidden font-sans">

        <!-- Botón Volver -->
        <router-link to="/"
            class="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6" />
            </svg>
            <span class="font-medium">Volver al inicio</span>
        </router-link>

        <div
            class="relative z-10 w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4 my-10">

            <div class="text-center mb-6">
                <h2 class="text-6xl md:text-7xl font-bold font-league text-white mb-2">
                    Crear
                    <span class="block sm:inline-block">
                        <LineShadowText shadowColor="white">Cuenta</LineShadowText>
                    </span>
                </h2>
                <p class="text-gray-200 text-sm">Gestiona tus pedidos con IA hoy mismo</p>
            </div>

            <form @submit.prevent="register" class="space-y-4">

                <!-- Nombre -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Nombre de usuario</label>
                    <input type="text" v-model="name" required placeholder="Mi Negocio Inc."
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Correo -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Correo Electrónico</label>
                    <input type="email" v-model="email" required placeholder="ejemplo@correo.com"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Teléfono (NUEVO) -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Teléfono</label>
                    <input type="tel" v-model="phone" required placeholder="+57 300 123 4567"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Contraseña -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
                    <input type="password" v-model="password" required placeholder="••••••••"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Confirmar Contraseña -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Confirmar Contraseña</label>
                    <input type="password" v-model="confirmPassword" required placeholder="••••••••"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Mensaje de Error -->
                <div v-if="errorMsg"
                    class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center animate-pulse">
                    {{ errorMsg }}
                </div>

                <!-- Botón de Registro -->
                <div class="pt-2">
                    <ShimmerButton class="w-full font-bold transition-opacity"
                        :class="{ 'opacity-50 cursor-not-allowed': isLoading }" shimmer-size="2px" background="#312e81"
                        shimmerColor="#818cf8" border-radius="12px" @click="register" :disabled="isLoading">
                        <span class="text-white tracking-wide flex items-center justify-center gap-2">
                            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ isLoading ? 'Creando cuenta...' : 'Registrarse' }}
                        </span>
                    </ShimmerButton>
                </div>
            </form>

            <!-- Footer -->
            <div class="mt-6 text-center text-sm text-gray-400">
                <p>¿Ya tienes cuenta?
                    <router-link to="/login"
                        class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Inicia Sesión
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
// Componentes
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import ShimmerButton from '@/components/ShimmerButton.vue';
import LineShadowText from '@/components/LineShadowText.vue';
// Servicio
import authService from '@/services/authService';

const router = useRouter();

// Variables del formulario
const name = ref('');
const email = ref('');
const phone = ref(''); 
const password = ref('');
const confirmPassword = ref('');

// Estado
const isLoading = ref(false);
const errorMsg = ref('');

const register = async () => {
    errorMsg.value = '';

    if (!name.value || !email.value || !password.value || !phone.value) {
        errorMsg.value = "Por favor completa todos los campos";
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorMsg.value = "Las contraseñas no coinciden";
        return;
    }

    try {
        isLoading.value = true;

        const userData = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            phone: phone.value
        };

        console.log("Enviando datos al backend:", userData);

        await authService.register(userData);

        router.push({ 
            path: '/check-email', 
            query: { email: email.value }
        });

    } catch (error) {
        console.error("Error en registro:", error);
        if (error.response && error.response.data && error.response.data.message) {
            errorMsg.value = error.response.data.message;
        } else if (error.response && error.response.data) {
            errorMsg.value = JSON.stringify(error.response.data);
        } else {
            errorMsg.value = "Ocurrió un error al conectar con el servidor.";
        }
    } finally {
        isLoading.value = false;
    }
};
</script>