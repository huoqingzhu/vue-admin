<template>
  <div class="editor" ref="dom"></div>
</template>

<script setup lang="ts">
import { onMounted, defineProps, defineEmits, ref } from 'vue';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';

//@ts-ignore
self.MonacoEnvironment = {
  getWorker(workerId:any, label:any) {
    if (label === 'json') {
      return new JsonWorker();
    }
    if (label === 'typescript') {
      return new tsWorker();
    }
    if (label === 'html') {
      return new htmlWorker();
    }
    return new EditorWorker();
  },
};

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
const dom = ref();

let instance:any;

onMounted(() => {
  const jsonModel = monaco.editor.createModel(
    (props.modelValue as string),
    'html',
    monaco.Uri.parse('json://grid/settings.json')
  );

  instance = monaco.editor.create(dom.value, {
    model: jsonModel,
    tabSize: 2,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    theme:  'vs-dark', // 主题
  });

  instance.onDidChangeModelContent(() => {
    const value = instance.getValue();
    emit('update:modelValue', value);
  });
});
</script>

<style scoped>
.editor {
  width: 100%;
  height:100%;
}
</style>
