<template>
  <div :class="$store.getters['app/className']">
    <Navbar  />
    <router-view
        v-slot="{ Component }"
      >
        <keep-alive :exclude="exclude">
          <component :is="Component" />
        </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import Navbar from "./Navbar/index.vue"
import {routerList} from "@/router/index"
const exclude=routerList.filter(item=>!item.meta.keepAlive).map(item=>item.name)
</script>
<style lang="scss" scoped>
.main{
  width: calc(100% - 200px);
  height:calc(100% - 50px);
}
.sideMain{
  width: calc(100% - 64px);
}
.moveMain{
  width: 100%;
}
</style>