<template>
  <div class="overvuew center">
      <v-Icon type="icon-youjiantou" style="font-size: 18px;color: #fff;" @click="change"></v-Icon>
      <div class="word" v-if="state.show">
          <div class="overvuewBox"></div>
          <div style="width: 20px;right: 0px; background-color: rgb(33, 37, 40);;  z-index: 4;" class="center">
            <v-Icon type="icon-youjiantou" style="font-size: 18px;color: #fff;transform: rotate(180deg);" @click="change"></v-Icon>
          </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive} from "vue"
const state=reactive({
  show:false,
})
const change=()=>{
    state.show=!state.show
}
</script>
<style lang="scss">
.overvuew{
  width: 20px;
  position: relative;
  .word {
  position: absolute;
  display: flex;
  width:280px;
  height: 100%;
  // right: 0px;
  left:0px;
  top: 0px;
  background-color: pink;
  animation: mymove 0.5s;
  .overvuewBox{
    width: 260px;
    background: #1d1f26;
    z-index: 4;
  }
}
@keyframes mymove {
  from {
    left: -280px;
  }
  to {
    left: 0px;
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  from {
    left: -280px;
  }
  to {
    left: 0px;
  }
}

}
</style>