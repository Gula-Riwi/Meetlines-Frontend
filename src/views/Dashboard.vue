<template>
    <div class="dashboard-layout">

        <!-- 1. SIDEBAR (Menú Lateral) -->
        <Sidebar />

        <!-- 2. CONTENIDO PRINCIPAL -->
        <main class="main-content">

            <!-- Cabecera simple -->
            <header class="top-bar">
                <h2>Hola, Freelancer 👋</h2>
                <div class="user-info">
                    <span>admin@mitienda.com</span>
                </div>
            </header>

            <!-- SECCIÓN DE MÉTRICAS (KPIs) -->
            <section class="stats-grid">
                <!-- Usamos v-for para no repetir código HTML por cada tarjeta -->
                <div class="stat-card" v-for="(stat, index) in metricas" :key="index">
                    <div class="stat-title">{{ stat.titulo }}</div>
                    <div class="stat-value">{{ stat.valor }}</div>
                    <div class="stat-change" :class="stat.subio ? 'positive' : 'negative'">
                        {{ stat.porcentaje }}
                    </div>
                </div>
            </section>

            <!-- SECCIÓN DE PEDIDOS RECIENTES (Tabla) -->
            <section class="recent-orders">
                <h3>📦 Últimos Pedidos Gestionados por la IA</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Producto/Servicio</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pedido in ultimosPedidos" :key="pedido.id">
                                <td>{{ pedido.cliente }}</td>
                                <td>{{ pedido.producto }}</td>
                                <td>{{ pedido.total }}</td>
                                <td>
                                    <!-- Estilo dinámico según el estado del pedido -->
                                    <span :class="['badge', pedido.estadoClass]">
                                        {{ pedido.estado }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue';

// DATOS SIMULADOS (En el futuro, esto vendrá de tu Backend)

// 1. Métricas principales
const metricas = ref([
    { titulo: 'Ventas del Mes', valor: '$1,250', porcentaje: '+15%', subio: true },
    { titulo: 'Conversaciones IA', valor: '432', porcentaje: '+5%', subio: true },
    { titulo: 'Pedidos Automáticos', valor: '28', porcentaje: '-2%', subio: false },
    { titulo: 'Horas Ahorradas', valor: '12h', porcentaje: 'Este mes', subio: true },
]);

// 2. Lista de pedidos
const ultimosPedidos = ref([
    { id: 1, cliente: 'Juan Pérez', producto: 'Diseño Logo', total: '$150', estado: 'Completado', estadoClass: 'completed' },
    { id: 2, cliente: 'Ana Gomez', producto: 'Consultoría', total: '$80', estado: 'En Proceso', estadoClass: 'pending' },
    { id: 3, cliente: 'Restaurante X', producto: 'Gestión Redes', total: '$300', estado: 'Pendiente', estadoClass: 'warning' },
]);

</script>

<style scoped>
/* LAYOUT GENERAL (Grid o Flex) */
.dashboard-layout {
    display: flex;
    height: 100vh;
    background-color: #f4f6f8;
    font-family: Arial, sans-serif;
}

/* SIDEBAR */
.sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    display: flex;
    flex-direction: column;
}

.sidebar-header {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #34495e;
}

.sidebar-footer {
    padding: 20px;
    margin-top: auto;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 20px 0;
}

.menu li {
    padding: 15px 20px;
    cursor: pointer;
    transition: 0.3s;
}

.menu li:hover,
.menu li.active {
    background-color: #34495e;
    border-left: 4px solid #42b983;
}

/* MAIN CONTENT */
.main-content {
    flex: 1;
    /* Toma todo el espacio restante */
    padding: 2rem;
    overflow-y: auto;
    /* Permite scroll si el contenido es muy largo */
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

/* TARJETAS DE MÉTRICAS */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.stat-title {
    color: #777;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
}

.stat-change {
    font-size: 0.8rem;
    margin-top: 5px;
}

.positive {
    color: green;
}

.negative {
    color: red;
}

/* TABLA DE PEDIDOS */
.recent-orders {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.table-container {
    overflow-x: auto;
    margin-top: 1rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

th {
    color: #666;
    font-size: 0.9rem;
}

/* Badges de estado */
.badge {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    color: white;
}

.completed {
    background-color: #4CAF50;
}

.pending {
    background-color: #2196F3;
}

.warning {
    background-color: #FF9800;
}

.btn-logout {
    width: 100%;
    padding: 10px;
    background: #e74c3c;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
</style>