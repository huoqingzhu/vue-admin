<template>
  <div ref="charts" :style="{width: '100%', height: `${height}%`}" ></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import * as echarts from "echarts/core";
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  RadarChart,
  LineChart,
  PieChart,
  GaugeChart,
  ScatterChart,
} from "echarts/charts";
import {
  TitleComponent,
  LegendComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  MarkLineComponent,
  ToolboxComponent
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LineChart,
  PieChart,
  GaugeChart,
  RadarChart,
  ScatterChart,
  VisualMapComponent,
  DataZoomComponent,
  MarkLineComponent,
  ToolboxComponent
]);
export default defineComponent({
  props: {
    option: {
      type: Object,
      default() {
        return {
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: [5, 20, 36, 10, 10, 2],
            },
          ],
        };
      },
    },
    style: {
      type: Object,
      default() {
        return { width: 300, height: 300 };
      },
    },
    height:{
      type:Number,
      default:80
    }
  },
  setup(props: any) {
    const charts: any = ref(null);
    let myChart: any;
    onMounted(() => {
      myChart = echarts.init(charts.value);
      myChart.setOption(props.option);
    });
    watch(
      () => props.style,
      () => {
        myChart?.resize();
      }
    );
    const init = () => {
      try{
        // { notMerge: true } 数据清除替换
        myChart.setOption(props.option);
      }catch{}
    };
    return {
      charts,
      init,
    };
  },
});
</script>
