<template>
  <div  class="">
      <h1>常用图表配置</h1>
      <div style="width: 337px;height: 270px">
        <Echart :option="pie" />
      </div>
  </div>
</template>
<script lang="ts" setup>
  import Echart from '@/components/echart/index.vue';
  import pie from './options/pie'
</script>
<style lang="scss" scoped>

  </style>
  