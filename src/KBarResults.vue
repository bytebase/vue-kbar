<template>
  <div class="k-bar-results-container" v-bind="containerProps">
    <div class="k-bar-results-wrapper" v-bind="wrapperProps">
      <div
        v-for="{ data, index } in list"
        :key="index"
        :data-k-bar-results-item-index="index"
        @pointermove="onPointerMove(index)"
        @click.prevent.stop="performAction(index)"
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
import { useEventListener } from "@vueuse/core";
import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
  watchEffect,
} from "vue";
import { ActionImpl } from "./types";
import { useKBarHandler } from "./useKBarHandler";
import { useKBarState } from "./useKBarState";
import { useVirtualList } from "./useVirtualList";

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
      type: Array as PropType<(ActionImpl | string)[]>,
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

    const { list, containerProps, wrapperProps, scrollIntoView } =
      useVirtualList(items, {
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
      });

    const firstActionIndex = computed(() => {
      let first = props.items.findIndex((item) => typeof item !== "string");
      if (first < 0) first = 0;
      return first;
    });

    watch(
      computed(() => ({
        items: props.items,
        rootActionId: state.value.currentRootActionId,
        search: state.value.search,
      })),
      () => {
        handler.value.setActiveIndex(firstActionIndex.value);
      }
    );

    const performAction = (index: number) => {
      const action = props.items[index];
      if (!action) return;
      if (typeof action === "string") return;
      handler.value.performAction(action);
    };

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
        performAction(state.value.activeIndex);
      }
    });

    const pointerMoved = usePointerMovedSinceMount();
    const onPointerMove = (index: number) => {
      if (pointerMoved.value && index !== state.value.activeIndex) {
        const action = props.items[index];
        if (typeof action === "string") return;
        handler.value.setActiveIndex(index);
      }
    };

    watchEffect(() => {
      const index = state.value.activeIndex;

      // if we are travelling to or before the first Action
      // ensure its section title is shown before it
      scrollIntoView(
        state.value.activeIndex,
        index <= firstActionIndex.value ? "end" : "auto"
      );
    });

    return {
      state,
      list,
      containerProps,
      wrapperProps,
      scrollTo,
      onPointerMove,
      performAction,
    };
  },
});

function usePointerMovedSinceMount() {
  const moved = ref(false);
  const cancel = useEventListener("pointermove", () => {
    moved.value = true;
    cancel();
  });
  return moved;
}
</script>
