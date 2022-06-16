<template>
  <div>
    <p>count {{ store.counter }}</p>
    <p>listType:{{ store.listType }}</p>
    <p>name:{{ store.name }}</p>
    <p>{{ store.counterJudge }}</p>
    <ul>
      <li v-for="item in store.list" :key="item">
        {{ item }}
      </li>
    </ul>
    <button @click="add">++</button>
    <button @click="reduce">--</button>
    <button @click="reset">重置</button>
    <button @click="patch">patch</button>
    <button @click="replace">更换</button>
    <button @click="actions">行动</button>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/stores/main";

const store = useStore();
const reset = () => {
  store.$reset();
};
const reduce = () => {
  store.$patch({
    counter: store.counter + 1,
    name: "Abalam",
  });
};
const add = () => {
  store.counter++;
};
const patch = () => {
  store.$patch((state) => {
    state.list.push("three.js");
  });
};
const replace = () => {
  store.$state = { counter: 666, name: "Paimon", list: ["xxx"] };
};
store.$subscribe((mutation, state) => {
  console.log(mutation, state);
});
const actions = async () => {
  const data = await store.randomizeCounter(100);
  console.log(data);
};
</script>
