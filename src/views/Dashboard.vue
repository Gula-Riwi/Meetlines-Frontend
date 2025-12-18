<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">

        <Sidebar />

        <main class="flex-1 flex flex-col overflow-hidden relative bg-blue-950">
            <div class="flex-1 overflow-y-auto p-4 md:p-8 z-10 scrollbar-hide">

                <!-- HEADER -->
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-2xl md:text-5xl tracking-wide font-league text-white">Dashboard con IA</h1>
                        <p class="text-gray-400 text-sm md:text-base">Analizando {{ projectName || 'Proyecto' }}</p>
                    </div>
                </div>

                <!-- METRICS GRID -->
                <section ref="swapyContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div v-for="stat in metricas" :key="stat.id" :data-swapy-slot="stat.id">
                        <div :data-swapy-item="stat.id" class="h-full">
                            <div
                                class="p-6 rounded-2xl bg-gray-900 border border-white/10 hover:border-indigo-500/50 transition-colors group cursor-grab active:cursor-grabbing h-full select-none">
                                <div class="flex justify-between items-start mb-4">
                                    <p class="text-sm font-medium text-gray-400">{{ stat.titulo }}</p>
                                    <span
                                        :class="stat.subio ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'"
                                        class="text-xs px-2 py-1 rounded-full font-bold">
                                        {{ stat.porcentaje }}
                                    </span>
                                </div>
                                <div class="flex items-end gap-1">
                                    <span v-if="stat.esMoneda" class="text-3xl font-bold text-white mb-1">$</span>
                                    <span v-if="stat.valorText" class="text-2xl font-bold text-white">{{ stat.valorText
                                        }}</span>
                                    <NumberTicker v-else :value="stat.valorNum" :decimalPlaces="stat.decimales || 0"
                                        class="text-4xl font-bold text-white group-hover:text-indigo-400 transition-colors" />
                                    <span v-if="stat.sufijo" class="text-sm text-gray-500 mb-2 ml-1">{{ stat.sufijo
                                        }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section v-if="aiInsights" class="mb-8">
                    <!-- MAIN AI HEADER / SUGGESTION -->
                    <div
                        class="mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center gap-4">
                        <div
                            class="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-xl shrink-0">
                            <font-awesome-icon icon="brain" />
                        </div>
                        <div>
                            <h3 class="text-white font-bold text-sm uppercase tracking-wide">Consejo de la IA</h3>
                            <p class="text-indigo-200 text-lg font-medium leading-tight">
                                {{ aiInsights.revenue?.suggestion || 'Analizando tu negocio para darte consejos...' }}
                            </p>
                        </div>
                    </div>

                    <!-- Bot Performance (Full Width) -->
                    <div
                        class="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all mb-8">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-bold text-white flex items-center gap-2">
                                <font-awesome-icon icon="robot" /> Rendimiento del Bot
                            </h3>
                            <span
                                class="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                                {{ aiInsights.botPerformance?.conversionRate?.toFixed(1) || 0 }}% Conv.
                            </span>
                        </div>

                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <!-- Stats... -->
                            <div class="bg-white/5 rounded-xl p-3 text-center">
                                <div class="text-2xl font-bold text-white">{{
                                    aiInsights.botPerformance?.totalConversations || 0 }}</div>
                                <div class="text-xs text-gray-400">Chats Totales</div>
                            </div>
                            <div class="bg-white/5 rounded-xl p-3 text-center">
                                <div class="text-2xl font-bold text-emerald-400">{{
                                    aiInsights.botPerformance?.appointmentsBooked || 0 }}</div>
                                <div class="text-xs text-gray-400">Citas Agendadas</div>
                            </div>
                            <div class="bg-white/5 rounded-xl p-3 text-center">
                                <div class="text-2xl font-bold text-yellow-400">{{
                                    aiInsights.botPerformance?.customerSatisfactionScore || '5.0' }}</div>
                                <div class="text-xs text-gray-400">Satisfacción</div>
                            </div>
                            <div class="bg-white/5 rounded-xl p-3 text-center">
                                <div class="text-2xl font-bold text-indigo-400">{{
                                    aiInsights.botPerformance?.averageResponseTime || 0 }}s</div>
                                <div class="text-xs text-gray-400">Tiempo Resp.</div>
                            </div>
                        </div>

                        <!-- Bot vs Human Bar -->
                        <div class="space-y-1 mt-4">
                            <div class="flex justify-between text-xs text-gray-400">
                                <span><font-awesome-icon icon="robot" /> Bot: {{
                                    aiInsights.botPerformance?.botConversations || 0 }}</span>
                                <span><font-awesome-icon icon="user" /> Humano: {{
                                    aiInsights.botPerformance?.humanConversations || 0 }}</span>
                            </div>
                            <div class="h-2 bg-gray-800 rounded-full overflow-hidden flex">
                                <div class="h-full bg-indigo-500"
                                    :style="`width: ${(aiInsights.botPerformance?.botConversations / (aiInsights.botPerformance?.totalConversations || 1)) * 100}%`">
                                </div>
                                <div class="h-full bg-purple-500"
                                    :style="`width: ${(aiInsights.botPerformance?.humanConversations / (aiInsights.botPerformance?.totalConversations || 1)) * 100}%`">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SECONDARY ROW: RISK & OPTIMIZATION -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        <!-- 1. Churn Risk (Restored) -->
                        <div
                            class="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-red-500/20 transition-all flex flex-col">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-bold text-white flex items-center gap-2">
                                    <font-awesome-icon icon="chart-line" /> Riesgo de Fuga
                                </h3>
                                <span class="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold">
                                    {{ (highRiskClients.length + mediumRiskClients.length) }} En Riesgo
                                </span>
                            </div>

                            <div class="flex-1 space-y-4">
                                <div v-if="highRiskClients.length > 0">
                                    <h4 class="text-xs uppercase text-red-400 font-bold mb-2">🔴 Prioridad Alta</h4>
                                    <div class="space-y-2">
                                        <div v-for="(risk, i) in highRiskClients.slice(0, 3)" :key="'h' + i"
                                            class="flex justify-between text-sm p-2 bg-red-500/10 rounded">
                                            <span class="text-white">Nivel Crítico</span>
                                            <span class="text-gray-400">{{ risk.count }} clientes</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="mediumRiskClients.length > 0">
                                    <h4 class="text-xs uppercase text-orange-400 font-bold mb-2 mt-2">🟠 Riesgo Medio
                                    </h4>
                                    <div class="space-y-2">
                                        <div v-for="(risk, i) in mediumRiskClients.slice(0, 3)" :key="'m' + i"
                                            class="flex justify-between text-sm p-2 bg-orange-500/10 rounded">
                                            <span class="text-white">Alerta</span>
                                            <span class="text-gray-400">{{ risk.count }} clientes</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="highRiskClients.length === 0 && mediumRiskClients.length === 0"
                                    class="text-center py-6 text-gray-500">
                                    Todo en orden. Clientes felices.
                                </div>
                            </div>
                        </div>

                        <!-- 2. Optimization (Existing) -->
                        <div
                            class="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-all">
                            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <font-awesome-icon icon="bolt" /> Optimización Operativa
                            </h3>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-white/5 rounded-xl p-4">
                                    <div class="text-gray-400 text-xs uppercase mb-1">Mejor Hora</div>
                                    <div class="text-xl font-bold text-white">{{ aiInsights.optimization?.bestTime ||
                                        '--:--' }}</div>
                                    <div class="text-indigo-400 text-xs">{{ aiInsights.optimization?.bestDay || 'N/A' }}
                                    </div>
                                </div>
                                <div class="bg-white/5 rounded-xl p-4">
                                    <div class="text-gray-400 text-xs uppercase mb-1">Personal</div>
                                    <div :class="aiInsights.staffing?.actionRequired ? 'text-red-400' : 'text-green-400'"
                                        class="text-xl font-bold flex items-center gap-2">
                                        <font-awesome-icon
                                            :icon="aiInsights.staffing?.actionRequired ? 'triangle-exclamation' : 'check-circle'" />
                                        {{ aiInsights.staffing?.actionRequired ? 'Alerta' : 'Optimo' }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="aiInsights.staffing?.actionRequired"
                                class="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
                                {{ aiInsights.staffing?.message }}
                            </div>
                            <div v-else
                                class="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-300 text-sm">
                                Carga de trabajo balanceada.
                            </div>
                        </div>
                    </div>
                </section>

                <!-- TABLA DE PEDIDOS -->
                <section class="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl mb-20">
                    <div class="p-6 border-b border-white/10 flex justify-between items-center">
                        <h3 class="text-lg font-bold text-white flex items-center gap-2">
                            <font-awesome-icon icon="calendar-days" /> Gestión de Citas
                        </h3>
                        <span class="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">En vivo</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr
                                    class="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                                    <th class="p-4 font-medium w-1/4">Cliente</th>
                                    <th class="p-4 font-medium">Servicio</th>
                                    <th class="p-4 font-medium text-right">Valor</th>
                                    <th class="p-4 font-medium text-center">Estado Actual</th>
                                    <th class="p-4 font-medium text-center">Confirmar</th>
                                    <th class="p-4 font-medium text-center">Cancelar</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                <tr v-for="pedido in ultimosPedidos" :key="pedido.id"
                                    class="hover:bg-white/5 transition-colors group">
                                    <td class="p-4">
                                        <div class="font-bold text-white group-hover:text-indigo-300 transition-colors">
                                            {{ pedido.cliente }}</div>
                                        <div class="text-xs text-gray-500 flex items-center gap-1">
                                            <font-awesome-icon icon="clock" /> {{ formatDate(pedido.startTime) }}
                                        </div>
                                    </td>
                                    <td class="p-4 text-gray-300 font-medium">{{ pedido.producto }}</td>
                                    <td class="p-4 font-bold text-white text-right">{{ pedido.total }}</td>

                                    <!-- Estado Actual -->
                                    <td class="p-4 text-center">
                                        <span :class="estadoClases[pedido.estadoClass] || estadoClases.pending"
                                            class="px-3 py-1 rounded-full text-xs font-bold border capitalize inline-block min-w-[80px]">
                                            {{ pedido.estado }}
                                        </span>
                                    </td>

                                    <!-- Action: Confirm -->
                                    <td class="p-4 text-center">
                                        <button
                                            v-if="pedido.estado !== 'confirmed' && pedido.estado !== 'cancelled' && pedido.estado !== 'completed'"
                                            @click="updateStatus(project.id, pedido.id, 'confirmed')"
                                            class="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all border border-indigo-500/20 hover:scale-105 active:scale-95"
                                            title="Confirmar Cita">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </button>
                                        <span v-else class="text-gray-600 text-xs">-</span>
                                    </td>

                                    <!-- Action: Cancel -->
                                    <td class="p-4 text-center">
                                        <button v-if="pedido.estado !== 'cancelled' && pedido.estado !== 'completed'"
                                            @click="updateStatus(project.id, pedido.id, 'cancelled')"
                                            class="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 hover:scale-105 active:scale-95"
                                            title="Cancelar Cita">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                        <span v-else class="text-gray-600 text-xs">-</span>
                                    </td>
                                </tr>
                                <tr v-if="ultimosPedidos.length === 0" class="text-center">
                                    <td colspan="6" class="p-12 text-gray-500 italic">
                                        No hay citas agendadas recientes.
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
import appointmentService from '@/services/appointmentService'; // Import Service

const router = useRouter();

const estadoClases = {
    completed: 'bg-green-500/10 text-green-400 border-green-500/20',
    confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    pending: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

// Referencias
const swapyContainer = ref();
const project = ref(null);
const projectName = ref('');
const isLoading = ref(true);
const aiInsights = ref(null);
const ultimosPedidos = ref([]); // Dynamic list

// Computed Logic
import { computed } from 'vue';
import Swal from 'sweetalert2';

const highRiskClients = computed(() => {
    if (!aiInsights.value?.churnRisks) return [];
    // Adjust logic based on your backend. Assuming RiskLevel matches "Alto"/"High"
    return aiInsights.value.churnRisks.filter(r => r.riskLevel === 'Alto' || r.riskLevel === 'High' || r.riskLevel >= 3);
});

const mediumRiskClients = computed(() => {
    if (!aiInsights.value?.churnRisks) return [];
    return aiInsights.value.churnRisks.filter(r => r.riskLevel === 'Medio' || r.riskLevel === 'Medium' || r.riskLevel === 2);
});

// Métricas
const metricas = ref([
    { id: 'revenue', titulo: 'Oportunidad de Ingresos', valorNum: 0, esMoneda: true, porcentaje: 'N/A', subio: true, sufijo: '' },
    { id: 'churn', titulo: 'Riesgo de Fuga', valorNum: 0, esMoneda: false, porcentaje: '0', subio: false, sufijo: 'Clientes' },
    { id: 'optimization', titulo: 'Mejor Horario', valorText: '--:--', esMoneda: false, porcentaje: 'Optimo', subio: true },
    { id: 'staffing', titulo: 'Personal Faltante', valorText: 'No', esMoneda: false, porcentaje: 'Stable', subio: true }
]);

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

const loadDashboardData = async () => {
    try {
        isLoading.value = true;

        if (project.value?.id) {
            const projectId = project.value.id;

            // 1. Load AI Insights
            try {
                const aiResponse = await aiInsightsService.getProjectInsights(projectId);
                // Service returns response.data (the body: { success: true, data: ... })
                if (aiResponse.success) {
                    const data = aiResponse.data;
                    aiInsights.value = data;

                    // Map API data to Cards
                    metricas.value[0].valorNum = data.revenue?.totalLostRevenue || 0;

                    // Count churn risks
                    const churnCount = data.churnRisks?.length || 0;
                    metricas.value[1].valorNum = churnCount;
                    metricas.value[1].porcentaje = churnCount > 0 ? `${churnCount} Riesgos` : '0';
                    metricas.value[1].subio = churnCount === 0; // Green if 0 risks

                    metricas.value[2].valorText = data.optimization?.bestTime || '--:--';
                    metricas.value[2].sufijo = data.optimization?.bestDay || '';
                    metricas.value[3].valorText = data.staffing?.actionRequired ? 'Requiere Atención' : 'Adecuado';
                    metricas.value[3].porcentaje = data.staffing?.actionRequired ? 'Alerta' : 'Estable';
                    metricas.value[3].subio = !data.staffing?.actionRequired;
                } else {
                    console.warn('AI Insights API returned success: false', aiResponse);
                }
            } catch (err) {
                console.error("AI Insights Error (Non-blocking):", err);
            }

            // 2. Load Appointments (Real Data)
            try {
                const apptResponse = await appointmentService.getAll(projectId);
                if (apptResponse.data) {
                    const allAppts = Array.isArray(apptResponse.data) ? apptResponse.data : [];
                    ultimosPedidos.value = allAppts
                        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
                        .slice(0, 10)
                        .map(a => ({
                            id: a.id,
                            cliente: a.clientName || 'Cliente',
                            producto: a.serviceName || 'Servicio General',
                            total: formatCurrency(a.price || 0),
                            estado: a.status,
                            estadoClass: a.status.toLowerCase(),
                            startTime: a.startTime
                        }));
                }
            } catch (err) {
                console.error("Appointments Error:", err);
            }
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    } finally {
        isLoading.value = false;
    }
};

const updateStatus = async (projectId, appointmentId, newStatus) => {
    const actionText = newStatus === 'confirmed' ? 'confirmar' : 'cancelar';
    const result = await Swal.fire({
        title: `¿${actionText.charAt(0).toUpperCase() + actionText.slice(1)} Cita?`,
        text: `Esta acción notificará al cliente.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: newStatus === 'confirmed' ? '#6366f1' : '#ef4444',
        cancelButtonColor: '#374151',
        confirmButtonText: `Sí, ${actionText}`,
        cancelButtonText: 'Volver',
        background: '#1f2937',
        color: '#fff'
    });

    if (!result.isConfirmed) return;

    try {
        await appointmentService.updateStatus(projectId, appointmentId, newStatus);

        await Swal.fire({
            title: '¡Actualizado!',
            icon: 'success',
            background: '#1f2937',
            color: '#fff',
            timer: 1500,
            showConfirmButton: false
        });

        if (project.value) await loadDashboardData();
    } catch (error) {
        Swal.fire({ title: 'Error', text: 'No se pudo actualizar', icon: 'error', background: '#1f2937', color: '#fff' });
        console.error(error);
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
                // Ignore 404/403 here to allow dashboard load if config missing but user wants to see it
                // router.push(`/projects/${proj.id}/bot-setup`);
                // return;
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
                // Fallback to localStorage project if not in subdomain
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
