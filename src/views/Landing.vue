<template>
    <div class="landing-container font-sans relative">
        <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl 
            bg-gray-900/60 backdrop-blur-lg border border-white/10 shadow-2xl 
            transition-all duration-300 ease-in-out" :class="menuAbierto ? 'rounded-3xl' : 'rounded-full'">
            <div class=" flex flex-wrap justify-between items-center">
                <div class="text-xl md:text-2xl font-bold flex items-center gap-2 text-white">
                    <a href="#hero" class="font-sans font-bold transition hover:text-indigo-400 ml-5 italic">
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
            class="relative flex flex-col justify-center md:items-start sm:items-center px-16 text-white h-svh bg-blue-950 overflow-hidden">

            <div class="relative z-10">
                <h1
                    class="tracking-wide mb-6 font-league text-center md:text-left italic text-5xl md:text-7xl font-bold">
                    Meet
                    <LineShadowText class="block sm:inline" shadowColor="white">Lines</LineShadowText>
                </h1>

                <TextGenerateEffect
                    words="La herramienta definitiva para freelancers y PyMEs. Deja que nuestra IA gestione tus clientes 24/7."
                    class="text-lg md:text-xl mb-8 max-w-2xl font-sans hidden md:block text-white-300" />

                <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                    <InteractiveHoverButton text="Empezar Ahora" to="/register" class="leading-normal" />
                </div>
            </div>

            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]'" />
        </header>

        <section class="py-20 bg-gray-950 px-4">
            <div class="max-w-4xl mx-auto mb-20 text-center">
                <h2 class="text-6xl md:text-9xl font-bold font-league text-white mb-4">Todo lo que necesitas</h2>
                <p class="text-gray-400 text-xl">Potencia tu negocio con nuestras herramientas.</p>
            </div>
            <div class="features p-10">
                <FlipCard class="feature-1 mx-auto bounce">
                    <template #default class="flex items-center justify-center">
                        <div
                            class="h-full w-full flex flex-col justify-center items-center bg-indigo-800 p-4 text-center">
                            <h3 class="font-league text-white text-4xl md:text-6xl">
                                Chatbots Inteligentes
                            </h3>
                        </div>
                    </template>
                    <template #back>
                        <div class="flex min-h-full flex-col justify-center items-center gap-2">
                            <p
                                class="mt-1 py-4 text-2xl leading-normal text-indigo-500 text-center font-bold">
                                Respuestas automáticas 24/7 impulsadas por IA avanzada.
                            </p>
                        </div>
                    </template>
                </FlipCard>
                <FlipCard class="feature-2 mx-auto">
                    <template #default class="flex items-center justify-center">
                        <div
                            class="h-full w-full flex flex-col justify-center items-center bg-indigo-800 p-4 text-center">
                            <h3 class="font-league text-white text-4xl md:text-6xl">
                                Automatización
                            </h3>
                        </div>
                    </template>
                    <template #back>
                        <div class="flex min-h-full flex-col justify-center items-center gap-2">
                            <p
                                class="mt-1 py-4 text-2xl leading-normal text-indigo-500 text-center font-bold">
                                Mejora tu productividad con tu propio asistente.
                            </p>
                        </div>
                    </template>
                </FlipCard>
                <div class="feature-3">
                    <h3 class="font-league text-white text-6xl">Integraciones</h3>
                </div>
                <div class="feature-4 logo">
                    <img src="../img/logo.png">
                </div>
                <div class="feature-5 flex justify-around gap-2">
                    <h3 class="font-league text-white text-6xl">Panel de Control</h3>
                    <div class="w-96">
                        <img src="../img/dashboard_sample.jpg" alt="dashboard picture" class="rounded-lg"></img>
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
import LineShadowText from '@/components/LineShadowText.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import TextGenerateEffect from '@/components/TextGenerateEffect.vue';
import InteractiveHoverButton from '@/components/InteractiveHoverButton.vue';
import FlipCard from '@/components/FlipCard.vue';


const features = ref([
    {
        title: "Chatbots Inteligentes",
        description: "Respuestas automáticas 24/7 impulsadas por IA avanzada.",
        icon: "💬",
        class: "md:col-span-1",
    },
    {
        title: "Análisis de Sentimientos",
        description: "Entiende si tu cliente está feliz o molesto antes de responder.",
        icon: "🧠",
        class: "md:col-span-1",
    },
    {
        title: "Integración Total",
        description: "Conecta con WhatsApp, Instagram y Telegram en un solo lugar.",
        icon: "🔗",
        class: "md:col-span-1",
    },
    {
        title: "Panel de Control",
        description: "Visualiza métricas en tiempo real de todos tus bots. Gestiona, edita y mejora tus flujos de conversación sin código.",
        icon: "📈",
        class: "md:col-span-3",
        hasHeader: true
    },
]);

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

h1.font-league {
    font-size: 20rem;
}


.btn-custom {
    background-color: #4F46E5;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: bold;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-block;
    text-decoration: none;
}

.btn-custom:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
}

.features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 5px;
}

.feature-1 {
    grid-area: 1 / 1 / 4 / 2;
}

.feature-2 {
    grid-area: 1 / 2 / 4 / 3;
}

.feature-3 {
    grid-area: 1 / 3 / 4 / 4;
}

.feature-4 {
    grid-area: 4 / 1 / 7 / 2;
}

.feature-5 {
    grid-area: 4 / 2 / 7 / 4;
}

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

@keyframes bounce {
    0%, 100% {
        transform: translateY(-2%);
        animation-timing-function: cubic-bezier(0.8,0,1,1);
    }
    50% {
        transform: none;
        animation-timing-function: cubic-bezier(0,0,0.2,1);
    }
}
.bounce {
    animation: bounce 1s infinite;
}

.bounce:hover{
    animation-play-state: paused;
}
</style>