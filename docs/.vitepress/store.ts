import { defineStore } from "pinia";

export const useStore = defineStore("docs", {
  state: () => ({
    disabled: false,
    darkMode: false,
  }),
});
