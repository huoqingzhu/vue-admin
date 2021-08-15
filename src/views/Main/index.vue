<template>
  <div class="main">
    {{$store.state.app?.isCollapse}}
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {},
});
</script>
<style lang="less" scoped>
.main {
  background-size: 100% 100%;
  display: flex;
  justify-content: space-around;
}
</style>