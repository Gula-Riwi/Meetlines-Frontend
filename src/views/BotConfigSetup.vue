<template>
    <div class="min-h-screen bg-gray-950 text-white font-sans flex flex-col">
        <!-- Header -->
        <header class="border-b border-white/10 bg-gray-900/50 backdrop-blur-sm">
            <div class="max-w-6xl mx-auto px-6 py-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold font-league">Configuración del Chatbot</h1>
                        <p class="text-gray-400 mt-1">{{ projectName }}</p>
                    </div>
                    <button @click="goBack" class="text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>

        <!-- Progress Indicator -->
        <div class="border-b border-white/10 bg-gray-900/30">
            <div class="max-w-6xl mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <div v-for="(step, index) in steps" :key="index" class="flex items-center flex-1">
                        <div class="flex items-center">
                            <div :class="[
                                'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
                                currentStep >= index ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-500'
                            ]">
                                {{ index + 1 }}
                            </div>
                            <span :class="[
                                'ml-3 font-medium hidden md:inline',
                                currentStep >= index ? 'text-white' : 'text-gray-500'
                            ]">{{ step }}</span>
                        </div>
                        <div v-if="index < steps.length - 1" :class="[
                            'flex-1 h-1 mx-4 rounded',
                            currentStep > index ? 'bg-indigo-600' : 'bg-gray-800'
                        ]"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
            <div class="max-w-6xl mx-auto px-6 py-8">

                <!-- Step 1: Industry Selection -->
                <div v-if="currentStep === 0" class="space-y-6">
                    <div class="text-center mb-8">
                        <h2 class="text-4xl font-bold font-league mb-2">Selecciona tu Industria</h2>
                        <p class="text-gray-400">Esto nos ayudará a configurar tu bot con los mejores defaults</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="industry in industries" :key="industry.value"
                            @click="selectIndustry(industry.value)" :class="[
                                'group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300',
                                config.industry === industry.value
                                    ? 'border-indigo-500 bg-indigo-500/10'
                                    : 'border-white/10 bg-gray-900 hover:border-indigo-500/50 hover:bg-gray-800'
                            ]">
                            <div class="text-5xl mb-4">{{ industry.emoji }}</div>
                            <h3 class="text-xl font-bold mb-2">{{ industry.label }}</h3>
                            <p class="text-sm text-gray-400">{{ industry.description }}</p>
                        </div>
                    </div>
                </div>

                <!-- Step 2: Basic Configuration -->
                <div v-if="currentStep === 1" class="max-w-2xl mx-auto space-y-6">
                    <div class="text-center mb-8">
                        <h2 class="text-4xl font-bold font-league mb-2">Configuración Básica</h2>
                        <p class="text-gray-400">Personaliza los detalles de tu asistente virtual</p>
                    </div>

                    <div class="bg-gray-900 rounded-2xl p-8 border border-white/10 space-y-6">
                        <!-- Bot Name -->
                        <div>
                            <label class="block text-sm font-medium mb-2">Nombre del Bot</label>
                            <input v-model="config.botName" type="text"
                                class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="Ej: Asistente Virtual">
                        </div>

                        <!-- Tone -->
                        <div>
                            <label class="block text-sm font-medium mb-2">Tono de Comunicación</label>
                            <div class="grid grid-cols-3 gap-3">
                                <button v-for="tone in tones" :key="tone.value" @click="config.tone = tone.value"
                                    :class="[
                                        'px-4 py-3 rounded-xl font-medium transition-all',
                                        config.tone === tone.value
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    ]">
                                    {{ tone.label }}
                                </button>
                            </div>
                        </div>

                        <!-- Timezone -->
                        <div>
                            <label class="block text-sm font-medium mb-2">Zona Horaria</label>
                            <select v-model="config.timezone"
                                class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
                                    {{ tz.label }}
                                </option>
                            </select>
                        </div>
                        <!-- Business Hours -->

                    </div>
                </div>

                <!-- Step 3: Bot Types Configuration -->
                <div v-if="currentStep === 2" class="space-y-6">
                    <div class="text-center mb-8">
                        <h2 class="text-4xl font-bold font-league mb-2">Tipos de Bots</h2>
                        <p class="text-gray-400">Activa y configura los bots que necesites</p>
                    </div>

                    <!-- Reception Bot -->
                    <div class="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                        <div class="p-6 border-b border-white/10 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="text-3xl">👋</div>
                                <div>
                                    <h3 class="text-xl font-bold">Bot de Recepción</h3>
                                    <p class="text-sm text-gray-400">Saluda y da la bienvenida a tus clientes</p>
                                </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="config.receptionConfig.enabled" class="sr-only peer">
                                <div
                                    class="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600">
                                </div>
                            </label>
                        </div>
                        <div v-if="config.receptionConfig.enabled" class="p-6 space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Mensaje de Bienvenida</label>
                                <textarea v-model="config.receptionConfig.welcomeMessage" rows="3"
                                    class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                    placeholder="¡Hola! Soy {botName}..."></textarea>
                                <p class="text-xs text-indigo-400 mt-1">Variables disponibles: {botName}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Palabras Clave de Intención</label>
                                <input v-model="config.receptionConfig.intentTriggerKeywords" type="text"
                                    class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="agendar,reservar,cita">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Mensaje de Transferencia (Handoff)</label>
                                <textarea v-model="config.receptionConfig.handoffMessage" rows="2"
                                    class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"></textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Mensaje Fuera de Horario</label>
                                <textarea v-model="config.receptionConfig.outOfHoursMessage" rows="2"
                                    class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"></textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-3">Horario de Atención</label>
                                <div class="space-y-2">
                                    <div v-for="(schedule, day) in config.transactionalConfig.businessHours" :key="day"
                                        class="flex items-center gap-3 bg-gray-800 p-3 rounded-xl border border-white/5">
                                        
                                        <!-- Day Toggle -->
                                        <!-- Day Label -->
                                        <div class="w-24">
                                            <span class="text-sm font-medium transition-colors"
                                                :class="!schedule.closed ? 'text-white' : 'text-gray-500'">
                                                {{ getDayLabel(day) }}
                                            </span>
                                        </div>

                                        <!-- Toggle Switch -->
                                        <label class="relative inline-flex items-center cursor-pointer mr-4">
                                            <input type="checkbox" v-model="schedule.closed" :true-value="false" :false-value="true" class="sr-only peer">
                                            <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>

                                        <!-- Time Inputs -->
                                        <div v-if="!schedule.closed" class="flex items-center gap-2 flex-1 animate-fade-in">
                                            <input type="time" v-model="schedule.start"
                                                class="bg-gray-900 border border-white/10 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-indigo-500">
                                            <span class="text-gray-500 text-sm">a</span>
                                            <input type="time" v-model="schedule.end"
                                                class="bg-gray-900 border border-white/10 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-indigo-500">
                                        </div>
                                        <div v-else class="flex-1 text-sm text-gray-600 italic">
                                            Cerrado
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Transactional Bot -->
                    <div class="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                        <div class="p-6 border-b border-white/10 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="text-3xl">📅</div>
                                <div>
                                    <h3 class="text-xl font-bold">Bot Transaccional</h3>
                                    <p class="text-sm text-gray-400">Gestiona citas y reservas automáticamente</p>
                                </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="config.transactionalConfig.enabled"
                                    class="sr-only peer">
                                <div
                                    class="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600">
                                </div>
                            </label>
                        </div>
                        <div v-if="config.transactionalConfig.enabled" class="p-6 space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Duración de Cita (min)</label>
                                    <input v-model.number="config.transactionalConfig.appointmentDurationMinutes"
                                        type="number"
                                        class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">Buffer entre citas (min)</label>
                                    <input v-model.number="config.transactionalConfig.bufferMinutes" type="number"
                                        class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Días Máx. Adelanto</label>
                                    <input v-model.number="config.transactionalConfig.maxAdvanceBookingDays"
                                        type="number"
                                        class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">Días Mín. Adelanto</label>
                                    <input v-model.number="config.transactionalConfig.minAdvanceBookingDays"
                                        type="number"
                                        class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                </div>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                                <span class="text-sm">Enviar recordatorios</span>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" v-model="config.transactionalConfig.sendReminder"
                                        class="sr-only peer">
                                    <div
                                        class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
                                    </div>
                                </label>
                            </div>
                            <!-- Cancellation Policy -->
                            <div class="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                                <span class="text-sm">Permitir Cancelación</span>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" v-model="config.transactionalConfig.allowCancellation" class="sr-only peer">
                                    <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                            <div v-if="config.transactionalConfig.allowCancellation">
                                <label class="block text-sm font-medium mb-2">Horas mínimas de antelación para cancelar</label>
                                <input v-model.number="config.transactionalConfig.minCancellationHours" type="number"
                                    class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors">
                            </div>

                            <!-- Messages Fields -->
                            <div class="space-y-4 pt-4 border-t border-white/10">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Mensaje de Confirmación</label>
                                    <textarea v-model="config.transactionalConfig.confirmationMessage" rows="2"
                                        class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none" 
                                    id="confirmationMessage"
                                    @drop="onDrop($event, 'transactionalConfig.confirmationMessage')"></textarea>
                                <div class="flex flex-wrap gap-2 mt-2">
                                    <div v-for="v in ['{name}', '{service}', '{date}', '{time}', '{employee}']" :key="v"
                                        draggable="true"
                                        @dragstart="onDragStart($event, v)"
                                        @click="insertVariable('transactionalConfig.confirmationMessage', v, 'confirmationMessage')"
                                        class="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30 cursor-grab hover:bg-indigo-500/30 transition-all select-none active:cursor-grabbing">
                                        + {{ getVarLabel(v) }}
                                    </div>
                                </div>
                                </div>
                                <div v-if="config.transactionalConfig.sendReminder">
                                    <label class="block text-sm font-medium mb-2">Mensaje de Recordatorio</label>
                                    <textarea v-model="config.transactionalConfig.reminderMessage" rows="2"
                                        class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                    id="reminderMessage"
                                    @drop="onDrop($event, 'transactionalConfig.reminderMessage')"></textarea>
                                <div class="flex flex-wrap gap-2 mt-2">
                                    <div v-for="v in ['{name}', '{service}', '{date}', '{time}', '{relative_time}']" :key="v"
                                        draggable="true"
                                        @dragstart="onDragStart($event, v)"
                                        @click="insertVariable('transactionalConfig.reminderMessage', v, 'reminderMessage')"
                                        class="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30 cursor-grab hover:bg-indigo-500/30 transition-all select-none active:cursor-grabbing">
                                        + {{ getVarLabel(v) }}
                                    </div>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Feedback Bot -->
                    <div class="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                        <div class="p-6 border-b border-white/10 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="text-3xl">⭐</div>
                                <div>
                                    <h3 class="text-xl font-bold">Bot de Feedback</h3>
                                    <p class="text-sm text-gray-400">Recolecta opiniones de tus clientes</p>
                                </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="config.feedbackConfig.enabled" class="sr-only peer">
                                <div
                                    class="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600">
                                </div>
                            </label>
                        </div>
                        <div v-if="config.feedbackConfig.enabled" class="p-6 space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Esperar (horas) después de la cita</label>
                                <input v-model.number="config.feedbackConfig.delayHours" type="number"
                                    class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Mensaje de Solicitud</label>
                                <textarea v-model="config.feedbackConfig.requestMessage" rows="2"
                                    class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                    placeholder="Hola {customerName}, ¿cómo calificarías tu experiencia?"></textarea>
                                <p class="text-xs text-indigo-400 mt-1">Variables: {customerName}, {service}, {employee}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Mensaje para Feedback Negativo</label>
                                <textarea v-model="config.feedbackConfig.negativeFeedbackMessage" rows="2"
                                    class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                    placeholder="Lamentamos eso. ¿Qué podemos mejorar?"></textarea>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                                <span class="text-sm">Notificar al dueño si es negativo</span>
                              <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" v-model="config.feedbackConfig.notifyOwnerOnNegative"
                                        class="sr-only peer">
                                    <div
                                        class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
                                    </div>
                                </label>
                            </div>

                        </div>
                    </div>

                    <!-- Reactivation Bot -->
                    <div class="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                        <div class="p-6 border-b border-white/10 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="text-3xl">🔄</div>
                                <div>
                                    <h3 class="text-xl font-bold">Bot de Reactivación</h3>
                                    <p class="text-sm text-gray-400">Recupera clientes inactivos</p>
                                </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="config.reactivationConfig.enabled" class="sr-only peer">
                                <div
                                    class="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600">
                                </div>
                            </label>
                        </div>
                        <div v-if="config.reactivationConfig.enabled" class="p-6 space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Esperar (días)</label>
                                    <input v-model.number="config.reactivationConfig.delayDays" type="number"
                                        class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">Intentos Máximos</label>
                                    <input v-model.number="config.reactivationConfig.maxAttempts" type="number"
                                        class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Mensajes de Reactivación</label>
                                <div class="space-y-2">
                                    <div v-for="(message, index) in config.reactivationConfig.messages" :key="index"
                                        class="flex gap-2 flex-col">
                                        <div class="flex gap-2 w-full">
                                            <textarea v-model="config.reactivationConfig.messages[index]" rows="2"
                                                class="flex-1 px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                                :placeholder="`Mensaje ${index + 1}`"
                                                :id="`reactivationMessage-${index}`"
                                                @drop="onDrop($event, `reactivationConfig.messages[${index}]`)"
                                                @dragover.prevent
                                                @dragenter.prevent></textarea>
                                            <button v-if="config.reactivationConfig.messages.length > 1"
                                                @click="removeMessage(index)"
                                                class="px-3 py-2 bg-red-600/20 text-red-400 rounded-xl hover:bg-red-600/30 transition-colors self-start">
                                                ✕
                                            </button>
                                        </div>
                                        <div class="flex flex-wrap gap-2 mt-1">
                                            <div v-for="v in ['{customerName}', '{botName}', '{service}', '{employee}', '{lastVisitDate}']" :key="v"
                                                draggable="true"
                                                @dragstart="onDragStart($event, v)"
                                                @click="insertVariable(`reactivationConfig.messages[${index}]`, v, `reactivationMessage-${index}`)"
                                                class="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30 cursor-grab hover:bg-indigo-500/30 transition-all select-none active:cursor-grabbing">
                                                + {{ getVarLabel(v) }}
                                            </div>
                                        </div>
                                    </div>
                                    <button v-if="config.reactivationConfig.messages.length < 5" @click="addMessage"
                                        class="w-full px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-xl hover:bg-indigo-600/30 transition-colors text-sm">
                                        + Agregar Mensaje
                                    </button>
                                </div>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                                <span class="text-sm">Ofrecer descuento</span>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" v-model="config.reactivationConfig.offerDiscount"
                                        class="sr-only peer">
                                    <div
                                        class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
                                    </div>
                                </label>
                            </div>
                            <div v-if="config.reactivationConfig.offerDiscount" class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Porcentaje de Descuento</label>
                                    <input v-model.number="config.reactivationConfig.discountPercentage" type="number"
                                        class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">Mensaje de Descuento</label>
                                    <input v-model="config.reactivationConfig.discountMessage" type="text"
                                        class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="¡Tenemos un {discount}% de descuento para ti!">
                                    <p class="text-xs text-indigo-400 mt-1">Variables: {discount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Advanced Config -->
                    <div class="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                        <div class="p-6 border-b border-white/10 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="text-3xl">⚙️</div>
                                <div>
                                    <h3 class="text-xl font-bold">Configuración Avanzada</h3>
                                    <p class="text-sm text-gray-400">Opciones adicionales para tu bot</p>
                                </div>
                            </div>
                        </div>
                        <div class="p-6 space-y-4">
                            <div class="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                                <div>
                                    <span class="text-sm font-medium">Fallback a Humano</span>
                                    <p class="text-xs text-gray-500">Transferir a persona si el bot no puede ayudar</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" v-model="config.advancedConfig.humanFallback"
                                        class="sr-only peer">
                                    <div
                                        class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
                                    </div>
                                </label>
                            </div>
                            <div v-if="config.advancedConfig.humanFallback">
                                <label class="block text-sm font-medium mb-2">Palabras Clave para Humano</label>
                                <input v-model="config.advancedConfig.humanFallbackKeywords" type="text"
                                    class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="hablar con persona,operador">
                            </div>
                            <div class="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                                <div>
                                    <span class="text-sm font-medium">Modo de Prueba</span>
                                    <p class="text-xs text-gray-500">Solo responder a números de prueba</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" v-model="config.advancedConfig.testMode"
                                        class="sr-only peer">
                                    <div
                                        class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 4: Review -->
                <div v-if="currentStep === 3" class="max-w-3xl mx-auto space-y-6">
                    <div class="text-center mb-8">
                        <h2 class="text-4xl font-bold font-league mb-2">Revisión Final</h2>
                        <p class="text-gray-400">Verifica tu configuración antes de guardar</p>
                    </div>

                    <div class="bg-gray-900 rounded-2xl p-8 border border-white/10 space-y-6">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <p class="text-sm text-gray-400">Industria</p>
                                <p class="text-lg font-bold">{{ getIndustryLabel(config.industry) }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-400">Nombre del Bot</p>
                                <p class="text-lg font-bold">{{ config.botName }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-400">Tono</p>
                                <p class="text-lg font-bold capitalize">{{ config.tone }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-400">Zona Horaria</p>
                                <p class="text-lg font-bold">{{ config.timezone }}</p>
                            </div>
                        </div>

                        <div class="border-t border-white/10 pt-6">
                            <p class="text-sm text-gray-400 mb-4">Bots Activos</p>
                            <div class="flex flex-wrap gap-2">
                                <span v-if="config.receptionConfig.enabled"
                                    class="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-sm font-medium">
                                    👋 Recepción
                                </span>
                                <span v-if="config.transactionalConfig.enabled"
                                    class="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-sm font-medium">
                                    📅 Transaccional
                                </span>
                                <span v-if="config.feedbackConfig.enabled"
                                    class="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-sm font-medium">
                                    ⭐ Feedback
                                </span>
                                <span v-if="config.reactivationConfig.enabled"
                                    class="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-sm font-medium">
                                    🔄 Reactivación
                                </span>
                            </div>
                        </div>
                    </div>

                    <div v-if="errorMessage" class="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
                        <p class="text-red-400">{{ errorMessage }}</p>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer Navigation -->
        <footer class="border-t border-white/10 bg-gray-900/50 backdrop-blur-sm">
            <div class="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
                <button v-if="currentStep > 0" @click="previousStep"
                    class="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors">
                    Anterior
                </button>
                <div v-else></div>

                <button v-if="currentStep < steps.length - 1" @click="nextStep"
                    class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors">
                    Siguiente
                </button>
                <button v-else @click="saveConfiguration" :disabled="saving"
                    class="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    <svg v-if="saving" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    {{ saving ? 'Guardando...' : 'Guardar y Continuar al Dashboard' }}
                </button>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import botConfigService from '@/services/botConfigService';

const router = useRouter();
const route = useRoute();

const projectId = ref(route.params.projectId);
const projectName = ref('');
const currentStep = ref(0);
const saving = ref(false);
const errorMessage = ref('');
const isEditMode = ref(false);

const steps = ['Industria', 'Básico', 'Bots', 'Revisar'];

const industries = [
    { value: 'barbershop', label: 'Barbería', emoji: '💈', description: 'Cortes y servicios de barbería' },
    { value: 'lawyer', label: 'Abogado', emoji: '⚖️', description: 'Servicios legales y asesoría' },
    { value: 'spa', label: 'Spa', emoji: '🧖', description: 'Tratamientos y masajes' },
    { value: 'clinic', label: 'Clínica', emoji: '🏥', description: 'Consultas médicas' },
    { value: 'gym', label: 'Gimnasio', emoji: '💪', description: 'Fitness y entrenamiento' },
    { value: 'general', label: 'General', emoji: '🏢', description: 'Negocio general' }
];

const tones = [
    { value: 'friendly', label: 'Amigable' },
    { value: 'professional', label: 'Profesional' },
    { value: 'casual', label: 'Casual' }
];

const timezones = [
    { value: 'America/Bogota', label: 'Bogotá (GMT-5)' },
    { value: 'America/Mexico_City', label: 'Ciudad de México (GMT-6)' },
    { value: 'America/Lima', label: 'Lima (GMT-5)' },
    { value: 'America/Santiago', label: 'Santiago (GMT-3)' },
    { value: 'America/Buenos_Aires', label: 'Buenos Aires (GMT-3)' },
    { value: 'America/Caracas', label: 'Caracas (GMT-4)' }
];

const config = ref({
    industry: 'general',
    botName: 'Asistente Virtual',
    tone: 'friendly',
    timezone: 'America/Bogota',
    receptionConfig: {
        enabled: true,
        welcomeMessage: '¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte?',
        intentTriggerKeywords: 'agendar,reservar,cita,comprar',
        handoffMessage: '¡Perfecto! Te ayudo con eso enseguida.',
        outOfHoursMessage: 'Gracias por contactarnos. Nuestro horario de atención ha terminado. Te responderemos pronto.',
        customPrompt: ''
    },
    transactionalConfig: {
        enabled: true,
        appointmentDurationMinutes: 60, // Mapped to slotDuration in backend
        bufferMinutes: 0, // Mapped to bufferBetweenAppointments
        maxAdvanceBookingDays: 30,
        minAdvanceBookingDays: 0,
        confirmationMessage: '✅ ¡Listo! Tu cita está confirmada.',
        sendReminder: true,
        reminderHoursBefore: 24,
        reminderMessage: 'Hola, te recordamos tu cita mañana.',
        allowCancellation: true,
        minCancellationHours: 24,
        businessHours: {}, // initialized in onMounted,
        customPrompt: ''
    },
    feedbackConfig: {
        enabled: true,
        delayHours: 24,
        requestMessage: 'Hola, ¿cómo calificarías tu experiencia del 1 al 5?',
        negativeFeedbackMessage: 'Lamentamos eso. ¿Qué podemos mejorar?',
        notifyOwnerOnNegative: true,
        customPrompt: ''
    },
    reactivationConfig: {
        enabled: true,
        delayDays: 30,
        maxAttempts: 3,
        daysBetweenAttempts: 30,
        messages: [
            'Hola, hace días no te vemos. ¿Te gustaría agendar?',
            'Hola, ¿cómo has estado? Tenemos disponibilidad esta semana.',
            'Hola, te extrañamos. ¿Podemos ayudarte en algo?'
        ],
        offerDiscount: false,
        discountPercentage: 10,
        discountMessage: '¡Tenemos un {discount}% de descuento para ti!',
        customPrompt: ''
    },
    advancedConfig: {
        humanFallback: true,
        humanFallbackKeywords: 'hablar con persona,hablar con humano,operador',
        humanFallbackMessage: 'Te conecto con un miembro de nuestro equipo.',
        multiAgent: false,
        agentAssignmentStrategy: 'round-robin',
        testMode: false
    }
});

onMounted(async () => {
    // Get project name from localStorage
    const currentProject = localStorage.getItem('currentProject');
    if (currentProject) {
        const project = JSON.parse(currentProject);
        projectName.value = project.name;
    }

    // Check if bot config already exists
    try {
        const existingConfig = await botConfigService.getByProjectId(projectId.value);
        if (existingConfig) {
            isEditMode.value = true;
            // Load existing configuration
            config.value = {
                industry: existingConfig.industry,
                botName: existingConfig.botName,
                tone: existingConfig.tone,
                timezone: existingConfig.timezone,
                receptionConfig: existingConfig.receptionConfig || config.value.receptionConfig,
                transactionalConfig: existingConfig.transactionalConfig || config.value.transactionalConfig,
                feedbackConfig: existingConfig.feedbackConfig || config.value.feedbackConfig,
                reactivationConfig: existingConfig.reactivationConfig || config.value.reactivationConfig,
                advancedConfig: existingConfig.advancedConfig || config.value.advancedConfig
            };
        }
    } catch (error) {
        console.error('Error loading bot config:', error);
    }

    // Initialize business hours in Transactional Config if missing
    if (!config.value.transactionalConfig.businessHours || Object.keys(config.value.transactionalConfig.businessHours).length === 0) {
        config.value.transactionalConfig.businessHours = {
            'monday': { start: '09:00', end: '18:00', closed: false },
            'tuesday': { start: '09:00', end: '18:00', closed: false },
            'wednesday': { start: '09:00', end: '18:00', closed: false },
            'thursday': { start: '09:00', end: '18:00', closed: false },
            'friday': { start: '09:00', end: '18:00', closed: false },
            'saturday': { start: '09:00', end: '13:00', closed: false },
            'sunday': { start: '09:00', end: '18:00', closed: true }
        };
    }
});

const toggleDay = (day) => {
    config.value.transactionalConfig.businessHours[day].closed = !config.value.transactionalConfig.businessHours[day].closed;
};

const getDayLabel = (day) => {
    const days = {
        'monday': 'Lunes',
        'tuesday': 'Martes',
        'wednesday': 'Miércoles',
        'thursday': 'Jueves',
        'friday': 'Viernes',
        'saturday': 'Sábado',
        'sunday': 'Domingo'
    };
    return days[day] || day;
};

const selectIndustry = async (industry) => {
    config.value.industry = industry;

    // Fetch industry defaults
    try {
        const defaults = await botConfigService.getIndustryDefaults(projectId.value, industry);
        if (defaults) {
            config.value.botName = defaults.botName || config.value.botName;
            config.value.receptionConfig.welcomeMessage = defaults.receptionConfig?.welcomeMessage || config.value.receptionConfig.welcomeMessage;
            config.value.receptionConfig.intentTriggerKeywords = defaults.receptionConfig?.intentTriggerKeywords || config.value.receptionConfig.intentTriggerKeywords;
            config.value.transactionalConfig.appointmentDurationMinutes = defaults.transactionalConfig?.appointmentDurationMinutes || config.value.transactionalConfig.appointmentDurationMinutes;
            config.value.reactivationConfig.delayDays = defaults.reactivationConfig?.delayDays || config.value.reactivationConfig.delayDays;
        }
    } catch (error) {
        console.error('Error fetching industry defaults:', error);
    }
};

const getIndustryLabel = (value) => {
    return industries.find(i => i.value === value)?.label || value;
};

const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
        currentStep.value++;
    }
};

const previousStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
};

const goBack = () => {
    router.push('/projects');
};

const addMessage = () => {
    if (config.value.reactivationConfig.messages.length < 5) {
        config.value.reactivationConfig.messages.push('');
    }
};

const removeMessage = (index) => {
    if (config.value.reactivationConfig.messages.length > 1) {
        config.value.reactivationConfig.messages.splice(index, 1);
    }
};

const saveConfiguration = async () => {
    saving.value = true;
    errorMessage.value = '';

    try {
        const payload = {
            botName: config.value.botName,
            industry: config.value.industry,
            tone: config.value.tone,
            timezone: config.value.timezone,
            receptionConfig: config.value.receptionConfig,
            transactionalConfig: config.value.transactionalConfig,
            feedbackConfig: config.value.feedbackConfig,
            reactivationConfig: config.value.reactivationConfig,
            advancedConfig: config.value.advancedConfig
        };

        if (isEditMode.value) {
            await botConfigService.update(projectId.value, payload);
        } else {
            await botConfigService.create(projectId.value, {
                projectId: projectId.value,
                ...payload
            });
        }

        // Navigate to dashboard
        router.push('/dashboard');
    } catch (error) {
        console.error('Error saving bot configuration:', error);
        errorMessage.value = error.response?.data?.message || 'Error al guardar la configuración. Por favor intenta de nuevo.';
    } finally {
        saving.value = false;
    }
};
// Helper to insert variable at cursor position
const insertVariable = (fieldPath, variable, refKey) => {
    const input = document.getElementById(refKey);
    if (!input) {
        console.error('Input not found:', refKey);
        return;
    }

    const start = input.selectionStart;
    const end = input.selectionEnd;
    const text = input.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    // Update Value
    const newValue = before + variable + after;
    
    // Update Model
    updateConfigPath(fieldPath, newValue);
    
    // Restore cursor and focus
    setTimeout(() => {
        input.focus();
        input.selectionStart = input.selectionEnd = start + variable.length;
    }, 0);
};

const onDragStart = (event, variable) => {
    if (event.dataTransfer) {
        event.dataTransfer.setData('text/plain', variable);
        event.dataTransfer.effectAllowed = 'copy';
    }
};

const onDrop = (event, fieldPath) => {
    // The default behavior of a textarea drop is to insert text at cursor.
    // However, we want to ensure we update our Vue model correctly.
    // Native drop might work for the visual value, but v-model binding must be updated.
    
    // We let the native behavior happen, then trigger an input event or update model?
    // Actually, handling it manually ensures control.
    
    event.preventDefault();
    const variable = event.dataTransfer.getData('text/plain');
    if (!variable) return;
    
    const input = event.target;
    const start = input.selectionStart; // This might be where the drop happened if browser supports it, or just current.
    // In many browsers, drop does not automatically move cursor *before* the event fires in a way that selectionStart captures the drop point perfectly always.
    // But usually 'drop' event gives clientX/Y. Calculation is hard.
    // Simple approach: Use selection or append. 
    // BETTER UX for standard inputs: Let default happen, then sync?
    // Vue v-model usually syncs on 'input'.
    
    // Let's try inserting manually at cursor position (which usually updates on click/dragover).
    const text = input.value;
    const newValue = text.substring(0, start) + variable + text.substring(input.selectionEnd);
    
    updateConfigPath(fieldPath, newValue);
};

const updateConfigPath = (path, value) => {
    const parts = path.split('.');
    let target = config.value;
    for (let i = 0; i < parts.length - 1; i++) {
        target = target[parts[i]];
    }
    target[parts[parts.length - 1]] = value;
};

const variableLabels = {
    '{botName}': 'Nombre del Bot',
    '{name}': 'Nombre Cliente',
    '{customerName}': 'Nombre Cliente',
    '{service}': 'Servicio',
    '{date}': 'Fecha Cita',
    '{time}': 'Hora Cita',
    '{employee}': 'Profesional',
    '{relative_time}': 'Tiempo Relativo',
    '{discount}': 'Descuento %'
};

const getVarLabel = (v) => variableLabels[v] || v;
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.5);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.7);
}
</style>
