<template>
    <div class="landing-container font-sans relative bg-gray-950 overflow-x-hidden">

        <!-- NAVBAR -->
        <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl 
            bg-gray-900/80 backdrop-blur-lg border border-white/10 shadow-2xl 
            transition-all duration-300 ease-in-out" :class="menuAbierto ? 'rounded-3xl' : 'rounded-full'">
            <div class=" flex flex-wrap justify-between items-center p-2 px-4">
                <div class="flex items-center gap-2">
                    <BrandLogo />
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
            class="relative flex flex-col justify-center items-center px-6 md:px-16 text-white min-h-svh bg-blue-950 overflow-hidden pt-32 md:pt-0">

            <div class="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
                <div class="text-center md:text-left">
                    <h1 class="font-league italic font-bold leading-none mb-6 tracking-wide">
                        Meet
                        <span class="block sm:inline">
                            <LineShadowText shadowColor="white">Lines</LineShadowText>
                        </span>
                    </h1>

                    <TextGenerateEffect
                        words="La herramienta definitiva para freelancers y PyMEs. Deja que nuestra IA gestione tus clientes 24/7."
                        class="text-lg md:text-xl mb-8 max-w-2xl font-sans hidden md:block text-gray-300 mx-auto md:mx-0" />

                    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
                        <router-link to="/register"
                            class="group relative px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50 flex items-center gap-2 overflow-hidden">
                            <span class="relative z-10">Empezar Ahora</span>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </router-link>
                        <router-link to="/explore"
                            class="group px-8 py-3 border border-gray-600 hover:border-white text-gray-300 hover:text-white font-medium rounded-full transition-all duration-300 hover:bg-white/5">
                            Explora los negocios
                        </router-link>
                    </div>
                </div>

                <div class="relative flex h-[500px] w-full md:w-1/2 flex-col overflow-hidden p-6">
                    <AnimatedList>
                        <template #default>
                            <Notification v-for="(item, idx) in notifications" :key="idx" :name="item.name"
                                :description="item.description" :icon="item.icon" :color="item.color"
                                :time="item.time" />
                        </template>
                    </AnimatedList>
                </div>
            </div>

            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-40'" />
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
                    <FlipCard
                        class="w-full max-w-[320px] h-[350px] mx-auto transition-all duration-500 hover:-translate-y-4 hover:shadow-xl hover:shadow-indigo-500/20 rounded-2xl">
                        <template #default>
                            <div
                                class="h-full w-full flex flex-col justify-center items-center bg-indigo-800 p-4 text-center rounded-2xl">
                                <font-awesome-icon :icon="['fas', 'robot']"
                                    class="text-indigo-300 text-6xl mb-6 opacity-80" />
                                <h3 class="font-league text-white text-4xl md:text-6xl">Agentes Inteligentes</h3>
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
                    <FlipCard
                        class="w-full max-w-[320px] h-[350px] mx-auto transition-all duration-500 hover:-translate-y-4 hover:shadow-xl hover:shadow-indigo-500/20 rounded-2xl">
                        <template #default>
                            <div
                                class="h-full w-full flex flex-col justify-center items-center bg-indigo-800 p-4 text-center rounded-2xl">
                                <font-awesome-icon :icon="['fas', 'bolt']"
                                    class="text-indigo-300 text-6xl mb-6 opacity-80" />
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
                    <FlipCard
                        class="w-full max-w-[320px] h-[350px] mx-auto transition-all duration-500 hover:-translate-y-4 hover:shadow-xl hover:shadow-indigo-500/20 rounded-2xl">
                        <template #default>
                            <div
                                class="h-full w-full flex flex-col justify-center items-center bg-indigo-800 p-4 text-center rounded-2xl">
                                <font-awesome-icon :icon="['fas', 'exchange-alt']"
                                    class="text-indigo-300 text-6xl mb-6 opacity-80" />
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
            </div>
        </section>

        <!-- 3. SOBRE NOSOTROS -->
        <section class="py-24 relative overflow-hidden">
            <!-- Fondo sutil -->
            <div class="absolute inset-0 bg-gray-950">
                <div
                    class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2">
                </div>
                <div
                    class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2">
                </div>
            </div>

            <div class="max-w-7xl mx-auto px-6 relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    <!-- Columna de Texto -->
                    <div class="space-y-8">
                        <div>
                            <span class="text-indigo-400 font-bold tracking-wider text-sm uppercase mb-2 block">Nuestra
                                Misión</span>
                            <TextReveal
                                class="text-6xl md:text-8xl font-bold font-league text-white mb-4 leading-tight">
                                Transformamos la gestión de negocios con IA accesible.
                            </TextReveal>
                        </div>

                        <div class="space-y-6 text-gray-400 leading-relaxed font-light text-lg">
                            <p>
                                En <strong class="text-white">MeetLines</strong>, creemos que la tecnología avanzada no
                                debería
                                ser exclusiva de las grandes corporaciones.
                            </p>
                            <p>
                                Nacimos con el objetivo de democratizar la inteligencia artificial para freelancers y
                                PyMEs,
                                creando "Agentes" digitales que no solo responden, sino que trabajan por ti: agendan,
                                venden y
                                fidelizan, mientras tú te enfocas en lo que amas.
                            </p>
                        </div>

                        <div class="pt-4 border-t border-white/5">
                            <router-link to="/register"
                                class="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center gap-2">
                                Únete a la revolución <span aria-hidden="true">&rarr;</span>
                            </router-link>
                        </div>
                    </div>

                    <!-- Columna Visual (Grid de Agentes) -->
                    <div class="relative">
                        <div class="grid grid-cols-2 gap-6">
                            <!-- Card 1 -->
                            <div
                                class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-indigo-500/50 transition-colors translate-y-8">
                                <div
                                    class="w-14 h-14 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 text-indigo-400 text-xl">
                                    <font-awesome-icon :icon="['fas', 'robot']" />
                                </div>
                                <h4 class="text-white font-bold mb-3">Recepción</h4>
                                <p class="text-sm text-gray-400">Tu cara amable ante cada nuevo cliente.</p>
                            </div>
                            <!-- Card 2 -->
                            <div
                                class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-indigo-500/50 transition-colors">
                                <div
                                    class="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400 text-xl">
                                    <font-awesome-icon :icon="['fas', 'bolt']" />
                                </div>
                                <h4 class="text-white font-bold mb-3">Transacción</h4>
                                <p class="text-sm text-gray-400">Cierra ventas y citas en segundos.</p>
                            </div>
                            <!-- Card 3 -->
                            <div
                                class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-indigo-500/50 transition-colors translate-y-8">
                                <div
                                    class="w-14 h-14 bg-pink-500/20 rounded-full flex items-center justify-center mb-4 text-pink-400 text-xl">
                                    <font-awesome-icon :icon="['fas', 'chart-line']" />
                                </div>
                                <h4 class="text-white font-bold mb-3">Reactivación</h4>
                                <p class="text-sm text-gray-400">Trae de vuelta a quienes se fueron.</p>
                            </div>
                            <!-- Card 4 -->
                            <div
                                class="bg-gray-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-indigo-500/50 transition-colors">
                                <div
                                    class="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-400 text-xl">
                                    <font-awesome-icon :icon="['fas', 'check-circle']" />
                                </div>
                                <h4 class="text-white font-bold mb-3">Feedback</h4>
                                <p class="text-sm text-gray-400">Aprende y mejora con cada opinión.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- PANEL DE CONTROL -->
        <section class="py-10 pb-24 bg-gray-950 px-4">
            <div class="max-w-7xl mx-auto">
                <div class="relative rounded-3xl overflow-hidden min-h-[500px] group border border-white/10 shadow-2xl">
                    <!-- Imagen de fondo -->
                    <img src="../img/dashboard_sample.jpg" alt="MeetLines Dashboard"
                        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" />

                    <!-- Gradiente -->
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent"></div>

                    <!-- Contenido -->
                    <div class="relative z-10 p-8 md:p-16 h-full flex flex-col justify-center max-w-3xl">
                        <div class="mb-6">
                            <span
                                class="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold border border-indigo-500/30 mb-4">
                                SOFTWARE POTENTE
                            </span>
                            <h2 class="text-4xl md:text-8xl font-bold font-league text-white leading-none mb-4">
                                Tu Panel de Control Centralizado
                            </h2>
                        </div>

                        <p class="text-xl text-gray-300 mb-8 leading-relaxed">
                            Visualiza métricas en tiempo real de todos tus agentes. Edita flujos de conversación, revisa
                            estadísticas de citas y gestiona tu base de clientes desde una interfaz intuitiva y sin
                            código.
                        </p>

                        <div class="flex flex-wrap gap-4">
                            <div
                                class="flex items-center gap-2 text-gray-400 bg-gray-900/50 px-4 py-2 rounded-lg border border-white/5">
                                <font-awesome-icon :icon="['fas', 'chart-simple']" class="text-indigo-400" />
                                <span>Analíticas en vivo</span>
                            </div>
                            <div
                                class="flex items-center gap-2 text-gray-400 bg-gray-900/50 px-4 py-2 rounded-lg border border-white/5">
                                <font-awesome-icon :icon="['fas', 'pen']" class="text-purple-400" />
                                <span>Editor Visual</span>
                            </div>
                            <div
                                class="flex items-center gap-2 text-gray-400 bg-gray-900/50 px-4 py-2 rounded-lg border border-white/5">
                                <font-awesome-icon :icon="['fas', 'users']" class="text-green-400" />
                                <span>Gestión de Clientes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- EXPLORA NEGOCIOS -->
        <section class="py-24 bg-gradient-to-b from-gray-950 to-indigo-950/20 relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-6 relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <!-- Texto -->
                    <div class="md:order-1 order-2">
                        <span class="text-indigo-400 font-bold tracking-wider text-sm uppercase mb-4 block">Para
                            Clientes</span>
                        <TextReveal class="text-6xl md:text-8xl font-bold font-league text-white mb-6 leading-none">
                            Tu próximo servicio favorito está aquí.
                        </TextReveal>
                        <p class="text-xl text-gray-300 mb-8 leading-relaxed">
                            Olvídate de las llamadas y los mensajes sin respuesta. En <strong
                                class="text-white">MeetLines</strong>, puedes explorar cientos de negocios locales, ver
                            su
                            disponibilidad en tiempo real y reservar tu cita al instante.
                        </p>

                        <div class="space-y-4 mb-8">
                            <div class="flex items-center gap-3">
                                <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-400 text-xl" />
                                <span class="text-gray-300">Búsqueda Inteligente por categoría y ubicación.</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <font-awesome-icon :icon="['fas', 'calendar-days']" class="text-blue-400 text-xl" />
                                <span class="text-gray-300">Agenda 24/7 incluso cuando el negocio está cerrado.</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <font-awesome-icon :icon="['fas', 'triangle-exclamation']"
                                    class="text-yellow-400 text-xl" />
                                <span class="text-gray-300">Reseñas Reales de otros usuarios.</span>
                            </div>
                        </div>

                        <router-link to="/explore"
                            class="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg shadow-white/10">
                            Buscar Servicios Ahora
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </router-link>
                    </div>

                    <!-- Visual (Mockup Flotante) -->
                    <!-- Visual (Mockup Flotante) -->
                    <div class="md:order-2 order-1 relative">
                        <!-- Decoración de fondo -->
                        <div
                            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-600/20 rounded-full blur-3xl -z-10">
                        </div>

                        <!-- Cards Realistas -->
                        <div class="relative flex flex-col gap-6 perspective-1000">

                            <!-- Card 1: Barbería -->
                            <div
                                class="relative z-20 bg-gray-900 border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-4 transform transition-transform duration-500 hover:scale-105 hover:-translate-y-2 hover:border-indigo-500/50 -rotate-2">
                                <div
                                    class="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-2xl shadow-lg shrink-0">
                                    <font-awesome-icon :icon="['fas', 'pen']" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-white font-bold text-lg truncate">Barbería Elite</h4>
                                    <p class="text-gray-400 text-xs mb-2">Cortes modernos y clásicos.</p>
                                    <div class="flex items-center gap-2 text-xs">
                                        <span
                                            class="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md border border-indigo-500/20">Belleza</span>
                                        <span class="flex items-center gap-1 text-yellow-400">
                                            <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg> 4.9
                                        </span>
                                    </div>
                                </div>
                                <div
                                    class="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 cursor-pointer transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            <!-- Card 2: Clinica -->
                            <div
                                class="relative z-10 bg-gray-900 border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-4 transform transition-transform duration-500 hover:scale-105 hover:translate-x-2 hover:border-blue-500/50 rotate-3 ml-8">
                                <div
                                    class="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white text-2xl shadow-lg shrink-0">
                                    <font-awesome-icon :icon="['fas', 'user']" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-white font-bold text-lg truncate">Dr. Vitality</h4>
                                    <p class="text-gray-400 text-xs mb-2">Medicina general y preventiva.</p>
                                    <div class="flex items-center gap-2 text-xs">
                                        <span
                                            class="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md border border-blue-500/20">Salud</span>
                                        <span class="flex items-center gap-1 text-yellow-400">
                                            <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg> 5.0
                                        </span>
                                    </div>
                                </div>
                                <div
                                    class="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 cursor-pointer transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. PLANES -->
        <section class="py-20 bg-gray-900">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <TextReveal class="text-5xl md:text-7xl font-bold font-league tracking-wide text-white mb-10">
                    Nuestros Planes
                </TextReveal>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
                    <div v-for="plan in planes" :key="plan.nombre" class="flex justify-center w-full">
                        <FlipCard class="w-full max-w-[350px] h-[500px]">
                            <template #default>
                                <div
                                    class="h-full w-full flex flex-col justify-between bg-blue-950 p-6 rounded-2xl border border-indigo-500/20 shadow-2xl">
                                    <div class="text-center">
                                        <h3 class="text-4xl mt-4 tracking-wider text-white font-league">{{ plan.nombre
                                        }}</h3>
                                        <div class="my-6">
                                            <span class="text-4xl font-extrabold text-indigo-400">$</span>
                                            <NumberTicker :value="plan.precio" :decimalPlaces="0"
                                                class="text-5xl font-extrabold text-indigo-400" />
                                            <span class="text-gray-400 text-lg">/mes</span>
                                        </div>
                                    </div>

                                    <div class="flex-1 w-full">
                                        <ul class="space-y-4 text-left">
                                            <li v-for="feature in plan.features" :key="feature"
                                                class="flex items-start gap-3">
                                                <div
                                                    class="mt-1 bg-indigo-500/20 p-1 rounded-full text-indigo-300 flex-shrink-0">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="3" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </div>
                                                <span class="text-gray-200 text-sm font-medium leading-snug">
                                                    {{ feature }}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="mt-4 pt-4 border-t border-white/10 text-center">
                                        <span
                                            class="text-xs text-indigo-300 font-bold uppercase tracking-widest animate-pulse">
                                            Pasa el mouse para ver detalles
                                        </span>
                                    </div>
                                </div>
                            </template>

                            <template #back>
                                <div
                                    class="h-full w-full flex flex-col bg-gray-900 p-6 rounded-2xl border border-indigo-500/30 overflow-y-auto custom-scrollbar">
                                    <h4
                                        class="text-xl font-bold text-white mb-4 text-center border-b border-indigo-500/30 pb-2">
                                        Agentes Incluidos</h4>
                                    <div class="space-y-4">
                                        <div v-for="(detail, idx) in plan.details" :key="idx" class="text-left group">
                                            <p class="text-indigo-400 font-bold text-sm mb-1 flex items-center gap-2">
                                                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                                {{ detail.title }}
                                            </p>
                                            <p
                                                class="text-gray-400 text-xs leading-relaxed pl-3 border-l-2 border-gray-800 group-hover:border-indigo-500/50 transition-colors">
                                                {{ detail.desc }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="mt-auto pt-4">
                                        <router-link to="/register"
                                            class="block w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-center transition-colors text-sm">
                                            Elegir {{ plan.nombre }}
                                        </router-link>
                                    </div>
                                </div>
                            </template>
                        </FlipCard>
                    </div>
                </div>
            </div>
        </section>

        <!-- FOOTER PROFESIONAL -->
        <footer class="bg-gray-950 border-t border-white/10 text-white">
            <div class="max-w-7xl mx-auto px-6 py-16">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    <!-- Columna 1: Marca y Descripción -->
                    <div class="space-y-4">
                        <BrandLogo />
                        <p class="text-gray-400 text-sm leading-relaxed">
                            La plataforma definitiva para automatizar tu negocio con inteligencia artificial. 
                            Gestiona clientes 24/7 mientras te enfocas en crecer.
                        </p>
                        <div class="flex gap-3 pt-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                class="w-10 h-10 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-300">
                                <font-awesome-icon :icon="['fab', 'facebook']" class="text-lg" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                class="w-10 h-10 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300">
                                <font-awesome-icon :icon="['fab', 'instagram']" class="text-lg" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                class="w-10 h-10 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300">
                                <font-awesome-icon :icon="['fab', 'twitter']" class="text-lg" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                class="w-10 h-10 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-600 hover:bg-blue-600/10 transition-all duration-300">
                                <font-awesome-icon :icon="['fab', 'linkedin']" class="text-lg" />
                            </a>
                        </div>
                    </div>

                    <!-- Columna 2: Producto -->
                    <div>
                        <h4 class="text-white font-bold text-lg mb-4 font-league">Producto</h4>
                        <ul class="space-y-3">
                            <li>
                                <router-link to="/register" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Características
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/register" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Precios
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/explore" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Explorar Negocios
                                </router-link>
                            </li>
                            <li>
                                <a href="#" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Integraciones
                                </a>
                            </li>
                            <li>
                                <a href="#" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    API
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Columna 3: Empresa -->
                    <div>
                        <h4 class="text-white font-bold text-lg mb-4 font-league">Empresa</h4>
                        <ul class="space-y-3">
                            <li>
                                <router-link to="/about" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Sobre Nosotros
                                </router-link>
                            </li>
                            <li>
                                <a href="#" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Blog
                                </a>
                            </li>
                            <li>
                                <router-link to="/careers" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Carreras
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/contact" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Contacto
                                </router-link>
                            </li>
                            <li>
                                <a href="#" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Prensa
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Columna 4: Soporte y Legal -->
                    <div>
                        <h4 class="text-white font-bold text-lg mb-4 font-league">Soporte</h4>
                        <ul class="space-y-3">
                            <li>
                                <router-link to="/help" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Centro de Ayuda
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/help" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Documentación
                                </router-link>
                            </li>
                            <li>
                                <a href="#" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Estado del Sistema
                                </a>
                            </li>
                            <li>
                                <router-link to="/terms" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Términos de Servicio
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/privacy" 
                                    class="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                                    <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                                    Política de Privacidad
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Separador -->
                <div class="border-t border-white/10 pt-8">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p class="text-gray-500 text-sm">
                            © {{ new Date().getFullYear() }} <span class="text-white font-semibold">Meetlines</span>. Todos los derechos reservados.
                        </p>
                        <div class="flex items-center gap-6 text-sm text-gray-500">
                            <router-link to="/privacy" class="hover:text-indigo-400 transition-colors">Cookies</router-link>
                            <router-link to="/privacy" class="hover:text-indigo-400 transition-colors">Privacidad</router-link>
                            <router-link to="/terms" class="hover:text-indigo-400 transition-colors">Términos</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import BrandLogo from '@/components/BrandLogo.vue';
import LineShadowText from '@/components/LineShadowText.vue';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import TextGenerateEffect from '@/components/TextGenerateEffect.vue';
import InteractiveHoverButton from '@/components/InteractiveHoverButton.vue';
import FlipCard from '@/components/FlipCard.vue';
import TextReveal from '@/components/TextReveal.vue';
import GlareCard from '@/components/GlareCard.vue';
import NumberTicker from '@/components/NumberTicker.vue';
import TextHighlight from '@/components/TextHighlight.vue';
import AnimatedList from '@/components/AnimatedList.vue';
import Notification from '@/components/Notification.vue';

const notifications = [
    {
        name: "Automatización",
        description: "Flujos de trabajo eficientes.",
        icon: ['fas', 'bolt'],
        color: "#00C9A7",
    },
    {
        name: "Gestión Inteligente",
        description: "Optimiza tus decisiones.",
        icon: ['fas', 'brain'],
        color: "#FFB800",
    },
    {
        name: "Panel de control",
        description: "Métricas en tiempo real.",
        icon: ['fas', 'chart-line'],
        color: "#FF3D71",
    },
    {
        name: "Directorio de empresas",
        description: "Explora nuevos servicios.",
        icon: ['fas', 'building'],
        color: "#1E86FF",
    },
    {
        name: "Inteligencia Artificial",
        description: "IA aplicada a tu negocio.",
        icon: ['fas', 'microchip'],
        color: "#9C27B0",
    },
    {
        name: "Workspace empleados",
        description: "Colaboración sin límites.",
        icon: ['fas', 'briefcase'],
        color: "#795548",
    },
    {
        name: "App para clientes",
        description: "Tu negocio en su bolsillo.",
        icon: ['fas', 'mobile-screen-button'],
        color: "#607D8B",
    },
];

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
        precio: 50,
        features: [
            '2 Agentes (Recepción, Transacción)',
            '1 Empresa',
            'Prueba gratis 2 meses'
        ],
        details: [
            { title: 'Recepción', desc: 'Saluda, responde preguntas frecuentes y presenta la empresa.' },
            { title: 'Transacción', desc: 'Gestiona agenda, confirma y cancela citas automáticamente.' }
        ]
    },
    {
        nombre: 'Intermedio',
        precio: 90,
        features: [
            '3 Agentes (+Feedback)',
            '2 Empresas',
            'Soporte Prioritario'
        ],
        details: [
            { title: 'Recepción', desc: 'Atención al cliente 24/7.' },
            { title: 'Transacción', desc: 'Gestión completa de citas y reservas.' },
            { title: 'Feedback', desc: 'Solicita calificación post-servicio y alerta sobre malas experiencias.' }
        ]
    },
    {
        nombre: 'Empresarial',
        precio: 150,
        features: [
            '4 Agentes (Full Suite)',
            'Empresas Ilimitadas',
            'Soporte Dedicado'
        ],
        details: [
            { title: 'Recepción y Transacción', desc: 'Suite base completa.' },
            { title: 'Feedback', desc: 'Gestión de reputación y alertas.' },
            { title: 'Reactivación', desc: 'Recupera clientes inactivos con promos (max 3 intentos).' }
        ]
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
    font-size: clamp(10rem, 18vw, 19rem);
    line-height: 1;
}

h2.font-league {
    font-size: clamp(8rem, 9vw, 10rem);
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
        gap: 2rem;
        height: auto;
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