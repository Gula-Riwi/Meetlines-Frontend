<template>
    <span ref="spanRef" :class="cn('inline-block tabular-nums tracking-wider', props.class)">
        {{ output }}
    </span>
</template>

<script setup>
import { TransitionPresets, useElementVisibility, useTransition } from "@vueuse/core";
import { cn } from "@/lib/utils";
import { ref, watch, computed } from "vue";

// Definición de Props en estilo JavaScript
const props = defineProps({
    value: {
        type: Number,
        default: 0,
    },
    direction: {
        type: String,
        default: "up", 
    },
    duration: {
        type: Number,
        default: 2000,
    },
    delay: {
        type: Number,
        default: 0,
    },
    decimalPlaces: {
        type: Number,
        default: 2,
    },
    class: {
        type: String,
        default: "",
    },
    transition: {
        type: String,
        default: "easeOutCubic",
    },
});

const spanRef = ref(null);

const transitionValue = ref(props.direction === "down" ? props.value : 0);

const transitionOutput = useTransition(transitionValue, {
    delay: props.delay,
    duration: props.duration,
    transition: TransitionPresets[props.transition],
});

const output = computed(() => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: props.decimalPlaces,
        maximumFractionDigits: props.decimalPlaces,
    }).format(Number(transitionOutput.value.toFixed(props.decimalPlaces)));
});

const isInView = useElementVisibility(spanRef, {
    threshold: 0.5,
});

const hasBeenInView = ref(false);

const stopIsInViewWatcher = watch(
    isInView,
    (isVisible) => {
        if (isVisible && !hasBeenInView.value) {
            hasBeenInView.value = true;
            transitionValue.value = props.direction === "down" ? 0 : props.value;
            stopIsInViewWatcher();
        }
    },
    { immediate: true },
);

watch(
    () => props.value,
    (newVal) => {
        if (hasBeenInView.value) {
            transitionValue.value = props.direction === "down" ? 0 : newVal;
        }
    },
);
</script>