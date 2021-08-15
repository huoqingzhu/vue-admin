<template>
    <el-menu
        :default-active="$store.state.app.active" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        :router="true"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        @close="handleClose"
        @select="select"
        :collapse="$store.state.app?.isCollapse">
        <item-tree :list="routerList"/>
    </el-menu>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {routerList} from '@/router'
  import ItemTree from './item.vue'
  import {variables} from "@/cofing/index"
  export default defineComponent({
    components:{
      ItemTree
    },
    setup() {
      console.log(routerList);
      const handleOpen = (key:any, keyPath:any) => {
        console.log(key, keyPath);
      };
      const handleClose = (key:any, keyPath:any) => {
        console.log(key, keyPath);
      };
      const select=(index:string,item:any,routeResult:string)=>{
        localStorage.setItem('active',index)
      }
      return {
        routerList,
        handleOpen,
        handleClose,
        variables,
        select
      };
    },
  });
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>