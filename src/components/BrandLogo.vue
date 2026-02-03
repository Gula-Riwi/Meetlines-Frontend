<template>
    <router-link to="/" class="flex items-center gap-2 group decoration-transparent">
        <span :class="['font-sans font-bold italic transition duration-300 group-hover:text-indigo-400', textSizeClass, textColorClass]">
            Meet
            <span class="text-indigo-500">Lines</span>
        </span>
    </router-link>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    size: {
        type: String,
        default: 'xl' // 'sm', 'md', 'xl', '2xl'
    },
    color: {
        type: String,
        default: 'white' // 'white', 'black'
    }
});

const textSizeClass = computed(() => {
    switch (props.size) {
        case 'sm': return 'text-lg';
        case 'md': return 'text-xl';
        case '2xl': return 'text-3xl';
        default: return 'text-2xl';
    }
});

const textColorClass = computed(() => {
    return props.color === 'black' ? 'text-gray-900' : 'text-white';
});
</script>
