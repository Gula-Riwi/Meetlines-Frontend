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

        <!-- Content -->
        <div class="pt-32 pb-20 px-6">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-5xl md:text-7xl font-bold font-league text-white mb-8">
                    Política de Privacidad
                </h1>
                <p class="text-gray-400 mb-12">Última actualización: {{ new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>

                <div class="prose prose-invert max-w-none space-y-8">
                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">1. Introducción</h2>
                        <p class="text-gray-300 leading-relaxed">
                            En Meetlines, nos comprometemos a proteger tu privacidad y la seguridad de tus datos personales. 
                            Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos tu información 
                            cuando utilizas nuestra plataforma de agentes de inteligencia artificial.
                        </p>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">2. Información que Recopilamos</h2>
                        <div class="space-y-4 text-gray-300">
                            <div>
                                <h3 class="text-xl font-semibold text-white mb-2">2.1 Información de Cuenta</h3>
                                <p class="leading-relaxed">
                                    Recopilamos información que nos proporcionas al crear una cuenta, incluyendo nombre, 
                                    correo electrónico, número de teléfono y detalles de facturación.
                                </p>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold text-white mb-2">2.2 Datos de Uso</h3>
                                <p class="leading-relaxed">
                                    Recopilamos información sobre cómo interactúas con nuestra plataforma, incluyendo 
                                    conversaciones con agentes, métricas de uso y preferencias de configuración.
                                </p>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold text-white mb-2">2.3 Información Técnica</h3>
                                <p class="leading-relaxed">
                                    Recopilamos datos técnicos como dirección IP, tipo de navegador, sistema operativo 
                                    y datos de cookies para mejorar nuestros servicios.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">3. Cómo Usamos tu Información</h2>
                        <ul class="space-y-3 text-gray-300">
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Proporcionar y mantener nuestros servicios de agentes de IA</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Personalizar tu experiencia y mejorar nuestros servicios</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Procesar pagos y gestionar suscripciones</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Enviar notificaciones importantes sobre tu cuenta</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Detectar y prevenir fraudes o actividades maliciosas</span>
                            </li>
                        </ul>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">4. Compartir Información</h2>
                        <p class="text-gray-300 leading-relaxed mb-4">
                            No vendemos ni alquilamos tu información personal a terceros. Podemos compartir tu información solo en las siguientes circunstancias:
                        </p>
                        <ul class="space-y-3 text-gray-300">
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Con proveedores de servicios que nos ayudan a operar la plataforma</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Cuando sea requerido por ley o para proteger nuestros derechos legales</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>En caso de fusión, adquisición o venta de activos</span>
                            </li>
                        </ul>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">5. Seguridad de Datos</h2>
                        <p class="text-gray-300 leading-relaxed">
                            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información, 
                            incluyendo encriptación SSL/TLS, autenticación de dos factores, y auditorías de seguridad regulares. 
                            Sin embargo, ningún método de transmisión por Internet es 100% seguro.
                        </p>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">6. Tus Derechos</h2>
                        <p class="text-gray-300 leading-relaxed mb-4">Tienes derecho a:</p>
                        <ul class="space-y-3 text-gray-300">
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Acceder a tu información personal</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Corregir datos inexactos</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Solicitar la eliminación de tus datos</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Oponerte al procesamiento de tus datos</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Exportar tus datos en formato portable</span>
                            </li>
                        </ul>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">7. Cookies</h2>
                        <p class="text-gray-300 leading-relaxed">
                            Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso de la plataforma 
                            y personalizar contenido. Puedes gestionar tus preferencias de cookies en la configuración de tu navegador.
                        </p>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">8. Cambios a esta Política</h2>
                        <p class="text-gray-300 leading-relaxed">
                            Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios significativos 
                            por correo electrónico o mediante un aviso en nuestra plataforma.
                        </p>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">9. Contacto</h2>
                        <p class="text-gray-300 leading-relaxed mb-4">
                            Si tienes preguntas sobre esta Política de Privacidad, contáctanos en:
                        </p>
                        <div class="space-y-2 text-gray-300">
                            <p><strong class="text-white">Email:</strong> privacidad@meetlines.com</p>
                            <p><strong class="text-white">Dirección:</strong> Calle Principal 123, Ciudad, País</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BrandLogo from '@/components/BrandLogo.vue';
</script>

<style scoped>
h1.font-league {
    font-size: clamp(3rem, 7vw, 7rem);
    line-height: 1.1;
}
</style>
