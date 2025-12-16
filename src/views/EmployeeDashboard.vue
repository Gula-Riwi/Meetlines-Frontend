<template>
    <div class="min-h-screen bg-gray-950 font-sans text-white relative">
        <!-- Header -->
        <header
            class="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-10">
            <div>
                <h2 class="text-2xl font-bold">Bienvenido, {{ employeeName }}</h2>
                <p class="text-sm text-gray-400">Panel de Empleado - {{ projectName }}</p>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right hidden md:block">
                    <p class="text-sm font-bold text-white">{{ employeeName }}</p>
                    <p class="text-sm text-indigo-400">{{ employeeRole }}</p>
                </div>
                <div
                    class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white/20 flex items-center justify-center font-bold text-lg">
                    {{ employeeInitials }}
                </div>
                <!-- Logout Button -->
                <button @click="handleLogout"
                    class="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    <span class="font-bold text-sm hidden md:inline">Salir</span>
                </button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto p-8">
            <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                squares-class-name="hover:fill-indigo-500/50"
                :class="'absolute inset-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                <!-- Profile Card -->
                <div class="lg:col-span-1">
                    <div @click="showChangePasswordModal = true"
                        class="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                        <div class="flex items-center gap-4 mb-4">
                            <div
                                class="p-3 rounded-xl bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold">Mi Perfil</h3>
                        </div>
                        <p class="text-gray-400 text-sm mb-3">Actualiza tu información personal y contraseña.</p>
                        <div class="text-sm text-indigo-400 font-medium">Click para cambiar contraseña →</div>
                    </div>
                </div>

                <!-- Task Checklist -->
                <!-- Task Checklist (Chats) -->
                <div class="lg:col-span-2">
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-2xl font-bold">Chats Asignados</h3>
                            <span class="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm font-medium">
                                {{ tasks.length }} activos
                            </span>
                        </div>

                        <!-- Empty State -->
                        <div v-if="tasks.length === 0"
                            class="text-center py-12 border-2 border-dashed border-white/10 rounded-xl">
                            <!-- Icon for empty chat -->
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-600"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <h4 class="text-lg font-bold mb-2">No tienes chats asignados</h4>
                            <p class="text-gray-400 text-sm">Cuando te asignen un cliente, aparecerá aquí.</p>
                        </div>

                        <!-- Loading State -->
                        <div v-else-if="isLoadingTasks" class="py-12 flex justify-center">
                            <div
                                class="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full">
                            </div>
                        </div>

                        <!-- Chat List -->
                        <div v-else class="space-y-3">
                            <div v-for="task in tasks" :key="task.id"
                                class="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors group cursor-pointer"
                                @click="toggleTask(task.id)">
                                <!-- Icon Status -->
                                <div
                                    class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>

                                <!-- Task Content -->
                                <div class="flex-1">
                                    <div class="flex justify-between items-start">
                                        <p class="font-bold text-white group-hover:text-indigo-300 transition-colors">
                                            {{ task.title }}
                                        </p>
                                        <span class="text-xs text-gray-500">{{ task.phone }}</span>
                                    </div>
                                    <p class="text-sm text-gray-400 mt-1 line-clamp-1">{{ task.description }}
                                    </p>
                                </div>

                                <!-- Priority Badge -->
                                <span v-if="task.priority === 'high'"
                                    class="px-2 py-1 rounded-md text-xs font-bold bg-red-500/20 text-red-400 animate-pulse">
                                    URGENTE
                                </span>
                                <span v-else
                                    class="px-2 py-1 rounded-md text-xs font-bold bg-green-500/20 text-green-400">
                                    ACTIVO
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Appointments Section -->
                    <div class="bg-gray-900 border border-white/10 rounded-2xl p-6 mt-6">
                        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                            <div>
                                <h3 class="text-2xl font-bold">Próximas Citas</h3>
                                <div class="flex items-center gap-2 mt-1">
                                    <span
                                        class="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
                                        {{ filteredAppointments.length }} visibles
                                    </span>
                                    <button @click="showCreateAppointmentModal = true"
                                        class="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded ml-2 transition-colors">
                                        + Nueva Cita
                                    </button>
                                </div>
                            </div>

                            <!-- Filters -->
                            <div class="flex items-center gap-2 w-full sm:w-auto">
                                <input type="date" v-model="filterDate"
                                    class="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2">
                                <select v-model="filterStatus"
                                    class="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2">
                                    <option value="">Todos</option>
                                    <option value="confirmed">Confirmado</option>
                                    <option value="pending">Pendiente</option>
                                    <option value="cancelled">Cancelado</option>
                                </select>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-if="filteredAppointments.length === 0"
                            class="text-center py-8 border-2 border-dashed border-white/10 rounded-xl">
                            <h4 class="text-lg font-bold mb-2">No se encontraron citas</h4>
                            <p class="text-gray-400 text-sm">Prueba ajustando los filtros.</p>
                        </div>

                        <!-- Appointments List -->
                        <div v-else class="space-y-3">
                            <div v-for="app in filteredAppointments" :key="app.id"
                                class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors border border-transparent hover:border-indigo-500/30">

                                <!-- Date Badge -->
                                <div
                                    class="flex-shrink-0 w-full sm:w-16 h-16 bg-gray-700/50 rounded-lg flex flex-row sm:flex-col items-center justify-center border border-white/10 gap-2 sm:gap-0 px-4 sm:px-0">
                                    <span class="text-xs text-gray-400 uppercase font-bold">{{ new
                                        Date(app.startTime).toLocaleDateString('es-ES', { month: 'short' }).replace('.',
                                            '') }}</span>
                                    <span class="text-2xl font-bold text-white">{{ new Date(app.startTime).getDate()
                                    }}</span>
                                </div>

                                <!-- Info -->
                                <div class="flex-1 min-w-0 w-full">
                                    <div class="flex justify-between items-start">
                                        <h4 class="font-bold text-white text-lg truncate">{{ app.serviceName ||
                                            'Servicio Agendado' }}</h4>
                                        <div class="text-right whitespace-nowrap ml-2">
                                            <p class="font-bold text-indigo-400">
                                                {{ new Date(app.startTime).toLocaleTimeString('es-ES', {
                                                    hour:
                                                        '2-digit', minute: '2-digit'
                                                }) }} -
                                                {{ new Date(app.endTime).toLocaleTimeString('es-ES', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }) }}
                                            </p>
                                            <p class="text-xs text-gray-500">{{ app.price }} {{ app.currency }}</p>
                                        </div>
                                    </div>

                                    <div class="mt-1 space-y-1">
                                        <p v-if="app.userNotes"
                                            class="text-sm text-gray-300 bg-gray-900/50 p-2 rounded border border-white/5 italic">
                                            "{{ app.userNotes }}"
                                        </p>
                                        <div class="flex items-center gap-2 text-sm text-gray-400">
                                            <span>{{ app.clientName || 'Cliente sin nombre' }}</span>
                                            <span v-if="app.clientEmail"
                                                class="w-1 h-1 rounded-full bg-gray-600"></span>
                                            <span v-if="app.clientEmail">{{ app.clientEmail }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Actions -->
                                <div
                                    class="w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 flex sm:block justify-end">
                                    <select :value="app.status"
                                        @change="updateAppointmentStatus(app, $event.target.value)" :class="{
                                            'bg-green-500/20 text-green-400 border-green-500/30': app.status === 'confirmed',
                                            'bg-yellow-500/20 text-yellow-400 border-yellow-500/30': app.status === 'pending',
                                            'bg-red-500/20 text-red-400 border-red-500/30': app.status === 'cancelled',
                                            'bg-gray-700 text-gray-300 border-gray-600': !['confirmed', 'pending', 'cancelled'].includes(app.status)
                                        }"
                                        class="text-xs font-bold px-2 py-1 rounded border focus:ring-0 focus:outline-none cursor-pointer">
                                        <option value="confirmed">Confirmado</option>
                                        <option value="pending">Pendiente</option>
                                        <option value="cancelled">Cancelado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Change Password Modal -->
        <div v-if="showChangePasswordModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            @click.self="showChangePasswordModal = false">
            <div class="bg-gray-900 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl overflow-hidden">
                <div class="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 class="text-xl font-bold">Cambiar Contraseña</h2>
                    <button @click="closeChangePasswordModal" class="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div v-if="changePasswordSuccess" class="p-6">
                    <div
                        class="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
                        <p class="font-medium mb-2">✓ Contraseña actualizada</p>
                        <p>Tu contraseña ha sido cambiada exitosamente.</p>
                    </div>
                    <button @click="closeChangePasswordModal"
                        class="w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors">
                        Cerrar
                    </button>
                </div>

                <form v-else @submit.prevent="changePassword" class="p-6 space-y-4">
                    <!-- Current Password -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Contraseña Actual</label>
                        <div class="relative">
                            <input :type="showCurrentPassword ? 'text' : 'password'"
                                v-model="passwordForm.currentPassword" required
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                                placeholder="••••••••">
                            <button type="button" @click="showCurrentPassword = !showCurrentPassword"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200">
                                <svg v-if="!showCurrentPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                    </path>
                                </svg>
                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.596m16.807 16.807L9.404 9.404m0 0L3.596 3.596m16.807 16.807l-6.208-6.208">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- New Password -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Nueva Contraseña</label>
                        <div class="relative">
                            <input :type="showNewPassword ? 'text' : 'password'" v-model="passwordForm.newPassword"
                                required minlength="6"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                                placeholder="••••••••">
                            <button type="button" @click="showNewPassword = !showNewPassword"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200">
                                <svg v-if="!showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                    </path>
                                </svg>
                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.596m16.807 16.807L9.404 9.404m0 0L3.596 3.596m16.807 16.807l-6.208-6.208">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <p class="text-xs text-gray-500">Mínimo 6 caracteres</p>
                    </div>

                    <!-- Confirm Password -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Confirmar Nueva Contraseña</label>
                        <input :type="showNewPassword ? 'text' : 'password'" v-model="confirmNewPassword" required
                            minlength="6"
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                            placeholder="••••••••">
                    </div>

                    <div v-if="changePasswordError"
                        class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                        {{ changePasswordError }}
                    </div>

                    <div class="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button type="button" @click="closeChangePasswordModal"
                            class="px-4 py-2 text-gray-300 hover:text-white font-medium">Cancelar</button>
                        <button type="submit" :disabled="changingPassword"
                            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center gap-2">
                            <span v-if="changingPassword"
                                class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                            {{ changingPassword ? 'Cambiando...' : 'Cambiar Contraseña' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Chat Window Modal -->
        <ChatWindow v-if="selectedChat" :project-id="projectId" :phone="selectedChat.phone"
            :contact-name="selectedChat.title" @close="selectedChat = null" @returned-to-bot="handleReturnedToBot" />

        <!-- Appointment Modal -->
        <div v-if="showCreateAppointmentModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div
                class="bg-gray-900 rounded-2xl w-full max-w-lg border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
                <div class="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 class="text-xl font-bold">Agendar Nueva Cita</h2>
                    <button @click="closeCreateAppointmentModal" class="text-gray-400 hover:text-white">✕</button>
                </div>
                <form @submit.prevent="createAppointment" class="p-6 space-y-4">
                    <!-- Client Info -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Nombre Cliente</label>
                            <input v-model="newAppointment.clientName" required type="text"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:outline-none">
                        </div>
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Teléfono</label>
                            <input v-model="newAppointment.clientPhone" type="text"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:outline-none">
                        </div>
                    </div>
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Email (Opcional)</label>
                        <input v-model="newAppointment.clientEmail" type="email"
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:outline-none">
                    </div>

                    <!-- Time -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Fecha Inicio</label>
                            <input v-model="newAppointment.startTimeLocal" required type="datetime-local"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:outline-none">
                        </div>
                        <div class="space-y-1">
                            <label class="text-sm text-gray-400">Fecha Fin</label>
                            <input v-model="newAppointment.endTimeLocal" required type="datetime-local"
                                class="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:outline-none">
                        </div>
                    </div>

                    <!-- Notes -->
                    <div class="space-y-1">
                        <label class="text-sm text-gray-400">Notas Internas</label>
                        <textarea v-model="newAppointment.userNotes" rows="2"
                            class="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"></textarea>
                    </div>

                    <div class="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button type="button" @click="closeCreateAppointmentModal"
                            class="px-4 py-2 text-gray-300 hover:text-white">Cancelar</button>
                        <button type="submit" :disabled="isCreatingAppointment"
                            class="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-bold transition-colors flex items-center gap-2">
                            <span v-if="isCreatingAppointment"
                                class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                            {{ isCreatingAppointment ? 'Agendando...' : 'Agendar Cita' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import authService from '@/services/authService';
import employeeService from '@/services/employeeService';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import { confirmAction, showError, showSuccess, showToast } from '@/utils/alert';
import { getCurrentSubdomain } from '@/services/tenantService';
import projectService from '@/services/projectService';
import appointmentService from '@/services/appointmentService';

const router = useRouter();

const employeeName = ref('');
const employeeRole = ref('');
const employeeId = ref('');
const projectName = ref('');
const projectId = ref('');

// Change Password Modal
const showChangePasswordModal = ref(false);
const passwordForm = ref({
    currentPassword: '',
    newPassword: ''
});
const confirmNewPassword = ref('');
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const changePasswordError = ref('');
const changePasswordSuccess = ref(false);
const changingPassword = ref(false);

// Tasks (Conversations)
const tasks = ref([]);
const appointments = ref([]);
const filterDate = ref('');
const filterStatus = ref('');
const isLoadingTasks = ref(false);
const selectedChat = ref(null);

// Appointment creation
const showCreateAppointmentModal = ref(false);
const isCreatingAppointment = ref(false);
const newAppointment = ref({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    startTimeLocal: '',
    endTimeLocal: '',
    userNotes: ''
});

const employeeInitials = computed(() => {
    if (!employeeName.value) return 'E';
    return employeeName.value.substring(0, 2).toUpperCase();
});

const completedTasks = computed(() => {
    // For chats, maybe "completed" means BotType != 'human_paused' or HandledByHuman == false? 
    // Or just count resolved tickets. For now, let's just count 'human_paused' as active/incomplete.
    // Let's assume handled conversations are 'incomplete' tasks (to be done).
    return tasks.value.filter(task => task.completed).length;
});

const filteredAppointments = computed(() => {
    return appointments.value.filter(app => {
        let matchesDate = true;
        if (filterDate.value) {
            // Compare YYYY-MM-DD
            const appDate = new Date(app.startTime).toISOString().split('T')[0];
            matchesDate = appDate === filterDate.value;
        }

        const matchesStatus = !filterStatus.value || app.status === filterStatus.value;
        return matchesDate && matchesStatus;
    });
});

const toggleTask = (taskId) => {
    const task = tasks.value.find(t => t.id === taskId);
    if (task) {
        selectedChat.value = task;
    }
};

const handleReturnedToBot = async () => {
    // Refresh lists
    await fetchAssignedConversations();
    // Maybe show toast? The ChatWindow already shows alert.
};

// Polling interval
let pollingInterval = null;

const fetchAssignedConversations = async () => {
    if (!projectId.value || !employeeId.value) return;

    // Don't show loading spinner on background updates
    if (!pollingInterval) isLoadingTasks.value = true;

    try {
        const conversations = await employeeService.getConversations(projectId.value, employeeId.value, {
            pageSize: 100, // Fetch more to handle simple history
            activeOnly: true // Only get currently active sessions (Latest message assigned to me)
        });

        // Deduplicate by Customer Phone (Group conversations)
        const uniqueConversations = {};
        conversations.forEach(conv => {
            // Assume conversations are ordered by latest first, or check dates
            if (!uniqueConversations[conv.customerPhone]) {
                uniqueConversations[conv.customerPhone] = conv;
            } else {
                // If existing is older, replace (optional, depends on sort order)
                // Assuming API returns latest first.
            }
        });

        // Map grouped conversations to tasks
        tasks.value = Object.values(uniqueConversations).map(conv => ({
            id: conv.id,
            title: conv.customerName || conv.customerPhone,
            description: conv.customerMessage === '(Human Reply)' ? `Tú: ${conv.botResponse}` : conv.customerMessage || conv.lastMessage || 'Sin mensajes recientes',
            completed: false,
            priority: conv.requiresHumanAttention ? 'high' : 'medium',
            type: 'chat',
            phone: conv.customerPhone,
            createdAt: conv.createdAt
        })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    } catch (error) {
        console.error("Error fetching conversations:", error);
    } finally {
        isLoadingTasks.value = false;
    }
};

onUnmounted(() => {
    if (pollingInterval) clearInterval(pollingInterval);
});

const fetchAssignedAppointments = async () => {
    if (!projectId.value) return;
    try {
        const apps = await appointmentService.getAll(projectId.value);
        if (apps.data) {
            appointments.value = Array.isArray(apps.data) ? apps.data : [];
        } else {
            appointments.value = Array.isArray(apps) ? apps : [];
        }
    } catch (error) {
        console.error("Error fetching appointments:", error);
    }
};

const updateAppointmentStatus = async (app, newStatus) => {
    const originalStatus = app.status;
    // Optimistic update
    app.status = newStatus;

    try {
        await appointmentService.updateStatus(projectId.value, app.id, newStatus);
        showToast("Estado de la cita actualizado exitosamente");
    } catch (error) {
        console.error("Error updating appointment status:", error);
        // Revert
        app.status = originalStatus;
        showError("Error al actualizar el estado de la cita");
    }
};

const createAppointment = async () => {
    if (!newAppointment.value.startTimeLocal || !newAppointment.value.endTimeLocal) {
        showError("Debes seleccionar fecha de inicio y fin");
        return;
    }

    try {
        isCreatingAppointment.value = true;

        // Convert local datetime inputs to ISO strings (or send as is depending on backend, usually ISO)
        const start = new Date(newAppointment.value.startTimeLocal).toISOString();
        const end = new Date(newAppointment.value.endTimeLocal).toISOString();

        const payload = {
            projectId: projectId.value,
            serviceId: 0,
            employeeId: employeeId.value,
            startTime: start,
            endTime: end,
            userNotes: newAppointment.value.userNotes,
            clientName: newAppointment.value.clientName,
            clientEmail: newAppointment.value.clientEmail,
            clientPhone: newAppointment.value.clientPhone
        };

        const response = await appointmentService.create(projectId.value, payload);

        if (response) {
            showSuccess("Cita agendada exitosamente");
            closeCreateAppointmentModal();
            await fetchAssignedAppointments();
        }

    } catch (error) {
        console.error("Error creating appointment:", error);
        showError(error.response?.data?.message || "Error al agendar la cita");
    } finally {
        isCreatingAppointment.value = false;
    }
};

const closeCreateAppointmentModal = () => {
    showCreateAppointmentModal.value = false;
    newAppointment.value = {
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        startTimeLocal: '',
        endTimeLocal: '',
        userNotes: ''
    };
};

const changePassword = async () => {
    changePasswordError.value = '';

    // Validation
    if (passwordForm.value.newPassword.length < 6) {
        changePasswordError.value = 'La nueva contraseña debe tener al menos 6 caracteres.';
        return;
    }

    if (passwordForm.value.newPassword !== confirmNewPassword.value) {
        changePasswordError.value = 'Las contraseñas no coinciden.';
        return;
    }

    try {
        changingPassword.value = true;

        const response = await authService.employeeChangePassword({
            currentPassword: passwordForm.value.currentPassword,
            newPassword: passwordForm.value.newPassword
        });

        if (response.success) {
            changePasswordSuccess.value = true;
        } else {
            changePasswordError.value = response.message || 'Error al cambiar la contraseña.';
        }
    } catch (err) {
        console.error('Error en change password:', err);
        changePasswordError.value = err.response?.data?.message || 'Error al cambiar la contraseña. Verifica tu contraseña actual.';
    } finally {
        changingPassword.value = false;
    }
};

const closeChangePasswordModal = () => {
    showChangePasswordModal.value = false;
    passwordForm.value = { currentPassword: '', newPassword: '' };
    confirmNewPassword.value = '';
    changePasswordError.value = '';
    changePasswordSuccess.value = false;
    showCurrentPassword.value = false;
    showNewPassword.value = false;
};

const handleLogout = async () => {
    const isConfirmed = await confirmAction(
        '¿Cerrar Sesión?',
        '¿Estás seguro que deseas salir del panel?'
    );
    if (!isConfirmed) return;

    try {
        const refreshToken = Cookies.get('refresh_token');
        if (refreshToken) {
            await authService.logout(refreshToken);
        }
    } catch (e) {
        console.error('Error en logout:', e);
    } finally {
        Cookies.remove('auth_token');
        Cookies.remove('refresh_token');
        localStorage.clear();
        router.push('/employee-login');
    }
}

onMounted(async () => {
    // Cargar datos del usuario desde localStorage
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            employeeName.value = user.name || 'Empleado';
            employeeRole.value = 'Colaborador';
            employeeId.value = user.id;
            if (user.projectId) {
                console.log("Using projectId from login:", user.projectId);
                projectId.value = user.projectId;
            }
        }

        // Detectar proyecto por subdominio
        const sub = getCurrentSubdomain();
        if (sub) {
            projectName.value = sub.charAt(0).toUpperCase() + sub.slice(1);

            // Si ya tenemos projectId del login, cargar chats directamente
            if (projectId.value) {
                await fetchAssignedConversations();
                await fetchAssignedAppointments();
            } else {
                // Try to get public project details to get ID as fallback
                try {
                    // Note: tenantService doesn't have getProjectBySubdomain yet, 
                    // relying on public API or user storage is safer.
                    // But if user.projectId is missing, we might need a way.
                    // Assuming login always returns projectId now.
                    console.warn("ProjectId not found in storage, checking public details...");
                    // const project = await projectService.getPublicDetails(sub); // This method might not exist as per previous check
                    // projectId.value = project.id;
                    // await fetchAssignedConversations();
                } catch (err) {
                    console.error("Error fetching project details for dashboard", err);
                }
            }
        } else if (projectId.value) {
            // Not in subdomain but have projectId (e.g. main domain login?)
            await fetchAssignedConversations();
            await fetchAssignedAppointments();
        }

        // START POLLING
        if (projectId.value) {
            pollingInterval = setInterval(async () => {
                await fetchAssignedConversations();
                await fetchAssignedAppointments();
            }, 5000); // 5 seconds
        }

    } catch (e) {
        console.error('Error cargando datos de empleado', e);
    }
});
</script>
