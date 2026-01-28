<template>
    <div class="min-h-screen bg-gray-950 text-white">
        <!-- Header -->
        <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl 
            bg-gray-900/80 backdrop-blur-lg border border-white/10 shadow-2xl rounded-full">
            <div class="flex justify-between items-center p-2 px-4">
                <router-link to="/" class="flex items-center gap-2">
                    <BrandLogo />
                </router-link>
                <router-link to="/" 
                    class="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 transition">
                    Volver al inicio
                </router-link>
            </div>
        </nav>

        <!-- Hero -->
        <section class="pt-32 pb-20 px-6">
            <div class="max-w-7xl mx-auto text-center">
                <h1 class="text-7xl md:text-9xl font-bold font-league text-white mb-6 leading-none">
                    Centro de <LineShadowText shadowColor="white">Ayuda</LineShadowText>
                </h1>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                    Encuentra respuestas rápidas a las preguntas más frecuentes
                </p>
                
                <!-- Search Bar -->
                <div class="max-w-2xl mx-auto">
                    <div class="relative">
                        <input type="text" v-model="searchQuery" placeholder="Buscar en la ayuda..."
                            class="w-full px-6 py-4 pl-14 bg-gray-900 border border-white/10 rounded-full text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors">
                        <font-awesome-icon :icon="['fas', 'search']" 
                            class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Categories -->
        <section class="py-20 px-6">
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all hover:-translate-y-2 cursor-pointer">
                        <div class="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
                            <font-awesome-icon :icon="['fas', 'rocket']" class="text-3xl text-indigo-400" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-3 font-league">Primeros Pasos</h3>
                        <p class="text-gray-400">Aprende a configurar tu cuenta y crear tu primer agente</p>
                    </div>

                    <div class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-2 cursor-pointer">
                        <div class="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                            <font-awesome-icon :icon="['fas', 'robot']" class="text-3xl text-purple-400" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-3 font-league">Agentes IA</h3>
                        <p class="text-gray-400">Todo sobre configuración y personalización de agentes</p>
                    </div>

                    <div class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 hover:border-green-500/50 transition-all hover:-translate-y-2 cursor-pointer">
                        <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                            <font-awesome-icon :icon="['fas', 'credit-card']" class="text-3xl text-green-400" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-3 font-league">Facturación</h3>
                        <p class="text-gray-400">Planes, pagos y gestión de suscripciones</p>
                    </div>
                </div>

                <!-- FAQ Accordion -->
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-4xl font-bold font-league text-white mb-8">Preguntas Frecuentes</h2>
                    
                    <div class="space-y-4">
                        <div v-for="(faq, index) in faqs" :key="index" 
                            class="bg-gray-900/50 rounded-2xl border border-white/10 overflow-hidden">
                            <button @click="toggleFaq(index)"
                                class="w-full p-6 flex justify-between items-center text-left hover:bg-gray-900/80 transition-colors">
                                <span class="text-lg font-semibold text-white pr-4">{{ faq.question }}</span>
                                <font-awesome-icon :icon="['fas', 'chevron-down']" 
                                    class="text-indigo-400 transition-transform duration-300"
                                    :class="{ 'rotate-180': faq.open }" />
                            </button>
                            <div v-show="faq.open" class="px-6 pb-6">
                                <p class="text-gray-300 leading-relaxed">{{ faq.answer }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Support -->
        <section class="py-20 px-6 bg-gray-900/50">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl font-bold font-league text-white mb-4">¿No encuentras lo que buscas?</h2>
                <p class="text-xl text-gray-400 mb-8">
                    Nuestro equipo de soporte está listo para ayudarte
                </p>
                <router-link to="/contact"
                    class="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105">
                    Contactar Soporte
                    <font-awesome-icon :icon="['fas', 'headset']" />
                </router-link>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BrandLogo from '@/components/BrandLogo.vue';
import LineShadowText from '@/components/LineShadowText.vue';

const searchQuery = ref('');

const faqs = ref([
    {
        question: '¿Cómo creo mi primer agente de IA?',
        answer: 'Después de registrarte, ve al panel de control y haz clic en "Crear Agente". Selecciona el tipo de agente (Recepción, Transacción, Feedback o Reactivación), personaliza sus respuestas y conecta tus canales de comunicación. ¡Es así de simple!',
        open: false
    },
    {
        question: '¿Puedo probar Meetlines antes de pagar?',
        answer: 'Sí, ofrecemos 2 meses gratis en el plan Básico para que puedas probar todas las funcionalidades sin compromiso. No necesitas tarjeta de crédito para empezar.',
        open: false
    },
    {
        question: '¿Qué plataformas de mensajería soportan?',
        answer: 'Actualmente soportamos WhatsApp, Facebook Messenger, Instagram Direct y Telegram. Estamos trabajando en agregar más plataformas próximamente.',
        open: false
    },
    {
        question: '¿Cómo funciona la facturación?',
        answer: 'La facturación es mensual y se cobra automáticamente. Puedes cambiar o cancelar tu plan en cualquier momento desde el panel de control. No hay contratos a largo plazo ni penalizaciones por cancelación.',
        open: false
    },
    {
        question: '¿Los agentes pueden agendar citas automáticamente?',
        answer: 'Sí, el agente de Transacción puede gestionar tu calendario, agendar citas, confirmarlas y enviar recordatorios automáticos a tus clientes. Se integra con Google Calendar y otros sistemas de agenda.',
        open: false
    },
    {
        question: '¿Necesito conocimientos técnicos para usar Meetlines?',
        answer: 'No, Meetlines está diseñado para ser usado sin conocimientos técnicos. Todo se configura mediante una interfaz visual intuitiva. Si necesitas ayuda, nuestro equipo de soporte está disponible.',
        open: false
    },
    {
        question: '¿Puedo personalizar las respuestas de los agentes?',
        answer: 'Absolutamente. Puedes personalizar completamente el tono, estilo y contenido de las respuestas. También puedes entrenar a los agentes con información específica de tu negocio.',
        open: false
    },
    {
        question: '¿Qué pasa si un cliente hace una pregunta que el agente no puede responder?',
        answer: 'El agente puede transferir la conversación a un humano cuando detecta que no puede ayudar adecuadamente. También puedes configurar palabras clave que activen esta transferencia automáticamente.',
        open: false
    }
]);

const toggleFaq = (index) => {
    faqs.value[index].open = !faqs.value[index].open;
};
</script>

<style scoped>
h1.font-league {
    font-size: clamp(4rem, 10vw, 9rem);
    line-height: 1;
}
</style>
