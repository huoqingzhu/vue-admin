<template>
  <div class="configuration">
        <div class="gzGP0">页面设置 </div>
        <div class="content">
            <Whole v-if="$store.state.edit.control==0" />
            <Local v-else  />
        </div>
  </div>
</template>
<script lang="ts" setup>
import Local from "./local.vue"
import Whole from "./whole.vue"
</script>
<style lang="scss" scoped>
.configuration{
  width: 350px;
.gzGP0 {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px
    solid rgba(36, 38, 46, 0.4);
    background: #3d404d;
    font-size: 14px;
    text-align: center;
    font-weight: normal;
    color: #b4b7c1;
}
.content{
  width: 100%;
}
}
</style>