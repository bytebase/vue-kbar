<template>
  <h3>hello from components by {{ from }}! +3</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ComponentsHello",
  props: {
    from: {
      type: String,
      default: "",
    },
  },
});
</script>
