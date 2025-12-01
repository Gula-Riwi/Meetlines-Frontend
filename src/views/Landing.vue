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
                <TextReveal class="text-6xl md:text-9xl font-bold font-league text-white mb-4">Todo lo que necesitas
                </TextReveal>
                <TextReveal class="text-gray-400 text-xl">Potencia tu negocio con nuestras herramientas.</TextReveal>
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
                            <p class="mt-1 py-4 text-2xl leading-normal text-indigo-500 text-center font-bold">
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
                            <p class="mt-1 py-4 text-2xl leading-normal text-indigo-500 text-center font-bold">
                                Mejora tu productividad con tu propio asistente.
                            </p>
                        </div>
                    </template>
                </FlipCard>
                <FlipCard class="feature-3 mx-auto">
                    <template #default class="flex items-center justify-center">
                        <div
                            class="h-full w-full flex flex-col justify-center items-center bg-indigo-800 p-4 text-center">
                            <h3 class="font-league text-white text-4xl md:text-6xl">
                                Integraciones
                            </h3>
                        </div>
                    </template>
                    <template #back>
                        <div class="grid grid-cols-2 grid-rows-2 min-h-full w-full gap-4 p-4">
                            <div class="group/icon relative flex items-center justify-center">
                                <div
                                    class="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover/icon:opacity-70">
                                </div>
                                <font-awesome-icon :icon="['fab', 'meta']"
                                    class="relative z-10 text-gray-300 text-6xl transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                            </div>

                            <div class="group/icon relative flex items-center justify-center">
                                <div
                                    class="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover/icon:opacity-70">
                                </div>
                                <font-awesome-icon :icon="['fab', 'whatsapp']"
                                    class="relative z-10 text-gray-300 text-6xl transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                            </div>

                            <div class="group/icon relative flex items-center justify-center">
                                <div
                                    class="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover/icon:opacity-80">
                                </div>
                                <font-awesome-icon :icon="['fab', 'instagram']"
                                    class="relative z-10 text-gray-300 text-6xl transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                            </div>

                            <div class="group/icon relative flex items-center justify-center">
                                <div
                                    class="absolute inset-0 bg-blue-700 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover/icon:opacity-70">
                                </div>
                                <font-awesome-icon :icon="['fab', 'facebook']"
                                    class="relative z-10 text-gray-300 text-6xl transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                            </div>

                        </div>
                    </template>
                </FlipCard>
                <div class="feature-4 logo">
                    <img src="../img/logo.png">
                </div>
                <div
                    class="feature-5 group relative flex flex-col justify-end overflow-hidden rounded-2xl min-h-[400px] w-full">
                    <img src="../img/dashboard_sample.jpg" alt="dashboard picture"
                        class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300">
                    </div>

                    <div class="relative z-10 p-6 md:p-8">
                        <h3 class="font-league text-white text-4xl md:text-5xl font-bold mb-1">
                            Panel de Control
                        </h3>
                        <div
                            class="grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                            <div class="overflow-hidden">
                                <p
                                    class="text-lg text-gray-200 pt-4 opacity-0 transition-opacity duration-700 delay-100 group-hover:opacity-100">
                                    Visualiza métricas en tiempo real de todos tus bots. Gestiona, edita y mejora tus
                                    flujos de
                                    conversación sin código.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. PLANES -->
        <section class="py-20 bg-gray-400">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <TextReveal class="text-6xl md:text-9xl font-bold font-league text-black mb-10">Nuestros Planes
                </TextReveal>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div v-for="plan in planes" :key="plan.nombre" class="p-8 flex justify-center">
                        <GlareCard class="flex flex-col justify-center items-center">
                            <h3 class="text-4xl mt-4 tracking-wider text-white font-league">{{ plan.nombre }}</h3>
                            <div>
                                <span class="text-4xl font-extrabold text-indigo-500">$</span>
                                <NumberTicker :value=plan.precio :decimalPlaces="0"
                                    class="text-4xl font-extrabold text-indigo-500 my-4" />
                                <span class="text-gray-300 text-md">/mes</span>
                            </div>
                            <div class="flex-1 p-6 w-full">
                                <ul class="space-y-4">
                                    <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3">
                                        <div
                                            class="mt-1 bg-indigo-500/20 p-1 rounded-full text-indigo-400 flex-shrink-0">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span class="text-gray-300 text-sm leading-snug">
                                            {{ feature }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <ShimmerButton class="font-bold mb-5" shimmer-size="2px" background="#312e81"
                                shimmerColor="#818cf8">
                                <span
                                    class="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg dark:from-white dark:to-slate-900/10">
                                    Elegir Plan
                                </span>
                            </ShimmerButton>
                        </GlareCard>
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
import TextReveal from '@/components/TextReveal.vue';
import GlareCard from '@/components/GlareCard.vue';
import NumberTicker from '@/components/NumberTicker.vue';
import ShimmerButton from '@/components/ShimmerButton.vue';


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
        precio: 0,
        features: ['1 Chatbot', '50 conversaciones/mes', 'Soporte por correo']
    },
    {
        nombre: 'Pyme',
        precio: 29,
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
    grid-row-gap: 15px;
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

    0%,
    100% {
        transform: translateY(-2%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
        transform: none;
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}

.bounce {
    animation: bounce 1s infinite;
}

.bounce:hover {
    animation-play-state: paused;
}
</style>