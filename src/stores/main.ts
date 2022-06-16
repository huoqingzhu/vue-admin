import { defineStore } from "pinia";
import { getList } from "@/utils/index";

export const useStore = defineStore("main", {
  state: () => ({
    counter: 0,
    name: "Eduardo",
    list: ["vuex", "react", "vue3", "vite"],
  }),
  getters: {
    listType(state): string {
      return state.list.length > 2 ? "内容丰富" : "知识匮乏";
    },
    counterJudge() {
      return this.listType.length;
    },
  },
  actions: {
    async randomizeCounter(value: number) {
      const { data } = await getList();
      this.counter = Math.round(100 * Math.random()) * value;
      return data;
    },
  },
});
