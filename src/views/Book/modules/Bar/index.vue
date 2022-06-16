<template>
  <div class="bar">
    <el-tree
      :data="state.data"
      :props="state.defaultProps"
      @node-click="handleNodeClick"
    >
      <template v-slot:default="{ node, data }">
        <div @click="treeClick(node, data)" class="tree-item">
          <div>
            <v-Icon :type="getIconType(data)"></v-Icon>
            {{ data.label }}
          </div>
          <!-- <div>
                    <v-Icon type="icon-shanchu" ></v-Icon>
                    <v-Icon type="icon-xiugai" ></v-Icon>
                    <v-Icon type="icon-tianjiawenjian" ></v-Icon>
                    <v-Icon type="icon-tianjiawenjian1" ></v-Icon>
                  </div> -->
        </div>
      </template>
    </el-tree>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch } from "vue";
import { getCatalogue, getContent } from "@/api/code";
import { key } from "@/store";
import { checkLanguage } from "@/utils/methods";
import { useStore } from "vuex";
import { iconTypes } from "@/cofing";
const store = useStore(key);
const state = reactive({
  data: [],
  defaultProps: {
    children: "children",
    label: "label",
  },
});
getCatalogue().then((res) => {
  state.data = <any>res;
});
/**
 * 获取树形结构的选中项
 */
const complete = (data: Node, label: string[]): string[] => {
  if (data.data.label) {
    label.unshift(data.data.label);
  }
  return data.level == 0 ? label : complete(data.parent, label);
};
// 当节点被点击的时候触发
const handleNodeClick = (data: any, b: any) => {
  const a = complete(b, []);
  if (a[a.length - 1].indexOf(".") != -1) {
    getContent(a).then((res) => {
      if ((res as unknown as { filename: string; code: string }).filename) {
        store.commit("code/changeCode", res);
      }
    });
  }
};
const treeClick = (node: Node, data: Node["data"]) => {
  console.log(node, data);
};
const getIconType = (data: Node["data"]) => {
  const file = checkLanguage(data.label);
  return file ? iconTypes[file] : "icon-wenjianjia1";
};
type Node = {
  level: number;
  parent: Node;
  data: { label: string };
};
</script>
<style lang="scss" scoped>
.bar {
  background-color: var(--editor-header-background);
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.bar::-webkit-scrollbar {
  display: none;
}
::v-deep {
  .el-tree {
    background-color: var(--editor-header-background);
    color: var(--command-color);
  }
  .el-tree-node:focus > .el-tree-node__content {
    background-color: rgba(0, 127, 212, 0.4) !important;
  }
  .el-tree-node__content:hover {
    background-color: rgba(0, 127, 212, 0.4);
  }
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: rgba(0, 127, 212, 0.4);
  }
}
.tree-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
