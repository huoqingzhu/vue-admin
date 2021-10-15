<template>
    <div class="trascina" ref="node">
      <Switch :list="['icon-quanping','icon-quxiaoquanping']" @change="screen" />
      <el-button type="primary" @click="preserve">保存</el-button>
      <img src="@/assets/map2.png" alt="" style="width: 400px;height:400px">
      <img src="https://www.apple.com.cn/iphone/home/images/meta/wechat/iphone__btp62hy2cbea_og.png" alt="">
      <div class="yuan"></div>
    </div>
</template>
<script lang="ts" setup>
import Switch from "@/components/Switch/index.vue";
import {ref} from "vue"
import html2canvas from "html2canvas";
const node=ref<HTMLElement>()
const screen=(type:boolean)=>{
   let element = node.value; //设置后就是   id==con_lf_top_div 的容器全屏
        if(!type){
          element?.requestFullscreen()
        }else{
          document
          .exitFullscreen()
        }
}
const preserve=()=>{        
  let scale = window.devicePixelRatio // 获取设备像素比
    html2canvas(node.value as HTMLElement, {
          useCORS: true,
          scale
        }).then((canvas) => {
            // 压缩
            let src = canvas.toDataURL("image/png",0.1);
            console.log(src)
            var a = document.createElement('a')
            a.download =  'pic'
      // 设置图片地址
            a.href = src;
            a.click();
          })
          .catch(() => {
            console.log('保存失败')
        });
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
}
</style>