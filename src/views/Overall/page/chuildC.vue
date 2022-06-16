<template>
  <div>孙子组件C</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  created() {
    console.log("我是C组件我执行了,created");
  },
  mounted() {
    console.log("我是C组件我执行了,mounted");
  },
  beforeDestory() {
    console.log("我是C组件我执行了,beforeDestory");
  },
  destoryed() {
    console.log("我是C组件我执行了,destoryed");
  },
});
</script>
