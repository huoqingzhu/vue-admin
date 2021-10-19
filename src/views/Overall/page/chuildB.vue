<template>
    <div>子组件b
      <ChuildC />
    </div>
</template>
<script lang="ts" >
import { defineComponent } from "vue";
import ChuildC from "./chuildC.vue";
export default defineComponent({
 components:{
    ChuildC
 },
  created(){
    console.log("我是B组件我执行了,created")
  },
  mounted(){
    console.log("我是B组件我执行了,mounted")
  },
  beforeDestory(){
    console.log("我是B组件我执行了,beforeDestory")
  },
  destoryed(){
        console.log("我是B组件我执行了,destoryed")
  }
})
</script>