<template>
  <Layout>
    <Editor
      :value="$store.state.code.code"
      :filename="$store.state.code.filename"
      @preservation="preservation"
    ></Editor>
    <template v-slot:bar> <Bar /></template>
    <template v-slot:console
      >控制台
      <SvgIcon name="eye" color="pink" style="font-size: 2rem"></SvgIcon>
    </template>
  </Layout>
</template>
<script lang="ts" setup>
import Layout from "./Layout/index.vue";
import Editor from "./modules/Editor/Editor.vue";
import Bar from "./modules/Bar/index.vue";
import { defaultViewThemeConfig } from "@/cofing";
import { setContent } from "@/api/code";
// 更新主题变量
// 获取变量的值
const getThemeValue = (item: string, data: any) => {
  //@ts-ignore
  let arr = defaultViewThemeConfig[item];
  let len = arr.length;
  if (!data) {
    return arr[len - 1];
  }
};
const preservation = (value: { filename: string; code: string }) => {
  console.log(value);
  setContent(value).then((res) => {
    console.log(res);
  });
};
// 设置全局css变量
const updateTheme = (data?: string) => {
  Object.keys(defaultViewThemeConfig).forEach((item) => {
    document.documentElement.style.setProperty(item, getThemeValue(item, data));
  });
};
updateTheme();
</script>
