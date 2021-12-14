<template>
    <template v-for="(item,index) in list" :key="index">
      <el-sub-menu :index="`${item.path}`" v-if="item.children">
          <template #title>
            <i>
              <icon-svg :type="item.meta.iocn" style="font-size: 22px;" />
            </i>
            <span style="margin-left: 10px;" >
              {{item.meta.title}}
            </span>
          </template>
          <item-tree :list="item.children||[]" />
      </el-sub-menu>
      <el-menu-item v-else :index="`${item.path}`" >
        <i >
          <icon-svg :type="item.meta.iocn" style="font-size: 22px;" />
        </i>
        
          <template #title>
            <span style="margin-left: 10px;" >{{item.meta.title}}</span>
          </template>
      </el-menu-item>
    </template>
  
</template>
<script lang="ts">
  import { defineComponent, ref,PropType } from 'vue';
  export default defineComponent({
    name:"itemTree",
    props:{
      list:{
        type:Array as PropType<any[]>,
        required:true,
      }
    },
  });
</script>
<style lang="scss" scoped>
.el-icon-document:before {
    content: none;
}
</style>