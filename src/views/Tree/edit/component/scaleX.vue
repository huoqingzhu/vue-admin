<template>
  <div class="scale" ref="parent">
    <canvas ref="node" width="1300" height="20" >
      你的浏览器不支持Canvas
    </canvas>
  </div>
</template>
<script lang="ts" setup>
import {onMounted,ref,watch} from "vue"
import {key} from '@/store/index'
import { useStore } from 'vuex';
const node=ref<HTMLElement>()
const parent=ref<HTMLElement>()
const store = useStore(key)
const config={
  offset:0,
  width:1300,
  height:20,
}
let ctx:CanvasRenderingContext2D
  const init=(offset:number=0)=>{
      config.offset = offset
      if(config.offset<=0){
        config.offset=0
      }
      const canvas:HTMLCanvasElement = (node.value as HTMLCanvasElement);
      if(parent.value){
        config.width=parent.value.clientWidth 
        config.height=parent.value.clientHeight 
      }
      canvas.setAttribute("width",config.width+'')
      canvas.setAttribute("height",config.height+'')
      ctx =(canvas.getContext('2d') as CanvasRenderingContext2D);
      ctx.translate(-config.offset,0);
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#ccc';
      ctx.font = "6pt Calibri";
      for(let i=0; i<=10000;i=i+10){
          ctx.beginPath();
        if(i%100===0){
          ctx.fillText(`${i}`, i*store?.state.edit.zoom+20, 10);
          ctx.moveTo(i*store?.state.edit.zoom+20, 0);
          ctx.lineTo(i*store?.state.edit.zoom+20,20);
          ctx.lineWidth=0.5;     
        }else if(i%50===0){
          ctx.moveTo(i*store?.state.edit.zoom+20, 2);
          ctx.lineTo(i*store?.state.edit.zoom+20,20);
          ctx.lineWidth=0.3; 
          if(store?.state.edit.zoom>=0.6){
            ctx.fillText(`${i}`, i*store?.state.edit.zoom+20, 10);   
          }
        }
          else{
          ctx.moveTo(i*store?.state.edit.zoom+20, 12);
          ctx.lineTo(i*store?.state.edit.zoom+20,20);
          ctx.lineWidth=0.2;     
        }
          ctx.stroke();
      }
      canvas.onmousemove = function (e) {
        let x = e.offsetX;
        let y = e.offsetY;
    };
      // ctx.translate(20,0);
      ctx.fill();
  }
  const clearRect=(offset:number)=>{
        if(parent.value){
          ctx.clearRect(0,0,parent.value.clientWidth,parent.value?.clientHeight);  
        }
        init(offset)
  }
  defineExpose({
    clearRect,
    init
  })
  watch(()=>store?.state.edit.zoom,()=>{
      clearRect(config.offset)
  })
  onMounted(() => {
        init() 
  })
</script>
<style lang="scss" scoped>
.scale{
  left: 20px;
  pointer-events: auto;
  top: 0;
  width: calc(100% - 20px);
  height: 20px;
  position: absolute;
  z-index: 10;
  background-color: #15161f;
}
</style>