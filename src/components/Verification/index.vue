<template>
    <canvas
      @click="changeCode"
      ref="canvas"
      :height="contentHeight"
      :width="contentWidth"
    ></canvas>
</template>
<script lang="ts" setup >
import {onMounted,ref} from "vue"
import {randomNum,randomColor,} from "./hooks"
const props= withDefaults(defineProps<{
  contentHeight: number,
  contentWidth: number
}>(), {
  contentHeight:38,
  contentWidth:116
})
const canvas=ref(null)
const backgroundColorMin= 200
const backgroundColorMax=220
const dotColorMin= 60
const dotColorMax= 120
const fontSizeMin=25
const fontSizeMax=35
const contentWidth= 116
const contentHeight= 38
let identifyCode= ""
const identifyCodes= "123456789abcdefghjkmnpqrstuvwxyz"
const drawText=(ctx: CanvasRenderingContext2D, txt: string, i: number)=> {
      ctx.fillStyle = randomColor(50, 160); // 随机生成字体颜色
      ctx.font =
       randomNum(fontSizeMin, fontSizeMax) + "px SimHei"; // 随机生成字体大小
      let x = (i + 1) * (contentWidth / (identifyCode.length + 1));
      let y = randomNum(fontSizeMax, contentHeight - 5);
      var deg = randomNum(-30, 30);
      // 修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    }
const drawLine=(ctx:CanvasRenderingContext2D)=>{
      // 绘制干扰线
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = randomColor(100, 200);
        ctx.beginPath();
        ctx.moveTo(
          randomNum(0, contentWidth),
          randomNum(0, contentHeight)
        );
        ctx.lineTo(
          randomNum(0, contentWidth),
          randomNum(0, contentHeight)
        );
        ctx.stroke();
      }
    }    
const drawDot=(ctx:CanvasRenderingContext2D)=> {
      // 绘制干扰点
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          randomNum(0, contentWidth),
          randomNum(0, contentHeight),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
  }     
const drawPic=()=> {
      let canva =canvas.value;
      let ctx:CanvasRenderingContext2D;
      ctx= (((canva as unknown) as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D);
      ctx.textBaseline = "bottom";
      // 绘制背景
      ctx!.fillStyle = randomColor(
        backgroundColorMin,
        backgroundColorMax
      );
      ctx!.fillRect(0, 0, props.contentWidth, props.contentHeight);
      // 绘制文字
      for (let i = 0; i < identifyCode.length; i++) {
          drawText((ctx as CanvasRenderingContext2D), identifyCode[i], i);
      }
      drawLine(ctx);
      drawDot(ctx);
  }
const makeCode=(data: string | any[], len: number)=> {
      for (let i = 0; i < len; i++) {
        identifyCode += data[randomNum(0, data.length - 1)];
      }
    }
const changeCode=()=> {
      identifyCode = "";
      makeCode(identifyCodes, 4);
      drawPic()
}
onMounted(() => {
  makeCode(identifyCodes,4)
  drawPic()
})


</script>