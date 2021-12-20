<template>
  <div class="gzGP0">页面设置 </div>
  <div class="whole">
        <Both name="屏幕大小" >
            <div  class="flex-between">
                  <VInput  type="number"  v-model:value="$store.state.edit.overall.width" name="W"   />
                  <VInput  type="number"  v-model:value="$store.state.edit.overall.height" name="H" />
            </div>
        </Both>
        <Both name="背景色" >
            <div class="flex-between">
                <el-color-picker 
                  size="mini" 
                  v-model="$store.state.edit.overall.background" 
                  :predefine="predefineColors" 
                  />
                <VInput :value="$store.state.edit.overall.background"   />
            </div>
        </Both>
  </div>
</template>
<script lang="ts" setup>
import {ref,watch} from "vue"
import Both from "@/components/Both/index.vue"
import VInput from "@/components/VInput/index.vue"
import { useStore } from "vuex"
import {key} from "@/store"
const store = useStore(key)
const predefineColors = ref([
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
      '#c7158577',
    ])

</script>
<style lang="scss" scoped>
.whole{
  width: 100%;
  color: #b4b7c1;
  padding: 20px 0;

}
  .gzGP0 {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px
    solid rgba(36, 38, 46, 0.4);
    background: #3d404d;
    font-size: 14px;
    text-align: center;
    font-weight: normal;
    color: #b4b7c1;
}
</style>