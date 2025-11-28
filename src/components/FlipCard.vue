<template>
    <div :class="cn('group h-96 w-72 [perspective:1000px]', props.class)">
        <div :class="cn(
            'relative h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]',
            rotation[0],
        )
            ">
            <div class="absolute size-full overflow-hidden rounded-2xl [backface-visibility:hidden]">
                <slot />
            </div>

            <div :class="cn(
                'absolute h-full w-full overflow-hidden rounded-2xl border bg-gray-900 p-4 text-slate-200 [backface-visibility:hidden]',
                rotation[1],
            )
                ">
                <slot name="back" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { cn } from "@/lib/utils";
import { computed } from "vue";

const props = defineProps({
    rotate: {
        type: String,
        default: "y", 
    },
    class: {
        type: String,
        default: undefined,
    },
});

const rotationClass = {
    x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
    y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
};

const rotation = computed(() => rotationClass[props.rotate]);
</script>