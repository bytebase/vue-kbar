import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import visualizer from "rollup-plugin-visualizer";

const resolvePath = (str: string) => path.resolve(__dirname, str);

const ANALYZE = !!process.env.ANALYZE;

export default defineConfig(() => {
  return {
    plugins: [vue()],
    build: {
      lib: {
        entry: resolvePath("src/index.ts"),
        name: "VueKBar",
      },
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
        plugins: [
          ANALYZE &&
            visualizer({
              filename: resolvePath("dist_analyze/stats.html"),
              open: true,
            }),
        ].filter(Boolean),
      },
    },
  };
});
