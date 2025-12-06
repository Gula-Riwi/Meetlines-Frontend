<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">

        <Sidebar />

        <main class="flex-1 flex flex-col overflow-hidden relative bg-blue-950">

            <!-- Header -->
            <header
                class="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-gray-950/50 backdrop-blur-sm z-10">
                <h2 class="text-2xl font-bold">Mi Perfil</h2>
            </header>

            <div class="flex-1 overflow-y-auto p-8 z-10">

                <!-- CARD DE PERFIL -->
                <div
                    class="max-w-4xl mx-auto bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">

                    <div class="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

                    <div class="px-8 pb-8">
                        <div class="relative -mt-16 mb-6 flex justify-between items-end">
                            <div class="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800">
                                <img :src="profile.profilePictureUrl || `https://ui-avatars.com/api/?name=${profile.name}&background=random`"
                                    class="w-full h-full object-cover" alt="Profile">
                            </div>

                            <div v-if="profile.isEmailVerified"
                                class="mb-4 px-4 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-sm font-bold flex items-center gap-2">
                                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Cuenta Verificada
                            </div>
                        </div>

                        <div class="space-y-6">
                            <div>
                                <h1 class="text-3xl font-bold text-white mb-1">{{ profile.name }}</h1>
                                <p class="text-gray-400">{{ profile.email }}</p>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Teléfono</label>
                                    <p class="text-lg text-gray-200">{{ profile.phone || 'No registrado' }}</p>
                                </div>
                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Zona Horaria</label>
                                    <p class="text-lg text-gray-200">{{ profile.timezone || 'UTC' }}</p>
                                </div>
                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Método de Registro</label>
                                    <p class="text-lg text-gray-200 flex items-center gap-2">
                                        <span v-if="profile.authProvider === 1">Google / OAuth</span>
                                        <span v-else>Correo y Contraseña</span>
                                    </p>
                                </div>
                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Miembro Desde</label>
                                    <p class="text-lg text-gray-200">{{ formatDate(profile.createdAt) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Botón para abrir Modal -->
                    <div class="p-4 flex justify-between border-t">
                        <button v-if="profile.authProvider == 0" @click="isChangingPass = true"
                            class="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-white/5 rounded-lg font-bold transition-colors">
                            Cambiar Contraseña
                        </button>
                        <div v-else></div>
                        <button @click="openEditModal"
                            class="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors shadow-lg">
                            Editar Perfil
                        </button>
                    </div>
                </div>
            </div>

            <!-- MODAL DE EDICIÓN -->
            <div v-if="isEditing"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                <div
                    class="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">

                    <div class="p-6 border-b border-white/10">
                        <h3 class="text-5xl tracking-wide font-bold text-white font-league">Editar Información</h3>
                    </div>

                    <form @submit.prevent="saveProfile" class="p-6 space-y-4">

                        <!-- Nombre -->
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Nombre Completo</label>
                            <input type="text" v-model="editForm.name" required
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                        </div>

                        <!-- Teléfono -->
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Teléfono</label>
                            <input type="tel" v-model="editForm.phone"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                        </div>

                        <!-- Zona Horaria -->
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Zona Horaria</label>
                            <!-- Sugerencia: Podrías usar un <select> aquí, pero lo dejaré como input según requerimiento -->
                            <input type="text" v-model="editForm.timezone"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                        </div>

                        <!-- Botones Modal -->
                        <div class="flex justify-end gap-3 pt-4">
                            <button type="button" @click="isEditing = false"
                                class="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" :disabled="isSaving"
                                class="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2">
                                <span v-if="isSaving"
                                    class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                                {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="isChangingPass"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                <div
                    class="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
                    <div class="p-6 border-b border-white/10">
                        <h3 class="text-5xl font-league tracking-wide font-bold text-white">Seguridad</h3>
                    </div>

                    <form @submit.prevent="changePassword" class="p-6 space-y-4">

                        <!-- Contraseña Actual -->
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Contraseña Actual</label>
                            <input type="password" v-model="passForm.currentPassword" required
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                        </div>

                        <!-- Nueva Contraseña -->
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Nueva Contraseña</label>
                            <input type="password" v-model="passForm.newPassword" required
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                        </div>

                        <!-- Confirmar -->
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Confirmar Nueva Contraseña</label>
                            <input type="password" v-model="passForm.confirmNewPassword" required
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                        </div>

                        <!-- Mensaje de Error/Éxito del Modal -->
                        <div v-if="passMsg"
                            :class="passMsgType === 'error' ? 'text-red-400 bg-red-500/10' : 'text-green-400 bg-green-500/10'"
                            class="p-3 rounded text-sm text-center border border-white/10">
                            {{ passMsg }}
                        </div>

                        <div class="flex justify-end gap-3 pt-4">
                            <button type="button" @click="closePassModal"
                                class="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Cancelar</button>
                            <button type="submit" :disabled="isSavingPass"
                                class="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2">
                                <span v-if="isSavingPass"
                                    class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                                {{ isSavingPass ? 'Actualizando...' : 'Actualizar' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import authService from '@/services/authService';

const profile = ref({});
const isEditing = ref(false);
const isSaving = ref(false);


const editForm = ref({
    name: '',
    phone: '',
    timezone: ''
});

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
        }
    } catch (error) {
        console.error("Error actualizando perfil:", error);
        alert("No se pudo actualizar el perfil.");
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
/* Animación simple para que el modal aparezca suave */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.2s ease-out;
}
</style>