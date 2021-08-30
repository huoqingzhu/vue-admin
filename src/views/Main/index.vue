<template>
  <div >
    <v-table
        :columns="columns" 
        :data-source="dataSource"
        :row-height="50"
        :row-number="20"
        :roll="true"
      > 
        <template v-slot:name="{row}">
            <div style="color:#0b20da">
              {{row.name}}
            </div>
        </template>
      </v-table> 
  </div>
</template>
<script lang="ts" setup>
import ATable from "@/components/Table/index.vue"
import {reactive} from "vue"
import vTable from "@/components/Table/index2.vue"
const state=reactive({
      ed: 34.5,
})
const columns=[
  {
    title:"序号",
    dataIndex: 'id',
    key: 'id',
    width:'100px',
  },
  {
    title:"公司名称",
    dataIndex: 'name',
    key: 'name',
    align:"left",
  },
  {
    title:"在职人数",
    dataIndex: 'age',
    key: 'age',
  }
]
const dataSource=[
  {id:1,name:"123",age:18},
  {id:2,name:"124",age:28}
]
const Pagination={
  total: 30,
  current: 4,
}
for(let i = 3; i < Pagination.total; i++){
  dataSource.push({id:i,name:`贵州茅台${i}分店`,age:i*5})
}

</script>
<style lang="less" scoped>

</style>