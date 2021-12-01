<template>
  <div
    style="
      position: fixed;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      width: 100%;
      inset: 0;
      padding: 14vh 16px 16px;
    "
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "KBarPositioner",
});
</script>
