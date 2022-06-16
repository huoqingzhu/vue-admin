<template>
  <div class="code">
    <div class="sidebar">
      <slot name="sidebar"></slot>
    </div>
    <!-- 内容 -->
    <Drag>
      <split-pane @resize="resize" :min-percent="0" split="vertical">
        <template v-slot:paneL>
          <slot name="bar"></slot>
        </template>
        <template v-slot:paneR>
          <split-pane
            split="horizontal"
            :min-percent="0"
            :defaultPercent="100"
            @resize="resize"
          >
            <template v-slot:paneL>
              <slot></slot>
            </template>
            <template v-slot:paneR>
              <slot name="console"></slot>
            </template>
          </split-pane>
        </template>
      </split-pane>
    </Drag>
  </div>
  <!-- 侧边栏 -->
  <!-- 底部 -->
  <div class="code-footer">
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts" setup>
import Drag from "../components/Drag/Drag.vue";
import splitPane from "../components/split-pane/index.vue";
const resize = (w: number) => {
  console.log(w);
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
