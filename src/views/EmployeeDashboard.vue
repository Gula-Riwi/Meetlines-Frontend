<template>
    <div class="min-h-screen bg-gray-950 font-sans text-white">
        <!-- Header -->
        <header
            class="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-10">
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
                <!-- Logout Button -->
                <button @click="handleLogout"
                    class="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    <span class="font-bold text-sm hidden md:inline">Salir</span>
                </button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto p-8">
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'absolute inset-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                <!-- Profile Card -->
                <div class="lg:col-span-1">
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
                        <p class="text-gray-400 text-sm mb-3">Actualiza tu información personal y contraseña.</p>
                        <div class="text-sm text-indigo-400 font-medium">Click para cambiar contraseña →</div>
                    </div>
                </div>

                <!-- Task Checklist -->
                <div class="lg:col-span-2">
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-2xl font-bold">Mis Tareas</h3>
                            <span class="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm font-medium">
                                {{ completedTasks }}/{{ tasks.length }} completadas
                            </span>
                        </div>

                        <!-- Empty State -->
                        <div v-if="tasks.length === 0"
                            class="text-center py-12 border-2 border-dashed border-white/10 rounded-xl">
                            <font-awesome-icon :icon="['fas', 'clipboard-list']" class="text-6xl mb-4" />
                            <h4 class="text-lg font-bold mb-2">No hay tareas asignadas</h4>
                            <p class="text-gray-400 text-sm">Las tareas aparecerán aquí cuando sean asignadas.</p>
                        </div>

                        <!-- Task List -->
                        <div v-else class="space-y-3">
                            <div v-for="task in tasks" :key="task.id"
                                class="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors group">
                                <!-- Checkbox -->
                                <button @click="toggleTask(task.id)"
                                    class="flex-shrink-0 w-6 h-6 rounded-md border-2 transition-all"
                                    :class="task.completed ? 'bg-indigo-600 border-indigo-600' : 'border-gray-600 hover:border-indigo-500'">
                                    <svg v-if="task.completed" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"
                                        viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </button>

                                <!-- Task Content -->
                                <div class="flex-1">
                                    <p class="font-medium transition-all"
                                        :class="task.completed ? 'line-through text-gray-500' : 'text-white'">
                                        {{ task.title }}
                                    </p>
                                    <p v-if="task.description" class="text-sm text-gray-400 mt-1">{{ task.description }}
                                    </p>
                                </div>

                                <!-- Priority Badge -->
                                <span v-if="task.priority" class="px-2 py-1 rounded-md text-xs font-bold" :class="{
                                    'bg-red-500/20 text-red-400': task.priority === 'high',
                                    'bg-yellow-500/20 text-yellow-400': task.priority === 'medium',
                                    'bg-blue-500/20 text-blue-400': task.priority === 'low'
                                }">
                                    {{ task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'
                                    }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import authService from '@/services/authService';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';

const router = useRouter();

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

// Tasks - Template for future API integration
const tasks = ref([
    // Example tasks - these will be replaced with API data
    // {
    //     id: 1,
    //     title: 'Revisar mensajes pendientes',
    //     description: 'Responder a los clientes en espera',
    //     completed: false,
    //     priority: 'high'
    // },
    // {
    //     id: 2,
    //     title: 'Actualizar estado de citas',
    //     description: 'Marcar citas completadas del día',
    //     completed: false,
    //     priority: 'medium'
    // }
]);

const employeeInitials = computed(() => {
    if (!employeeName.value) return 'E';
    return employeeName.value.substring(0, 2).toUpperCase();
});

const completedTasks = computed(() => {
    return tasks.value.filter(task => task.completed).length;
});

const toggleTask = (taskId) => {
    const task = tasks.value.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        // TODO: Send update to API when endpoint is ready
        // await taskService.updateTask(taskId, { completed: task.completed });
    }
};

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

const handleLogout = async () => {
    if (confirm('¿Seguro que deseas salir?')) {
        try {
            const refreshToken = Cookies.get('refresh_token');
            if (refreshToken) {
                await authService.logout(refreshToken);
            }
        } catch (e) {
            console.error('Error en logout:', e);
        } finally {
            Cookies.remove('auth_token');
            Cookies.remove('refresh_token');
            localStorage.clear();
            router.push('/employee-login');
        }
    }
};

onMounted(() => {
    // Cargar datos del usuario desde localStorage
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            employeeName.value = user.name || 'Empleado';
            employeeRole.value = 'Colaborador';
        }

        // Detectar proyecto por subdominio
        const sub = window.location.hostname.split('.')[0];
        projectName.value = sub.charAt(0).toUpperCase() + sub.slice(1);

        // TODO: Fetch tasks from API when endpoint is ready
        // const response = await taskService.getEmployeeTasks();
        // tasks.value = response.data;

    } catch (e) {
        console.error('Error cargando datos de empleado', e);
    }
});
</script>
