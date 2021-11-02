<template>
  <div
    class="flex-between center both"
    :style="{
      width: width ? `${width}px` : '',
    }"
  >
    <div style="width: 60px">{{ name }}</div>
    <div class="slot">
            <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps,} from "vue";
const props = defineProps<{
  width?: number;
  name: string;
}>();

</script>
<style lang="scss" scoped>
.both{
  height:45px;
  padding: 5px 10px ;
}
.slot{
  width: calc(100% - 60px);
  padding: 0 5px;
}
</style>