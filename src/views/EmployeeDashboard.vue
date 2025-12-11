<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">
        <Sidebar />

        <main class="flex-1 flex flex-col overflow-hidden relative bg-blue-950">
            <!-- Header -->
            <header
                class="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-gray-950/50 backdrop-blur-sm z-10">
                <div>
                    <h2 class="text-2xl font-bold">Bienvenido, {{ employeeName }} 👋</h2>
                    <p class="text-sm text-gray-400">Panel de Empleado - {{ projectName }}</p>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right hidden md:block">
                        <p class="text-sm font-bold text-white">{{ employeeName }}</p>
                        <p class="text-sm text-indigo-400">{{ employeeRole }}</p>
                    </div>
                    <div
                        class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white/20 flex items-center justify-center font-bold text-lg">
                        {{ employeeInitials }}
                    </div>
                </div>
            </header>

            <div class="flex-1 overflow-y-auto p-8 z-10 scrollbar-hide">
                <!-- Welcome Section -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <!-- Card 1: Chats -->
                    <div
                        class="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                        <div class="flex items-center gap-4 mb-4">
                            <div
                                class="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold">Mis Chats</h3>
                        </div>
                        <p class="text-gray-400 text-sm">Gestiona tus conversaciones asignadas y atiende a los clientes.
                        </p>
                    </div>

                    <!-- Card 2: Citas -->
                    <div
                        class="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                        <div class="flex items-center gap-4 mb-4">
                            <div
                                class="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold">Mis Citas</h3>
                        </div>
                        <p class="text-gray-400 text-sm">Revisa tu agenda y las próximas citas programadas.</p>
                    </div>

                    <!-- Card 3: Perfil -->
                    <div @click="showChangePasswordModal = true"
                        class="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                        <div class="flex items-center gap-4 mb-4">
                            <div
                                class="p-3 rounded-xl bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold">Mi Perfil</h3>
                        </div>
                        <p class="text-gray-400 text-sm">Actualiza tu información personal y contraseña.</p>
                    </div>
                </div>

                <div class="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 text-center">
                    <h3 class="text-lg font-bold text-indigo-300 mb-2">🚀 Estamos preparando más herramientas para ti
                    </h3>
                    <p class="text-gray-400">Pronto verás aquí métricas de desempeño y más utilidades.</p>
                </div>

            </div>

            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
        </main>

        <!-- Change Password Modal -->
        <div v-if="showChangePasswordModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            @click.self="showChangePasswordModal = false">
            <div class="bg-gray-900 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl overflow-hidden">
                <div class="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 class="text-xl font-bold">Cambiar Contraseña</h2>
                    <button @click="closeChangePasswordModal" class="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div v-if="changePasswordSuccess" class="p-6">
                    <div
                        class="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
                        <p class="font-medium mb-2">✓ Contraseña actualizada</p>
                        <p>Tu contraseña ha sido cambiada exitosamente.</p>
                    </div>
                    <button @click="closeChangePasswordModal"
                        class="w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors">
                        Cerrar
                    </button>
                </div>

                <form v-else @submit.prevent="changePassword" class="p-6 space-y-4">
                    <!-- Current Password -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Contraseña Actual</label>
                        <div class="relative">
                            <input :type="showCurrentPassword ? 'text' : 'password'"
                                v-model="passwordForm.currentPassword" required
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                                placeholder="••••••••">
                            <button type="button" @click="showCurrentPassword = !showCurrentPassword"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200">
                                <svg v-if="!showCurrentPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
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

                    <!-- New Password -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Nueva Contraseña</label>
                        <div class="relative">
                            <input :type="showNewPassword ? 'text' : 'password'" v-model="passwordForm.newPassword"
                                required minlength="6"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                                placeholder="••••••••">
                            <button type="button" @click="showNewPassword = !showNewPassword"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200">
                                <svg v-if="!showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
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
                        <p class="text-xs text-gray-500">Mínimo 6 caracteres</p>
                    </div>

                    <!-- Confirm Password -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Confirmar Nueva Contraseña</label>
                        <input :type="showNewPassword ? 'text' : 'password'" v-model="confirmNewPassword" required
                            minlength="6"
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                            placeholder="••••••••">
                    </div>

                    <div v-if="changePasswordError"
                        class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                        {{ changePasswordError }}
                    </div>

                    <div class="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button type="button" @click="closeChangePasswordModal"
                            class="px-4 py-2 text-gray-300 hover:text-white font-medium">Cancelar</button>
                        <button type="submit" :disabled="changingPassword"
                            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center gap-2">
                            <span v-if="changingPassword"
                                class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                            {{ changingPassword ? 'Cambiando...' : 'Cambiar Contraseña' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import authService from '@/services/authService';

const employeeName = ref('');
const employeeRole = ref('');
const projectName = ref('');

// Change Password Modal
const showChangePasswordModal = ref(false);
const passwordForm = ref({
    currentPassword: '',
    newPassword: ''
});
const confirmNewPassword = ref('');
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const changePasswordError = ref('');
const changePasswordSuccess = ref(false);
const changingPassword = ref(false);

const employeeInitials = computed(() => {
    if (!employeeName.value) return 'E';
    return employeeName.value.substring(0, 2).toUpperCase();
});

const changePassword = async () => {
    changePasswordError.value = '';

    // Validation
    if (passwordForm.value.newPassword.length < 6) {
        changePasswordError.value = 'La nueva contraseña debe tener al menos 6 caracteres.';
        return;
    }

    if (passwordForm.value.newPassword !== confirmNewPassword.value) {
        changePasswordError.value = 'Las contraseñas no coinciden.';
        return;
    }

    try {
        changingPassword.value = true;

        const response = await authService.employeeChangePassword({
            currentPassword: passwordForm.value.currentPassword,
            newPassword: passwordForm.value.newPassword
        });

        if (response.success) {
            changePasswordSuccess.value = true;
        } else {
            changePasswordError.value = response.message || 'Error al cambiar la contraseña.';
        }
    } catch (err) {
        console.error('Error en change password:', err);
        changePasswordError.value = err.response?.data?.message || 'Error al cambiar la contraseña. Verifica tu contraseña actual.';
    } finally {
        changingPassword.value = false;
    }
};

const closeChangePasswordModal = () => {
    showChangePasswordModal.value = false;
    passwordForm.value = { currentPassword: '', newPassword: '' };
    confirmNewPassword.value = '';
    changePasswordError.value = '';
    changePasswordSuccess.value = false;
    showCurrentPassword.value = false;
    showNewPassword.value = false;
};

onMounted(() => {
    // Cargar datos del usuario desde localStorage (guardados en login)
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            employeeName.value = user.name || 'Empleado';
            // El rol a veces viene en el JWT o respuesta login, asumimos algo simple si no está
            employeeRole.value = 'Colaborador';
        }

        // Cargar proyecto actual (si existe contexto) o detectar por subdominio si fuera necesario
        // En Employee Dashboard, el contexto del proyecto es implícito al subdominio
        const sub = window.location.hostname.split('.')[0];
        projectName.value = sub.charAt(0).toUpperCase() + sub.slice(1);

    } catch (e) {
        console.error('Error cargando datos de empleado', e);
    }
});
</script>
