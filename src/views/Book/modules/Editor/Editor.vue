<template>
  <div class="editor" ref="dom"></div>
</template>

<script setup lang="ts">
import {
  onMounted,
  defineProps,
  defineEmits,
  ref,
  watch,
  watchEffect,
} from "vue";
import { checkLanguage } from "@/utils/methods";
import { fileTypes } from "@/cofing";
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
// import JsonWorker from 'monaco-editor/esm/vs/basic-languages/javascript'
const props = withDefaults(
  defineProps<{
    value?: string;
    filename?: string;
  }>(),
  {
    value: "123",
    filename: "html",
  }
);
//@ts-ignore
self.MonacoEnvironment = {
  getWorker(workerId: any, label: any) {
    if (label === "json") {
      return new JsonWorker();
    }
    if (label === "typescript") {
      return new tsWorker();
    }
    if (label === "html") {
      return new htmlWorker();
    }
    if (label === "css") {
      return new cssWorker();
    }
    return new EditorWorker();
  },
};
console.log();
//@ts-ignore
const emit = defineEmits(["preservation"]);
const dom = ref();
let jsonModel: any;
let instance: any;
watch(
  () => props.value,
  (a) => {
    instance.setValue(a); //设置值
    monaco.editor.setModelLanguage(
      jsonModel,
      fileTypes[checkLanguage(props.filename)]
    );
  }
);

onMounted(() => {
  jsonModel = monaco.editor.createModel(
    props.value,
    props.filename,
    monaco.Uri.parse("json://grid/settings.json")
  );

  instance = monaco.editor.create(dom.value, {
    model: jsonModel,
    tabSize: 2,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    theme: "vs-dark", // 主题 vs hc-black vs-dark
  });

  instance.onDidChangeModelContent(() => {
    const value = instance.getValue();
    // console.log("我改变了")
    //
  });
  instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
    const value = instance.getValue();
    emit("preservation", { filename: props.filename, code: value });
  });
});
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>
