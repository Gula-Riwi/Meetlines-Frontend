<template>
    <component :is="as" class="shadow-color" :class="cn(
        'relative z-0 inline-flex',
        'after:absolute after:left-[0.04em] after:top-[0.15em] after:-z-10',
        'after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]',
        'after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent',
        'after:content-[attr(data-text)]',
        'animate-line-shadow',
        $attrs.class
    )" :data-text="content">
        <span class="relative z-20">
            <slot />
        </span>
    </component>
</template>

<script setup>

import { cn } from "@/lib/utils";
import { useSlots, computed } from "vue";

const props = defineProps({
    shadowColor: {
        type: String,
        default: "white",
    },
    as: {
        type: String,
        default: "span",
    },
});

const slots = useSlots();

const content = computed(() => {
    const defaultSlot = slots.default ? slots.default() : null;
    if (defaultSlot && defaultSlot[0] && typeof defaultSlot[0].children === 'string') {
        return defaultSlot[0].children;
    }
    return null;
});

</script>

<style scoped>
.shadow-color {
    --shadow-color: v-bind(props.shadowColor);
}

.animate-line-shadow::after {
    animation: line-shadow 15s linear infinite;
}

@keyframes line-shadow {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 100% -100%;
    }
}
</style>