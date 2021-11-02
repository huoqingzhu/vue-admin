<template>
    <Box
      v-for="item in data"
      :key="item.id"
      :style="item.style"
      :name="item.id"
      :select="item.select"
      @mousedown="selectMousedown"
      @mouseup="mouseup"
    >
    <component
        v-if="!item.children"
        v-bind:is="item.type"
        :style="item.style"
        :title="item.name"
        :id="item.id"
        :code="item.code"
      ></component>
      <div v-else  class="children">
        <Tree :data="item.children" />
      </div>
    </Box>
</template>
<script lang="ts" >
    import {boxData} from "@/store/type"
    import Box from "./Box.vue"
    import {defineComponent, PropType,inject} from "vue"
    export default defineComponent({
      name: "Tree",
      props:{
        data:{
          type: Object as PropType<boxData[]>,
          required:true
        }
      },
      components: {
        Box
      },
      setup(){
        const selectMousedown:any = inject('selectMousedown');
        const mouseup:any= inject('mouseup');
        return {selectMousedown,mouseup}
      }
    })
  </script>
  <style lang="less" scoped>
  .box{
    position: absolute;
    background-color: pink;
  }
  .children{
    // position: relative;
    width: 100%;
    height: 100%;
  }
  </style>