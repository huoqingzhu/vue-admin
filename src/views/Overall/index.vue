<template>
      <router-view
        v-slot="{ Component }"
      >
        <keep-alive :exclude="[]">
          <component :is="Component" />
        </keep-alive>
    </router-view>
</template>
<script lang="ts" >
import { defineComponent } from "vue";
export default defineComponent({
  created(){
    console.log("我是父组件我执行了,created")
  },
  mounted(){
    console.log("我是父组件我执行了,mounted")
  }
})
</script>