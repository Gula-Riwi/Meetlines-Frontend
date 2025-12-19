<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-blue-950 relative overflow-hidden font-sans">
    <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]" squares-class-name="hover:fill-indigo-500/50"
      :class="'absolute inset-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
    <div
      class="relative z-20 w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4">
      <div class="text-center mb-8">
        <h2 class="text-6xl md:text-7xl font-bold font-league text-white mb-2">Acceso Empleados</h2>
        <p class="text-gray-200 text-sm">Inicia sesión como empleado del proyecto</p>
      </div>

      <form @submit.prevent="Login" class="space-y-5">
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-300 ml-1">Usuario</label>
          <input type="text" v-model="username" required placeholder="usuario"
            class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" required placeholder="••••••••"
              class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors">
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                </path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.596m16.807 16.807L9.404 9.404m0 0L3.596 3.596m16.807 16.807l-6.208-6.208">
                </path>
              </svg>
            </button>
          </div>
        </div>

        <div v-if="errorMsg"
          class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">{{ errorMsg }}
        </div>

        <div class="pt-4">
          <ShimmerButton class="w-full font-bold transition-opacity"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }" shimmer-size="2px" background="#312e81"
            shimmerColor="#818cf8" border-radius="12px" type="submit" :disabled="isLoading">
            <span class="text-white tracking-wide flex items-center gap-2">
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isLoading ? 'Verificando...' : 'Entrar' }}
            </span>
          </ShimmerButton>
        </div>

        <div class="text-center pt-3">
          <button type="button" @click="showForgotPasswordModal = true"
            class="text-sm text-gray-400 hover:text-indigo-400 transition-colors underline">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </form>
    </div>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPasswordModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="showForgotPasswordModal = false">
      <div class="bg-gray-900 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl overflow-hidden">
        <div class="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 class="text-6xl font-league font-bold text-white">Recuperar Contraseña</h2>
          <button @click="showForgotPasswordModal = false" class="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="forgotPasswordSuccess" class="p-6">
          <div class="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
            <p class="font-medium mb-2">✓ Correo enviado</p>
            <p>Si el email existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.</p>
          </div>
          <button @click="closeForgotPasswordModal"
            class="w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors">
            Cerrar
          </button>
        </div>

        <form v-else @submit.prevent="sendForgotPasswordEmail" class="p-6 space-y-4">
          <p class="text-sm text-gray-400">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu
            contraseña.</p>

          <div class="space-y-1">
            <label class="text-sm text-gray-400">Email</label>
            <input v-model="forgotPasswordEmail" type="email" required
              class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="tu@email.com">
          </div>

          <div v-if="forgotPasswordError"
            class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {{ forgotPasswordError }}
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" @click="showForgotPasswordModal = false"
              class="px-4 py-2 text-gray-300 hover:text-white font-medium">Cancelar</button>
            <button type="submit" :disabled="sendingEmail"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center gap-2">
              <span v-if="sendingEmail"
                class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
              {{ sendingEmail ? 'Enviando...' : 'Enviar Enlace' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ShimmerButton from '@/components/ShimmerButton.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import authService from '@/services/authService';
import Cookies from 'js-cookie';
import { isInProjectSubdomain, getCurrentSubdomain } from '@/services/tenantService';

const router = useRouter();
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMsg = ref('');

// Forgot Password Modal
const showForgotPasswordModal = ref(false);
const forgotPasswordEmail = ref('');
const forgotPasswordError = ref('');
const forgotPasswordSuccess = ref(false);
const sendingEmail = ref(false);

const sendForgotPasswordEmail = async () => {
  forgotPasswordError.value = '';

  if (!forgotPasswordEmail.value) {
    forgotPasswordError.value = 'Por favor ingresa tu email.';
    return;
  }

  try {
    sendingEmail.value = true;
    const response = await authService.employeeForgotPassword(forgotPasswordEmail.value);

    if (response.success) {
      forgotPasswordSuccess.value = true;
    } else {
      forgotPasswordError.value = response.message || 'Error al enviar el correo.';
    }
  } catch (err) {
    console.error('Error en forgot password:', err);
    forgotPasswordError.value = 'Error al enviar el correo. Intenta nuevamente.';
  } finally {
    sendingEmail.value = false;
  }
};

const closeForgotPasswordModal = () => {
  showForgotPasswordModal.value = false;
  forgotPasswordEmail.value = '';
  forgotPasswordError.value = '';
  forgotPasswordSuccess.value = false;
};


const Login = async () => {
  errorMsg.value = '';
  if (!username.value || !password.value) {
    errorMsg.value = 'Por favor ingresa tus credenciales';
    return;
  }

  try {
    isLoading.value = true;
    console.log('🔵 Iniciando login con:', { username: username.value });

    const response = await authService.employeeLogin({ username: username.value, password: password.value });

    // Extraer datos directamente de la respuesta
    const { success, data, message } = response;

    if (!success) {
      console.log('🔴 Login fallido: success es falso');
      errorMsg.value = message || 'Credenciales incorrectas.';
      return;
    }

    if (!data) {
      console.log('🔴 Login fallido: no hay data');
      errorMsg.value = 'No se recibieron datos del servidor.';
      return;
    }

    const { accessToken, refreshToken, name, email, userId, projectId } = data;

    // Guardar tokens
    Cookies.set('auth_token', accessToken, { expires: 1, secure: false, sameSite: 'Lax' });
    Cookies.set('refresh_token', refreshToken, { expires: 7, secure: false, sameSite: 'Lax' });
    console.log('🟢 Cookies guardadas');
    console.log('🟢 auth_token:', Cookies.get('auth_token') ? 'EXISTS' : 'NOT FOUND');
    console.log('🟢 refresh_token:', Cookies.get('refresh_token') ? 'EXISTS' : 'NOT FOUND');

    // Verificar que se guardaron correctamente
    const savedToken = Cookies.get('auth_token');
    if (!savedToken) {
      console.error('🔴 ERROR: Las cookies no se guardaron');
      errorMsg.value = 'Error al guardar sesión.';
      return;
    }

    // Guardar usuario
    const userData = { name, email, id: userId, projectId };
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('🟢 localStorage guardado');

    // Navegar
    console.log('🟢 Verificando si estamos en subdominio...');
    if (isInProjectSubdomain()) {
      console.log('🟢 Estamos en subdominio, yendo a /dashboard');
      await router.push('/dashboard');
    } else {
      console.log('🟢 No estamos en subdominio, yendo a /projects');
      await router.push('/projects');
    }
    console.log('🟢 Navegación completada');

  } catch (err) {
    console.error('🔴 Error en login:', err);
    errorMsg.value = err.message || 'Error de conexión con el servidor.';
  } finally {
    isLoading.value = false;
  }
};
</script>
