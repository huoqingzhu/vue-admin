<template>
  <div class="header">
      <div @click="add">新增</div>
  </div>
</template>
<script lang="ts" setup>
import Bus from "@/Bus"
const add=()=>{
  Bus.$emit("add")
}

</script>
<style lang="scss">
.header {
  border-bottom: 0!important;
  height: 45px;
  line-height: 45px;
  overflow: hidden;
}
</style>