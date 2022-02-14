<template>
  <div class="collapse">
    <v-Icon type="icon-icon_sanjiaoxing" :style="style" @click="changeIcon" />
      {{ title }}
  </div>
  <div v-if="show" class="collapseCount">
      <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name:'v-collapse',
  props: {
    title: {
      type: String,
      default: "基本属性",
    },
    value: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const changeIcon = () => {
      if (!show.value) {
        style.value.transform = "none";
        show.value = true;
      } else {
        style.value.transform = "rotate(-90deg)";
        show.value = false;
      }
    };
    const style = ref({ fontSize: "12px", transform: "rotate(-90deg)" });
    const show = ref(props.show);
    changeIcon();
    return { changeIcon, style, show };
  },
});
</script>

<style lang="less" scoped>
.collapse {
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  border:1px solid #333;
  background-color: #20222a;
}
.collapseCount {
  padding: 10px 16px;
}
</style>
