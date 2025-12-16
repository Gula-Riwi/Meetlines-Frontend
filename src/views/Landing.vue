<template>
    <div class="landing-container font-sans relative bg-gray-950 overflow-x-hidden">

        <!-- NAVBAR -->
        <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl 
            bg-gray-900/80 backdrop-blur-lg border border-white/10 shadow-2xl 
            transition-all duration-300 ease-in-out" :class="menuAbierto ? 'rounded-3xl' : 'rounded-full'">
            <div class=" flex flex-wrap justify-between items-center p-2 px-4">
                <div class="text-xl md:text-2xl font-bold flex items-center gap-2 text-white">
                    <a href="#hero" class="font-sans font-bold transition hover:text-indigo-400 ml-2 italic">
                        Meet
                        <span class="text-indigo-400">Lines</span>
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
                    <div class="flex justify-center w-full">
                        <InteractiveHoverButton text="Registrarme" to="/register" class="leading-normal w-full" />
                    </div>
                </div>
            </div>
        </nav>

        <!-- HERO -->
        <header id="hero"
            class="relative flex flex-col justify-center md:items-start sm:items-center px-6 md:px-16 text-white min-h-svh bg-blue-950 overflow-hidden pt-32 md:pt-0">

            <div class="relative z-10 mx-auto md:mx-0">
                <h1 class="font-league italic font-bold leading-none mb-6 tracking-wide">
                    Meet
                    <span class="block sm:inline-block">
                        <LineShadowText shadowColor="white">Lines</LineShadowText>
                    </span>
                </h1>

                <TextGenerateEffect
                    words="La herramienta definitiva para freelancers y PyMEs. Deja que nuestra IA gestione tus clientes 24/7."
                    class="text-lg md:text-xl mb-8 max-w-2xl font-sans hidden md:block text-gray-300" />

                <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                        <InteractiveHoverButton text="Empezar Ahora" to="/register" class="leading-normal" />
                    </div>
                    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                        <InteractiveHoverButton text="Explora los negocios" to="/explore" class="leading-normal" />
                    </div>
                </div>
            </div>

            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-40'" />
        </header>

        <!-- FEATURES -->
        <section class="py-20 bg-gray-950 px-4">
            <div class="max-w-4xl mx-auto mb-20 text-center">
                <TextReveal class="text-6xl md:text-9xl font-bold font-league text-white mb-4 leading-tight">Todo lo que
                    necesitas</TextReveal>
                <TextReveal class="text-gray-400 text-xl">Potencia tu negocio con nuestras herramientas.</TextReveal>
            </div>

            <div class="features p-0 md:p-10">
                <!-- Feature 1 -->
                <div class="feature-1 flex justify-center">
                    <FlipCard class="w-full max-w-[320px] h-[350px] bounce mx-auto">
                        <template #default>
                            <div
                                class="h-full w-full flex flex-col justify-center items-center bg-indigo-800 p-4 text-center">
                                <h3 class="font-league text-white text-4xl md:text-6xl">Chatbots Inteligentes</h3>
                            </div>
                        </template>
                        <template #back>
                            <div class="flex min-h-full flex-col justify-center items-center gap-2 p-4">
                                <p class="text-xl leading-normal text-indigo-400 text-center font-bold">
                                    Respuestas automáticas 24/7 impulsadas por
                                    <TextHighlight
                                        class="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white"
                                        textEndColor="white" :delay="1000">
                                        IA avanzada.
                                    </TextHighlight>
                                </p>
                            </div>
                        </template>
                    </FlipCard>
                </div>

                <!-- Feature 2 -->
                <div class="feature-2 flex justify-center">
                    <FlipCard class="w-full max-w-[320px] h-[350px] mx-auto">
                        <template #default>
                            <div
                                class="h-full w-full flex flex-col justify-center items-center bg-indigo-800 p-4 text-center">
                                <h3 class="font-league text-white text-4xl md:text-6xl">Automatización</h3>
                            </div>
                        </template>
                        <template #back>
                            <div class="flex min-h-full flex-col justify-center items-center gap-2 p-4">
                                <p class="text-xl leading-normal text-indigo-400 text-center font-bold">
                                    Mejora tu
                                    <TextHighlight
                                        class="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white"
                                        textEndColor="white" :delay="1000">
                                        productividad
                                    </TextHighlight> con tu propio asistente.
                                </p>
                            </div>
                        </template>
                    </FlipCard>
                </div>

                <!-- Feature 3 -->
                <div class="feature-3 flex justify-center">
                    <FlipCard class="w-full max-w-[320px] h-[350px] mx-auto">
                        <template #default>
                            <div
                                class="h-full w-full flex flex-col justify-center items-center bg-indigo-800 p-4 text-center">
                                <h3 class="font-league text-white text-4xl md:text-6xl">Integraciones</h3>
                            </div>
                        </template>
                        <template #back>
                            <!-- Grid interno -->
                            <div
                                class="grid grid-cols-2 grid-rows-2 h-full w-full gap-4 p-4 items-center justify-items-center">

                                <!-- 1. META (Azul Claro) -->
                                <div class="group/icon relative flex items-center justify-center w-full h-full">
                                    <!-- Glow -->
                                    <div
                                        class="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover/icon:opacity-70">
                                    </div>
                                    <!-- Icono -->
                                    <font-awesome-icon :icon="['fab', 'meta']"
                                        class="relative z-10 text-gray-300 text-5xl transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                                </div>

                                <!-- 2. WHATSAPP (Verde) -->
                                <div class="group/icon relative flex items-center justify-center w-full h-full">
                                    <div
                                        class="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover/icon:opacity-70">
                                    </div>
                                    <font-awesome-icon :icon="['fab', 'whatsapp']"
                                        class="relative z-10 text-gray-300 text-5xl transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                                </div>

                                <!-- 3. INSTAGRAM (Gradiente) -->
                                <div class="group/icon relative flex items-center justify-center w-full h-full">
                                    <div
                                        class="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover/icon:opacity-80">
                                    </div>
                                    <font-awesome-icon :icon="['fab', 'instagram']"
                                        class="relative z-10 text-gray-300 text-5xl transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                                </div>

                                <!-- 4. FACEBOOK (Azul Oscuro) -->
                                <div class="group/icon relative flex items-center justify-center w-full h-full">
                                    <div
                                        class="absolute inset-0 bg-blue-700 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover/icon:opacity-70">
                                    </div>
                                    <font-awesome-icon :icon="['fab', 'facebook']"
                                        class="relative z-10 text-gray-300 text-5xl transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                                </div>

                            </div>
                        </template>
                    </FlipCard>
                </div>

                <!-- Feature 4 (Logo) -->
                <div class="feature-4 flex justify-center items-center p-6">
                    <h2 class="font-league text-white italic font-bold tracking-wide text-center">
                        Meet
                        <span class="block sm:inline-block">
                            <LineShadowText shadowColor="white">Lines</LineShadowText>
                        </span>
                    </h2>
                </div>

                <!-- Feature 5 (Dashboard) -->
                <div class="feature-5">
                    <div
                        class="group relative flex flex-col justify-end overflow-hidden rounded-2xl min-h-[400px] w-full h-full">
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
                                        Visualiza métricas en tiempo real de todos tus bots. Gestiona, edita y mejora
                                        tus flujos de
                                        conversación sin código.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. PLANES -->
        <section class="py-20 bg-gray-400">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <TextReveal class="text-5xl md:text-9xl font-bold font-league tracking-wide text-black mb-10">
                    Nuestros Planes
                </TextReveal>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
                    <div v-for="plan in planes" :key="plan.nombre" class="p-0  flex justify-center w-full bounce">
                        <router-link to="/register" class="group cursor-pointer w-full max-w-[350px]">
                            <GlareCard class="flex flex-col justify-center items-center bg-blue-950 shadow-2xl">
                                <h3 class="text-4xl mt-4 tracking-wider text-white font-league">{{ plan.nombre }}</h3>
                                <div>
                                    <span class="text-4xl font-extrabold text-indigo-500">$</span>
                                    <NumberTicker :value=plan.precio :decimalPlaces="0"
                                        class="text-4xl font-extrabold text-indigo-500 my-4" />
                                    <span class="text-gray-300 text-md">/mes</span>
                                </div>
                                <div class="flex-1 p-6 w-full">
                                    <ul class="space-y-4">
                                        <li v-for="feature in plan.features" :key="feature"
                                            class="flex items-center justify-start gap-3">
                                            <div class="mt-1 bg-indigo-500 p-1 rounded-full text-white flex-shrink-0">
                                                <svg class="w-3 h-3" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="3" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                            <span class="text-white leading-snug">
                                                {{ feature }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </GlareCard>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>

        <footer class="bg-gray-900 text-white py-8 text-center">
            <p>© 2025 Meetlines</p>
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
import TextHighlight from '@/components/TextHighlight.vue';


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
        nombre: 'Básico',
        precio: 20,
        features: ['1 Chatbot', '1 empresa', 'Free trial 2 meses ']
    },
    {
        nombre: 'Estándar',
        precio: 50,
        features: ['2 Chatbots', '2 empresas']
    },
    {
        nombre: 'Empresarial',
        precio: 100,
        features: ['4 Chatbots', 'Empresas ilimitadas']
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

h1.font-league {
    font-size: clamp(10rem, 20vw, 20rem);
    line-height: 1;
}

h2.font-league {
    font-size: clamp(10rem, 10vw, 12rem);
    line-height: 1;
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
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

@media (min-width: 1024px) {
    .features {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(6, 1fr);
        grid-column-gap: 5px;
        grid-row-gap: 15px;
        height: auto;
        min-height: 1000px;
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