<template>
  <div >
      <h1>全息台</h1>
      <div style="width: 337px;height: 270px">
        <Echart :option="option" />
      </div>
  </div>
</template>
<script lang="ts" >
  import { defineComponent, ref } from 'vue';
  import Echart from '@/components/echart/index.vue';
  let colorList = ['#FAC858', 'red', '#7508C8','#22FE5D']
  const option = {
    title: [{
        text: '异常波动',
        x: '50%',
        y: '37%',
        textAlign: 'center',
        textStyle: {
            fontSize: '16px',
            fontWeight: '200',
            color: '#fff',
            textAlign: 'center',
        },
    }, {
        text: '16家',
        left: '50%',
        top: '52%',
        textAlign: 'center',
        textStyle: {
            fontSize: '16px',
            fontWeight: '200',
            color: 'red',
            textAlign: 'center',
        },
    }, ],
    tooltip: {
        trigger: 'item'
    },
    series: [{
        type: 'pie',
        radius: ["45%", "90%"],
        center: ["50%", "50%"],
        clockwise: true,
        avoidLabelOverlap: true,
        hoverOffset: 0,
        itemStyle: {
            normal: {
                color: function(params:any) {
                    return colorList[params.dataIndex]
                }
            }
        },
        label: {
            show:false,
            position: 'outside',
            formatter: '{a|{b}：{d}%}\n{hr|}',
            rich: {
                hr: {
                    backgroundColor: 't',
                    borderRadius: 3,
                    width: 3,
                    height: 3,
                    padding: [3, 3, 0, -12]
                },
                a: {
                    padding: [-30, 15, -20, 15]
                }
            }
        },
        labelLine: {
          show: false,
            normal: {
                length: 20,
                length2: 30,
                lineStyle: {
                    width: 1
                }
            }
        },
        data: [
          {name:'同比大幅增长\n同比增长超 100 %',value:8},
          {name:'同比大幅下降\n同比下降超 30 %',value:5},
          {name:'增速明显放缓\n同比正增长，增速放缓超 30 %',value:3},
          {name:'快速由负转正\n同比由负转正且增长超 30 %',value:3}
        ],
    }]
}
  export default defineComponent({
    components:{
      Echart
    },
    data(){
      return {
        option:option
      }
    },
    created(){
    },
    methods:{
     
    }
  });
</script>