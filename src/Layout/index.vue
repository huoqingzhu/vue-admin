<template>
  <Layout :list="list" title="信息化项目全流程管理"  />
</template>
<script lang="ts" setup>
import {Layout} from "@com/Layout"
import {Edit,Avatar,Football} from "@element-plus/icons-vue"

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
</script>