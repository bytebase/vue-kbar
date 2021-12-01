<template>
  <div class="k-bar-results-container" v-bind="containerProps">
    <div class="k-bar-results-wrapper" v-bind="wrapperProps">
      <div
        v-for="{ data, index } in list"
        :key="index"
        :data-k-bar-results-item-index="index"
      >
        <slot
          name="item"
          :item="data"
          :index="index"
          :active="index === state.activeIndex"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useEventListener, useVirtualList } from "@vueuse/core";
import { computed, defineComponent, PropType, watch } from "vue";
import { ActionImpl } from "./types";
import { useKBarHandler } from "./useKBarHandler";
import { useKBarState } from "./useKBarState";

export type RenderParams = {
  item: ActionImpl | string;
  index: number;
  active: boolean;
};

export type ItemHeightCalculator = (item: RenderParams) => number;

export default defineComponent({
  name: "KBarResults",
  props: {
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    itemHeight: {
      type: [Number, Function] as PropType<number | ItemHeightCalculator>,
      default: 40,
    },
  },
  setup(props) {
    const state = useKBarState();
    const handler = useKBarHandler();
    const items = computed(() => props.items);

    const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
      items,
      {
        itemHeight: (index: number) => {
          const { itemHeight } = props;
          if (typeof itemHeight === "number") return itemHeight;
          const item = props.items[index];
          return itemHeight({
            item,
            index,
            active: index === state.value.activeIndex,
          });
        },
      }
    );

    watch(
      computed(() => ({
        items: props.items,
        rootActionId: state.value.currentRootActionId,
        search: state.value.search,
      })),
      ({ items }) => {
        let first = items.findIndex((item) => typeof item !== "string");
        if (first < 0) first = 0;
        handler.value.setActiveIndex(first);
      }
    );

    useEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "p")) {
        e.preventDefault();
        handler.value.setActiveIndex((index) => {
          if (index === 0) return index;
          let prev = index - 1;
          // skip on a section title
          while (typeof props.items[prev] === "string") {
            prev--;
          }
          // didn't find a proper prev action
          // give up everything
          if (prev < 0) return index;
          return prev;
        });
      } else if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "n")) {
        e.preventDefault();
        handler.value.setActiveIndex((index) => {
          const max = items.value.length;
          if (index === max - 1) return max;
          let next = index + 1;
          // skip on a section title
          while (typeof items.value[next] === "string") {
            next++;
          }
          // didn't find a proper next action
          // give up everything
          if (next >= max) return index;
          return next;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        // storing the active dom element in a ref prevents us from
        // having to calculate the current action to perform based
        // on the `activeIndex`, which we would have needed to add
        // as part of the dependencies array.
        // activeRef.current?.click();
        console.log("enter");
      }
    });

    return {
      state,
      list,
      containerProps,
      wrapperProps,
      scrollTo,
    };
  },
});
</script>
