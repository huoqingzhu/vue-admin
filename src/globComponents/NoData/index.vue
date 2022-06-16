<template>
  <div class="NoData">
    <img src="./bg.png" alt="" />
    <div class="tips">{{ tips }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    tips: string;
    age: number;
  }>(),
  {
    tips: "虚位以待～～",
  }
);
</script>

<style lang="scss" src="./index.scss" scoped></style>
