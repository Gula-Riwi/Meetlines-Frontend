<template>
    <div class="min-h-screen bg-gray-950 text-white">
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <router-link to="/explore" class="flex items-center gap-2">
                        <span class="text-2xl font-bold font-league text-white">Meet<span class="text-indigo-400">Lines</span></span>
                    </router-link>
                    
                    <div class="flex items-center gap-4">
                        <router-link to="/explore" class="text-gray-300 hover:text-white transition-colors">
                            Explorar
                        </router-link>
                        <button @click="handleLogout" class="text-gray-400 hover:text-white transition-colors">
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 class="text-3xl font-bold font-league mb-8">Mis Citas</h1>

            <!-- Tabs -->
            <div class="flex gap-4 mb-6 border-b border-gray-800">
                <button
                    @click="activeTab = 'pending'"
                    :class="[
                        'pb-3 px-4 font-medium transition-colors border-b-2',
                        activeTab === 'pending' 
                            ? 'text-indigo-400 border-indigo-400' 
                            : 'text-gray-400 border-transparent hover:text-white'
                    ]"
                >
                    Próximas
                </button>
                <button
                    @click="activeTab = 'history'"
                    :class="[
                        'pb-3 px-4 font-medium transition-colors border-b-2',
                        activeTab === 'history' 
                            ? 'text-indigo-400 border-indigo-400' 
                            : 'text-gray-400 border-transparent hover:text-white'
                    ]"
                >
                    Historial
                </button>
            </div>

            <!-- Loading state -->
            <div v-if="isLoading" class="flex justify-center items-center py-20">
                <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
            </div>

            <!-- Empty state -->
            <div v-else-if="filteredAppointments.length === 0" class="text-center py-20">
                <svg class="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-gray-400 text-lg mb-2">
                    {{ activeTab === 'pending' ? 'No tienes citas próximas' : 'No tienes citas anteriores' }}
                </p>
                <router-link to="/explore" class="text-indigo-400 hover:text-indigo-300 transition-colors">
                    Explorar negocios
                </router-link>
            </div>

            <!-- Appointments list -->
            <div v-else class="space-y-4">
                <AppointmentCard
                    v-for="appointment in filteredAppointments"
                    :key="appointment.id"
                    :appointment="appointment"
                    :showCancel="activeTab === 'pending'"
                    @cancel="cancelAppointment(appointment.id)"
                />
            </div>
        </main>

        <!-- Cancel confirmation modal -->
        <div v-if="showCancelModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div class="bg-gray-900 rounded-2xl p-6 max-w-sm mx-4 border border-white/10">
                <h3 class="text-xl font-bold mb-4">¿Cancelar cita?</h3>
                <p class="text-gray-400 mb-6">Esta acción no se puede deshacer.</p>
                
                <div class="flex gap-4">
                    <button
                        @click="showCancelModal = false; cancellingId = null"
                        class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl transition-colors"
                    >
                        No, mantener
                    </button>
                    <button
                        @click="confirmCancel"
                        :disabled="isCancelling"
                        class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition-colors"
                    >
                        {{ isCancelling ? 'Cancelando...' : 'Sí, cancelar' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

// Components
import AppointmentCard from '@/components/customer/AppointmentCard.vue';

// Services
import bookingService from '@/services/bookingService';

const router = useRouter();

// State
const appointments = ref([]);
const activeTab = ref('pending');
const isLoading = ref(true);
const showCancelModal = ref(false);
const cancellingId = ref(null);
const isCancelling = ref(false);

// Computed
const filteredAppointments = computed(() => {
    if (activeTab.value === 'pending') {
        return appointments.value.filter(a => 
            a.status === 'PENDING' || a.status === 'CONFIRMED'
        );
    }
    return appointments.value.filter(a => 
        a.status === 'COMPLETED' || a.status === 'CANCELLED'
    );
});

// Methods
const loadAppointments = async () => {
    isLoading.value = true;
    
    try {
        const response = await bookingService.getMyAppointments(false);
        appointments.value = response.data || response || [];
    } catch (err) {
        console.error('Error loading appointments:', err);
    } finally {
        isLoading.value = false;
    }
};

const cancelAppointment = (id) => {
    cancellingId.value = id;
    showCancelModal.value = true;
};

const confirmCancel = async () => {
    if (!cancellingId.value) return;
    
    isCancelling.value = true;
    
    try {
        await bookingService.cancelAppointment(cancellingId.value);
        // Update local state
        const idx = appointments.value.findIndex(a => a.id === cancellingId.value);
        if (idx !== -1) {
            appointments.value[idx].status = 'CANCELLED';
        }
        showCancelModal.value = false;
    } catch (err) {
        console.error('Error cancelling appointment:', err);
    } finally {
        isCancelling.value = false;
        cancellingId.value = null;
    }
};

const handleLogout = () => {
    Cookies.remove('customer_token');
    Cookies.remove('customer_refresh_token');
    localStorage.removeItem('customer');
    router.push('/explore');
};

// Lifecycle
onMounted(() => {
    loadAppointments();
});
</script>
