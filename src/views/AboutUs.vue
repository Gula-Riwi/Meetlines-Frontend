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

        <!-- Hero Section -->
        <section class="pt-32 pb-20 px-6 relative overflow-hidden">
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-40'" />
            
            <div class="max-w-7xl mx-auto relative z-10">
                <div class="text-center mb-16">
                    <h1 class="text-7xl md:text-9xl font-bold font-league text-white mb-6 leading-none">
                        Sobre <LineShadowText shadowColor="white">Nosotros</LineShadowText>
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                        Democratizando la inteligencia artificial para freelancers y PyMEs
                    </p>
                </div>
            </div>
        </section>

        <!-- Misión -->
        <section class="py-20 px-6 bg-gray-900/50">
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span class="text-indigo-400 font-bold tracking-wider text-sm uppercase mb-4 block">
                            Nuestra Misión
                        </span>
                        <h2 class="text-5xl md:text-7xl font-bold font-league text-white mb-6 leading-tight">
                            IA Accesible Para Todos
                        </h2>
                        <p class="text-lg text-gray-300 leading-relaxed mb-6">
                            En <strong class="text-white">Meetlines</strong>, creemos que la tecnología avanzada no debería 
                            ser exclusiva de las grandes corporaciones. Nacimos con el objetivo de democratizar la inteligencia 
                            artificial para freelancers y PyMEs.
                        </p>
                        <p class="text-lg text-gray-300 leading-relaxed">
                            Creamos "Agentes" digitales que no solo responden, sino que trabajan por ti: agendan, venden y 
                            fidelizan, mientras tú te enfocas en lo que amas hacer.
                        </p>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all">
                            <div class="w-14 h-14 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4">
                                <font-awesome-icon :icon="['fas', 'rocket']" class="text-2xl text-indigo-400" />
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-2">Innovación</h3>
                            <p class="text-gray-400 text-sm">Tecnología de punta al servicio de tu negocio</p>
                        </div>
                        <div class="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all translate-y-8">
                            <div class="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                                <font-awesome-icon :icon="['fas', 'handshake']" class="text-2xl text-purple-400" />
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-2">Accesibilidad</h3>
                            <p class="text-gray-400 text-sm">IA para todos, sin importar el tamaño</p>
                        </div>
                        <div class="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all">
                            <div class="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                                <font-awesome-icon :icon="['fas', 'lightbulb']" class="text-2xl text-yellow-400" />
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-2">Simplicidad</h3>
                            <p class="text-gray-400 text-sm">Fácil de usar, sin código ni complicaciones</p>
                        </div>
                        <div class="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-green-500/50 transition-all translate-y-8">
                            <div class="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                <font-awesome-icon :icon="['fas', 'chart-line']" class="text-2xl text-green-400" />
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-2">Resultados</h3>
                            <p class="text-gray-400 text-sm">Impacto real en tu productividad</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Historia -->
        <section class="py-20 px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-5xl md:text-7xl font-bold font-league text-white mb-12 text-center">
                    Nuestra Historia
                </h2>
                <div class="space-y-8">
                    <div class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 border-l-4 border-l-indigo-500">
                        <div class="flex items-start gap-6">
                            <div class="bg-indigo-500/20 p-4 rounded-xl shrink-0">
                                <font-awesome-icon :icon="['fas', 'lightbulb']" class="text-3xl text-indigo-400" />
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-white mb-3">El Problema</h3>
                                <p class="text-gray-300 leading-relaxed">
                                    Vimos cómo pequeños negocios perdían clientes por no poder atender 24/7, 
                                    mientras las grandes empresas dominaban con sus equipos de atención al cliente 
                                    y tecnología costosa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 border-l-4 border-l-purple-500">
                        <div class="flex items-start gap-6">
                            <div class="bg-purple-500/20 p-4 rounded-xl shrink-0">
                                <font-awesome-icon :icon="['fas', 'rocket']" class="text-3xl text-purple-400" />
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-white mb-3">La Solución</h3>
                                <p class="text-gray-300 leading-relaxed">
                                    Desarrollamos una plataforma que permite a cualquier negocio tener su propio 
                                    equipo de agentes de IA, trabajando 24/7, sin necesidad de conocimientos técnicos 
                                    ni grandes inversiones.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 border-l-4 border-l-green-500">
                        <div class="flex items-start gap-6">
                            <div class="bg-green-500/20 p-4 rounded-xl shrink-0">
                                <font-awesome-icon :icon="['fas', 'trophy']" class="text-3xl text-green-400" />
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-white mb-3">El Impacto</h3>
                                <p class="text-gray-300 leading-relaxed">
                                    Hoy ayudamos a cientos de negocios a automatizar su atención al cliente, 
                                    aumentar sus ventas y mejorar la satisfacción de sus clientes, todo mientras 
                                    reducen costos operativos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Valores -->
        <section class="py-20 px-6 bg-gray-900/50">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-5xl md:text-7xl font-bold font-league text-white mb-16 text-center">
                    Nuestros Valores
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all hover:-translate-y-2">
                        <div class="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
                            <font-awesome-icon :icon="['fas', 'heart']" class="text-3xl text-indigo-400" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4 font-league">Empatía</h3>
                        <p class="text-gray-300">
                            Entendemos los desafíos de los pequeños negocios porque hemos estado ahí. 
                            Diseñamos soluciones pensando en tus necesidades reales.
                        </p>
                    </div>

                    <div class="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-2">
                        <div class="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                            <font-awesome-icon :icon="['fas', 'shield-halved']" class="text-3xl text-purple-400" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4 font-league">Transparencia</h3>
                        <p class="text-gray-300">
                            Sin costos ocultos, sin letra pequeña. Lo que ves es lo que obtienes. 
                            Precios claros y funcionalidades bien definidas.
                        </p>
                    </div>

                    <div class="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-green-500/50 transition-all hover:-translate-y-2">
                        <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                            <font-awesome-icon :icon="['fas', 'users']" class="text-3xl text-green-400" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4 font-league">Comunidad</h3>
                        <p class="text-gray-300">
                            Creemos en el poder de la colaboración. Tu éxito es nuestro éxito, 
                            y juntos construimos un ecosistema más fuerte.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-20 px-6">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-5xl md:text-7xl font-bold font-league text-white mb-6">
                    Únete a la Revolución
                </h2>
                <p class="text-xl text-gray-300 mb-8">
                    Forma parte de los negocios que están transformando su atención al cliente con IA
                </p>
                <router-link to="/register"
                    class="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105">
                    Empezar Ahora
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </router-link>
            </div>
        </section>
    </div>
</template>

<script setup>
import BrandLogo from '@/components/BrandLogo.vue';
import LineShadowText from '@/components/LineShadowText.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
</script>

<style scoped>
h1.font-league {
    font-size: clamp(4rem, 10vw, 9rem);
    line-height: 1;
}

h2.font-league {
    font-size: clamp(3rem, 7vw, 7rem);
    line-height: 1;
}
</style>
