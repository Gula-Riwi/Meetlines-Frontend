<template>
    <svg :width="gridWidth" :height="gridHeight" :class="svgClass">
        <rect v-for="(_, index) in totalSquares" :key="index" :x="getX(index)" :y="getY(index)" :width="width"
            :height="height" :class="getRectClass(index)" @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave" />
    </svg>
</template>

<script setup>
import { cn } from "@/lib/utils";
import { ref, computed } from "vue";

// Definición de props estilo JS
const props = defineProps({
    className: {
        type: String,
        default: undefined,
    },
    squaresClassName: {
        type: String,
        default: undefined,
    },
    width: {
        type: Number,
        default: 40,
    },
    height: {
        type: Number,
        default: 40,
    },
    squares: {
        type: Array,
        default: () => [24, 24], // [Horizontal, Vertical]
    },
});

const horizontal = computed(() => props.squares[0]);
const vertical = computed(() => props.squares[1]);

const totalSquares = computed(() => horizontal.value * vertical.value);

const hoveredSquare = ref(null);

const gridWidth = computed(() => props.width * horizontal.value);
const gridHeight = computed(() => props.height * vertical.value);

function getX(index) {
    return (index % horizontal.value) * props.width;
}

function getY(index) {
    return Math.floor(index / horizontal.value) * props.height;
}

const svgClass = computed(() =>
    cn("absolute inset-0 h-full w-full border border-gray-400/30", props.className),
);

function getRectClass(index) {
    return cn(
        "stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000",
        hoveredSquare.value === index ? "fill-gray-300/30" : "fill-transparent",
        props.squaresClassName,
    );
}

function handleMouseEnter(index) {
    hoveredSquare.value = index;
}

function handleMouseLeave() {
    hoveredSquare.value = null;
}
</script>