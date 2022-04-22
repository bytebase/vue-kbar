<template>
  <svg
    v-if="!darkMode"
    class="dark-mode-button"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    @click="toggle"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    class="dark-mode-button"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    @click="toggle"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
</template>

<script lang="ts" setup>
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../store";

const { darkMode } = storeToRefs(useStore());

watchEffect(() => {
  if (darkMode.value) {
    document.querySelector("html").classList.add("dark");
  } else {
    document.querySelector("html").classList.remove("dark");
  }
});

const toggle = () => {
  darkMode.value = !darkMode.value;
};
</script>

<style scoped>
.dark-mode-button {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  color: var(--c-text-light-1);
}
.dark-mode-button:hover {
  color: var(--c-brand);
}
</style>
