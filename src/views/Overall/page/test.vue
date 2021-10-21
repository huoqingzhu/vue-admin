<template>
  <div>
    {{age}}
    {{getIntroduce}}
    {{introduce}}
    {{$store.state.app.isCollapse}}
    <el-button type="primary" @click="add">++</el-button>
    <el-button type="primary" @click="change">跳转</el-button>

  </div>
</template>
<script lang="ts">
import { defineComponent,ref,reactive, toRefs,computed,watch} from "vue";
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
import {key} from "@/store"
export default defineComponent({
  setup(){
    interface state {
      age:number;
      introduce:string;
    }
    const age=ref<number>(999)
    const add=()=>{
      state.age = state.age+10
    }
    const state:state=reactive({
      age:20,
      introduce:'小红1'
    })
    watch(()=>state.age,
          (a,b)=>{
        a>30?state.introduce='小红1':state.introduce='小明1'
    })
    const getIntroduce=computed(()=>{
      return state.age>30?'小红1':'小明1'
    })
    const router=useRouter()
    const route=useRoute()
    const store=useStore(key)
    const change=()=>{
      store.commit('app/changeTest',true)
    }
    console.log(store.state.app.isCollapse)
    return { add,...toRefs(state),getIntroduce,change}
  }
})

</script>