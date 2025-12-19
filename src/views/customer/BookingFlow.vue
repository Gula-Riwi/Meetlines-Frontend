<template>
    <div class="min-h-screen bg-gray-950 text-white">
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center h-16">
                    <button @click="goBack" class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        <span>Volver</span>
                    </button>
                </div>
            </div>
        </header>

        <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Step indicator -->
            <div class="flex items-center justify-center mb-8">
                <div v-for="(s, i) in steps" :key="i" class="flex items-center">
                    <div :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors',
                        step >= i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'
                    ]">
                        {{ i + 1 }}
                    </div>
                    <div v-if="i < steps.length - 1" :class="[
                        'w-16 h-1 mx-2 transition-colors',
                        step > i + 1 ? 'bg-indigo-600' : 'bg-gray-700'
                    ]"></div>
                </div>
            </div>

            <!-- Step 1: Select Date -->
            <div v-if="step === 1" class="space-y-6">
                <h2 class="text-2xl font-bold text-center">Selecciona una fecha</h2>
                
                <div class="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
                    <input
                        type="date"
                        v-model="selectedDate"
                        :min="minDate"
                        class="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <button
                    @click="loadSlots"
                    :disabled="!selectedDate"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                    Continuar
                </button>
            </div>

            <!-- Step 2: Select Time -->
            <div v-if="step === 2" class="space-y-6">
                <h2 class="text-2xl font-bold text-center">Selecciona un horario</h2>
                
                <div v-if="slotsLoading" class="text-center py-8">
                    <svg class="animate-spin h-8 w-8 mx-auto text-indigo-500" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                </div>

                <div v-else-if="availableSlots.length === 0" class="text-center py-8 text-gray-400">
                    No hay horarios disponibles para esta fecha.
                    <button @click="step = 1" class="block mx-auto mt-4 text-indigo-400 hover:text-indigo-300">
                        Elegir otra fecha
                    </button>
                </div>

                <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    <button
                        v-for="slot in availableSlots"
                        :key="slot.time"
                        @click="selectedSlot = slot"
                        :class="[
                            'py-3 px-4 rounded-xl border text-center transition-all',
                            selectedSlot?.time === slot.time
                                ? 'bg-indigo-600 border-indigo-500 text-white'
                                : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:border-indigo-500'
                        ]"
                    >
                        {{ formatTime(slot.time) }}
                    </button>
                </div>

                <button
                    v-if="availableSlots.length > 0"
                    @click="step = 3"
                    :disabled="!selectedSlot"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                    Continuar
                </button>
            </div>

            <!-- Step 3: Confirm -->
            <div v-if="step === 3" class="space-y-6">
                <h2 class="text-2xl font-bold text-center">Confirma tu cita</h2>
                
                <div class="bg-gray-900/50 rounded-2xl p-6 border border-white/10 space-y-4">
                    <div class="flex justify-between">
                        <span class="text-gray-400">Fecha:</span>
                        <span class="font-medium">{{ formatDate(selectedDate) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">Hora:</span>
                        <span class="font-medium">{{ formatTime(selectedSlot?.time) }}</span>
                    </div>
                    <div v-if="service" class="flex justify-between">
                        <span class="text-gray-400">Servicio:</span>
                        <span class="font-medium">{{ service.name }}</span>
                    </div>
                    <div v-if="service?.price" class="flex justify-between">
                        <span class="text-gray-400">Precio:</span>
                        <span class="font-medium text-indigo-400">${{ service.price }}</span>
                    </div>
                </div>

                <div class="space-y-3">
                    <label class="text-sm font-medium text-gray-300">Notas (opcional)</label>
                    <textarea
                        v-model="notes"
                        placeholder="Alguna preferencia o comentario..."
                        rows="3"
                        class="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    ></textarea>
                </div>

                <div v-if="bookingError" class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                    {{ bookingError }}
                </div>

                <button
                    @click="confirmBooking"
                    :disabled="isBooking"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                    <svg v-if="isBooking" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    {{ isBooking ? 'Agendando...' : 'Confirmar cita' }}
                </button>
            </div>

            <!-- Step 4: Success -->
            <div v-if="step === 4" class="text-center space-y-6">
                <div class="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                <h2 class="text-2xl font-bold">¡Cita agendada!</h2>
                <p class="text-gray-400">Tu cita ha sido confirmada exitosamente.</p>

                <div class="flex gap-4 justify-center">
                    <router-link to="/my-appointments"
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                        Ver mis citas
                    </router-link>
                    <router-link to="/explore"
                        class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                        Seguir explorando
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Services
import bookingService from '@/services/bookingService';

const route = useRoute();
const router = useRouter();

// State
const step = ref(1);
const steps = ['Fecha', 'Hora', 'Confirmar'];
const selectedDate = ref('');
const selectedSlot = ref(null);
const availableSlots = ref([]);
const slotsLoading = ref(false);
const service = ref(null);
const notes = ref('');
const isBooking = ref(false);
const bookingError = ref('');

// Computed
const minDate = computed(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
});

// Methods
const goBack = () => {
    if (step.value > 1 && step.value < 4) {
        step.value--;
    } else {
        router.push(`/business/${route.params.projectId}`);
    }
};

const loadSlots = async () => {
    slotsLoading.value = true;
    step.value = 2;
    
    try {
        const serviceId = route.query.serviceId ? parseInt(route.query.serviceId) : undefined;
        console.log('Loading slots for:', {
            projectId: route.params.projectId,
            date: selectedDate.value,
            serviceId: serviceId
        });
        const response = await bookingService.getAvailableSlots(
            route.params.projectId,
            selectedDate.value,
            serviceId
        );
        console.log('Slots API response:', response);
        
        // Backend returns { date: "2025-12-19", slots: [...] }
        // Extract the slots array properly
        const slotsData = response.slots || response.data?.slots || response.data || response || [];
        
        // De-duplicate slots by time (keep first available employee per time)
        const uniqueSlots = [];
        const seenTimes = new Set();
        for (const slot of slotsData) {
            if (!seenTimes.has(slot.time)) {
                seenTimes.add(slot.time);
                uniqueSlots.push(slot);
            }
        }
        
        availableSlots.value = uniqueSlots;
        console.log('Available slots (deduplicated):', availableSlots.value);
    } catch (err) {
        console.error('Error loading slots:', err);
        console.error('Error response:', err.response?.data);
        availableSlots.value = [];
    } finally {
        slotsLoading.value = false;
    }
};

const formatTime = (timeString) => {
    if (!timeString) return '';
    // Handle simple time string like "10:00" or "14:30"
    if (typeof timeString === 'string' && timeString.match(/^\d{2}:\d{2}$/)) {
        return timeString;
    }
    // Handle ISO datetime string
    try {
        const date = new Date(timeString);
        if (!isNaN(date.getTime())) {
            return date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        }
    } catch {
        // Fall through to return original
    }
    return timeString;
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const confirmBooking = async () => {
    isBooking.value = true;
    bookingError.value = '';
    
    try {
        // Get customer info from localStorage
        const customerData = JSON.parse(localStorage.getItem('customer') || '{}');
        
        if (!customerData.name || !customerData.email) {
            bookingError.value = 'Por favor inicia sesión para agendar una cita.';
            isBooking.value = false;
            return;
        }

        // Construct proper ISO datetime from selectedDate and slot.time
        // slot.time is like "10:00", selectedDate is like "2025-12-19"
        const slotTime = selectedSlot.value.time; // "10:00"
        const startDateTime = new Date(`${selectedDate.value}T${slotTime}:00`);
        
        // Get service duration (default to 60 minutes if not available)
        const durationMinutes = service.value?.durationMinutes || 60;
        const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

        await bookingService.bookAppointment(route.params.projectId, {
            serviceId: route.query.serviceId ? parseInt(route.query.serviceId) : undefined,
            employeeId: selectedSlot.value.employeeId || undefined,
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString(),
            userNotes: notes.value || undefined,
            clientName: customerData.name,
            clientEmail: customerData.email,
            clientPhone: customerData.phone || undefined
        });
        
        step.value = 4;
    } catch (err) {
        console.error('Error booking appointment:', err);
        bookingError.value = err.response?.data?.error || err.response?.data?.message || 'Error al agendar la cita. Por favor intenta de nuevo.';
    } finally {
        isBooking.value = false;
    }
};

// Lifecycle
onMounted(async () => {
    // Load service info if serviceId is provided
    if (route.query.serviceId) {
        try {
            const services = await bookingService.getProjectServices(route.params.projectId);
            const servicesData = services.data || services || [];
            service.value = servicesData.find(s => s.id === parseInt(route.query.serviceId));
        } catch (err) {
            console.error('Error loading service:', err);
        }
    }
});
</script>
