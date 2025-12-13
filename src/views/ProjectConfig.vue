<template>
    <div class="h-screen bg-gray-950 text-white flex overflow-hidden">
        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto p-8 relative">
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] opacity-20'" />

            <div class="max-w-4xl mx-auto z-10 relative">
                <!-- Header -->
                <div class="mb-8 flex justify-between items-center">
                    <div>
                        <h1 class="text-4xl tracking-wide font-league font-bold mb-2">Configuración del Proyecto</h1>
                        <p class="text-gray-400">Administra los detalles, servicios e integraciones de tu negocio.</p>
                    </div>
                    <button @click="$router.back()"
                        class="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clip-rule="evenodd" />
                        </svg>
                        <span>Volver</span>
                    </button>
                </div>

                <!-- Tabs -->
                <div class="flex gap-4 border-b border-white/10 mb-8 overflow-x-auto">
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
                        Integraciones (Bots)
                    </button>
                </div>

                <!-- CONTENT: GENERAL / PHOTOS -->
                <div v-if="activeTab === 'general'" class="animate-fade-in-up space-y-6">
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6">
                        <h3 class="text-xl font-bold mb-4">Fotos del Negocio</h3>
                        <p class="text-sm text-gray-400 mb-4">Sube imágenes para personalizar tu presencia en la
                            plataforma.</p>

                        <div
                            class="border-2 border-dashed border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-500/50 hover:bg-white/5 transition-all cursor-pointer relative">
                            <input type="file" @change="handleFileUpload" accept="image/*"
                                class="absolute inset-0 opacity-0 cursor-pointer" :disabled="isUploading">
                            <div v-if="isUploading" class="flex flex-col items-center">
                                <div
                                    class="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-2">
                                </div>
                                <span class="text-sm text-indigo-400">Subiendo...</span>
                            </div>
                            <div v-else class="flex flex-col items-center">
                                <font-awesome-icon icon="images" class="text-4xl text-gray-500 mb-3" />
                                <span class="font-bold text-gray-300">Arrastra una imagen o haz click para subir</span>
                                <span class="text-xs text-gray-500 mt-1">PNG, JPG, WEBP hasta 5MB</span>
                            </div>
                        </div>

                        <!-- Gallery Preview (Mock for now, or real if we fetch photos) -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <!-- Placeholder for uploaded images -->
                            <div v-for="(photo, index) in uploadedPhotos" :key="index"
                                class="aspect-square bg-gray-800 rounded-lg overflow-hidden relative group">
                                <img :src="photo.url" class="w-full h-full object-cover">
                                <div
                                    class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <button class="text-red-400 hover:text-red-300"><font-awesome-icon
                                            icon="trash" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CONTENT: SERVICES -->
                <div v-if="activeTab === 'services'" class="animate-fade-in-up space-y-6">
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6">
                        <div class="flex justify-between items-center mb-6">
                            <div>
                                <h3 class="text-xl font-bold">Catálogo de Servicios</h3>
                                <p class="text-sm text-gray-400">Define los servicios que tus clientes pueden agendar.
                                </p>
                            </div>
                            <button @click="addServiceSlot"
                                class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                                + Nuevo Servicio
                            </button>
                        </div>

                        <div v-if="services.length === 0"
                            class="text-center py-12 text-gray-500 border border-white/5 rounded-xl bg-black/20">
                            No hay servicios configurados aún.
                        </div>

                        <div class="space-y-4">
                            <div v-for="(service, index) in services" :key="index"
                                class="bg-black/20 border border-white/5 rounded-xl p-4 flex gap-4 items-start">
                                <div class="flex-1 space-y-3">
                                    <input type="text" v-model="service.name" placeholder="Nombre del Servicio"
                                        class="w-full bg-transparent border-b border-gray-700 focus:border-indigo-500 outline-none text-white font-bold pb-1">
                                    <textarea v-model="service.description" placeholder="Descripción..." rows="2"
                                        class="w-full bg-transparent border border-gray-700 rounded-lg p-2 text-sm text-gray-300 focus:border-indigo-500 outline-none"></textarea>
                                    <div class="flex gap-4">
                                        <div class="flex items-center gap-2">
                                            <span class="text-gray-500 text-sm">$</span>
                                            <input type="number" v-model="service.price" placeholder="Precio"
                                                class="bg-transparent border-b border-gray-700 w-24 text-sm focus:border-indigo-500 outline-none">
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <span class="text-gray-500 text-sm">⏱️</span>
                                            <input type="number" v-model="service.duration" placeholder="Min"
                                                class="bg-transparent border-b border-gray-700 w-16 text-sm focus:border-indigo-500 outline-none">
                                            <span class="text-xs text-gray-500">min</span>
                                        </div>
                                    </div>
                                </div>
                                <button @click="removeService(index)"
                                    class="text-gray-500 hover:text-red-400 p-2"><font-awesome-icon
                                        icon="trash" /></button>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-end">
                            <button @click="saveServices" :disabled="isSavingServices"
                                class="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-colors">
                                {{ isSavingServices ? 'Guardando...' : 'Guardar Servicios' }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- CONTENT: INTEGRATIONS -->
                <div v-if="activeTab === 'integrations'" class="animate-fade-in-up space-y-6">

                    <!-- Whatsapp -->
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6">
                        <div class="flex items-center gap-3 mb-6">
                            <div
                                class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500 text-xl">
                                <font-awesome-icon :icon="['fab', 'whatsapp']" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold">Configuración de WhatsApp (Meta)</h3>
                                <p class="text-sm text-gray-400">Conecta tu número de WhatsApp Business API.</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-1">
                                <label class="text-xs text-gray-500 uppercase font-bold">Verify Token</label>
                                <input type="text" v-model="whatsappConfig.whatsappVerifyToken"
                                    placeholder="Token de verificación"
                                    class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none transition-colors">
                            </div>
                            <div class="space-y-1">
                                <label class="text-xs text-gray-500 uppercase font-bold">Phone Number ID</label>
                                <input type="text" v-model="whatsappConfig.whatsappPhoneNumberId"
                                    placeholder="ID del número de teléfono"
                                    class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none transition-colors">
                            </div>
                            <div class="space-y-1 md:col-span-2">
                                <label class="text-xs text-gray-500 uppercase font-bold">Access Token
                                    (Permanente)</label>
                                <input type="password" v-model="whatsappConfig.whatsappAccessToken"
                                    placeholder="Token de acceso de Meta"
                                    class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none transition-colors">
                            </div>
                        </div>

                        <div class="mt-6 flex justify-end">
                            <button @click="saveWhatsapp" :disabled="isSavingWhatsapp"
                                class="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors">
                                {{ isSavingWhatsapp ? 'Guardando...' : 'Guardar WhatsApp' }}
                            </button>
                        </div>
                    </div>

                    <!-- Telegram -->
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6">
                        <div class="flex items-center gap-3 mb-6">
                            <div
                                class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 text-xl">
                                <font-awesome-icon :icon="['fab', 'telegram']" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold">Configuración de Telegram</h3>
                                <p class="text-sm text-gray-400">Conecta tu Bot de Telegram.</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-1">
                                <label class="text-xs text-gray-500 uppercase font-bold">Bot Username</label>
                                <div class="relative">
                                    <span class="absolute left-4 top-2 text-gray-500">@</span>
                                    <input type="text" v-model="telegramConfig.botUsername" placeholder="MiNegocioBot"
                                        class="w-full bg-gray-950 border border-gray-700 rounded-lg pl-8 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors">
                                </div>
                            </div>
                            <div class="space-y-1 md:col-span-2">
                                <label class="text-xs text-gray-500 uppercase font-bold">Bot Token</label>
                                <input type="password" v-model="telegramConfig.botToken"
                                    placeholder="Ej: 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                                    class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors">
                            </div>
                        </div>

                        <div class="mt-6 flex justify-end">
                            <button @click="saveTelegram" :disabled="isSavingTelegram"
                                class="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors">
                                {{ isSavingTelegram ? 'Guardando...' : 'Guardar Telegram' }}
                            </button>
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

// Init
onMounted(async () => {
    if (projectId) {
        loadProjectData();
    }
});

const loadProjectData = async () => {
    try {
        const project = await projectService.getById(projectId);
        const data = project.data || project;

        // Populate Integrity fields if they exist in the response
        // Note: Backend response might not return secrets directly for security, 
        // but let's assume we can map what we get or just leave empty for "set new value".

        // Creating local previews for any existing photos if available in data
        // uploadedPhotos.value = data.photos || [];

        // Mock Services load
        const s = await projectService.getServices(projectId);
        services.value = s;

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
        // 1. Upload to backend
        const response = await projectService.uploadPhoto(projectId, file);

        // 2. Show local preview on success (or use URL from response)
        // Assuming response returns the photo URL or we create a local bloblink
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedPhotos.value.push({ url: e.target.result }); // Temporary preview
        };
        reader.readAsDataURL(file);

        alert("Foto subida exitosamente");
    } catch (error) {
        console.error("Error upload:", error);
        alert("Error al subir la foto");
    } finally {
        isUploading.value = false;
    }
};

// 2. Services
const addServiceSlot = () => {
    services.value.push({ name: '', description: '', price: 0, duration: 60 });
};

const removeService = (index) => {
    services.value.splice(index, 1);
};

const saveServices = async () => {
    try {
        isSavingServices.value = true;
        await projectService.saveServices(projectId, services.value);
        alert("Servicios actualizados (Mock)");
    } catch (error) {
        console.error(error);
        alert("Error guardando servicios");
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
/* Scrollbar custom styles if needed */
</style>
