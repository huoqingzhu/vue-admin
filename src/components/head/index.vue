<template>
<!-- :style="{backgroundImage:'url('+backgroundImage+')'}" -->
  <div class="flex-end head" >
    <div  class="flex" style="width: 160px;height:40px">
      <div style="width: 50px" >
        <a-badge :count="40" :offset="[5, 5]">
            <a-popover placement="bottomLeft">
                <template #content>
                  <p>Content</p>   
                </template>
                <div class="center">
                  <v-Icon type="icon-baojing" style="font-size: 20px;color:#ccc" ></v-Icon>
                </div>
            </a-popover>
        </a-badge>
      </div>
      <div >
        <a-popover placement="bottomLeft" trigger="click">
          <template #content>
            <p>Content</p>   
          </template>
          <div  class="center" style="margin-top:-6px"> 
            <v-Icon type="icon-touxiang" style="font-size: 20px;color:#ccc" ></v-Icon>
            <span style="color:#fff;margin-left: 4px;">Admin</span>
          </div>
      </a-popover>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent,} from "vue"
  import bg from "@/assets/header.png"
  export default defineComponent({
    name:"batten",
    props:{
      backgroundImage:{
        type:String,
        default:bg
      }
    }
  })
  </script>
<style lang="less" scoped>
.head{
position: absolute;
width:100%;
height:68px;
background-size:100% 100%;
// line-height: 68px;
}
</style>