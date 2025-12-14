<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">

        <Sidebar />

        <main class="flex-1 flex flex-col relative bg-blue-950 min-w-0">

            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />

            <div class="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative pb-20 md:pb-8">

                <div class="max-w-5xl mx-auto">
                    <div
                        class="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 class="text-2xl md:text-4xl tracking-wide font-league font-bold mb-1 md:mb-2">
                                Configuración</h1>
                            <p class="text-sm md:text-base text-gray-400">Administra los detalles y servicios de tu
                                negocio.</p>
                        </div>
                    </div>

                    <div class="border-b border-white/10 mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
                        <div class="flex gap-4 min-w-max pb-1">
                            <button @click="activeTab = 'general'"
                                :class="['px-4 py-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap',
                                    activeTab === 'general' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-white']">
                                General y Fotos
                            </button>
                            <button @click="activeTab = 'services'"
                                :class="['px-4 py-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap',
                                    activeTab === 'services' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-white']">
                                Servicios Ofrecidos
                            </button>
                            <button @click="activeTab = 'integrations'"
                                :class="['px-4 py-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap',
                                    activeTab === 'integrations' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-white']">
                                Integraciones
                            </button>
                        </div>
                    </div>

                    <!-- TAB: GENERAL / PHOTOS -->
                    <div v-if="activeTab === 'general'" class="animate-fade-in-up space-y-6">
                        <div class="bg-gray-900 border border-white/10 rounded-2xl p-4 md:p-6">
                            <h3 class="text-lg md:text-xl font-bold mb-2">Fotos del Negocio</h3>
                            <p class="text-sm text-gray-400 mb-4">Sube imágenes para personalizar tu presencia.</p>

                            <!-- Dropzone -->
                            <div
                                class="border-2 border-dashed border-gray-700 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center hover:border-indigo-500/50 hover:bg-white/5 transition-all cursor-pointer relative">
                                <input type="file" @change="handleFileUpload" accept="image/*"
                                    class="absolute inset-0 opacity-0 cursor-pointer" :disabled="isUploading">

                                <div v-if="isUploading" class="flex flex-col items-center">
                                    <div
                                        class="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-2">
                                    </div>
                                    <span class="text-sm text-indigo-400">Subiendo...</span>
                                </div>
                                <div v-else class="flex flex-col items-center">
                                    <font-awesome-icon :icon="['fas', 'images']"
                                        class="text-3xl md:text-4xl text-gray-500 mb-3" />
                                    <span class="font-bold text-gray-300 text-sm md:text-base">Toca para subir
                                        imagen</span>
                                    <span class="text-xs text-gray-500 mt-1">PNG, JPG hasta 5MB</span>
                                </div>
                            </div>

                            <!-- Gallery Preview -->
                            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                                <div v-for="(photo, index) in uploadedPhotos" :key="index"
                                    class="aspect-square bg-gray-800 rounded-lg overflow-hidden relative group shadow-lg">
                                    <img :src="photo.url" class="w-full h-full object-cover">
                                    <div
                                        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <button @click="deletePhoto(photo.id)"
                                            class="text-red-400 hover:text-red-300 p-2">
                                            <font-awesome-icon :icon="['fas', 'trash']" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- TAB: SERVICES -->
                    <div v-if="activeTab === 'services'" class="animate-fade-in-up space-y-6">
                        <div class="bg-gray-900 border border-white/10 rounded-2xl p-4 md:p-6">
                            <div
                                class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <div>
                                    <h3 class="text-lg md:text-xl font-bold">Catálogo de Servicios</h3>
                                    <p class="text-sm text-gray-400">Define los servicios que tus clientes pueden
                                        agendar.</p>
                                </div>
                                <button @click="addServiceSlot"
                                    class="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg">
                                    + Nuevo Servicio
                                </button>
                            </div>

                            <div v-if="services.length === 0"
                                class="text-center py-12 text-gray-500 border border-white/5 rounded-xl bg-black/20 text-sm">
                                No hay servicios configurados aún.
                            </div>

                            <div class="space-y-4">
                                <!-- Service Card -->
                                <div v-for="(service, index) in services" :key="index"
                                    class="bg-black/20 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start relative group">

                                    <div class="flex-1 space-y-3 w-full">
                                        <!-- Nombre -->
                                        <input type="text" v-model="service.name" placeholder="Nombre del Servicio"
                                            class="w-full bg-transparent border-b border-gray-700 focus:border-indigo-500 outline-none text-white font-bold pb-1 transition-colors">

                                        <!-- Descripción -->
                                        <textarea v-model="service.description" placeholder="Descripción..." rows="2"
                                            class="w-full bg-transparent border border-gray-700 rounded-lg p-2 text-sm text-gray-300 focus:border-indigo-500 outline-none transition-colors resize-none"></textarea>

                                        <!-- Precio y Duración -->
                                        <div class="flex gap-4">
                                            <div
                                                class="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-white/5">
                                                <font-awesome-icon :icon="['fas', 'dollar-sign']" />
                                                <input type="number" v-model="service.price" placeholder="0"
                                                    class="bg-transparent w-20 text-sm focus:outline-none text-white font-mono">
                                            </div>
                                            <div
                                                class="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-white/5">
                                                <font-awesome-icon :icon="['fas', 'clock']" />
                                                <input type="number" v-model="service.durationMinutes" placeholder="60"
                                                    class="bg-transparent w-16 text-sm focus:outline-none text-white font-mono">
                                                <span class="text-xs text-gray-500">min</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Botón Eliminar -->
                                    <button @click="removeService(index)"
                                        class="absolute top-2 right-2 md:static md:self-center text-gray-600 hover:text-red-400 p-2 transition-colors">
                                        <font-awesome-icon :icon="['fas', 'trash']" />
                                    </button>
                                </div>
                            </div>

                            <div
                                class="mt-6 flex justify-end sticky bottom-0 bg-gray-900 pt-4 pb-2 md:static md:bg-transparent md:p-0">
                                <button @click="saveServices" :disabled="isSavingServices"
                                    class="w-full md:w-auto px-6 py-3 md:py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl md:rounded-lg font-bold transition-colors">
                                    {{ isSavingServices ? 'Guardando...' : 'Guardar Servicios' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- TAB: INTEGRATIONS -->
                    <div v-if="activeTab === 'integrations'" class="animate-fade-in-up space-y-6">

                        <!-- Whatsapp -->
                        <div class="bg-gray-900 border border-white/10 rounded-2xl p-4 md:p-6">
                            <div class="flex items-center gap-3 mb-6">
                                <div
                                    class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500 text-xl">
                                    <font-awesome-icon :icon="['fab', 'whatsapp']" />
                                </div>
                                <div>
                                    <h3 class="text-lg md:text-xl font-bold">WhatsApp API</h3>
                                    <p class="text-xs md:text-sm text-gray-400">Conecta tu número Business.</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div class="space-y-2">
                                    <div class="flex justify-between items-end">
                                        <label
                                            class="text-xs text-gray-500 uppercase font-bold flex items-center gap-2">
                                            Verify Token
                                            <span
                                                class="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded border border-indigo-500/30 normal-case font-normal">
                                                Créalo tú mismo
                                            </span>
                                        </label>
                                    </div>

                                    <input type="text" v-model="whatsappConfig.whatsappVerifyToken"
                                        placeholder="Ej: mi_token_secreto_123"
                                        class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none transition-colors text-sm">

                                    <!-- CAJA DE INFORMACIÓN (Callout) -->
                                    <div
                                        class="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3 flex gap-3 items-start">
                                        <font-awesome-icon :icon="['fas', 'circle-info']"
                                            class="text-yellow-500 mt-0.5 text-sm" />

                                        <div class="text-xs text-gray-400 leading-relaxed">
                                            <span class="text-yellow-500 font-bold block mb-1">¡No olvides este
                                                dato!</span>
                                            Inventa una contraseña segura aquí, guárdala en un lugar seguro.
                                        </div>
                                    </div>
                                </div>
                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Phone ID</label>
                                    <input type="text" v-model="whatsappConfig.whatsappPhoneNumberId"
                                        placeholder="ID del número de teléfono"
                                        class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none transition-colors text-sm">
                                </div>
                                <div class="space-y-1 md:col-span-2">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Access Token</label>
                                    <input type="password" v-model="whatsappConfig.whatsappAccessToken"
                                        placeholder="Token de acceso de Meta"
                                        class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none transition-colors text-sm">
                                </div>
                            </div>

                            <div class="mt-6 flex justify-end">
                                <button @click="saveWhatsapp" :disabled="isSavingWhatsapp"
                                    class="w-full md:w-auto px-6 py-3 md:py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl md:rounded-lg font-bold transition-colors">
                                    {{ isSavingWhatsapp ? 'Guardando...' : 'Guardar WhatsApp' }}
                                </button>
                            </div>
                        </div>

                        <!-- Telegram -->
                        <div class="bg-gray-900 border border-white/10 rounded-2xl p-4 md:p-6">
                            <div class="flex items-center gap-3 mb-6">
                                <div
                                    class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 text-xl">
                                    <font-awesome-icon :icon="['fab', 'telegram']" />
                                </div>
                                <div>
                                    <h3 class="text-lg md:text-xl font-bold">Telegram Bot</h3>
                                    <p class="text-xs md:text-sm text-gray-400">Conecta tu Bot.</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div class="space-y-1">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Bot Username</label>
                                    <div class="relative">
                                        <span class="absolute left-3 top-2 text-gray-500 text-sm">@</span>
                                        <input type="text" v-model="telegramConfig.botUsername"
                                            placeholder="MiNegocioBot"
                                            class="w-full bg-gray-950 border border-gray-700 rounded-lg pl-7 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm">
                                    </div>
                                </div>
                                <div class="space-y-1 md:col-span-2">
                                    <label class="text-xs text-gray-500 uppercase font-bold">Bot Token</label>
                                    <input type="password" v-model="telegramConfig.botToken"
                                        placeholder="Ej: 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                                        class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm">
                                </div>
                            </div>

                            <div class="mt-6 flex justify-end">
                                <button @click="saveTelegram" :disabled="isSavingTelegram"
                                    class="w-full md:w-auto px-6 py-3 md:py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl md:rounded-lg font-bold transition-colors">
                                    {{ isSavingTelegram ? 'Guardando...' : 'Guardar Telegram' }}
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import projectService from '@/services/projectService';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import Sidebar from '@/components/Sidebar.vue';

const route = useRoute();
const projectId = route.params.projectId;
const activeTab = ref('general');

// Loading States
const isUploading = ref(false);
const isSavingServices = ref(false);
const isSavingWhatsapp = ref(false);
const isSavingTelegram = ref(false);

// Data Models
const uploadedPhotos = ref([]);
const services = ref([]);
const whatsappConfig = ref({
    whatsappVerifyToken: '',
    whatsappPhoneNumberId: '',
    whatsappAccessToken: ''
});
const telegramConfig = ref({
    botToken: '',
    botUsername: ''
});

onMounted(async () => {
    if (projectId) {
        loadProjectData();
    }
});

const loadProjectData = async () => {
    try {
        const project = await projectService.getById(projectId);
        // const data = project.data || project; // Unused

        const [s, photos] = await Promise.all([
            projectService.getProjectServices(projectId),
            projectService.getPhotos(projectId)
        ]);

        services.value = s;
        uploadedPhotos.value = photos;
    } catch (error) {
        console.error("Error loading project config:", error);
    }
};

// --- HANDLERS ---

// 1. Photos
const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        isUploading.value = true;
        const response = await projectService.uploadPhoto(projectId, file);
        // Agregar la foto retornada por el backend a la lista
        uploadedPhotos.value.push(response);
        alert("Foto subida exitosamente");
    } catch (error) {
        console.error("Error upload:", error);
        alert("Error al subir la foto");
    } finally {
        isUploading.value = false;
    }
};

const deletePhoto = async (photoId) => {
    if (!confirm("¿Estás seguro de eliminar esta imagen?")) return;

    try {
        await projectService.deletePhoto(projectId, photoId);
        uploadedPhotos.value = uploadedPhotos.value.filter(p => p.id !== photoId);
        // alert("Foto eliminada");
    } catch (error) {
        console.error("Error deleting photo:", error);
        alert("Error al eliminar la foto");
    }
};

// 2. Services
const addServiceSlot = () => {
    services.value.push({
        name: '',
        description: '',
        price: 0,
        durationMinutes: 60,
        currency: 'COP',
        isActive: true
    });
};

const removeService = async (index) => {
    const service = services.value[index];

    // Si tiene ID, borrar del backend
    if (service.id) {
        if (!confirm("¿Eliminar este servicio permanentemente?")) return;
        try {
            await projectService.deleteService(service.id);
        } catch (error) {
            console.error(error);
            alert("Error al eliminar servicio");
            return;
        }
    }

    services.value.splice(index, 1);
};

const saveServices = async () => {
    try {
        isSavingServices.value = true;

        const promises = services.value.map(async (service) => {
            // Preparar payload
            const payload = {
                name: service.name,
                description: service.description,
                price: service.price,
                currency: service.currency || 'COP',
                durationMinutes: service.durationMinutes || service.duration || 60, // Fallback
                isActive: true
            };

            if (service.id) {
                // Update
                return projectService.updateService(service.id, payload);
            } else {
                // Create
                return projectService.createService(projectId, payload);
            }
        });

        await Promise.all(promises);

        // Recargar para obtener los IDs nuevos y data fresca
        const updatedServices = await projectService.getProjectServices(projectId);
        services.value = updatedServices;

        alert("Servicios guardados correctamente");
    } catch (error) {
        console.error(error);
        alert("Error guardando servicios (Ver consola)");
    } finally {
        isSavingServices.value = false;
    }
};

// 3. Integrations
const saveWhatsapp = async () => {
    try {
        isSavingWhatsapp.value = true;
        await projectService.configureWhatsapp(projectId, whatsappConfig.value);
        alert("Configuración de WhatsApp guardada");
    } catch (error) {
        console.error(error);
        alert("Error guardando configuración de WhatsApp");
    } finally {
        isSavingWhatsapp.value = false;
    }
};

const saveTelegram = async () => {
    try {
        isSavingTelegram.value = true;
        await projectService.configureTelegram(projectId, telegramConfig.value);
        alert("Configuración de Telegram guardada");
    } catch (error) {
        console.error(error);
        alert("Error guardando configuración de Telegram");
    } finally {
        isSavingTelegram.value = false;
    }
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>