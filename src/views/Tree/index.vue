<template>
    <div class="trascina" ref="node">
        <h1>海报生成器</h1>
        <el-button type="primary" @click="changeShow">编辑</el-button>
        <div v-if="state.show" class="show" >
            宽： <el-input v-model="state.box.width" style="width:200px"></el-input>
            高： <el-input v-model="state.box.height" style="width:200px"></el-input>
        </div>
        <div  class="canvas" :style="style">
            
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ref,reactive,computed} from "vue"
const node=ref<HTMLElement>()
const state=reactive({
  box:{
    width:300, 
    height:600
  },
  show:false
})
const style=computed(()=>{
      return {
        width:state.box.width+'px',
        height:state.box.height+'px'
      }
})
const changeShow=()=>{
  state.show=!state.show
}

</script>
<style scoped lang="scss">
.trascina{
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;

  .yuan{
    width: 500px;
    height:500px;
    background-color: pink;
    border-radius: 50%;
  }
  .canvas{
    width: 400px;
    height: 400px;
    background-color: pink;
    margin: 0 auto;
  }
  .show{
    width: 300px;
    height: 100px;
    position: absolute;
    transform: width 1s;
    background-color: pink;
  }
}
</style>