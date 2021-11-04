<template>
  <div class="sizeInput" :style="{width:`${width}px`}">
    <input class="inputsize"  placeholder="请输入" :style="{width:name?`${width-30}px`:'100%'}" @input="change"  @keyup.enter="change"  :type='type' :value="value"  />
    <span v-if="name">{{name}}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
export default defineComponent({
  props: {
    width:{
      type: Number,
      default:120
    },
    type:{
        type:String,
        default:"text"
    },
    value:Number||String,
    name:{
        type:String,
        default:''
      }
  },
  setup(props,ctx){
    const change=(e:any)=>{
      ctx.emit("update:value",Number(e.target.value));
      ctx.emit("blur",e)
    }
    return {change}
  }
})
</script>
<style lang="less" scoped>
.sizeInput{
  height:24px;
  border:1px solid #393b4a;
  // margin-top: 15px;
}
.inputsize{
  height:22px;
  border:0px;
  margin-right: 10px;
  background-color: transparent;
  color:#fff;
}
.inputsize:hover{
  // margin-left: 5px;
  // text-align: left;

  border: 0;
  // border-radius: 2px;
  // outline: 0;
  // transition: all 0.3s linear;
}
.inputsize:focus{
  border: 1px solid #2DA7E0;

}
</style>