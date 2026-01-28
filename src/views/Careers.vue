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
                    <LineShadowText shadowColor="white">Carreras</LineShadowText>
                </h1>
                <p class="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                    Únete a nuestro equipo y ayuda a democratizar la IA
                </p>
            </div>
        </section>

        <!-- Why Join Us -->
        <section class="py-20 px-6 bg-gray-900/50">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-5xl md:text-7xl font-bold font-league text-white mb-6">
                        ¿Por qué Meetlines?
                    </h2>
                    <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                        Somos un equipo apasionado por hacer la tecnología accesible para todos
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all hover:-translate-y-2">
                        <div class="text-5xl mb-4">🚀</div>
                        <h3 class="text-2xl font-bold text-white mb-3 font-league">Impacto Real</h3>
                        <p class="text-gray-300">
                            Tu trabajo ayudará a miles de pequeños negocios a crecer y prosperar
                        </p>
                    </div>

                    <div class="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-2">
                        <div class="text-5xl mb-4">🌱</div>
                        <h3 class="text-2xl font-bold text-white mb-3 font-league">Crecimiento</h3>
                        <p class="text-gray-300">
                            Oportunidades constantes de aprendizaje y desarrollo profesional
                        </p>
                    </div>

                    <div class="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-green-500/50 transition-all hover:-translate-y-2">
                        <div class="text-5xl mb-4">🤝</div>
                        <h3 class="text-2xl font-bold text-white mb-3 font-league">Cultura</h3>
                        <p class="text-gray-300">
                            Ambiente colaborativo, flexible y enfocado en el bienestar
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Open Positions -->
        <section class="py-20 px-6">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-5xl md:text-7xl font-bold font-league text-white mb-12 text-center">
                    Posiciones Abiertas
                </h2>

                <div class="space-y-6">
                    <div v-for="(job, index) in jobs" :key="index"
                        class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all group">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-3">
                                    <h3 class="text-2xl font-bold text-white font-league">{{ job.title }}</h3>
                                    <span class="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm rounded-full border border-indigo-500/30">
                                        {{ job.type }}
                                    </span>
                                </div>
                                <p class="text-gray-300 mb-4">{{ job.description }}</p>
                                <div class="flex flex-wrap gap-4 text-sm text-gray-400">
                                    <div class="flex items-center gap-2">
                                        <font-awesome-icon :icon="['fas', 'location-dot']" class="text-indigo-400" />
                                        <span>{{ job.location }}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <font-awesome-icon :icon="['fas', 'briefcase']" class="text-purple-400" />
                                        <span>{{ job.department }}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <font-awesome-icon :icon="['fas', 'clock']" class="text-green-400" />
                                        <span>{{ job.experience }}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button @click="applyJob(job.title)"
                                    class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-300 group-hover:scale-105 whitespace-nowrap">
                                    Aplicar Ahora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="jobs.length === 0" class="text-center py-20">
                    <div class="text-6xl mb-6">🔍</div>
                    <h3 class="text-3xl font-bold text-white mb-4 font-league">No hay posiciones abiertas</h3>
                    <p class="text-gray-400 mb-8">
                        Pero siempre estamos buscando talento excepcional. Envíanos tu CV de todas formas.
                    </p>
                    <router-link to="/contact"
                        class="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all duration-300 hover:scale-105">
                        Enviar CV Espontáneo
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Benefits -->
        <section class="py-20 px-6 bg-gray-900/50">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-5xl md:text-7xl font-bold font-league text-white mb-12 text-center">
                    Beneficios
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-gray-900 p-6 rounded-2xl border border-white/10">
                        <div class="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4">
                            <font-awesome-icon :icon="['fas', 'laptop']" class="text-2xl text-indigo-400" />
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Trabajo Remoto</h3>
                        <p class="text-sm text-gray-400">Trabaja desde donde quieras</p>
                    </div>

                    <div class="bg-gray-900 p-6 rounded-2xl border border-white/10">
                        <div class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                            <font-awesome-icon :icon="['fas', 'clock']" class="text-2xl text-purple-400" />
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Horario Flexible</h3>
                        <p class="text-sm text-gray-400">Organiza tu tiempo</p>
                    </div>

                    <div class="bg-gray-900 p-6 rounded-2xl border border-white/10">
                        <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                            <font-awesome-icon :icon="['fas', 'heart']" class="text-2xl text-green-400" />
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Seguro Médico</h3>
                        <p class="text-sm text-gray-400">Cobertura completa</p>
                    </div>

                    <div class="bg-gray-900 p-6 rounded-2xl border border-white/10">
                        <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                            <font-awesome-icon :icon="['fas', 'graduation-cap']" class="text-2xl text-blue-400" />
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Capacitación</h3>
                        <p class="text-sm text-gray-400">Cursos y conferencias</p>
                    </div>

                    <div class="bg-gray-900 p-6 rounded-2xl border border-white/10">
                        <div class="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                            <font-awesome-icon :icon="['fas', 'plane']" class="text-2xl text-yellow-400" />
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Vacaciones</h3>
                        <p class="text-sm text-gray-400">Tiempo libre pagado</p>
                    </div>

                    <div class="bg-gray-900 p-6 rounded-2xl border border-white/10">
                        <div class="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
                            <font-awesome-icon :icon="['fas', 'users']" class="text-2xl text-pink-400" />
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Team Building</h3>
                        <p class="text-sm text-gray-400">Eventos y actividades</p>
                    </div>

                    <div class="bg-gray-900 p-6 rounded-2xl border border-white/10">
                        <div class="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
                            <font-awesome-icon :icon="['fas', 'chart-line']" class="text-2xl text-orange-400" />
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Equity</h3>
                        <p class="text-sm text-gray-400">Opciones de acciones</p>
                    </div>

                    <div class="bg-gray-900 p-6 rounded-2xl border border-white/10">
                        <div class="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                            <font-awesome-icon :icon="['fas', 'dumbbell']" class="text-2xl text-cyan-400" />
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Gimnasio</h3>
                        <p class="text-sm text-gray-400">Membresía incluida</p>
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

const jobs = ref([
    {
        title: 'Senior Full Stack Developer',
        type: 'Tiempo Completo',
        location: 'Remoto',
        department: 'Ingeniería',
        experience: '5+ años',
        description: 'Buscamos un desarrollador experimentado en Vue.js, Node.js y tecnologías de IA para liderar el desarrollo de nuevas funcionalidades.'
    },
    {
        title: 'ML Engineer',
        type: 'Tiempo Completo',
        location: 'Remoto',
        department: 'IA/ML',
        experience: '3+ años',
        description: 'Únete a nuestro equipo de IA para mejorar y entrenar nuestros modelos de lenguaje natural y sistemas de recomendación.'
    },
    {
        title: 'Product Designer',
        type: 'Tiempo Completo',
        location: 'Remoto',
        department: 'Diseño',
        experience: '4+ años',
        description: 'Diseña experiencias de usuario excepcionales para nuestra plataforma de agentes de IA.'
    },
    {
        title: 'Customer Success Manager',
        type: 'Tiempo Completo',
        location: 'Híbrido',
        department: 'Customer Success',
        experience: '2+ años',
        description: 'Ayuda a nuestros clientes a tener éxito con Meetlines, brindando soporte y capacitación.'
    }
]);

const applyJob = (title) => {
    alert(`Gracias por tu interés en la posición de ${title}. Serás redirigido al formulario de aplicación.`);
};
</script>

<style scoped>
h1.font-league {
    font-size: clamp(4rem, 10vw, 9rem);
    line-height: 1;
}
</style>
