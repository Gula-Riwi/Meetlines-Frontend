<template>
    <div class="landing-container font-sans relative">
        <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl 
            bg-gray-900/90 backdrop-blur-lg border border-white/10 shadow-2xl 
            transition-all duration-300 ease-in-out" :class="menuAbierto ? 'rounded-3xl' : 'rounded-full'">
            <div class=" flex flex-wrap justify-between items-center">
                <div class="text-xl md:text-2xl font-bold flex items-center gap-2 text-white">
                    <a href="#hero" class="font-sans font-bold transition hover:text-indigo-400 ml-5">
                        Meetlines
                    </a>
                </div>
                <button @click="toggleMenu"
                    class="md:hidden text-white focus:outline-none p-2 rounded-full hover:bg-white/10 transition">
                    <svg v-if="!menuAbierto" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
                <div class="hidden md:flex space-x-2 items-center">
                    <router-link to="/login"
                        class="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 transition">
                        Ingresar
                    </router-link>
                    <router-link to="/register" class="btn-custom text-sm">
                        Registrarme
                    </router-link>
                </div>
                <div v-show="menuAbierto"
                    class="w-full md:hidden flex flex-col gap-3 mt-4 pb-2 border-t border-gray-700/50 pt-4 animate-fade-in">
                    <router-link to="/login"
                        class="text-white hover:bg-white/10 block px-4 py-3 rounded-xl text-center font-medium">
                        Ingresar
                    </router-link>
                    <router-link to="/register"
                        class="bg-indigo-600 text-white block px-4 py-3 rounded-xl text-center font-bold shadow-lg">
                        Registrarme
                    </router-link>
                </div>

            </div>
        </nav>

        <header id="hero"
            class="hero-bg flex flex-col justify-center md:items-start sm:items-center px-16 text-white h-svh">
            <h1
                class="text-7xl md:text-8xl lg:text-9xl tracking-widest mb-6 leading-tight font-ultra italic text-center">
                Meet<span class="underline block sm:inline">Lines</span>
            </h1>
            <p class="text-lg md:text-xl mb-8 max-w-2xl font-arvo hidden md:block">
                La herramienta definitiva para freelancers y PyMEs.
                Deja que nuestra IA gestione tus clientes 24/7.
            </p>
            <div class="flex flex-col md:flex-row gap-4">
                <router-link to="/register"
                    class="btn-custom bg-white text-indigo-700 hover:bg-gray-100 hover:text-indigo-600 border-none text-center w-25">
                    Empezar Ahora
                </router-link>
                <button
                    class="px-6 py-3 rounded-full border-2 border-white font-bold hover:bg-white hover:text-indigo-600 transition">
                    Ver Demo
                </button>
            </div>
        </header>

        <section class="py-20 bg-gray-50">
            <div class="max-w-6xl mx-auto px-6">
                <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">¿Por qué elegirnos?</h2>

                <!-- Grid responsivo: 1 col en móvil, 3 en desktop (md:grid-cols-3) -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <!-- Tarjeta 1 -->
                    <div class="feature-card group">
                        <div class="icon-box">💬</div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">Chatbots Inteligentes</h3>
                        <p class="text-gray-600">Responde dudas frecuentes sin levantar un dedo.</p>
                    </div>

                    <!-- Tarjeta 2 -->
                    <div class="feature-card group">
                        <div class="icon-box">📅</div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">Agenda Automática</h3>
                        <p class="text-gray-600">Toma pedidos y agendamientos directo en tu calendario.</p>
                    </div>

                    <!-- Tarjeta 3 -->
                    <div class="feature-card group">
                        <div class="icon-box">📈</div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">Métricas Reales</h3>
                        <p class="text-gray-600">Visualiza cuánto estás vendiendo en tiempo real.</p>
                    </div>

                </div>
            </div>
        </section>

        <!-- 4. PLANES -->
        <section class="py-20 bg-white">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <h2 class="text-3xl font-bold text-gray-800 mb-12">Planes Simples</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div v-for="plan in planes" :key="plan.nombre"
                        class="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                        <h3 class="text-2xl font-bold text-gray-800">{{ plan.nombre }}</h3>
                        <p class="text-4xl font-extrabold text-indigo-600 my-4">{{ plan.precio }}</p>
                        <ul class="text-left space-y-3 mb-8 text-gray-600">
                            <li v-for="feature in plan.features" :key="feature" class="flex items-center">
                                <span class="text-green-500 mr-2">✔</span> {{ feature }}
                            </li>
                        </ul>
                        <button
                            class="w-full py-3 rounded-lg font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
                            Elegir Plan
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer Simple -->
        <footer class="bg-gray-900 text-white py-8 text-center">
            <p>© 2024 ChatBot IA - Hecho con Vue y Tailwind</p>
        </footer>

    </div>
</template>

<script setup>
import { ref } from 'vue';

const planes = ref([
    {
        nombre: 'Freelancer',
        precio: '$0',
        features: ['1 Chatbot', '50 conversaciones/mes', 'Soporte por correo']
    },
    {
        nombre: 'Pyme',
        precio: '$29',
        features: ['3 Chatbots', 'Conversaciones ilimitadas', 'Dashboard Pro', 'Soporte Prioritario']
    }
]);


//menu
const menuAbierto = ref(false);
const toggleMenu = () => {
    menuAbierto.value = !menuAbierto.value;
};

</script>

<style scoped>
.landing-container {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.hero-bg {
    background-image: url("../img/hero.gif");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.font-ultra {
    text-shadow: 3px 3px 10px black;
}


.btn-custom {
    background-color: #4F46E5;
    /* Indigo 600 */
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    /* Pill shape */
    font-weight: bold;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-block;
    text-decoration: none;
}

.btn-custom:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
}

/* 3. Tarjetas con efecto glassmorphism o hover especial */
.feature-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid #f3f4f6;
    transition: all 0.3s ease;
    cursor: default;
}

.feature-card:hover {
    border-color: #4F46E5;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.icon-box {
    background: #EEF2FF;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    transition: background 0.3s;
}

/* Cuando hago hover en la tarjeta (.group), cambia el hijo (.icon-box) */
.feature-card:hover .icon-box {
    background: #4F46E5;
    /* Se pone azul */
    color: white;
    /* Icono blanco */
}
</style>