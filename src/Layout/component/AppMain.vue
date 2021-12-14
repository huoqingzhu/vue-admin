<template>
  <div :class="$store.getters['app/className']">
    <Navbar  />

      <router-view
        v-slot="{ Component }"
      >
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="[]">
            <component :is="Component" />
            </keep-alive>
          </transition>
      </router-view>
  </div>
</template>
<script lang="ts" setup>
import Navbar from "./Navbar/index.vue"
// import {resourceList} from "@/router/index"
// const exclude=resourceList.filter(item=>!item.meta.keepAlive).map(item=>item.name)
</script>
<style lang="scss" scoped>
.main{
  width: calc(100% - 200px);
  transition:width 1s;
}
.sideMain{
  width: calc(100% - 64px);
}
.moveMain{
  width: 100%;
}
</style>