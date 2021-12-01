<template>
  <KBarResults
    :items="matches.results"
    :item-height="itemHeight"
    :style="{ 'max-height': '300px', overflow: 'auto' }"
  >
    <template #item="{ item, index, active }">
      <div v-if="typeof item === 'string'" class="section" :data-index="index">
        {{ item }}
      </div>
      <div v-else class="item" :class="{ active }" :data-index="index">
        <div class="item-inner">
          <div style="display: flex; flex-direction: column">
            <div>
              <span>{{ item.name }}</span>
            </div>
            <span v-if="item.subtitle" style="font-size: 12px">{{
              item.subtitle
            }}</span>
          </div>
        </div>
        <div v-if="item.shortcut.length > 0" aria-hidden class="shortcut">
          <kbd v-for="(sc, j) in item.shortcut" :key="j">{{ sc }}</kbd>
        </div>
      </div>
    </template>
  </KBarResults>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useKBarMatches, KBarResults } from "../../../src";

export default defineComponent({
  name: "RenderResults",
  components: { KBarResults },
  setup() {
    const matches = useKBarMatches();
    const itemHeight = (params: { item: any; index: number }) => {
      if (typeof params.item === "string") return 32;
      return 60;
    };

    return { matches, itemHeight };
  },
});
</script>

<style scoped>
.section {
  height: 32px;
  padding: 8px 16px;
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.5;
}
.item {
  height: 60px;
  box-sizing: border-box;
  padding: 12px 16px;
  background: transparent;
  border-left: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.item.active {
  background: var(--a1);
  border-left-color: var(--foreground);
}
.item-inner {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
}
.shortcut {
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
}
.shortcut kbd {
  padding: 4px 6px;
  background: rgba(0 0 0 / 0.1);
  border-radius: 4px;
  font-size: 14px;
}
</style>
