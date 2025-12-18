<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">

        <Sidebar />

        <main class="flex-1 flex flex-col overflow-hidden relative bg-blue-950 min-w-0 pb-16 md:pb-0">
            <header class="h-16 md:h-20 flex items-center justify-between px-6 border-b border-white/5 bg-gray-900/50 backdrop-blur-sm z-10 sticky top-0">
                <h2 class="text-2xl md:text-5xl tracking-wide font-league truncate">Mi Perfil</h2>
            </header>

            <div class="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative">
                <div class="max-w-4xl mx-auto bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative mb-20 md:mb-0">
                    
                    <!-- Portada -->
                    <div class="h-24 md:h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

                    <div class="px-6 pb-6 md:px-8 md:pb-8">
                        
                        <!-- Avatar y Badge -->
                        <div class="relative -mt-12 md:-mt-16 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                            <div class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800 shadow-xl">
                                <img :src="profile.profilePictureUrl || `https://ui-avatars.com/api/?name=${profile.name}&background=random`"
                                    class="w-full h-full object-cover" alt="Profile">
                            </div>

                            <div v-if="profile.isEmailVerified"
                                class="px-4 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs md:text-sm font-bold flex items-center gap-2">
                                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Cuenta Verificada
                            </div>
                        </div>

                        <div class="space-y-6">
                            <!-- Nombre y Correo -->
                            <div>
                                <h1 class="text-2xl md:text-3xl font-bold text-white mb-1">{{ profile.name }}</h1>
                                <p class="text-sm md:text-base text-gray-400 break-all">{{ profile.email }}</p>
                            </div>

                            <!-- Grid de Datos (1 col en móvil, 2 en PC) -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Teléfono</label>
                                    <p class="text-base md:text-lg text-gray-200">{{ profile.phone || 'No registrado' }}</p>
                                </div>
                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Zona Horaria</label>
                                    <p class="text-base md:text-lg text-gray-200 truncate">{{ profile.timezone || 'UTC' }}</p>
                                </div>
                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Método de Registro</label>
                                    <p class="text-base md:text-lg text-gray-200 flex items-center gap-2">
                                        <span v-if="profile.authProvider === 1">
                                            <font-awesome-icon :icon="['fab', 'google']" class="mr-1"/> Google
                                        </span>
                                        <span v-else>Correo y Contraseña</span>
                                    </p>
                                </div>
                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Miembro Desde</label>
                                    <p class="text-base md:text-lg text-gray-200">{{ formatDate(profile.createdAt) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Botones de Acción (Responsive) -->
                    <div class="bg-gray-950/50 p-4 flex flex-col-reverse md:flex-row justify-between gap-3 border-t border-white/5">
                        <button v-if="profile.authProvider == 0" @click="isChangingPass = true"
                            class="w-full md:w-auto px-6 py-3 md:py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-white/5 rounded-xl md:rounded-lg font-bold transition-colors text-sm md:text-base">
                            Cambiar Contraseña
                        </button>
                        <div v-else class="hidden md:block"></div>
                        
                        <button @click="openEditModal"
                            class="w-full md:w-auto px-6 py-3 md:py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl md:rounded-lg font-bold transition-colors shadow-lg text-sm md:text-base">
                            Editar Perfil
                        </button>
                    </div>
                </div>
            </div>
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
        </main>

        <!-- MODAL DE EDICIÓN -->
        <div v-if="isEditing" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div class="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
                <!-- Header Modal -->
                <div class="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 class="text-2xl font-bold text-white font-league">Editar Info</h3>
                    <button @click="isEditing = false" class="text-gray-400 hover:text-white text-xl">✕</button>
                </div>

                <form @submit.prevent="saveProfile" class="p-6 space-y-4">
                    <!-- Inputs -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Nombre Completo</label>
                        <input type="text" v-model="editForm.name" required
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                    </div>
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Teléfono</label>
                        <input type="tel" v-model="editForm.phone"
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                    </div>
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Zona Horaria</label>
                        <input type="text" v-model="editForm.timezone"
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                    </div>

                    <!-- Botones Modal -->
                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" @click="isEditing = false"
                            class="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Cancelar</button>
                        <button type="submit" :disabled="isSaving"
                            class="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2">
                            <span v-if="isSaving" class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                            {{ isSaving ? 'Guardando...' : 'Guardar' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- MODAL CAMBIAR PASSWORD -->
        <div v-if="isChangingPass" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div class="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
                <div class="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 class="text-2xl font-bold text-white font-league">Seguridad</h3>
                    <button @click="closePassModal" class="text-gray-400 hover:text-white text-xl">✕</button>
                </div>

                <form @submit.prevent="changePassword" class="p-6 space-y-4">
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Contraseña Actual</label>
                        <input type="password" v-model="passForm.currentPassword" required
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                    </div>
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Nueva Contraseña</label>
                        <input type="password" v-model="passForm.newPassword" required
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                    </div>
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Confirmar Nueva Contraseña</label>
                        <input type="password" v-model="passForm.confirmNewPassword" required
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                    </div>

                    <div v-if="passMsg" :class="passMsgType === 'error' ? 'text-red-400 bg-red-500/10' : 'text-green-400 bg-green-500/10'"
                        class="p-3 rounded text-sm text-center border border-white/10">
                        {{ passMsg }}
                    </div>

                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" @click="closePassModal"
                            class="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Cancelar</button>
                        <button type="submit" :disabled="isSavingPass"
                            class="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2">
                            <span v-if="isSavingPass" class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                            {{ isSavingPass ? 'Actualizando...' : 'Actualizar' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import authService from '@/services/authService';
import { showError, showToast } from '@/utils/alert';

const profile = ref({});
const isEditing = ref(false);
const isSaving = ref(false);
const editForm = ref({ name: '', phone: '', timezone: '' });

const isChangingPass = ref(false);
const isSavingPass = ref(false);
const passMsg = ref('');
const passMsgType = ref('');
const passForm = ref({ currentPassword: '', newPassword: '', confirmNewPassword: '' });

onMounted(async () => {
    loadProfile();
});

const loadProfile = async () => {
    try {
        const response = await authService.getProfile();
        if (response.success) {
            profile.value = response.data;
        }
    } catch (error) {
        console.error("Error cargando perfil:", error);
    }
};

const openEditModal = () => {
    editForm.value = {
        name: profile.value.name,
        phone: profile.value.phone,
        timezone: profile.value.timezone
    };
    isEditing.value = true;
};

const saveProfile = async () => {
    isSaving.value = true;
    try {
        const response = await authService.updateProfile(editForm.value);
        if (response.success) {
            profile.value = response.data;
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            currentUser.name = response.data.name;
            localStorage.setItem('user', JSON.stringify(currentUser));
            isEditing.value = false;
            showToast("Perfil actualizado exitosamente");
        }
    } catch (error) {
        console.error("Error actualizando perfil:", error);
        showError("No se pudo actualizar el perfil.");
    } finally {
        isSaving.value = false;
    }
};

const changePassword = async () => {
    passMsg.value = '';
    if (passForm.value.newPassword !== passForm.value.confirmNewPassword) {
        passMsg.value = "Las contraseñas nuevas no coinciden.";
        passMsgType.value = 'error';
        return;
    }
    isSavingPass.value = true;
    try {
        const response = await authService.changePassword(passForm.value);
        if (response.success) {
            passMsg.value = "Contraseña actualizada correctamente.";
            passMsgType.value = 'success';
            passForm.value = { currentPassword: '', newPassword: '', confirmNewPassword: '' };
            setTimeout(() => { isChangingPass.value = false; passMsg.value = ''; }, 1500);
            showToast("Contraseña actualizada exitosamente");
        } else {
            passMsg.value = response.message || "Error al cambiar contraseña.";
            passMsgType.value = 'error';
        }
    } catch (error) {
        passMsgType.value = 'error';
        if (error.response && error.response.data && error.response.data.message) {
            passMsg.value = error.response.data.message;
        } else {
            passMsg.value = "Ocurrió un error en el servidor.";
        }
    } finally {
        isSavingPass.value = false;
    }
};

const closePassModal = () => {
    isChangingPass.value = false;
    passMsg.value = '';
    passForm.value = { currentPassword: '', newPassword: '', confirmNewPassword: '' };
};

const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
};
</script>

<style scoped>
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-fade-in-up {
    animation: fadeInUp 0.2s ease-out;
}
</style>