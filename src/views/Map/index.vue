<template>
  <div id="mapContainer">
      <div class="itemBox">
      <select  placeholder="请选择" @change="onChange">
      <option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </option>
      </select>

    </div>

  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted,reactive,toRefs} from 'vue';
  import { mapState } from 'vuex';
  import {bounds} from './map'
  import {company} from '@/api/index'
  import gps from '@/utils/map'
  // https://szzm.hhtz.gov.cn:10087/api/
  import axios from 'axios'
  interface ponit{
    busi_cert_code: string
    busi_name: string
    busi_type_id: number
    count: number
    latitude: number
    longitude: number
  }
  export default defineComponent({
    name:"Map",
    setup(){
      const state=reactive({
        options: [{
          value: '1',
          label: '领军企业'
        }, {
          value: '2',
          label: '上市企业'
        }, {
          value: '3',
          label: '独角兽企业'
        }, {
          value: '4',
          label: '瞪羚企业'
        }, {
          value: '5',
          label: '世界500强'
        }, {
          value: '8',
          label: '高质量企业'
        }],
        value: []
      })
      let map:any;//地图对象
      let list:any[]=[]//存放点位
      let heatmapData:any[]=[]//热力图点位
      let heatmap:any//热力图层
      const init=()=>{
        //@ts-ignore
          map = new AMap.Map('mapContainer', {
          viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
          zoom: 14, //初始化地图层级
          mapStyle: 'amap://styles/a24cdb74a5dc59643656608ec0682ea1',
          center: [120.19888855909448, 30.191655350062952] //初始化地图中心点
        })
         //@ts-ignore
        const path=bounds.map(i => new AMap.LngLat(i[0], i[1]))
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
    const getColor=(type:number)=> {
      // 1、领军企业 2、上市企业	 3、独角兽企业 4、瞪羚企业 5、世界500强 6、外资 7、内资
      switch (type) {
        case 1:
          return '#FFD700';
        case 2:
          return '#FF0000';
        case 3:
          return '#C71585';
        case 4:
          return '#00FF00';
        case 5:
          return '#FF8C00';
        case 6:
          return '#FF1493';
        case 8:
          return '#91d7eb';
        default:
          return '#91d7eb';
      }
    }
      const onChange=(e:any) => {
        // console.log(e.target.value);
        map.remove(list);
        if(e.target.value!='8'){
          company({ busi_type_id: e.target.value})
          .then((res)=>{
            list=res.data.list.map((item:ponit)=>{
                  const position=gps.baidu_gaode(item.longitude, item.latitude)
                  const color =getColor(item.busi_type_id)
                  //@ts-ignore
                  const marker = new AMap.Marker({
                  //@ts-ignore
                     position: new AMap.LngLat(position.lng, position.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                      anchor: 'center',
                      content: `<div style="width: 20px;height: 20px;background: ${color};line-height: 20px;text-align: center;border-radius: 20px;"></div>`,
                  });
                  marker.on('click', () => {
                      console.log(item)
                    })
                  return marker
              })
            map.add(list)
            if(heatmap){
              heatmap.hide()
            }
        })
          .catch(err=>{
            console.log(err)
          })
        }else{
          if(heatmapData.length>0&&heatmap){
              heatmap.show()	
            }else{
              company({ busi_type_id: e.target.value})
              .then((res)=>{
                heatmapData=res.data.list.map((item:ponit)=>{
                    const position=gps.baidu_gaode(item.longitude, item.latitude)
                    return {
                      lng: position.lng,
                      lat: position.lat,
                      count:item.count
                    }
                })
                map.plugin(["AMap.HeatMap"], () => {
                  //@ts-ignore
                  heatmap = new AMap.HeatMap(map, {
                    radius: 25, //给定半径
                    opacity: [0, 0.8],
                  });
                  heatmap.setDataSet({
                    data: heatmapData,
                    max: 100
                  });
                });
              })
            }
        }
      }
      onMounted(()=>{
        init()
      })
      return {...toRefs(state),onChange}
    }
  });
</script>
<style lang="scss" scoped>
#mapContainer{
  width: 100%;
  height: 100%;
  position: relative;
  .itemBox{
    position: absolute;
    z-index: 999;
  }
}
</style>
