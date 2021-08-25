<template>
  <div ref="node" class="map">
    <div class="tag">
      <el-button type="primary" @click="add">新增小人</el-button>
      <el-button type="primary" @click="slowMotion = !slowMotion">{{ name }}</el-button>
    </div>
  </div>
</template>
<script lang="ts">
  import Three from "@/utils/Three";
  import { defineComponent, onMounted, reactive, toRefs, watch,onBeforeUnmount } from "vue";
  import {  addPerson } from "@/utils/model";
  import { Group, } from "three";
  import TWEEN from "@tweenjs/tween.js";
  
  interface list {
    id: number;
    x: number;
    z: number;
  }
  export default defineComponent({
    setup() {
      // 初始化 Map
      let map: Three;
      const spriteGrop = new Group(); //小人集合
      const targetMap: Map<list, THREE.Sprite> = new Map(); //
      let requestAnimationFrameID: number;
      let setIntervalID: number;
      let isOne = false; //是否是第一次
      const state = reactive({
        slowMotion: false,
        name: "开启缓动",
        node:null
      });
      watch(
        () => state.slowMotion,
        (a) => {
          a ? (state.name = "关闭缓动") : (state.name = "开启缓动");
        }
      );
      // 初始化map
      function init() {
        map = new Three((state.node as unknown as HTMLElement), true);
        for (let i = 0; i < 3; i++) {
          const data = {
            id: i,
            x: Math.floor(Math.random() * 100 - 1),
            y: 0,
            z: Math.floor(Math.random() * 100 -1 ),
          };
          addPerson(spriteGrop, data, targetMap);
        }
        map.scene.add(spriteGrop);
        map.init();
      }
  
      const add = () => {
        const data = {
          id: targetMap.size,
          x: Math.floor(Math.random() * 100 - 2),
          z: Math.floor(Math.random() * 100 - 2),
        };
        addPerson(spriteGrop, data, targetMap);
      };
  
      // 模拟更新位置
      const changePosition = () => {
        targetMap.forEach((value, key) => {
          // console.log(key);
          key.x = Math.floor(Math.random() * 100 - 2);
          key.z = Math.floor(Math.random() * 100 - 2);
          // console.log(key);
          let x = record[`x${key.id}`];
          let z = record[`z${key.id}`];
          coords[`x${key.id}`] = x;
          coords[`z${key.id}`] = z;
          record[`x${key.id}`] = key.x;
          record[`z${key.id}`] = key.z;
        });
      };
      let coords: any = {};
      let record: any = {};
      let tween = new TWEEN.Tween(coords).to(record, 1000);
      // 缓动
      const tweens = () => {
        tween = new TWEEN.Tween(coords).to(record, 1000);
        tween
          .onUpdate((position) => {
            // console.log(position);
            targetMap.forEach((value, key) => {
              value.position.set(position[`x${key.id}`], 0, position[`y${key.id}`]);
            });
          })
          .start();
      };
      // 正常更新
      const positionChange = () => {
        targetMap.forEach((value, key) => {
          value.position.set(key.x, 0, key.z);
        });
      };
      function animate() {
        requestAnimationFrameID = requestAnimationFrame(animate);
        tween.update();
      }
      animate();
      const stopAnimation = () => {
        clearInterval(setIntervalID);
      };
      const startAnimation = () => {
        changePosition(); //模拟位置数据更新
        if (state.slowMotion) {
          tweens();
        } else {
          positionChange();
        }
      };
      //@ts-ignore
      setIntervalID = setInterval(() => {
        startAnimation();
      }, 1000);
      onMounted(() => {
        init();
      });
      onBeforeUnmount(()=>{
        stopAnimation()
      })
      return {
        add,
        ...toRefs(state),
      };
    },
  });
  </script>
<style lang="scss" scoped>
.map{
  width: 100%;
  height: 100%;
  background-color: #000;
  background-image: radial-gradient(circle, rgb(3, 3, 63), rgb(1, 6, 24), #000);
  .tag {
    position: absolute;
    // width: 100%;
    height: 50px;
    line-height: 50px;
    // background-color: pink;
  }
}
</style>