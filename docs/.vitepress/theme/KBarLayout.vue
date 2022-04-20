<template>
  <KBarProvider
    :actions="initialActions"
    :options="{ disabled, compare: compareAction }"
  >
    <KBarPortal>
      <KBarPositioner style="z-index: 1000; background: var(--a3)">
        <KBarAnimator
          style="
            max-width: calc(75 * var(--unit));
            width: 100%;
            background: var(--background);
            color: var(--foreground);
            border-radius: var(--unit);
            overflow: hidden;
            box-shadow: var(--shadow);
          "
        >
          <KBarSearch
            style="
              padding: calc(2 * var(--unit)) calc(2 * var(--unit));
              font-size: calc(2 * var(--unit));
              width: 100%;
              box-sizing: border-box;
              outline: none;
              border: none;
              background: var(--background);
              color: var(--foreground);
            "
          />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>

    <Layout />
  </KBarProvider>
</template>

<script>
import { defineComponent, ref } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRouter } from "vitepress";
import slug from "slug";
import { storeToRefs } from "pinia";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  defineAction,
} from "../../../src";
import { useStore } from "../store.ts";
import RenderResults from "./RenderResults.vue";
import { getMainSidebar } from "../toc.ts";

const { Layout } = DefaultTheme;

export default defineComponent({
  name: "KBarLayout",
  components: {
    Layout,
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    RenderResults,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const docActions = getMainSidebar().flatMap((category) =>
      category.children.map((page) =>
        defineAction({
          id: `kbar.documentation.${slug(page.text)}`,
          name: page.text,
          section: "Documentation",
          perform: () => router.go(page.link),
        })
      )
    );

    const initialActions = [
      defineAction({
        id: "kbar.navigation.github",
        name: "GitHub",
        shortcut: ["g", "h"],
        keywords: "sourcecode",
        section: "Navigation",
        perform: () =>
          window.open("https://github.com/bytebase/vue-kbar", "_blank"),
      }),
      ...docActions,
    ];

    const { disabled } = storeToRefs(store);

    const compareAction = (a, b) => {
      const ar = getActionRankingById(a.item);
      const br = getActionRankingById(b.item);

      // Sort by original index if they have same ranks.
      if (ar === br) return a.index - b.index;

      // Otherwise sort by ranking.
      return ar - br;
    };

    return {
      initialActions,
      disabled,
      compareAction,
    };
  },
});

const ACTION_RANKINGS = [
  "kbar.debug.",
  "kbar.example.",
  "kbar.navigation.",
  "kbar.documentation.",
  "kbar.preferences.",
];

function getActionRankingById(action) {
  const rank = ACTION_RANKINGS.findIndex((prefix) =>
    action.id.startsWith(prefix)
  );
  // non-specified namespaces should always rank behind specified ones.
  if (rank < 0) return Infinity;

  return rank;
}
</script>
