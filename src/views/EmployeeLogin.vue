<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-blue-950 relative overflow-hidden font-sans">
    <div class="relative z-10 w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4">
      <div class="text-center mb-8">
        <h2 class="text-6xl md:text-7xl font-bold font-league text-white mb-2">Acceso Empleados</h2>
        <p class="text-gray-200 text-sm">Inicia sesión como empleado del proyecto</p>
      </div>

      <form @submit.prevent="Login" class="space-y-5">
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-300 ml-1">Usuario</label>
          <input type="text" v-model="username" required placeholder="usuario" class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" required placeholder="••••••••" class="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors">
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.596m16.807 16.807L9.404 9.404m0 0L3.596 3.596m16.807 16.807l-6.208-6.208"></path>
              </svg>
            </button>
          </div>
        </div>

        <div v-if="errorMsg" class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">{{ errorMsg }}</div>

        <div class="pt-4">
          <ShimmerButton class="w-full font-bold transition-opacity" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" shimmer-size="2px" background="#312e81" shimmerColor="#818cf8" border-radius="12px" type="submit" :disabled="isLoading">
            <span class="text-white tracking-wide flex items-center gap-2">
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Verificando...' : 'Entrar' }}
            </span>
          </ShimmerButton>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ShimmerButton from '@/components/ShimmerButton.vue';
import authService from '@/services/authService';
import Cookies from 'js-cookie';
import { isInProjectSubdomain, getCurrentSubdomain } from '@/services/tenantService';

const router = useRouter();
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMsg = ref('');

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
    console.log('🔵 Respuesta recibida:', JSON.stringify(response, null, 2));
    
    // Extraer datos directamente de la respuesta
    const { success, data, message } = response;
    console.log('🔵 success:', success, 'data:', !!data, 'message:', message);
    
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
    
    const { accessToken, refreshToken, name, email, userId } = data;
    console.log('🟢 Datos extraídos - userId:', userId, 'name:', name, 'email:', email);
    
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
    const userData = { name, email, id: userId };
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
