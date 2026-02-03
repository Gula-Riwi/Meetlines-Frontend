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
        <section class="pt-32 pb-20 px-6 relative overflow-hidden">
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-40'" />
            
            <div class="max-w-7xl mx-auto relative z-10 text-center">
                <h1 class="text-7xl md:text-9xl font-bold font-league text-white mb-6 leading-none">
                    <LineShadowText shadowColor="white">Contacto</LineShadowText>
                </h1>
                <p class="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                    ¿Tienes preguntas? Estamos aquí para ayudarte
                </p>
            </div>
        </section>

        <!-- Contact Form & Info -->
        <section class="py-20 px-6">
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <!-- Contact Form -->
                    <div class="bg-gray-900/50 p-8 md:p-12 rounded-3xl border border-white/10">
                        <h2 class="text-4xl font-bold font-league text-white mb-8">Envíanos un Mensaje</h2>
                        <form @submit.prevent="handleSubmit" class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                                <input type="text" v-model="form.name" required
                                    class="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="Juan Pérez">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input type="email" v-model="form.email" required
                                    class="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="juan@ejemplo.com">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Asunto</label>
                                <select v-model="form.subject" required
                                    class="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition-colors">
                                    <option value="">Selecciona un asunto</option>
                                    <option value="ventas">Consulta de Ventas</option>
                                    <option value="soporte">Soporte Técnico</option>
                                    <option value="partnership">Alianzas</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Mensaje</label>
                                <textarea v-model="form.message" required rows="5"
                                    class="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                                    placeholder="Cuéntanos cómo podemos ayudarte..."></textarea>
                            </div>

                            <button type="submit"
                                class="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                                <span>Enviar Mensaje</span>
                                <font-awesome-icon :icon="['fas', 'paper-plane']" />
                            </button>
                        </form>
                    </div>

                    <!-- Contact Info -->
                    <div class="space-y-8">
                        <div>
                            <h2 class="text-4xl font-bold font-league text-white mb-6">Información de Contacto</h2>
                            <p class="text-gray-300 leading-relaxed mb-8">
                                Nuestro equipo está disponible para responder tus preguntas y ayudarte a comenzar 
                                con Meetlines. No dudes en contactarnos.
                            </p>
                        </div>

                        <div class="space-y-6">
                            <div class="flex items-start gap-4 p-6 bg-gray-900/50 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all">
                                <div class="w-12 h-12 bg-indigo-500/30 rounded-full flex items-center justify-center shrink-0">
                                    <font-awesome-icon :icon="['fas', 'envelope']" class="text-2xl text-indigo-300" />
                                </div>
                                <div>
                                    <h3 class="text-white font-bold mb-1">Email</h3>
                                    <a href="mailto:hola@meetlines.com" class="text-gray-400 hover:text-indigo-400 transition-colors">
                                        meetlines06@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-start gap-4 p-6 bg-gray-900/50 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all">
                                <div class="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center shrink-0">
                                    <font-awesome-icon :icon="['fas', 'phone']" class="text-2xl text-purple-300" />
                                </div>
                                <div>
                                    <h3 class="text-white font-bold mb-1">Teléfono</h3>
                                    <a href="tel:+573001234567" class="text-gray-400 hover:text-purple-400 transition-colors">
                                        +57 324 649 3990
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-start gap-4 p-6 bg-gray-900/50 rounded-2xl border border-white/10 hover:border-green-500/50 transition-all">
                                <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                                    <font-awesome-icon :icon="['fab', 'whatsapp']" class="text-xl text-green-400" />
                                </div>
                                <div>
                                    <h3 class="text-white font-bold mb-1">WhatsApp</h3>
                                    <a href="https://wa.me/573246493990" target="_blank" class="text-gray-400 hover:text-green-400 transition-colors">
                                        +57 324 649 3990
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-start gap-4 p-6 bg-gray-900/50 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
                                <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center shrink-0">
                                    <font-awesome-icon :icon="['fas', 'clock']" class="text-xl text-blue-400" />
                                </div>
                                <div>
                                    <h3 class="text-white font-bold mb-1">Horario de Atención</h3>
                                    <p class="text-gray-400">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>

                        <!-- Social Links -->
                        <div class="pt-8">
                            <h3 class="text-white font-bold mb-4">Síguenos en Redes Sociales</h3>
                            <div class="flex gap-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                    class="w-12 h-12 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-300">
                                    <font-awesome-icon :icon="['fab', 'facebook']" class="text-xl" />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                    class="w-12 h-12 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300">
                                    <font-awesome-icon :icon="['fab', 'instagram']" class="text-xl" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BrandLogo from '@/components/BrandLogo.vue';
import LineShadowText from '@/components/LineShadowText.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';

const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
});

const handleSubmit = () => {
    // Aquí iría la lógica para enviar el formulario
    alert('Gracias por tu mensaje. Te contactaremos pronto.');
    form.value = { name: '', email: '', subject: '', message: '' };
};
</script>

<style scoped>
h1.font-league {
    font-size: clamp(4rem, 10vw, 9rem);
    line-height: 1;
}
</style>
