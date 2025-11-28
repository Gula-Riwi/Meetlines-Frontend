<template>
    <div :class="cn('leading-snug tracking-wide', props.class)">
        <div ref="scope">
            <span v-for="(word, idx) in wordsArray" :key="word + idx" class="inline-block" :style="spanStyle">
                {{ word }}&nbsp;
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps({
    words: {
        type: String,
        required: true
    },
    filter: {
        type: Boolean,
        default: true
    },
    duration: {
        type: Number,
        default: 0.5
    },
    delay: {
        type: Number,
        default: 0
    },
    class: {
        type: String,
        default: ''
    }
});

const scope = ref(null);
const wordsArray = computed(() => props.words.split(" "));

const spanStyle = computed(() => ({
    opacity: 0,
    filter: props.filter ? "blur(30px)" : "none",
    transition: `opacity ${props.duration}s, filter ${props.duration}s`,
}));

onMounted(() => {
    if (scope.value) {
        const spans = scope.value.querySelectorAll("span");

        setTimeout(() => {
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.style.opacity = "1";
                    span.style.filter = props.filter ? "blur(0px)" : "none";
                }, index * 200);
            });
        }, props.delay);
    }
});
</script>