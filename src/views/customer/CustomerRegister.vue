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
                    Crear
                    <span class="block sm:inline-block">
                        <LineShadowText shadowColor="white">Cuenta</LineShadowText>
                    </span>
                </h2>
                <p class="text-gray-200 text-sm">Regístrate para agendar tus citas</p>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-4">

                <!-- Name -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Nombre completo</label>
                    <input type="text" v-model="name" required placeholder="Tu nombre"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Email -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Correo Electrónico</label>
                    <input type="email" v-model="email" required placeholder="tu@email.com"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Phone -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Teléfono (opcional)</label>
                    <input type="tel" v-model="phone" placeholder="+57 300 123 4567"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Password -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
                    <input type="password" v-model="password" required placeholder="Mínimo 8 caracteres"
                        class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <!-- Confirm Password -->
                <div class="space-y-1">
                    <label class="text-sm font-medium text-gray-300 ml-1">Confirmar Contraseña</label>
                    <input type="password" v-model="confirmPassword" required placeholder="Repite tu contraseña"
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

                <!-- Submit button -->
                <div class="pt-2">
                    <ShimmerButton class="w-full font-bold transition-opacity"
                        :class="{ 'opacity-50 cursor-not-allowed': isLoading }" shimmer-size="2px" background="#312e81"
                        shimmerColor="#818cf8" border-radius="12px" @click="handleRegister" :disabled="isLoading">
                        <span class="text-white tracking-wide flex items-center gap-2">
                            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ isLoading ? 'Registrando...' : 'Crear cuenta' }}
                        </span>
                    </ShimmerButton>
                </div>
            </form>

            <!-- Footer -->
            <div class="mt-6 text-center text-sm text-gray-400">
                <p>¿Ya tienes cuenta?
                    <router-link to="/customer/login"
                        class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Inicia sesión
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

// Components
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import ShimmerButton from '@/components/ShimmerButton.vue';
import LineShadowText from '@/components/LineShadowText.vue';

// Services
import clientAuthService from '@/services/clientAuthService';

const router = useRouter();

// Reactive state
const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const handleRegister = async () => {
    errorMsg.value = '';
    successMsg.value = '';

    // Validation
    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        errorMsg.value = "Por favor completa todos los campos obligatorios";
        return;
    }

    if (password.value.length < 8) {
        errorMsg.value = "La contraseña debe tener al menos 8 caracteres";
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorMsg.value = "Las contraseñas no coinciden";
        return;
    }

    try {
        isLoading.value = true;

        const response = await clientAuthService.register({
            name: name.value,
            email: email.value,
            phone: phone.value || undefined,
            password: password.value
        });

        if (response.success) {
            successMsg.value = "¡Cuenta creada exitosamente! Redirigiendo...";
            setTimeout(() => {
                router.push('/customer/login');
            }, 2000);
        } else {
            errorMsg.value = response.message || "Error al crear la cuenta.";
        }

    } catch (error) {
        console.error("Error en registro:", error);

        if (error.response && error.response.data) {
            errorMsg.value = error.response.data.message || "Error al registrarse.";
        } else {
            errorMsg.value = "Error de conexión con el servidor.";
        }
    } finally {
        isLoading.value = false;
    }
};
</script>
