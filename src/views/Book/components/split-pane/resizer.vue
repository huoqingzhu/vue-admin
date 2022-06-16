<template>
  <div :class="classes" :style="{ background: bg }"></div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from "vue";
const props = withDefaults(
  defineProps<{
    split?: string;
    className?: string;
    active?: boolean;
  }>(),
  {
    split: "vertical%",
    className: "",
    active: false,
  }
);
const classes = computed(() => {
  const classes = ["splitter-pane-resizer", props.split, props.className];
  console.log(classes);
  return classes.join(" ");
});
const select = ref(false);
const bg = computed(() => {
  return props.active ? "#007fd4" : "";
});
</script>
<style scoped>
.splitter-pane-resizer {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  background-color: transparent;
  /* opacity: .2; */
  z-index: 1;
  -moz-background-clip: padding;
  -webkit-background-clip: padding;
  background-clip: padding-box;
}
.splitter-pane-resizer:hover {
  background-color: #007fd4;
}

.splitter-pane-resizer.horizontal {
  height: 7px;
  /* margin: -5px 0;
	border-top: 5px solid rgba(255, 255, 255, 0);
	border-bottom: 5px solid rgba(255, 255, 255, 0); */
  cursor: row-resize;
  width: 100%;
}

.splitter-pane-resizer.vertical {
  width: 7px;
  height: 100%;
  /* margin-left: -5px;
	border-left: 5px solid rgba(255, 255, 255, 0);
	border-right: 5px solid rgba(255, 255, 255, 0); */
  cursor: col-resize;
}
</style>
