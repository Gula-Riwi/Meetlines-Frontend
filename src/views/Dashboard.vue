<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">

        <Sidebar />

        <main class="flex-1 flex flex-col overflow-hidden relative bg-blue-950">
            <div class="flex-1 overflow-y-auto p-8 z-10 scrollbar-hide">
                
                <!-- METRICAS (Swapy) -->
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
                                    <NumberTicker :value="stat.valorNum" :decimalPlaces="stat.decimales || 0"
                                        class="text-4xl font-bold text-white group-hover:text-indigo-400 transition-colors" />
                                    <span v-if="stat.sufijo" class="text-xl text-gray-500 mb-2 ml-1">{{
                                        stat.sufijo }}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <!-- AI INSIGHTS SECTION -->
                <section v-if="insights" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <!-- Staffing & Golden Hour -->
                    <div class="bg-gray-900 border border-indigo-500/30 rounded-2xl p-6 shadow-lg shadow-indigo-500/10">
                        <div class="flex items-center gap-2 mb-4">
                             <div class="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                 </svg>
                             </div>
                             <h3 class="text-lg font-bold text-white">Oportunidades IA</h3>
                        </div>
                        
                        <div class="space-y-4">
                            <!-- Staffing -->
                            <div v-if="insights.staffing?.actionRequired" class="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                                <h4 class="text-orange-400 font-bold mb-1">⚠️ Refuerzo de Personal</h4>
                                <p class="text-gray-300 text-sm">{{ insights.staffing.message }}</p>
                            </div>
                            <div v-else class="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <h4 class="text-green-400 font-bold mb-1">✅ Personal Optimizado</h4>
                                <p class="text-gray-300 text-sm">{{ insights.staffing?.message }}</p>
                            </div>

                            <!-- Golden Hour -->
                            <div class="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                                <h4 class="text-purple-400 font-bold mb-1">🌟 Hora Dorada</h4>
                                <p class="text-gray-300 text-sm">{{ insights.optimization?.suggestion }}</p> 
                                <p class="text-gray-500 text-xs mt-1">Mejor hora: {{ insights.optimization?.bestTime }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Revenue & Churn -->
                    <div class="bg-gray-900 border border-pink-500/30 rounded-2xl p-6 shadow-lg shadow-pink-500/10">
                         <div class="flex items-center gap-2 mb-4">
                             <div class="p-2 bg-pink-500/20 rounded-lg text-pink-400">
                                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                             </div>
                             <h3 class="text-lg font-bold text-white">Impacto Financiero</h3>
                        </div>

                        <div class="space-y-4">
                             <!-- Revenue -->
                             <div class="p-4 bg-gray-800/50 rounded-xl">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-gray-400 text-sm">Ingresos Recuperables</span>
                                    <span class="text-green-400 font-bold">${{ formatMoney(insights.revenue?.totalLostRevenue) }}</span>
                                </div>
                                <p class="text-gray-500 text-xs">{{ insights.revenue?.suggestion }}</p>
                             </div>

                             <!-- Churn -->
                             <div class="grid grid-cols-2 gap-4">
                                 <div class="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                                     <span class="block text-2xl font-bold text-red-400">{{ getChurnCount(insights.churnRisks, 'Alto') }}</span>
                                     <span class="text-xs text-red-300 uppercase">Riesgo Alto</span>
                                 </div>
                                 <div class="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
                                     <span class="block text-2xl font-bold text-yellow-400">{{ getChurnCount(insights.churnRisks, 'Medio') }}</span>
                                     <span class="text-xs text-yellow-300 uppercase">Riesgo Medio</span>
                                 </div>
                             </div>
                        </div>
                    </div>
                </section>

                <!-- TABLA DE PEDIDOS (Tasks) -->
                <section class="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div class="p-6 border-b border-white/10 flex justify-between items-center">
                        <h3 class="text-lg font-bold text-white">📦 Actividad Reciente</h3>
                        <button class="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                            Ver todos
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr
                                    class="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                                    <th class="p-4 font-medium">Cliente</th>
                                    <th class="p-4 font-medium">Tarea/Servicio</th>
                                    <th class="p-4 font-medium">Fecha</th>
                                    <th class="p-4 font-medium">Estado</th>
                                    <th class="p-4 font-medium text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                <tr v-for="task in ultimosPedidos" :key="task.id"
                                    class="hover:bg-white/5 transition-colors">
                                    <td class="p-4 font-medium text-white">{{ task.clientName }}</td>
                                    <td class="p-4 text-gray-300">{{ task.title }}</td>
                                    <td class="p-4 font-bold text-white text-sm">{{ formatDate(task.date) }}</td>
                                    <td class="p-4">
                                        <span :class="getEstadoClass(task.status)"
                                            class="px-3 py-1 rounded-full text-xs font-bold border">
                                            {{ task.status }}
                                        </span>
                                    </td>
                                    <td class="p-4 text-right">
                                        <button class="text-gray-400 hover:text-white transition-colors">•••</button>
                                    </td>
                                </tr>
                                <tr v-if="ultimosPedidos.length === 0">
                                    <td colspan="5" class="p-8 text-center text-gray-500">No hay actividad reciente.</td>
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
import dashboardService from '@/services/dashboardService';
import aiInsightsService from '@/services/aiInsightsService';

const router = useRouter();

const swapyContainer = ref();
const project = ref(null);
const insights = ref(null);

const metricas = ref([
    { id: 'sales', titulo: 'Ventas del Mes', valorNum: 0, esMoneda: true, porcentaje: '0%', subio: true },
    { id: 'chats', titulo: 'Conversaciones IA', valorNum: 0, esMoneda: false, porcentaje: '0%', subio: true },
    { id: 'orders', titulo: 'Citas Agendadas', valorNum: 0, esMoneda: false, porcentaje: '0%', subio: true },
    { id: 'hours', titulo: 'Horas Ahorradas', valorNum: 0, esMoneda: false, sufijo: 'h', porcentaje: '0%', subio: true },
]);

const ultimosPedidos = ref([]);

// Helpers
const formatMoney = (val) => new Intl.NumberFormat('es-CO').format(val || 0);

const getChurnCount = (risks, level) => {
    if(!risks) return 0;
    const r = risks.find(x => x.riskLevel === level);
    return r ? r.count : 0;
};

const formatDate = (dateStr) => {
    if(!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', hour:'2-digit', minute:'2-digit'});
}

const getEstadoClass = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('completado') || s.includes('confirmed')) return 'bg-green-500/10 text-green-400 border-green-500/20';
    if (s.includes('pendiente') || s.includes('pending')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (s.includes('cancel')) return 'bg-red-500/10 text-red-400 border-red-500/20';
    return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
};

onMounted(async () => {
    // 1. Resolve Project ID
    let projectId = null;
    const currentProject = localStorage.getItem('currentProject');
    
    if (currentProject) {
        const proj = JSON.parse(currentProject);
        projectId = proj.id;
        project.value = proj;
    } else if (isInProjectSubdomain()) {
        // Fallback logic for subdomain...
        // For brevity assuming localStorage is populated or handled by tenantService
    }

    if (!projectId) {
        // Retry logic or redirect?
        // simple fallback
    }

    if (projectId) {
        // 2. Fetch Data in Parallel
        try {
            const [stats, tasks, aiData] = await Promise.all([
                dashboardService.getStats(projectId),
                dashboardService.getTasks(projectId, { period: 'month' }),
                aiInsightsService.getProjectInsights(projectId)
            ]);

            // 3. Update Metrics
            // Sales
            metricas.value[0].valorNum = stats.monthlySales.value;
            metricas.value[0].porcentaje = (stats.monthlySales.percentageChange > 0 ? '+' : '') + stats.monthlySales.percentageChange + '%';
            metricas.value[0].subio = stats.monthlySales.trend !== 'down';

            // Chats
            metricas.value[1].valorNum = stats.aiConversations.value;
            metricas.value[1].porcentaje = (stats.aiConversations.percentageChange > 0 ? '+' : '') + stats.aiConversations.percentageChange + '%';
            metricas.value[1].subio = stats.aiConversations.trend !== 'down';

            // Orders (Appointments)
            metricas.value[2].valorNum = stats.automatedOrders.value;
            metricas.value[2].porcentaje = (stats.automatedOrders.percentageChange > 0 ? '+' : '') + stats.automatedOrders.percentageChange + '%';
            metricas.value[2].subio = stats.automatedOrders.trend !== 'down';

             // Hours
            metricas.value[3].valorNum = stats.hoursSaved.value;
            metricas.value[3].porcentaje = (stats.hoursSaved.percentageChange > 0 ? '+' : '') + stats.hoursSaved.percentageChange + '%';
            metricas.value[3].subio = stats.hoursSaved.trend !== 'down';

            // 4. Update Tasks
            ultimosPedidos.value = tasks;

            // 5. Update Insights
            insights.value = aiData;

        } catch (e) {
            console.error("Error loading dashboard data", e);
        }
    }

    // 6. Init Swapy
    if (swapyContainer.value) {
        createSwapy(swapyContainer.value, { animation: 'dynamic' });
    }
});
</script>