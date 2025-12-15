<template>
    <div class="bg-gray-900/50 rounded-xl p-4 border border-white/10 hover:border-indigo-500/30 transition-all">
        <div class="flex items-center justify-between">
            <div class="flex-1">
                <h4 class="font-medium text-white">{{ service?.name || 'Servicio' }}</h4>
                
                <p v-if="service?.description" class="text-gray-400 text-sm mt-1 line-clamp-2">
                    {{ service.description }}
                </p>
                
                <div class="flex items-center gap-4 mt-3">
                    <span v-if="service?.duration" class="flex items-center gap-1 text-sm text-gray-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ service.duration }} min
                    </span>
                    
                    <span v-if="service?.price" class="text-indigo-400 font-bold">
                        ${{ formatPrice(service.price) }}
                    </span>
                </div>
            </div>
            
            <button
                @click="$emit('book', service)"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shrink-0 ml-4"
            >
                Agendar
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    service: {
        type: Object,
        required: true
    }
});

defineEmits(['book']);

const formatPrice = (price) => {
    if (!price) return '0';
    return new Intl.NumberFormat('es-CO').format(price);
};
</script>
