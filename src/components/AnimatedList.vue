<script setup>
import { Motion } from "motion-v";
import { computed, onMounted, ref, useSlots } from "vue";

// Definición de props en JS
const props = defineProps({
  class: {
    type: String,
    default: ""
  },
  delay: {
    type: Number,
    default: 1500
  }
});

const slots = useSlots();
const displayedItems = ref([]); // Quitamos el tipado genérico <{...}[]>
const nextIndex = ref(0);

onMounted(startLoop);

async function startLoop() {
  const notifications = slots.default ? (slots.default()[0].children ?? []) : [];
  if (!notifications.length) return;

  // Lógica para llenar la lista inicialmente
  while (displayedItems.value.length < notifications.length) {
    displayedItems.value.push({
      node: notifications[nextIndex.value],
      id: `${nextIndex.value}-${Date.now()}`,
    });
    nextIndex.value = (nextIndex.value + 1) % notifications.length;
    await wait(props.delay);
  }

  // Bucle infinito de animación
  // eslint-disable-next-line no-constant-condition
  while (true) {
    displayedItems.value.shift();
    displayedItems.value.push({
      node: notifications[nextIndex.value],
      id: `${nextIndex.value}-${Date.now()}`,
    });
    nextIndex.value = (nextIndex.value + 1) % notifications.length;
    await wait(props.delay);
  }
}

const itemsToShow = computed(() => displayedItems.value);

// Quitamos el tipo de dato (ms: number)
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
</script>

<template>
  <div
    class="flex flex-col items-center gap-4"
    :class="[props.class]"
  >
    <transition-group
      name="list"
      tag="div"
      class="flex flex-col-reverse items-center gap-3"
      move-class="move"
    >
      <Motion
        v-for="data in itemsToShow"
        :key="data.id"
        as="div"
        :initial="{ scale: 0, opacity: 0 }"
        :animate="{
          scale: 1,
          opacity: 1,
          y: 0,
        }"
        :exit="{
          scale: 0,
          opacity: 0,
          y: 0,
        }"
        :transition="{
          type: 'spring',
          stiffness: 350,
          damping: 40,
        }"
        class="mx-auto w-full"
      >
        <component :is="data.node" />
      </Motion>
    </transition-group>
  </div>
</template>

<style scoped>
.move {
  transition: transform 0.4s ease-out;
}
</style>