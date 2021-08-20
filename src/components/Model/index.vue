<template>
    <div class="gen">
      <div v-show="value"  ref="model" class="model" :style="position">
        <slot ></slot>
      </div>
    </div>
</template>
<script lang="ts">
import {onMounted, ref,PropType} from "vue"
  export default {
    props: {
      position:{
        type:Object as PropType<{width:string,height:string,top:string,left:string}>,
        default:()=>{
          return {
            width:'600px',
            height:'300px',
          }
        },
      },
      value:{
          type:Boolean,
          default:false,
        }
    },
    setup(){
      const model =ref<any>(null)
      const init=()=>{
        document.body?.appendChild(model.value)
      }
      onMounted(()=>{
      })
      return {model}
    }
    
  
  }
  </script>
  <style lang="scss">
  .gen{
    position:fixed;
    top: 0;
    left: 0;
  }
  .model{
    position: absolute;
    z-index: 2004;
    background: rgba(0, 0, 0, 0.65);
    box-shadow:inset 10px 13px 38px 0px #0092E2;
    border-radius: 8px;
    border: 9px solid #00A1FF;
    top:  50vh;
left:50vw;
-webkit-transform: translateX(-50%) translateY(-50%);
-webkit-transform: translateX(-50%) translateY(-50%);
-moz-transform: translateX(-50%) translateY(-50%);
-ms-transform: translateX(-50%) translateY(-50%);
transform: translateX(-50%) translateY(-50%) scale(0.83);

  }
  </style>