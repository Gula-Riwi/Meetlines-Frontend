<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">

        <Sidebar />

        <main class="flex-1 flex flex-col overflow-hidden relative bg-blue-950">
            <div class="flex-1 overflow-y-auto p-8 z-10 scrollbar-hide">
                
                <!-- HEADER -->
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-3xl font-bold text-white">Dashboard con IA 🧠</h1>
                        <p class="text-gray-400">Analizando {{ projectName || 'Proyecto' }}</p>
                    </div>
                </div>

                <!-- METRICS GRID -->
                <section ref="swapyContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div v-for="stat in metricas" :key="stat.id" :data-swapy-slot="stat.id">
                        <div :data-swapy-item="stat.id" class="h-full">
                            <div class="p-6 rounded-2xl bg-gray-900 border border-white/10 hover:border-indigo-500/50 transition-colors group cursor-grab active:cursor-grabbing h-full select-none">
                                <div class="flex justify-between items-start mb-4">
                                    <p class="text-sm font-medium text-gray-400">{{ stat.titulo }}</p>
                                    <span :class="stat.subio ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'" class="text-xs px-2 py-1 rounded-full font-bold">
                                        {{ stat.porcentaje }}
                                    </span>
                                </div>
                                <div class="flex items-end gap-1">
                                    <span v-if="stat.esMoneda" class="text-3xl font-bold text-white mb-1">$</span>
                                    <span v-if="stat.valorText" class="text-2xl font-bold text-white">{{ stat.valorText }}</span>
                                    <NumberTicker v-else :value="stat.valorNum" :decimalPlaces="stat.decimales || 0" class="text-4xl font-bold text-white group-hover:text-indigo-400 transition-colors" />
                                    <span v-if="stat.sufijo" class="text-sm text-gray-500 mb-2 ml-1">{{ stat.sufijo }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- AI RADAR SECTION -->
                <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- Reactivation Radar -->
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6">
                        <h3 class="text-lg font-bold text-white mb-4">📡 Radar de Reactivación</h3>
                        <div v-if="isLoading" class="text-gray-400 text-center py-8">Cargando análisis...</div>
                        <div v-else-if="!aiInsights" class="text-gray-400 text-center py-8">No hay datos disponibles</div>
                        <div v-else>
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-gray-400">Clientes en Riesgo:</span>
                                <span class="text-red-400 font-bold">{{ metricas[1].valorNum }}</span>
                            </div>
                             <div class="p-4 bg-white/5 rounded-lg text-sm text-gray-300">
                                La IA ha detectado {{ metricas[1].valorNum }} clientes que no han vuelto en 30 días.
                                <br>
                                <span class="text-indigo-300 mt-2 block">Sugerencia: {{ aiInsights.revenue?.suggestion || 'Enviar promoción.' }}</span>
                             </div>
                        </div>
                    </div>

                    <!-- Golden Hour / Staffing -->
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6">
                         <h3 class="text-lg font-bold text-white mb-4">⚡ Optimización</h3>
                         <div v-if="aiInsights" class="space-y-4">
                            <div class="flex items-start gap-4">
                                <div class="bg-indigo-500/20 p-3 rounded-lg text-indigo-400">🕒</div>
                                <div>
                                    <h4 class="font-bold text-white">Mejor Momento para Contactar</h4>
                                    <p class="text-gray-400 text-sm">
                                        {{ aiInsights.optimization.bestDay }} a las {{ aiInsights.optimization.bestTime }}
                                        (Tasa de respuesta: {{ (aiInsights.optimization.responseRate * 100).toFixed(0) }}%)
                                    </p>
                                </div>
                            </div>
                            <div v-if="aiInsights.staffing.actionRequired" class="flex items-start gap-4">
                                 <div class="bg-red-500/20 p-3 rounded-lg text-red-400">⚠️</div>
                                 <div>
                                    <h4 class="font-bold text-white">Alerta de Personal</h4>
                                    <p class="text-gray-400 text-sm">{{ aiInsights.staffing.message }}</p>
                                 </div>
                            </div>
                         </div>
                    </div>
                </section>

                <!-- TABLA DE PEDIDOS -->
                <section class="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div class="p-6 border-b border-white/10 flex justify-between items-center">
                        <h3 class="text-lg font-bold text-white">📦 Últimos Pedidos</h3>
                        <button class="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                            Ver todos
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                                    <th class="p-4 font-medium">Cliente</th>
                                    <th class="p-4 font-medium">Producto</th>
                                    <th class="p-4 font-medium">Total</th>
                                    <th class="p-4 font-medium">Estado</th>
                                    <th class="p-4 font-medium text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                <tr v-for="pedido in ultimosPedidos" :key="pedido.id" class="hover:bg-white/5 transition-colors">
                                    <td class="p-4 font-medium text-white">{{ pedido.cliente }}</td>
                                    <td class="p-4 text-gray-300">{{ pedido.producto }}</td>
                                    <td class="p-4 font-bold text-white">{{ pedido.total }}</td>
                                    <td class="p-4">
                                        <span :class="estadoClases[pedido.estadoClass]" class="px-3 py-1 rounded-full text-xs font-bold border">
                                            {{ pedido.estado }}
                                        </span>
                                    </td>
                                    <td class="p-4 text-right">
                                        <button class="text-gray-400 hover:text-white transition-colors">•••</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSwapy } from 'swapy';
import { useRouter } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import NumberTicker from '@/components/NumberTicker.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import { getCurrentSubdomain, isInProjectSubdomain } from '@/services/tenantService';
import api from '@/services/api';
import botConfigService from '@/services/botConfigService';
import aiInsightsService from '@/services/aiInsightsService';

const router = useRouter();

const estadoClases = {
    completed: 'bg-green-500/10 text-green-400 border-green-500/20',
    pending: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    warning: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

// Referencias
const swapyContainer = ref();
const project = ref(null);
const projectName = ref('');
const isLoading = ref(true);
const aiInsights = ref(null);

// Métricas
const metricas = ref([
    { id: 'revenue', titulo: 'Oportunidad de Ingresos', valorNum: 0, esMoneda: true, porcentaje: 'N/A', subio: true, sufijo: '' },
    { id: 'churn', titulo: 'Riesgo de Fuga', valorNum: 0, esMoneda: false, porcentaje: '0', subio: false, sufijo: 'Clientes' },
    { id: 'optimization', titulo: 'Mejor Horario', valorText: '--:--', esMoneda: false, porcentaje: 'Optimo', subio: true },
    { id: 'staffing', titulo: 'Personal Faltante', valorText: 'No', esMoneda: false, porcentaje: 'Stable', subio: true }
]);

const ultimosPedidos = ref([
    { id: 1, cliente: 'Juan Pérez', producto: 'Diseño Logo', total: '$150', estado: 'Completado', estadoClass: 'completed' },
    { id: 2, cliente: 'Ana Gomez', producto: 'Consultoría', total: '$80', estado: 'En Proceso', estadoClass: 'pending' },
    { id: 3, cliente: 'Restaurante X', producto: 'Gestión Redes', total: '$300', estado: 'Pendiente', estadoClass: 'warning' },
    { id: 4, cliente: 'Tech Solutions', producto: 'Chatbot Web', total: '$500', estado: 'Completado', estadoClass: 'completed' },
    { id: 5, cliente: 'Carlos Ruiz', producto: 'Soporte Técnico', total: '$50', estado: 'Pendiente', estadoClass: 'warning' },
]);

const loadDashboardData = async () => {
    try {
        isLoading.value = true;
        
        // Load AI Insights if project exists
        if (project.value?.id) {
            const response = await aiInsightsService.getProjectInsights(project.value.id);
            if (response.data?.success) {
                const data = response.data.data;
                aiInsights.value = data;

                // Map API data to Cards
                metricas.value[0].valorNum = data.revenue?.totalLostRevenue || 0;
                metricas.value[1].valorNum = data.churnRisks?.reduce((acc, curr) => acc + curr.count, 0) || 0;
                metricas.value[2].valorText = data.optimization?.bestTime || '--:--';
                metricas.value[2].sufijo = data.optimization?.bestDay || '';
                metricas.value[3].valorText = data.staffing?.actionRequired ? 'Requiere Atención' : 'Adecuado';
            }
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    // 1. Check Bot Config
    (async () => {
        const currentProject = localStorage.getItem('currentProject');
        if (currentProject) {
            const proj = JSON.parse(currentProject);
            try {
                const botConfig = await botConfigService.getByProjectId(proj.id);
                if (!botConfig) {
                    router.push(`/projects/${proj.id}/bot-setup`);
                    return;
                }
            } catch (error) {
                router.push(`/projects/${proj.id}/bot-setup`);
                return;
            }
        }
    })();

    // 2. Load Project & Data
    (async () => {
        try {
            // First check subdomain project
            if (isInProjectSubdomain()) {
                const sub = getCurrentSubdomain();
                const resp = await api.get('/Projects');
                if (resp && resp.data && resp.data.success) {
                    const data = resp.data.data;
                    const projects = data.projects || data;
                    const found = projects.find(p => p.subdomain === sub);
                    if (found) {
                        project.value = found;
                        projectName.value = found.name;
                    }
                }
            } else {
                 // Fallback to localStorage project if not in subdomain (for dashboard general usage)
                 const currentProject = localStorage.getItem('currentProject');
                 if (currentProject) {
                    const proj = JSON.parse(currentProject);
                    project.value = proj;
                    projectName.value = proj.name;
                 }
            }

            // Once project is set, load data
            if (project.value) {
                await loadDashboardData();
            }

        } catch (e) {
            console.error('Error cargando proyecto:', e);
            isLoading.value = false;
        }
    })();

    if (swapyContainer.value) {
        const swapy = createSwapy(swapyContainer.value, {
            animation: 'dynamic'
        });
        swapy.onSwap((event) => {
             // Optional: handle swap
        });
    }
});
</script>
