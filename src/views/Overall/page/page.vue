<template>
  <div>
    {{ age }}

    <suspense>
      <template #default>
        <Totil ref="child" :age="state.age" @change="change" name="一樽" />
      </template>
      <template #fallback>
        <h1>Loadding...</h1>
      </template>
    </suspense>
    <ChuildB />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import Totil from "./totil.vue";
import ChuildB from "./chuildB.vue";
const state = reactive({
  age: 10,
});
let age = 10;
const change2 = () => {
  age++;
};
const child = ref();
const change = (value: number) => {
  state.age += value;
  child.value.test();
};
onMounted(() => {
  console.log("A组件,mounted");
});
onBeforeUnmount(() => {
  console.log("A组件,beforeDestory");
});
onUnmounted(() => {
  console.log("A组件,destoryed");
});
console.log("A组件,created");
</script>
