<template>
  <div>
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

const list=[
  {name:"验证码",component:'Verification'},
  {name:"数字变化",component:'Move'},
]
export default defineComponent({
  components:{
    Verification
  },
  data(){
    return {
      list,
      move:{
        start:0,
        end:10,
        time:3000,
      }
    }
  }
})
</script>

