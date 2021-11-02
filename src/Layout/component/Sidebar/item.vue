<template>
    <template v-for="(item,index) in list" :key="index">
      <el-submenu :index="`${item.path}`" v-if="item.children">
          <template #title>
            <i>
              <icon-svg :type="item.meta.iocn" style="font-size: 22px;" />
            </i>
            <span style="margin-left: 10px;" >
              {{item.meta.title}}
            </span>
          </template>
          <item-tree :list="item.children||[]" />
      </el-submenu>
      <el-menu-item v-else :index="`${item.path}`" @click="change(item)">
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
  import {List} from '@/router'
  import {useRouter} from "vue-router"
  export default defineComponent({
    name:"itemTree",
    props:{
      list:{
        type:Array as PropType<List>,
        required:true,
      }
    },
    setup() {
      const router = useRouter()
      const handleOpen = (key:any, keyPath:any) => {
        console.log(key, keyPath);
      };
      const handleClose = (key:any, keyPath:any) => {
        console.log(key, keyPath);
      };
      const change=(type:any)=>{
          console.log(type)
          if(!type.meta.blank){
            router.push(type.path)
          }else{
            let routeUrl = router.resolve({
                  path: type.path,
            });
            window.open(routeUrl .href, '_blank');
          }
      }
      return {
        handleOpen,
        handleClose,
        change
      };
    },
  });
</script>
<style lang="scss" scoped>
// .el-menu--collapse > .el-menu-item span,
// .el-menu--collapse > .el-submenu > .el-submenu__title span {
//   overflow: visible !important;
//   visibility: visible !important;
//   width: 24px;
//   height: 24px;
//   display: inline-block;
// }
// .anticon{
//   margin-right: 10px;
// }
.el-icon-document:before {
    content: none;
}
</style>