<template>
  <div ref="node" class="map">
    <div class="but" @click="change">{{title?'固定视角':"跟随视角"}}</div>
  </div>
</template>
<script lang="ts" setup>
import Three from "@/utils/Three";
import {BoxBufferGeometry,Mesh,MeshBasicMaterial,LineLoop,CatmullRomCurve3,LineBasicMaterial,BufferGeometry,Vector3,PlaneGeometry} from "three"
import {ref,onMounted} from "vue"
import {createCube,createGeojson,createSphere} from "@/utils/model"
const node=ref()
 // 初始化 Map
let map: Three;
let curve:CatmullRomCurve3
let yuan:any
let geometry
const loopTime = 10 * 1000; // loopTime: 循环一圈的时间
const title=ref(true)
const initialPoints = [
          { x: 1, y: 1, z: -1 },
          { x: 1, y: 0, z: 1 },
          { x: -1, y: 0, z: 1 },
          { x: -1, y: 0, z: -1}
  ];
let cubeList: { position: any; }[]  
const init=()=>{
    map = new Three(node.value,true,true)
    map.camera.position.set(5, 5, 5); //设置相机位置
    map.camera.lookAt(map.scene.position); //设置相机方向(指向的场景对象)
    geometry = new PlaneGeometry( 500, 500, 15, 15 );
		geometry.rotateX( - Math.PI / 2 );
    // map.scene.add(geometry)
    map.init();
}
// 生成点
const crearePoint=()=>{
  const addCube = (pos: THREE.Vector3) => {
          const geometry = new BoxBufferGeometry(0.1, 0.1, 0.1);
          //@ts-ignore
          const material = new MeshBasicMaterial({color: 0x00ff00});
          const cube = new Mesh(geometry, material);
          cube.position.copy(pos);
          map.scene.add(cube);
          return cube
  }
  cubeList=initialPoints.map(pos => {
           //@ts-ignore
        return  addCube(pos);
  })
}
// 生成线
const createLine=()=>{
    curve = new CatmullRomCurve3(
          cubeList.map((cube: { position: any; }) => cube.position)
    )
    curve.curveType = 'chordal'; // 曲线类型
    curve.closed = true; // 曲线是否闭合

    const points = curve.getPoints(50); // 50等分获取曲线点数组
    const geometry=new BufferGeometry().setFromPoints(points)
    const line = new LineLoop(
          geometry,
          new LineBasicMaterial({ color: 0x00ff00 })
      );
      map.scene.add(line);
}
// 获取曲线特定位置的点
const  changePosition= (t: any,)=> {
      const position = curve.getPointAt(t); // t: 当前点在线条上的位置百分比，后面计算
      return position
}   
const changeLookAt=(t:any,position: Vector3,mesh:any)=>{
      const tangent = curve.getTangentAt(t);
      const lookAtVec = tangent.add(position); // 位置向量和切线向量相加即为所需朝向的点向量
      // lookAtVec.add(new Vector3(1,1,1))
      mesh.lookAt(lookAtVec);
}
       // 在渲染函数中获取当前时间
const render = () => {
            let time = Date.now();
            let t = (time % loopTime) / loopTime; // 计算当前时间进度百分比
            const a=changePosition(t)
            yuan.position.copy(a)
            changeLookAt(t,a,yuan)
            // console.log(a)
            if(!title.value){
              map.camera.position.copy(a.add(new Vector3(0.3,0.8,0.8))); //设置相机位置
              map.camera.lookAt(yuan.position); //设置相机方向(指向的场景对象)
            }  
            requestAnimationFrame(render);
    }
const change=()=>{
    title.value=!title.value
    if(title.value){
        map.camera.position.set(5, 5, 5); //设置相机位置
        map.camera.lookAt(map.scene.position); //设置相机方向(指向的场景对象)
    }
}    
onMounted(() => {
  init()
  crearePoint()
  createLine()
  yuan=createSphere(0.05)
  map.scene.add(yuan)
  requestAnimationFrame(render);
})
</script>
<style lang="scss" scoped>
.map{
  width: 100%;
  height: 100%;
  background: #000;
  position: relative;
}
.but{
  position: absolute;
  width: 100px;
  height: 40px;
  color: #fff;
  border:1px solid #ccc;
  line-height:40px;
  text-align: center;

}
</style>