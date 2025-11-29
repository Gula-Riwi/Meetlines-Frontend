<template>
    <div :class="['overflow-hidden', props.containerClass]">
        <div ref="textContainer" :class="[props.class, 'opacity-0']">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
    class: { type: String, default: "" },
    containerClass: { type: String, default: "" },
    duration: { type: Number, default: 0.6 },
    delay: { type: Number, default: 0 },
    stagger: { type: Number, default: 0.1 },
});

const textContainer = ref(null);
let splitInstance;
let ctx;

onMounted(() => {
    if (!textContainer.value) return;

    ctx = gsap.context(() => {
        gsap.set(textContainer.value, { opacity: 1 });

        splitInstance = new SplitType(textContainer.value, {
            types: 'lines,words',
            lineClass: 'line-clamp'
        });

        gsap.from(splitInstance.lines, {
            duration: props.duration,
            delay: props.delay,
            y: "100%",    
            opacity: 0,
            stagger: props.stagger,
            ease: "power4.out",
            scrollTrigger: {
                trigger: textContainer.value,
                start: "top 85%",           
                end: "bottom 50%",
                toggleActions: "play none none reverse", 
            }
        });

    }, textContainer.value);
});

onUnmounted(() => {
    if (ctx) ctx.revert();
    if (splitInstance) splitInstance.revert();
});
</script>

<style>
.line-clamp {
    overflow: hidden;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}
</style>