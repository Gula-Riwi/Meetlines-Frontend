<template>
    <div class="bg-gray-900/50 rounded-xl p-4 border border-white/10">
        <div class="flex items-start justify-between">
            <div class="flex-1">
                <!-- Status badge -->
                <div class="flex items-center gap-2 mb-2">
                    <span :class="statusClasses" class="text-xs font-medium px-2 py-1 rounded-full">
                        {{ statusText }}
                    </span>
                </div>
                
                <!-- Business name -->
                <h4 class="font-medium text-white">{{ appointment?.projectName || 'Negocio' }}</h4>
                
                <!-- Service name -->
                <p v-if="appointment?.serviceName" class="text-gray-400 text-sm mt-1">
                    {{ appointment.serviceName }}
                </p>
                
                <!-- Date and time -->
                <div class="flex items-center gap-4 mt-3 text-sm text-gray-400">
                    <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {{ formatDate(appointment?.startTime) }}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ formatTime(appointment?.startTime) }}
                    </span>
                </div>
            </div>
            
            <!-- Cancel button -->
            <button
                v-if="showCancel && canCancel"
                @click="$emit('cancel')"
                class="text-red-400 hover:text-red-300 text-sm transition-colors shrink-0 ml-4"
            >
                Cancelar
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    appointment: {
        type: Object,
        required: true
    },
    showCancel: {
        type: Boolean,
        default: false
    }
});

defineEmits(['cancel']);

const statusText = computed(() => {
    const statusMap = {
        'PENDING': 'Pendiente',
        'CONFIRMED': 'Confirmada',
        'COMPLETED': 'Completada',
        'CANCELLED': 'Cancelada',
        'NO_SHOW': 'No asistió'
    };
    return statusMap[props.appointment?.status] || props.appointment?.status;
});

const statusClasses = computed(() => {
    const classMap = {
        'PENDING': 'bg-yellow-500/20 text-yellow-400',
        'CONFIRMED': 'bg-green-500/20 text-green-400',
        'COMPLETED': 'bg-blue-500/20 text-blue-400',
        'CANCELLED': 'bg-red-500/20 text-red-400',
        'NO_SHOW': 'bg-gray-500/20 text-gray-400'
    };
    return classMap[props.appointment?.status] || 'bg-gray-500/20 text-gray-400';
});

const canCancel = computed(() => {
    return props.appointment?.status === 'PENDING' || props.appointment?.status === 'CONFIRMED';
});

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { weekday: 'short', month: 'short', day: 'numeric' });
};

const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
};
</script>
