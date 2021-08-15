<template>
  <div id="mapContainer">
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { mapState } from 'vuex';
  import {bounds} from './map'
  export default defineComponent({
    computed: {
    ...mapState([ 'num']),
    },
    created(){
      this.getList();
    },
    methods:{
      add(){
        this.num=this.num+10
      },
      getList(){
      }
    },
    setup(){
      
      const init=()=>{
        //@ts-ignore
        const map = new AMap.Map('mapContainer', {
          viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
          zoom: 15, //初始化地图层级
          mapStyle: 'amap://styles/a24cdb74a5dc59643656608ec0682ea1',
          center: [120.19888855909448, 30.191655350062952] //初始化地图中心点
        })
         //@ts-ignore
        const path=bounds.map(i => new AMap.LngLat(i[0], i[1]))
        console.log(path);
        //@ts-ignore
        const polygon = new AMap.Polygon({
          
          path:[path],
            strokeColor: '#71d6ff',
            strokeWeight: 7,
            fillColor: '#508bff',
            fillOpacity: 0.5
        });
          map.add(polygon)
      }
      onMounted(()=>{
        init()
      })
    }
  });
</script>
<style lang="scss" scoped>
#mapContainer{
  width: 100%;
  height: 100%;
}
</style>
