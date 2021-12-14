<template>
    <el-menu
        :default-active="$store.state.app.active" 
        class="el-menu-vertical-demo" 
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        @select="select"
        :collapse="$store.state.app?.isCollapse">
        <item-tree :list="state.routeList"/>
    </el-menu>
</template>
<script lang="ts" setup>
  import ItemTree from './item.vue'
  import {variables} from "@/cofing/index"
  import { useRoute,useRouter } from "vue-router";
  import {key} from "@/store"
  import { useStore } from 'vuex';
  import {ref,watch,reactive} from "vue"
  import { getRouterTree } from "@/utils/methods";
  const route=useRoute()
  const router=useRouter()
  const store=useStore(key)
  const state=reactive({
      path:'',
      routeList:[]
  })
      // 获取权限
  let role = 0; //0代表管理员 1代表开发者
  const select=(index:string,param2:any,)=>{
          store.commit("app/changeShow",false)
          const paths = `${state.path}/${param2.join("/")}`
          localStorage.setItem('active',index)
          router.push({
            path:paths ,
          });
      }
watch(()=>route.path,(a,b)=>{
    getPath()
}) 
watch(()=>route.path,()=>{
  getList()
})
getPath()
getList()
function getPath(){
    const pathList = route.path.split("/").filter((item) => item);
    const path = `/${pathList[0]}`;
    state.path=path
}   
function getList(){
    let currentRouter = router.options.routes.find((x) => x.path === state.path);
    const children = currentRouter?.children
    if(currentRouter?.meta?.sole){
      const arr = JSON.parse(JSON.stringify(children));
      state.routeList = <any>getRouterTree(arr, role);
      console.log(state.routeList)
    }else{
        state.routeList = <any>children
    }

} 
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>