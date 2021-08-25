<template>
  <div>
    <h2>常用组件</h2>
    <div v-for="item in list" :key="item.name">
      <div>{{item.name}}</div>
      <component v-bind:is="item.component" >
      </component>
    </div>
  </div>
</template>
<script  lang="ts" >
import {defineComponent} from "vue";
import Verification from "@/components/Verification/index.vue"
const list=[{name:"验证码",component:'Verification'}]
export default defineComponent({
  components:{
    Verification
  },
  data(){
    return {
      list
    }
  }
})
</script>

