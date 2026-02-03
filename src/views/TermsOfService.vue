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
                    Términos de Servicio
                </h1>
                <p class="text-gray-400 mb-12">Última actualización: {{ new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>

                <div class="prose prose-invert max-w-none space-y-8">
                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">1. Aceptación de los Términos</h2>
                        <p class="text-gray-300 leading-relaxed">
                            Al acceder y utilizar Meetlines, aceptas estar sujeto a estos Términos de Servicio. 
                            Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
                        </p>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">2. Descripción del Servicio</h2>
                        <p class="text-gray-300 leading-relaxed mb-4">
                            Meetlines proporciona una plataforma de agentes de inteligencia artificial para automatizar 
                            la atención al cliente, gestión de citas y otras interacciones comerciales. Nuestros servicios incluyen:
                        </p>
                        <ul class="space-y-2 text-gray-300">
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Agentes de IA personalizables para diferentes funciones</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Integraciones con plataformas de mensajería</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Panel de control y analíticas</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-indigo-400 mt-1">•</span>
                                <span>Gestión de clientes y calendario</span>
                            </li>
                        </ul>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">3. Registro y Cuenta</h2>
                        <div class="space-y-4 text-gray-300">
                            <p class="leading-relaxed">
                                Para utilizar Meetlines, debes crear una cuenta proporcionando información precisa y completa. 
                                Eres responsable de:
                            </p>
                            <ul class="space-y-2">
                                <li class="flex items-start gap-3">
                                    <span class="text-indigo-400 mt-1">•</span>
                                    <span>Mantener la confidencialidad de tus credenciales</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <span class="text-indigo-400 mt-1">•</span>
                                    <span>Todas las actividades que ocurran bajo tu cuenta</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <span class="text-indigo-400 mt-1">•</span>
                                    <span>Notificarnos inmediatamente sobre cualquier uso no autorizado</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">4. Planes y Facturación</h2>
                        <div class="space-y-4 text-gray-300">
                            <div>
                                <h3 class="text-xl font-semibold text-white mb-2">4.1 Suscripciones</h3>
                                <p class="leading-relaxed">
                                    Ofrecemos diferentes planes de suscripción mensual. Los precios y características 
                                    están disponibles en nuestra página de precios y pueden cambiar con previo aviso.
                                </p>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold text-white mb-2">4.2 Pagos</h3>
                                <p class="leading-relaxed">
                                    Los pagos se procesan automáticamente cada mes. Aceptamos tarjetas de crédito y débito. 
                                    Si un pago falla, nos reservamos el derecho de suspender tu acceso hasta que se resuelva.
                                </p>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold text-white mb-2">4.3 Cancelación</h3>
                                <p class="leading-relaxed">
                                    Puedes cancelar tu suscripción en cualquier momento. La cancelación será efectiva al 
                                    final del período de facturación actual. No ofrecemos reembolsos por períodos parciales.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">5. Uso Aceptable</h2>
                        <p class="text-gray-300 leading-relaxed mb-4">
                            Al utilizar Meetlines, te comprometes a NO:
                        </p>
                        <ul class="space-y-2 text-gray-300">
                            <li class="flex items-start gap-3">
                                <span class="text-red-400 mt-1">✗</span>
                                <span>Usar el servicio para actividades ilegales o no autorizadas</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-red-400 mt-1">✗</span>
                                <span>Enviar spam o contenido no solicitado</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-red-400 mt-1">✗</span>
                                <span>Intentar acceder a sistemas o datos no autorizados</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-red-400 mt-1">✗</span>
                                <span>Interferir con el funcionamiento del servicio</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-red-400 mt-1">✗</span>
                                <span>Compartir tu cuenta con terceros</span>
                            </li>
                        </ul>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">6. Propiedad Intelectual</h2>
                        <p class="text-gray-300 leading-relaxed">
                            Meetlines y todo su contenido, características y funcionalidades son propiedad de Meetlines 
                            y están protegidos por derechos de autor, marcas registradas y otras leyes de propiedad intelectual. 
                            Mantienes la propiedad de los datos que ingresas en la plataforma.
                        </p>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">7. Limitación de Responsabilidad</h2>
                        <p class="text-gray-300 leading-relaxed">
                            Meetlines se proporciona "tal cual" sin garantías de ningún tipo. No seremos responsables por 
                            daños indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad 
                            de usar nuestros servicios.
                        </p>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">8. Modificaciones del Servicio</h2>
                        <p class="text-gray-300 leading-relaxed">
                            Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento, 
                            con o sin previo aviso. No seremos responsables ante ti ni ante terceros por cualquier 
                            modificación, suspensión o discontinuación del servicio.
                        </p>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">9. Terminación</h2>
                        <p class="text-gray-300 leading-relaxed">
                            Podemos terminar o suspender tu acceso a Meetlines inmediatamente, sin previo aviso, 
                            por cualquier motivo, incluyendo el incumplimiento de estos Términos de Servicio.
                        </p>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">10. Ley Aplicable</h2>
                        <p class="text-gray-300 leading-relaxed">
                            Estos términos se regirán e interpretarán de acuerdo con las leyes del país donde 
                            opera Meetlines, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
                        </p>
                    </section>

                    <section class="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                        <h2 class="text-3xl font-bold text-white mb-4 font-league">11. Contacto</h2>
                        <p class="text-gray-300 leading-relaxed mb-4">
                            Si tienes preguntas sobre estos Términos de Servicio, contáctanos en:
                        </p>
                        <div class="space-y-2 text-gray-300">
                            <p><strong class="text-white">Email:</strong> legal@meetlines.com</p>
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
