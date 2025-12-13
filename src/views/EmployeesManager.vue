<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">
        <Sidebar />
        <div class="flex-1 flex flex-col relative bg-blue-950 min-w-0">

            <header class="h-16 md:h-20 flex items-center justify-between px-4 md:px-8 border-b border-white/5 bg-gray-900/50 backdrop-blur-sm z-10 sticky top-0">
                <div>
                    <h2 class="text-2xl md:text-4xl tracking-wide font-bold font-league truncate">Gestión de Equipo</h2>
                    <p class="text-xs md:text-sm text-gray-400 hidden md:block">Administra quién tiene acceso a este proyecto</p>
                </div>
                
                <button @click="openCreateModal"
                    class="px-3 py-2 md:px-4 md:py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20 text-sm md:text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    <span class="hidden md:inline">Nuevo Empleado</span>
                    <span class="md:hidden">Nuevo</span>
                </button>
            </header>
            <div class="flex-1 overflow-y-auto p-4 md:p-8 z-10 pb-20 md:pb-8">


                <div v-if="loading" class="flex justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>

                <div v-else-if="employees.length === 0"
                    class="text-center py-12 md:py-16 bg-gray-900/50 rounded-2xl border border-white/10 border-dashed mx-auto max-w-2xl">
                    <div class="text-5xl md:text-6xl mb-4">👥</div>
                    <h3 class="text-lg md:text-xl font-bold mb-2">No hay empleados aún</h3>
                    <p class="text-gray-400 text-sm md:text-base px-4">Agrega colaboradores para que te ayuden a gestionar el bot.</p>
                </div>

                <!-- Tabla de Empleados -->
                <div v-else class="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr class="bg-gray-900/80 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                                    <th class="p-4 font-medium">Nombre / Usuario</th>
                                    <th class="p-4 font-medium hidden md:table-cell">Email</th>
                                    <th class="p-4 font-medium">Rol</th>
                                    <th class="p-4 font-medium">Estado</th>
                                    <th class="p-4 font-medium text-right hidden lg:table-cell">Fecha Ingreso</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                <tr v-for="emp in employees" :key="emp.id" class="hover:bg-white/5 transition-colors group">
                                    <td class="p-4">
                                        <div class="font-bold text-white text-sm md:text-base">{{ emp.name }}</div>
                                        <div class="text-xs md:text-sm text-indigo-400">@{{ emp.username }}</div>
                                        <!-- Email visible solo en móvil aquí debajo -->
                                        <div class="md:hidden text-xs text-gray-500 mt-1">{{ emp.email }}</div>
                                    </td>
                                    
                                    <td class="p-4 text-gray-300 hidden md:table-cell">{{ emp.email }}</td>
                                    
                                    <td class="p-4">
                                        <span class="px-2 py-1 rounded-md text-[10px] md:text-xs font-bold bg-white/10 text-gray-300 border border-white/10 uppercase">
                                            {{ emp.role }}
                                        </span>
                                        <div class="text-xs text-gray-500 mt-1" v-if="emp.area">{{ emp.area }}</div>
                                    </td>
                                    
                                    <td class="p-4">
                                        <span v-if="emp.isActive" class="text-green-400 flex items-center gap-1 text-xs md:text-sm font-medium">
                                            <span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500"></span> Activo
                                        </span>
                                        <span v-else class="text-red-400 flex items-center gap-1 text-xs md:text-sm font-medium">
                                            <span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500"></span> Inactivo
                                        </span>
                                    </td>
                                    
                                    <td class="p-4 text-right text-gray-500 text-sm hidden lg:table-cell">
                                        {{ new Date(emp.createdAt).toLocaleDateString() }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
        </div>

        <!-- MODAL CREAR EMPLEADO -->
        <div v-if="showModal"
            class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            @click.self="showModal = false">
            <div class="bg-gray-900 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
                <div class="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 class="text-xl font-bold">Agregar Empleado</h2>
                    <button @click="showModal = false" class="text-gray-400 hover:text-white text-xl">✕</button>
                </div>

                <form @submit.prevent="createEmployee" class="p-6 space-y-4">

                    <!-- Nombre -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Nombre Completo</label>
                        <input v-model="form.name" type="text" required
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                    </div>

                    <!-- Email -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Email</label>
                        <input v-model="form.email" type="email" required
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                    </div>

                    <!-- Rol y Area (Grid en 1 col móvil, 2 en desktop) -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Rol</label>
                            <select v-model="form.role"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                                <option value="Admin">Admin</option>
                                <option value="Agente">Agente</option>
                                <option value="Viewer">Observador</option>
                            </select>
                        </div>
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Área</label>
                            <input v-model="form.area" type="text" placeholder="Ej: Ventas"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                        </div>
                    </div>
                    
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Nombre de Usuario</label>
                        <input v-model="form.username" type="text" required placeholder="Ej: juan.perez"
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors">
                    </div>

                    <div class="flex justify-end gap-3 pt-4 border-t border-white/10 mt-4">
                        <button type="button" @click="showModal = false"
                            class="px-4 py-2 text-gray-300 hover:text-white font-medium">Cancelar</button>
                        <button type="submit" :disabled="saving"
                            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center gap-2">
                            <span v-if="saving"
                                class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                            {{ saving ? 'Guardando...' : 'Crear Usuario' }}
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
import Sidebar from '../components/Sidebar.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import employeeService from '@/services/employeeService';

const router = useRouter();
const employees = ref([]);
const loading = ref(true);
const showModal = ref(false);
const saving = ref(false);
const projectId = ref('');

const form = ref({
    name: '',
    username: '',
    email: '',
    role: 'Agente',
    area: ''
});

onMounted(() => {
    const currentProject = localStorage.getItem('currentProject');
    if (currentProject) {
        const project = JSON.parse(currentProject);
        projectId.value = project.id;
        loadEmployees();
    } else {
        router.push('/projects');
    }
});

const loadEmployees = async () => {
    loading.value = true;
    try {
        const response = await employeeService.getByProject(projectId.value);
        if (response.success) {
            employees.value = response.data;
        }
    } catch (error) {
        console.error("Error cargando empleados:", error);
    } finally {
        loading.value = false;
    }
};

const openCreateModal = () => {
    form.value = { name: '', username: '', email: '', role: 'Agente', area: '' };
    showModal.value = true;
};

const createEmployee = async () => {
    saving.value = true;
    try {
        const payload = {
            projectId: projectId.value,
            ...form.value
        };

        const response = await employeeService.create(payload);

        if (response.success) {
            await loadEmployees();
            showModal.value = false;
        }
    } catch (error) {
        console.error("Error creando empleado:", error);
        alert(error.response?.data?.message || "Error al crear empleado");
    } finally {
        saving.value = false;
    }
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