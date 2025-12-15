<template>
    <div
        @click="$emit('click')"
        class="bg-gray-900/50 rounded-2xl p-5 border border-white/10 hover:border-indigo-500/50 transition-all cursor-pointer group"
    >
        <div class="flex items-start gap-4">
            <!-- Business logo -->
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0 group-hover:scale-105 transition-transform">
                {{ business?.name?.charAt(0) || 'B' }}
            </div>
            
            <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
                    {{ business?.name || 'Negocio' }}
                </h3>
                
                <p class="text-gray-400 text-sm line-clamp-2 mt-1">
                    {{ business?.description || 'Sin descripción' }}
                </p>
                
                <div class="flex flex-wrap gap-2 mt-3">
                    <span v-if="business?.industry" 
                        class="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-lg">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {{ business.industry }}
                    </span>
                    <span v-if="business?.address" 
                        class="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-lg">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {{ truncateAddress(business.address) }}
                    </span>
                </div>
            </div>

            <!-- Arrow icon -->
            <svg class="w-5 h-5 text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </div>
    </div>
</template>

<script setup>
defineProps({
    business: {
        type: Object,
        required: true
    }
});

defineEmits(['click']);

const truncateAddress = (address) => {
    if (!address) return '';
    return address.length > 30 ? address.substring(0, 30) + '...' : address;
};
</script>
