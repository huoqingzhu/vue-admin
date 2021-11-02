<template>
  <div class="lay-count">
    <span >{{ params[0][0] }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    params: {
      type: Array as PropType<string[][]>,
      required: true,
    },
  },
});
</script>
<style lang="less" scoped>

.lay-count {
  text-overflow: ellipsis;
  overflow: hidden;
  // text-indent: 30px;
}
</style>
