<template>
    <div class="min-h-screen bg-gray-950 font-sans text-white relative overflow-hidden flex flex-col">

        <!-- Navbar Simple -->
        <nav
            class="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-gray-900/50 backdrop-blur-sm z-20">
            <div class="text-5xl italic font-bold font-league tracking-wide">MeetLines</div>
            <div class="flex items-center gap-3">
                <span class="text-sm text-gray-400 hidden md:block">Hola, {{ user.name }}</span>
                <button @click="logout" class="text-sm text-red-400 hover:text-red-300 hover:font-bold">Salir</button>
            </div>
        </nav>

        <!-- Contenido -->
        <main class="flex-1 container mx-auto px-4 py-12 z-10">

            <div class="mb-10 text-center">
                <h1 class="text-7xl md:text-8xl font-bold font-league mb-4">Mis <span>
                        <LineShadowText shadowColor="white">Negocios</LineShadowText>
                    </span></h1>
                <p class="text-gray-400">Selecciona un proyecto para gestionar o crea uno nuevo.</p>
            </div>

            <!-- GRID DE PROYECTOS -->
            <div v-if="isLoading" class="flex justify-center mt-20 z-20">
                <div class="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto z-20">

                <!-- 2. Botón Crear Nuevo -->
                <button @click="showCreateModal = true"
                    class="group z-20 flex flex-col items-center justify-center min-h-[250px] border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-white/5 transition-all duration-300">
                    <div
                        class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 group-hover:text-white"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span class="font-bold text-gray-400 group-hover:text-white">Crear Nuevo Negocio</span>
                </button>
                <!-- 1. Tarjetas de Proyectos Existentes -->
                <div v-for="project in projects" :key="project.id" @click="selectProject(project)"
                    class="group relative bg-gray-900 border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 z-20 flex flex-col">

                    <!-- Profile Photo / Cover -->
                    <div class="w-full h-32 mb-4 rounded-xl bg-gray-800 overflow-hidden relative">
                        <img v-if="project.profilePhotoUrl" :src="project.profilePhotoUrl" alt="Cover"
                            class="w-full h-full object-cover">
                        <div v-else
                            class="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
                            <span class="text-4xl font-bold text-white/20">{{ project.name.charAt(0).toUpperCase()
                                }}</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-start mb-4">
                        <span class="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/5">
                            {{ project.industry || 'General' }}
                        </span>

                        <!-- Action Buttons -->
                        <div class="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                            @click.stop>
                            <button @click.stop="openEditModal(project)"
                                class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-colors"
                                title="Editar">
                                <font-awesome-icon icon="pen" class="text-xs" />
                            </button>
                            <button @click.stop="confirmDelete(project)"
                                class="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors"
                                title="Eliminar">
                                <font-awesome-icon icon="trash" class="text-xs" />
                            </button>
                        </div>
                    </div>

                    <h3 class="text-xl font-bold text-white mb-1">{{ project.name }}</h3>
                    <p v-if="project.subdomain" class="text-sm text-indigo-400 mb-4">{{ project.subdomain
                    }}.meet-lines.com</p>
                    <p class="text-sm text-gray-500 line-clamp-2">{{ project.description || 'Sin descripción' }}</p>

                    <div
                        class="mt-6 flex items-center text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                        Entrar al Panel <span class="ml-2">→</span>
                    </div>
                </div>
            </div>
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] opacity-20'" />
        </main>

        <!-- MODAL DE CREACIÓN -->
        <div v-if="showCreateModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div
                class="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-white/10">
                    <h3 class="text-4xl tracking-wide font-league font-bold text-white">{{ isEditing ? 'Editar Proyecto'
                        : 'Nuevo Proyecto' }}</h3>
                    <p class="text-gray-400 text-sm mt-1">Completa la información de tu negocio</p>
                </div>

                <form @submit.prevent="createProject" class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <!-- Columna Izquierda: Información Básica -->
                    <div class="space-y-4">
                        <h4 class="text-indigo-400 font-bold uppercase text-xs tracking-wider mb-2">Información General
                        </h4>

                        <!-- Nombre -->
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Nombre del Negocio</label>
                            <input type="text" v-model="newProject.name" required placeholder="Ej: Restaurante Mexicano"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                        </div>

                        <!-- Industria -->
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Industria</label>
                            <select v-model="newProject.industry" required
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                                <option value="" disabled>Selecciona una opción</option>
                                <option value="Restaurante">Restaurante</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Salud">Salud / Clínica</option>
                                <option value="Servicios">Servicios Profesionales</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <!-- Descripción -->
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Descripción</label>
                            <textarea v-model="newProject.description" rows="3" placeholder="Breve descripción..."
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors"></textarea>
                        </div>

                        <!-- Foto de Perfil (Archivo) -->
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Logo/Foto del Negocio</label>

                            <!-- Preview Area -->
                            <div class="flex items-center gap-4 mb-2" v-if="previewImage || newProject.profilePhotoUrl">
                                <div
                                    class="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden border border-white/10 relative group">
                                    <img :src="previewImage || newProject.profilePhotoUrl"
                                        class="w-full h-full object-cover">
                                    <!-- Button to remove/change -->
                                </div>
                                <div class="text-xs text-indigo-400 font-medium">
                                    {{ previewImage ? 'Imagen seleccionada' : 'Imagen actual' }}
                                </div>
                            </div>

                            <input type="file" @change="handleFileUpload" accept="image/*" ref="fileInput"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500">
                            <p class="text-xs text-gray-500">Sube una imagen cuadrada (PNG, JPG) para tu logo.</p>
                        </div>

                        <div class="border-t border-white/10 pt-4 mt-2">
                            <h4 class="text-indigo-400 font-bold uppercase text-xs tracking-wider mb-2">Dirección</h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-1 col-span-2">
                                    <label class="text-sm text-gray-400">Dirección</label>
                                    <input type="text" v-model="newProject.address" placeholder="Av. Principal 123"
                                        class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                                </div>
                                <div class="space-y-1">
                                    <label class="text-sm text-gray-400">Ciudad</label>
                                    <input type="text" v-model="newProject.city" placeholder="Ciudad"
                                        class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                                </div>
                                <div class="space-y-1">
                                    <label class="text-sm text-gray-400">País</label>
                                    <input type="text" v-model="newProject.country" placeholder="País"
                                        class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Columna Derecha: Ubicación en Mapa -->
                    <div class="space-y-4 flex flex-col">
                        <h4 class="text-indigo-400 font-bold uppercase text-xs tracking-wider mb-2">Ubicación (Opcional)
                        </h4>
                        <p class="text-xs text-gray-400 mb-2">Haz click en el mapa para marcar la ubicación exacta de tu
                            negocio.</p>

                        <div class="flex-1 rounded-xl overflow-hidden border border-gray-700 min-h-[300px] relative">
                            <GoogleMap :api-key="googleMapsApiKey" style="width: 100%; height: 100%" :center="mapCenter"
                                :zoom="15" @click="handleMapClick">
                                <Marker v-if="newProject.latitude && newProject.longitude"
                                    :options="{ position: { lat: newProject.latitude, lng: newProject.longitude } }" />
                            </GoogleMap>

                            <div v-if="!newProject.latitude"
                                class="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/20">
                                <span
                                    class="bg-black/70 px-3 py-1 rounded-full text-xs text-white backdrop-blur-sm">Click
                                    para seleccionar ubicación</span>
                            </div>
                        </div>

                        <div class="flex items-center gap-4 text-xs text-gray-500">
                            <div>Lat: {{ newProject.latitude?.toFixed(6) || '---' }}</div>
                            <div>Lng: {{ newProject.longitude?.toFixed(6) || '---' }}</div>
                        </div>

                        <div class="flex justify-end gap-3 pt-4 mt-auto">
                            <button type="button" @click="closeModal"
                                class="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Cancelar</button>
                            <button type="submit" :disabled="isCreating"
                                class="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2">
                                <span v-if="isCreating"
                                    class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                                {{ isCreating ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Proyecto') }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import projectService from '@/services/projectService';
import botConfigService from '@/services/botConfigService';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import LineShadowText from '@/components/LineShadowText.vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { confirmAction, showError, showSuccess } from '@/utils/alert';

const router = useRouter();
const user = ref({});
const projects = ref([]);
const isLoading = ref(true);
const showCreateModal = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const isCreating = ref(false);
const fileInput = ref(null);
const previewImage = ref(null);
const selectedFile = ref(null);


const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS;
const mapCenter = ref({ lat: 6.247836486763944, lng: -75.57957695784035 });

const newProject = ref({
    name: '',
    industry: '',
    description: '',
    address: '',
    city: '',
    country: '',
    latitude: null,
    longitude: null,
    profilePhotoUrl: ''
});

onMounted(async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) user.value = JSON.parse(storedUser);
    await loadProjects();
});

const loadProjects = async () => {
    try {
        isLoading.value = true;
        const response = await projectService.getAll();

        if (response && response.projects) {
            projects.value = response.projects;
        } else if (response.data && response.data.projects) {
            projects.value = response.data.projects;
        }

    } catch (error) {
        console.error("Error cargando proyectos:", error);
    } finally {
        isLoading.value = false;
    }
};

const handleMapClick = (event) => {
    if (event.latLng) {
        newProject.value.latitude = event.latLng.lat();
        newProject.value.longitude = event.latLng.lng();
    }
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const openEditModal = async (project) => {
    try {
        isLoading.value = true;
        const fullProject = await projectService.getById(project.id);

        // Handle if response is wrapped in data or direct
        const projectData = fullProject.data || fullProject;

        isEditing.value = true;
        editingId.value = project.id;
        newProject.value = {
            name: projectData.name,
            industry: projectData.industry,
            description: projectData.description,
            address: projectData.address || '',
            city: projectData.city || '',
            country: projectData.country || '',
            latitude: projectData.latitude || null,
            longitude: projectData.longitude || null,
            profilePhotoUrl: projectData.profilePhotoUrl || ''
        };

        // Set map center if project has location
        if (projectData.latitude && projectData.longitude) {
            mapCenter.value = { lat: projectData.latitude, lng: projectData.longitude };
        }

        // Reset file selection
        selectedFile.value = null;
        previewImage.value = null;

        showCreateModal.value = true;
    } catch (error) {
        console.error("Error fetching project details:", error);
        showError("Error al cargar los detalles del proyecto.");
    } finally {
        isLoading.value = false;
    }
};

const confirmDelete = async (project) => {
    const isConfirmed = await confirmAction(
        '¿Eliminar Proyecto?',
        `¿Estás seguro de que quieres eliminar el proyecto "${project.name}"? Esta acción no se puede deshacer.`
    );
    if (!isConfirmed) return;

    try {
        await projectService.delete(project.id);
        await loadProjects();
        showSuccess("Proyecto eliminado con éxito");
    } catch (error) {
        console.error("Error eliminando proyecto:", error);
        showError("Error al eliminar el proyecto.");
    }
};

const createProject = async () => {
    try {
        isCreating.value = true;

        const payload = new FormData();
        payload.append('name', newProject.value.name);
        payload.append('industry', newProject.value.industry);
        payload.append('description', newProject.value.description || '');
        payload.append('address', newProject.value.address || '');
        payload.append('city', newProject.value.city || '');
        payload.append('country', newProject.value.country || '');
        if (newProject.value.latitude) payload.append('latitude', newProject.value.latitude);
        if (newProject.value.longitude) payload.append('longitude', newProject.value.longitude);

        // Append file if selected
        if (selectedFile.value) {
            payload.append('profilePhoto', selectedFile.value);
        }

        let response;
        if (isEditing.value) {
            response = await projectService.update(editingId.value, payload);
            showSuccess("Proyecto actualizado con éxito");
        } else {
            response = await projectService.create(payload);
            showSuccess("Proyecto creado con éxito");
        }
        if (response) {
            await loadProjects();
            showCreateModal.value = false;
            resetForm();
        }
    } catch (error) {
        console.error("Error guardando proyecto:", error);
        const errorMessage = error.response?.data?.error || "Error al guardar el proyecto.";
        showError(errorMessage);
    } finally {
        isCreating.value = false;
    }
};

const resetForm = () => {
    newProject.value = {
        name: '',
        industry: '',
        description: '',
        address: '',
        city: '',
        country: '',
        latitude: null,
        longitude: null,
        profilePhotoUrl: ''
    };
    isEditing.value = false;
    editingId.value = null;
};

// Hook into modal close to reset form if canceled
const closeModal = () => {
    showCreateModal.value = false;
    resetForm();
};

const selectProject = async (project) => {
    localStorage.setItem('currentProject', JSON.stringify(project));

    // Check if bot configuration exists for this project
    try {
        const botConfig = await botConfigService.getByProjectId(project.id);

        if (botConfig) {
            // Bot config exists, go directly to dashboard
            router.push('/dashboard');
        } else {
            // No bot config, redirect to setup wizard
            router.push(`/projects/${project.id}/bot-setup`);
        }
    } catch (error) {
        console.error('Error checking bot config:', error);
        // On error, assume no config and go to setup
        router.push(`/projects/${project.id}/bot-setup`);
    }
};

const logout = async () => {
    const isConfirmed = await confirmAction(
        '¿Cerrar Sesión?',
        '¿Estás seguro que deseas cerrar sesión?'
    );
    if (isConfirmed) {
        try {
            const refreshToken = Cookies.get('refresh_token');
            if (refreshToken) await authService.logout(refreshToken);
        } catch (e) { console.error(e); }
        finally {
            Cookies.remove('auth_token');
            Cookies.remove('refresh_token');
            localStorage.clear();
            router.push('/login');

            showSuccess('Sesión cerrada');
        }
    }
}
</script>

<style scoped>
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