<template>
  <div class="scale" ref="parent">
    <canvas ref="node" width="20" height="1000" >
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
let ctx:CanvasRenderingContext2D
const config={
  offset:0,
  width:20,
  height:5000,
}
  const init=(offset:number=0)=>{
      config.offset = offset
      if(config.offset<=0){
        config.offset=0
      }
      const canvas:HTMLCanvasElement = (node.value as HTMLCanvasElement);
      canvas.setAttribute("width",config.width+'')
      canvas.setAttribute("height",config.height+'')
      ctx =(canvas.getContext('2d') as CanvasRenderingContext2D);
      ctx.translate(0,-config.offset);
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#ccc';
      ctx.font = "6pt Calibri";
      if(parent.value){
        config.width=parent.value.clientWidth 
        config.height=parent.value.clientHeight 
      }
      for(let i=0; i<=10000;i=i+10){
          ctx.beginPath();
        if(i%100===0){
          // ctx.save();
          // ctx.rotate(Math.PI/180);
          // ctx.textBaseline = 'bottom';
          ctx.fillText(`${i}`, 0, i*store.state.edit.zoom+20); 
          // ctx.restore();
          ctx.moveTo(0, i*store.state.edit.zoom+20);
          ctx.lineTo(20,i*store.state.edit.zoom+20);
          ctx.lineWidth=0.5;     
        }else if(i%50===0){
          // ctx.save();
          // ctx.rotate(Math.PI/180);
          // ctx.textBaseline = 'bottom';
          ctx.fillText(`${i}`, 0, i*store.state.edit.zoom+20); 
          // ctx.restore();
          ctx.moveTo(2, i*store.state.edit.zoom+20);
          ctx.lineTo(20,i*store.state.edit.zoom+20);
          ctx.lineWidth=0.3; 
        }
          else{
          ctx.moveTo(8, i*store.state.edit.zoom+20);
          ctx.lineTo(20,i*store.state.edit.zoom+20);
          ctx.lineWidth=0.2;     
        }
          ctx.stroke();
          // ctx.translate(2, i);
            // 英文字符，旋转90°
          // ctx.textAlign = 'bottom'

      }
      canvas.onmousemove = function (e) {
        let x = e.offsetX;
        let y = e.offsetY;
        
        console.log(x,y)
    };

      ctx.fill();
  }
  const clearRect=(offset:number)=>{
        if(parent.value){
          ctx.clearRect(0,0,parent.value.clientWidth,parent.value?.clientHeight);  
        }
        init(offset)
  }
watch(()=>store.state.edit.zoom,()=>{
      clearRect(config.offset)
  })
  defineExpose({
    clearRect,
    init
  })
  onMounted(() => {
      init()
  })
</script>
<style lang="scss" scoped>
.scale{
    top: 20px;
    left: 0;
    pointer-events: auto;
    width: 20px;
    height: calc(100% - 20px);
    position: absolute;
    background-color: #15161f;

}
</style>