<template>
  <Layout
    :list="routerList"
    title="信息化项目全流程管理"
    :default-active="activeMenu()"
    @select="select"
  >
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :exclude="[]">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </Layout>
</template>
<script lang="ts" setup>
import { Layout } from "@m/Layout";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  rootRoutePath: { type: String, required: true },
  systemTitle: { type: String, required: true },
});
const router = useRouter();
const route = useRoute();
const routerList = computed(() => {
  let list = router?.options.routes.find(
    (x) => x.path == props.rootRoutePath
  ).children;
  return list || [];
});
const select = (index: string, param2: string[]) => {
  // console.log(index, param2)
  // activeIndex.value = index
  const path = `${props.rootRoutePath}/${param2.join("/")}`;
  router.push(path);
};
const activeMenu = () => {
  const { path } = route;
  // if set path, the sidebar will highlight the path you set

  return path.split("/").reverse()[0];
};
</script>
