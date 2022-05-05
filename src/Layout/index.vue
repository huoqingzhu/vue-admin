<template>
  <Layout :list="routerList" title="信息化项目全流程管理"  @select="select" :default-active="activeIndex" />
</template>
<script lang="ts" setup>
import {Layout} from "@m/Layout"
import {Edit,Avatar,Football} from "@element-plus/icons-vue"
import {computed,ref} from "vue"
import { useRouter, } from "vue-router";

const props = defineProps({
  rootRoutePath: { type: String, required: true },
  systemTitle:  { type: String, required: true },
})
const activeIndex = ref()
const list:any[]=[
  {
    path: "/test",
    meta:{title:"测试1",icon:Edit},
  },
  {
    path: "/test2",
    meta:{title:"测试2",icon:Edit},
  },
  {
    path: "/test3",
    meta:{title:"测试3",icon:Edit},
    children: [
      { path: "/test-1", meta:{title:"一级子路1",icon:Avatar}},
      { path: "/test-2", meta:{title:"一级子路2",icon:Avatar},children:[
        { path: "/test-1-1", meta:{title:"二级级子路1",icon:Football}}
      ]}
    ]
  },
]
const router=useRouter()
const routerList=computed(()=>{
  //@ts-ignore
  let list = router?.options.routes.find((x) => x.path == props.rootRoutePath).children;
      console.log(list);
      return list||[];
})
const select =(index:string,param2:string[])=>{
  console.log(index,param2);
  activeIndex.value=index
  const path= `${props.rootRoutePath}/${param2.join("/")}`
  router.push(path)
}
</script>