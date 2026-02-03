<script setup>
defineProps({
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    default: "",
  },
  icon: {
    type: [String, Array],
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
});

const isEmoji = (val) => {
  if (typeof val !== 'string') return false;
  return /\p{Emoji}/u.test(val) && val.length <= 4;
};
</script>

<template>
  <div
    class="relative mx-auto min-h-fit w-full max-w-[400px] transform-gpu cursor-pointer overflow-hidden rounded-2xl bg-white p-4 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transition-all duration-200 ease-in-out hover:scale-[103%] dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]">
    <div class="flex flex-row items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-2xl shrink-0" :style="`background-color: ${color}`">
        <span v-if="isEmoji(icon)" class="text-lg">{{ icon }}</span>
        <font-awesome-icon v-else :icon="icon" class="text-base text-white" />
      </div>
      <div class="flex flex-col overflow-hidden">
        <div class="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
          <span class="text-sm sm:text-lg">{{ name }}</span>
          <span v-if="time" class="mx-1">·</span>
          <span v-if="time" class="text-xs text-gray-500">{{ time }}</span>
        </div>
        <p class="text-sm font-normal dark:text-white/60">{{ description }}</p>
      </div>
    </div>
  </div>
</template>