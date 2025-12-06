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
                <h1 class="text-7xl md:text-8xl font-bold font-league mb-4">Mis <span><LineShadowText shadowColor="white">Negocios</LineShadowText></span></h1>
                <p class="text-gray-400">Selecciona un proyecto para gestionar o crea uno nuevo.</p>
            </div>

            <!-- GRID DE PROYECTOS -->
            <div v-if="isLoading" class="flex justify-center mt-20 z-20">
                <div class="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto z-20">

                <!-- 1. Tarjetas de Proyectos Existentes -->
                <div v-for="project in projects" :key="project.id" @click="selectProject(project)"
                    class="group relative bg-gray-900 border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10">

                    <div class="flex justify-between items-start mb-4">
                        <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl">
                            🏢
                        </div>
                        <span class="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/5">
                            {{ project.industry || 'General' }}
                        </span>
                    </div>

                    <h3 class="text-xl font-bold text-white mb-1">{{ project.name }}</h3>
                    <p class="text-sm text-indigo-400 mb-4">{{ project.subdomain }}.meetlines.com</p>
                    <p class="text-sm text-gray-500 line-clamp-2">{{ project.description || 'Sin descripción' }}</p>

                    <div
                        class="mt-6 flex items-center text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                        Entrar al Panel <span class="ml-2">→</span>
                    </div>
                </div>

                <!-- 2. Botón Crear Nuevo (Tarjeta Punteada) -->
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

            </div>
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
            squares-class-name="hover:fill-indigo-500/50"
            :class="'[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] opacity-20'" />
        </main>

        <!-- MODAL DE CREACIÓN -->
        <div v-if="showCreateModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div
                class="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
                <div class="p-6 border-b border-white/10">
                    <h3 class="text-5xl tracking-wide font-league font-bold text-white">Nuevo Proyecto</h3>
                </div>

                <form @submit.prevent="createProject" class="p-6 space-y-4">
                    <!-- Nombre -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Nombre del Negocio</label>
                        <input type="text" v-model="newProject.name" required placeholder="Ej: Restaurante Mexicano"
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                    </div>

                    <!-- Subdominio -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Subdominio (URL)</label>
                        <div class="flex">
                            <input type="text" v-model="newProject.subdomain" required placeholder="restaurante-mx"
                                class="flex-1 bg-gray-950 border border-gray-700 rounded-l-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                            <span
                                class="bg-gray-800 border border-l-0 border-gray-700 text-gray-400 px-3 py-2 rounded-r-lg text-sm flex items-center">
                                .meetlines.com
                            </span>
                        </div>
                    </div>

                    <!-- Industria -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Industria</label>
                        <select v-model="newProject.industry"
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

                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" @click="showCreateModal = false"
                            class="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Cancelar</button>
                        <button type="submit" :disabled="isCreating"
                            class="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2">
                            <span v-if="isCreating"
                                class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                            {{ isCreating ? 'Creando...' : 'Crear Proyecto' }}
                        </button>
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
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import LineShadowText from '@/components/LineShadowText.vue';

const router = useRouter();
const user = ref({});
const projects = ref([]);
const isLoading = ref(true);
const showCreateModal = ref(false);
const isCreating = ref(false);

const newProject = ref({
    name: '',
    subdomain: '',
    industry: '',
    description: ''
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
        if (response.success) {
            projects.value = response.data;
        }
    } catch (error) {
        console.error("Error cargando proyectos:", error);
    } finally {
        isLoading.value = false;
    }
};

const createProject = async () => {
    try {
        isCreating.value = true;
        const response = await projectService.create(newProject.value);
        if (response.success) {
            await loadProjects();
            showCreateModal.value = false;
            newProject.value = { name: '', subdomain: '', industry: '', description: '' };
        }
    } catch (error) {
        console.error("Error creando proyecto:", error);
        alert("Error al crear el proyecto. Verifica que el subdominio no esté en uso.");
    } finally {
        isCreating.value = false;
    }
};

const selectProject = (project) => {
    localStorage.setItem('currentProject', JSON.stringify(project));
    router.push('/dashboard');
};

const logout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('refresh_token');
    localStorage.clear();
    router.push('/login');
};
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