<template>
    <div class="landing-container">
        <!-- 1. Navbar -->
        <nav class="navbar">
            <div class="logo">🤖 ChatBot IA Service</div>
            <div class="auth-buttons">
                <!-- router-link es como un <a> pero optimizado para Vue -->
                <router-link to="/login" class="btn btn-outline">Iniciar Sesión</router-link>
                <router-link to="/register" class="btn btn-primary">Registrarse</router-link>
            </div>
        </nav>

        <!-- 2. Hero Section (Introducción) -->
        <header class="hero">
            <h1>Automatiza tus pedidos con IA</h1>
            <p>Ayudamos a freelancers y PyMEs a gestionar clientes 24/7.</p>
            <router-link to="/register" class="btn btn-large">Empezar Gratis</router-link>
        </header>

        <!-- 3. Funciones -->
        <section class="features">
            <h2>Nuestras Funciones</h2>
            <div class="feature-grid">
                <div class="card">
                    <h3>💬 Chatbots Inteligentes</h3>
                    <p>Responde dudas frecuentes automáticamente.</p>
                </div>
                <div class="card">
                    <h3>📅 Gestión de Pedidos</h3>
                    <p>Toma órdenes sin intervención humana.</p>
                </div>
                <div class="card">
                    <h3>📈 Métricas en tiempo real</h3>
                    <p>Analiza el rendimiento de tu negocio.</p>
                </div>
            </div>
        </section>

        <!-- 4. Planes -->
        <section class="pricing">
            <h2>Planes Flexibles</h2>
            <div class="pricing-grid">
                <div class="plan" v-for="plan in planes" :key="plan.nombre">
                    <h3>{{ plan.nombre }}</h3>
                    <p class="price">{{ plan.precio }}</p>
                    <ul>
                        <li v-for="feature in plan.features" :key="feature">- {{ feature }}</li>
                    </ul>
                    <button>Elegir {{ plan.nombre }}</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Simulamos datos que podrían venir de una API o estar fijos
const planes = ref([
    {
        nombre: 'Freelancer',
        precio: '$0/mes',
        features: ['1 Chatbot', '50 conversaciones/mes']
    },
    {
        nombre: 'Pyme',
        precio: '$29/mes',
        features: ['3 Chatbots', 'Conversaciones ilimitadas', 'Dashboard Pro']
    }
]);
</script>

<style scoped>
/* Estilos muy básicos para que se entienda la estructura */
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background: #eee;
}

.hero {
    text-align: center;
    padding: 4rem 1rem;
    background: #f9f9f9;
}

.feature-grid,
.pricing-grid {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 2rem;
}

.card,
.plan {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
}

.btn {
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-left: 10px;
}

.btn-primary {
    background: blue;
    color: white;
}

.btn-outline {
    border: 1px solid blue;
    color: blue;
}
</style>