<template>
    <span class="move" :style="{width}">
      {{state.value}}
    </span>
</template>
<script lang="ts" setup>
import {reactive,watch,onMounted} from "vue"
import TWEEN from "@tweenjs/tween.js";
const props= withDefaults(defineProps<{
  st?: number,
  ed?: number,
  width?: string,
}>(), {
  st:0,
  ed:100,
  width:'50px'
})
const state=reactive({
    num:props.st,
    value:0,
})
const position = { x: props.st }
let tween = new TWEEN.Tween(position);

const animate=()=> {
  requestAnimationFrame(animate);
  tween.update();
}

const init=()=>{
      tween.to({ x: props.ed }, 1000);
      //.repeat(4) 重复
      //.onStart 开始调用
      //.onStop 结束调用
      //onComplete tween正常结束时执行的回调函数
      tween
        .onUpdate((position) => {
          //@ts-ignore
          state.value=position.x.toFixed(2)
        })
        .start()
}
//向外部暴露对象
defineExpose({
  init
})
watch(()=>props.ed, ()=>{
  init()
})
onMounted(() => {
  init()
  animate();
})

// 定义emit事件
</script>
<style lang="scss">
.move {
  font-family: LCDM2B__;
  font-size: 30px;
}
</style>
