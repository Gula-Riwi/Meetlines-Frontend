<script setup></script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style>
/* Fondo oscuro para evitar el flash blanco */
html, body {
  background-color: #030712;
  margin: 0;
  padding: 0;
}

/* Transición suave y elegante */
.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease-in-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.99);
}

.page-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.page-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.99);
}
</style>
