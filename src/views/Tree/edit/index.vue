<template>
  <div class="edit">
        <div style="position: relative; flex: 1 1 0%;">
          <div  class="mb-ruler">
        <div class="eye">
            <v-Icon :type="type" style="font-size: 18px;color: #fff;" @click="change"></v-Icon>
        </div>
              <ScaleX ref="scalex"></ScaleX>
              <ScaleY ref="scaley"></ScaleY>
          </div>
          <div class="_2iDHz" ref="node">
        <div style="position: absolute; width: 10000px; height: 10000px; overflow: auto;">
          <Drag  />
        </div>
        </div>
        </div>
        <Operation @regression="regression" />
  </div>
</template>
<script lang="ts" setup>
import {onMounted,ref,computed,reactive,nextTick,watch} from "vue"
import {key} from '@/store/index'
import { useStore } from 'vuex';
import ScaleX from "./component/scaleX.vue"
import ScaleY from "./component/scaleY.vue"
import Drag from "./Drag/index.vue"
import Operation from "./component/operation.vue"
const scalex=ref()
const scaley=ref()
const node = ref()
const state =reactive({
    eye:false,
})
const store = useStore(key)
const type=computed(()=>{
    return state.eye?'icon-yanjing_yincang':'icon-yanjing_xianshi'
})
const scrollFunc=(e:any)=>{
          scalex.value?.clearRect(node.value.scrollLeft )
          scaley.value?.clearRect(node.value.scrollTop )
}
const change=()=>{
    state.eye=!state.eye
}
const regression=()=>{
  console.log(node.value)
  store.commit('edit/regression',{width:node.value.clientWidth-60,height:node.value.clientHeight-60})
}
onMounted(() => {
  //@ts-ignore
  if(node.value){
    window.addEventListener('scroll', scrollFunc,true)
  }
  nextTick(()=>{
    regression()
  })
})

</script>
<style lang="scss">
.edit{
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    transition: all linear 500ms;
  
  .eye{
    position: absolute;
    top: 0;
    left: 0;
    background-color: #171920;
    pointer-events: auto;
    width: 20px;
    height: 20px;
  }
  .mb-ruler{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
    pointer-events: none;
    font-size: 12px;
    overflow: hidden
  }
  ._2iDHz{
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    overflow: auto;
    background-color: #171920;
    z-index: 1;
  }
  ._1BxC6 {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    padding: 0 10px 0 22px;
    border-top: 1px solid #0d0e10;
    ._1H_q0 {
    display: inline-block;
    line-height: 30px;
    color: #bfbfbf;
    padding: 0 10px;
    cursor: pointer;
}
}
  ._2iDHz::-webkit-scrollbar {
    display: none;
    }
}


</style>