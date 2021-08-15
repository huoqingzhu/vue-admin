<template>
  <div :class="$store.getters['app/className']">
    <Navbar  />
    <router-view>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent,computed } from "vue";
import Navbar from "./Navbar/index.vue"
export default defineComponent({
  components:{
    Navbar
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
  }
  
});
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