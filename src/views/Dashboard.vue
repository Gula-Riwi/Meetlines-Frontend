<template>
    <div class="flex h-screen bg-gray-950 font-sans text-white overflow-hidden">

        <Sidebar />

        <main class="flex-1 flex flex-col overflow-hidden relative bg-blue-950">
            <!-- Header -->
            <header
                class="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-gray-950/50 backdrop-blur-sm z-10">
                <div>
                    <h2 class="text-2xl font-bold">Hola, Freelancer 👋</h2>
                    <p class="text-sm text-gray-400">Aquí tienes el resumen de hoy</p>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right hidden md:block">
                        <p class="text-sm font-bold text-white">Admin User</p>
                        <p class="text-xs text-gray-400">admin@mitienda.com</p>
                    </div>
                    <div
                        class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white/20">
                    </div>
                </div>
            </header>
            <div class="flex-1 overflow-y-auto p-8 z-10 scrollbar-hide">
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
                                        stat.sufijo}}</span>
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
                                <tr
                                    class="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                                    <th class="p-4 font-medium">Cliente</th>
                                    <th class="p-4 font-medium">Producto</th>
                                    <th class="p-4 font-medium">Total</th>
                                    <th class="p-4 font-medium">Estado</th>
                                    <th class="p-4 font-medium text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                <tr v-for="pedido in ultimosPedidos" :key="pedido.id"
                                    class="hover:bg-white/5 transition-colors">
                                    <td class="p-4 font-medium text-white">{{ pedido.cliente }}</td>
                                    <td class="p-4 text-gray-300">{{ pedido.producto }}</td>
                                    <td class="p-4 font-bold text-white">{{ pedido.total }}</td>
                                    <td class="p-4">
                                        <span :class="estadoClases[pedido.estadoClass]"
                                            class="px-3 py-1 rounded-full text-xs font-bold border">
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
import Sidebar from '../components/Sidebar.vue';
import NumberTicker from '@/components/NumberTicker.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';

const estadoClases = {
    completed: 'bg-green-500/10 text-green-400 border-green-500/20',
    pending: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    warning: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

// 2. Referencia para el contenedor HTML
const swapyContainer = ref();

// 3. Agregar IDs únicos a las métricas (Vital para Swapy)
const metricas = ref([
    {
        id: 'sales', // ID único
        titulo: 'Ventas del Mes',
        valorNum: 1250,
        esMoneda: true,
        porcentaje: '+15%',
        subio: true
    },
    {
        id: 'chats',
        titulo: 'Conversaciones IA',
        valorNum: 432,
        esMoneda: false,
        porcentaje: '+5%',
        subio: true
    },
    {
        id: 'orders',
        titulo: 'Pedidos Automáticos',
        valorNum: 28,
        esMoneda: false,
        porcentaje: '-2%',
        subio: false
    },
    {
        id: 'hours',
        titulo: 'Horas Ahorradas',
        valorNum: 12,
        esMoneda: false,
        sufijo: 'h',
        porcentaje: '+8%',
        subio: true
    },
]);

const ultimosPedidos = ref([
    { id: 1, cliente: 'Juan Pérez', producto: 'Diseño Logo', total: '$150', estado: 'Completado', estadoClass: 'completed' },
    { id: 2, cliente: 'Ana Gomez', producto: 'Consultoría', total: '$80', estado: 'En Proceso', estadoClass: 'pending' },
    { id: 3, cliente: 'Restaurante X', producto: 'Gestión Redes', total: '$300', estado: 'Pendiente', estadoClass: 'warning' },
    { id: 4, cliente: 'Tech Solutions', producto: 'Chatbot Web', total: '$500', estado: 'Completado', estadoClass: 'completed' },
    { id: 5, cliente: 'Carlos Ruiz', producto: 'Soporte Técnico', total: '$50', estado: 'Pendiente', estadoClass: 'warning' },
]);


onMounted(() => {
    if (swapyContainer.value) {
        const swapy = createSwapy(swapyContainer.value, {
            animation: 'dynamic' // Animación suave
        });

        // Opcional: Escuchar cuando el usuario termina de reordenar
        swapy.onSwap((event) => {
            const newData = event.data ? event.data.object : event.object;

            if (newData) {
                console.log('Nuevo orden:', nuevosDatos);
                // Aquí guardarías en localStorage si quisieras
            }
        });
    }
});

</script>