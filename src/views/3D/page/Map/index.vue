<template>
  <div ref="node" class="map"></div>
</template>
<script lang="ts" setup>
import Three from "@/utils/Three";
import {ref,onMounted} from "vue"
import {createCube,createGeojson} from "@/utils/model"
import json from "./JSON/zhong.json"
const node=ref()
 // 初始化 Map
let map: Three;
const init=()=>{
  map = new Three(node.value, true);
  const cube = createGeojson(json,5);
  cube.translateX(-520);
  cube.translateY(-150);
  map.scene.add(cube);
  map.init();
}
onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>
.map{
  width: 100%;
  height: 100%;
  background-color: #000;
  background-image: radial-gradient(circle, rgb(3, 3, 63), rgb(1, 6, 24), #000);
}
</style>