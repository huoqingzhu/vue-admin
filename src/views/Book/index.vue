<template>
    <div class="code">
      <!-- 侧边栏 -->
      <div class="sidebar"></div>
      <div class="code-content">
        <!-- 头部 -->
        <div class="code-header"></div>
        <div class="code-body">
          <div class="code-code">
            <Editor v-model="code"></Editor>
          </div>
          <div class="code-navigation"></div>
        </div>
        <div class="code-footer"></div>
      </div>

    </div>
</template>
<script lang="ts" setup>
import {ref} from "vue"
import Editor from "./components/Editor.vue" 
const code = ref(`
<template>
    <div class="code">
      <!-- 侧边栏 -->
      <div class="sidebar"></div>
      <div class="code-content">
        <!-- 头部 -->
        <div class="code-header"></div>
        <div class="code-body">
          <div class="code-code">
            <Editor v-model="code"></Editor>
          </div>
          <div class="code-navigation"></div>
        </div>
        <div class="code-footer"></div>
      </div>

    </div>
<style lang="scss">
@import './index.scss'
</style>
`);
</script>
<style lang="scss">
@import './index.scss'
</style>