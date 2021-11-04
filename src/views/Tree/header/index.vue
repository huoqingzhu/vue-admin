<template>
  <div class="header">
      <div @click="add">新增</div>
  </div>
</template>
<script lang="ts" setup>
import Bus from "@/Bus"
import { key } from "@/store";
import {useStore,mapActions} from "vuex"
const store = useStore(key);
const add=()=>{
  store.commit('edit/addBox','Title')
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