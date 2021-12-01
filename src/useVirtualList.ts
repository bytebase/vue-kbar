import { watch, Ref, ref, computed, shallowRef } from "vue";
import { useElementSize, MaybeRef } from "@vueuse/core";

export interface UseVirtualListOptions {
  /**
   * item height, accept a pixel value or a function that returns the height
   *
   * @default 0
   */
  itemHeight: number | ((index: number) => number);
  /**
   * the extra buffer items outside of the view area
   *
   * @default 5
   */
  overscan?: number;
}

export type UseVirtualListItem<T> = {
  data: T;
  index: number;
};

export function useVirtualList<T = any>(
  list: MaybeRef<T[]>,
  options: UseVirtualListOptions
) {
  const containerRef: Ref = ref<HTMLElement | null>();
  const size = useElementSize(containerRef);

  const currentList: Ref<UseVirtualListItem<T>[]> = ref([]);
  const source = shallowRef(list);

  const state: Ref = ref({ start: 0, end: 10 });
  const { itemHeight, overscan = 5 } = options;

  const getViewCapacity = (containerHeight: number) => {
    if (typeof itemHeight === "number")
      return Math.ceil(containerHeight / itemHeight);

    const { start = 0 } = state.value;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < source.value.length; i++) {
      const height = (itemHeight as (index: number) => number)(i);
      sum += height;
      if (sum >= containerHeight) {
        capacity = i;
        break;
      }
    }
    return capacity - start;
  };

  const getOffset = (scrollTop: number) => {
    if (typeof itemHeight === "number")
      return Math.floor(scrollTop / itemHeight) + 1;

    let sum = 0;
    let offset = 0;
    for (let i = 0; i < source.value.length; i++) {
      const height = (itemHeight as (index: number) => number)(i);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };

  const calculateRange = () => {
    const element = containerRef.value;
    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);

      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length ? source.value.length : to,
      };
      currentList.value = source.value
        .slice(state.value.start, state.value.end)
        .map((ele, index) => ({
          data: ele,
          index: index + state.value.start,
        }));
    }
  };

  watch([size.width, size.height, list], () => {
    calculateRange();
  });

  const totalHeight = computed(() => {
    if (typeof itemHeight === "number") return source.value.length * itemHeight;
    return source.value.reduce((sum, _, index) => sum + itemHeight(index), 0);
  });

  const getDistanceTop = (index: number) => {
    if (typeof itemHeight === "number") {
      const height = index * itemHeight;
      return height;
    }
    const height = source.value
      .slice(0, index)
      .reduce((sum, _, i) => sum + itemHeight(i), 0);
    return height;
  };

  const scrollTo = (
    index: number,
    edge: "start" | "end" | "center" | "auto" = "auto"
  ) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };

  const scrollIntoView = (
    index: number,
    edge: "start" | "end" | "center" | "auto" = "auto"
  ) => {
    if (containerRef.value) {
      const container = containerRef.value;
      const vTop = container.scrollTop;
      const offset = getOffset(vTop);
      const vHeight = container.clientHeight;
      const viewport = [vTop, vTop + vHeight];
      const itemTop = getDistanceTop(index);
      const itemHeight =
        typeof options.itemHeight === "number"
          ? options.itemHeight
          : options.itemHeight(index);
      const rect = [itemTop, itemTop + itemHeight];
      const relationship = inside(viewport, rect);
      if (edge === "auto") {
        if (relationship === "inside") return;
        if (relationship === "wrapped") edge = "start";
        if (relationship === "before") edge = "start";
        if (relationship === "after") edge = "end";
      }
      if (relationship === "inside" && edge === "auto") return;
      if (relationship === "before" && edge === "auto") edge = "start";
      if (relationship === "after" && edge === "auto") edge = "end";
      const top =
        edge === "start"
          ? itemTop
          : edge === "end"
          ? rect[1] - vHeight
          : itemTop - Math.floor((vHeight - itemHeight) / 2);

      container.scrollTop = top;
      calculateRange();
    }
  };

  const offsetTop = computed(() => getDistanceTop(state.value.start));
  const wrapperProps = computed(() => {
    return {
      style: {
        width: "100%",
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`,
      },
    };
  });

  const containerStyle: Partial<CSSStyleDeclaration> = { overflowY: "auto" };

  return {
    list: currentList,
    scrollTo,
    scrollIntoView,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRange();
      },
      style: containerStyle,
    },
    wrapperProps,
  };
}

function inside(
  a: number[],
  b: number[]
): "before" | "inside" | "wrapped" | "after" {
  if (b[0] < a[0] && b[1] > a[1]) return "wrapped";
  if (b[0] < a[0]) return "before";
  if (b[1] > a[1]) return "after";
  return "inside";
}
