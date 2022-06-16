<template>
  <div>
    <div class="upload" @click="change">
      模版下载{{ $store.state.app.device }}
    </div>
    <el-button type="primary" @click="down()">同时下载多文件</el-button>
    <div class="flex">
      <div class="box">
        <div
          style="
            width: 150px;
            height: 150px;
            background-color: rgb(197, 28, 28) f;
          "
        ></div>
      </div>
      <div class="box">
        <div
          class="fd"
          style="
            width: 100%;
            height: 100%;
            background-color: rgb(229, 145, 145);
          "
        ></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import vTable from "@/components/Table/index2.vue";

const state = reactive({
  ed: 34.5,
});
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    width: "100px",
  },
  {
    title: "公司名称",
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: "在职人数",
    dataIndex: "age",
    key: "age",
  },
];
const dataSource = [
  { id: 1, name: "123", age: 18 },
  { id: 2, name: "124", age: 28 },
];
const Pagination = {
  total: 30,
  current: 4,
};
for (let i = 3; i < Pagination.total; i++) {
  dataSource.push({ id: i, name: `贵州茅台${i}分店`, age: i * 5 });
}

const mp3arr = [
  "https://xiaohuo.online/word/1.docx",
  "https://xiaohuo.online/word/2.docx",
  "https://xiaohuo.online/word/3.docx",
];
const change = () => {
  const name = "班级管理学员名单导入模版.xls";
  const url = location.origin + location.pathname + "/img/" + name;
  download(name, url);
};
function download(name: string, href: string) {
  const a = document.createElement("a"), // 创建a标签
    e = document.createEvent("MouseEvents"); // 创建鼠标事件对象
  e.initEvent("click", false, false); // 初始化事件对象
  a.href = href; // 设置下载地址
  a.download = name; // 设置下载文件名
  a.dispatchEvent(e); // 给指定的元素，执行事件click事件
}
const down = () => {
  download("1", mp3arr[0]);
  setTimeout(() => {
    download("2", mp3arr[1]);
  }, 1000);
  setTimeout(() => {
    download("3", mp3arr[2]);
  }, 3000);
};

// 给多文件下载按钮添加点击事件
</script>
<style lang="less" scoped>
.upload {
  width: 80px;
  text-align: center;
  color: #4f95f7;
  border: none;
  height: 30px;
  line-height: 30px;
  border-bottom: 2px solid #4f95f7;
  margin-bottom: 10px;
  cursor: pointer;
}
.box {
  width: 100px;
  height: 100px;
  background-color: rgb(10, 235, 148);
}
.fd {
  transform: scale(3840/6656, 1080/1872);
  transform-origin: 0px 0px 0px;
}
</style>
