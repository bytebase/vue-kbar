<template>
  <template v-if="!!KBarProvider">
    <component
      :is="KBarProvider"
      :actions="initialActions"
      :options="{ disabled, compare: compareAction }"
    >
      <component :is="KBarPortal">
        <component
          :is="KBarPositioner"
          style="z-index: 1000; background: var(--a3)"
        >
          <component
            :is="KBarAnimator"
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
            <component
              :is="KBarSearch"
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
            <component :is="RenderResults" />
          </component>
        </component>
      </component>

      <Layout>
        <template #navbar-search>
          <DarkModeButton />
        </template>
      </Layout>
    </component>
  </template>

  <template v-else>
    <!-- <Layout>
      <template #navbar-search>
        <DarkModeButton />
      </template>
    </Layout> -->
    asdf
  </template>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  ref,
  shallowRef,
  watchEffect,
} from "vue";
import DefaultTheme from "vitepress/theme";
import { useRouter } from "vitepress";
import slug from "slug";
import { storeToRefs } from "pinia";
import { useStore } from "../store.ts";
import DarkModeButton from "./DarkModeButton.vue";
import { getMainSidebar } from "../toc.ts";

const { Layout } = DefaultTheme;

export default defineComponent({
  name: "KBarLayout",
  components: {
    Layout,
    DarkModeButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const initialActions = ref([]);

    const { disabled } = storeToRefs(store);

    const compareAction = (a, b) => {
      const ar = getActionRankingById(a.item);
      const br = getActionRankingById(b.item);

      // Sort by original index if they have same ranks.
      if (ar === br) return a.index - b.index;

      // Otherwise sort by ranking.
      return ar - br;
    };

    const KBarProvider = shallowRef(null);
    const KBarPortal = shallowRef(null);
    const KBarPositioner = shallowRef(null);
    const KBarAnimator = shallowRef(null);
    const KBarSearch = shallowRef(null);
    const RenderResults = shallowRef(null);

    onBeforeMount(() => {
      Promise.all([import("../../../src"), import("./RenderResults.vue")]).then(
        ([kbarModule, renderResultsModule]) => {
          KBarProvider.value = kbarModule.KBarProvider;
          KBarPortal.value = kbarModule.KBarPortal;
          KBarPositioner.value = kbarModule.KBarPositioner;
          KBarAnimator.value = kbarModule.KBarAnimator;
          KBarSearch.value = kbarModule.KBarSearch;
          RenderResults.value = renderResultsModule.default;
          const { defineAction } = kbarModule;

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
          initialActions.value = [
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
        }
      );
    });

    return {
      KBarProvider,
      KBarPortal,
      KBarPositioner,
      KBarAnimator,
      KBarSearch,
      RenderResults,
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
