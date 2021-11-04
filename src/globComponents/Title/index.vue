<template>
  <div class="lay-count">
      {{id}}
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    id:String
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
