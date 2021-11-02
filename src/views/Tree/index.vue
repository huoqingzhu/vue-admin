
<script lang="ts" setup>
import {ref} from "vue"
import Edit from "./edit/index.vue"
import Header from "./header/index.vue"
import Configuration from "./configuration/index.vue"
import Overview from "./overview/index.vue"
const node=ref<HTMLElement>()
</script>
<template>
    <div class="trascina" ref="node">
        <Header> </Header>
        <div class="content">
            <Overview />
            <Edit />
            <Configuration />
        </div>
    </div>
</template>
<style scoped lang="scss">
.trascina{
  width: 100%;
  height: 100%;
  background-color: #20222a;
  position: relative;
  color: #fff;
  .content{
    display: flex;
    width: 100%;
    height: calc(100% - 45px);
  }
}
</style>