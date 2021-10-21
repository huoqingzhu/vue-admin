<template>
      <h1>常用图表配置</h1>
  <div  class="tubiao">
      <div style="width: 337px;height: 270px">
        <Echart :option="pie" />
      </div>
      <div style="width: 337px;height: 270px">
        <Echart :option="radar" />
      </div>
      <!-- <div style="width: 400px;height: 270px">
        <Echart :option="line" />
      </div> -->
      <div style="width: 637px;height: 270px">
        <Echart :option="bar" />
      </div>
      <div style="width: 637px;height: 270px">
        <Echart :option="lineBar" />
      </div>
      <div style="width: 270px;height: 270px">
        <Echart :option="percentage" />
      </div>
  </div>
</template>
<script lang="ts" setup>
  import Echart from '@/components/echart/index.vue';
  import pie from './options/pie'
  import radar from './options/radar'
  // import line from './options/line'
  import bar  from './options/bar'
  import lineBar from './options/lineBar'
  import percentage from './options/percentage'
</script>
<style lang="scss" scoped>
.tubiao{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
}
  </style>
  