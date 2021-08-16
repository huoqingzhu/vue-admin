<template>
    <div>
      <BasicTree :tree-data="basicData" />
    </div>
</template>
<script lang="ts">
import BasicTree from "./tree/tree"
import {defineComponent, reactive, toRefs} from "vue"
export default defineComponent({
  name:'Tree',
  components:{
    BasicTree
  },
  setup(){
    const state=reactive({
      basicData:[
        {id:1,name:'层级1'},
        {id:2,name:'层级2',
        children:[
          {id:3,name:'层级2子树'}
        ]},
        {id:4,name:'层级3',children:[
          {id:5,name:'层级2子树',children:[{
              id:6,name:'层级3子树'
          }]}
        ]},
      ]
    })
    return {...toRefs(state)}
  }
})
</script>