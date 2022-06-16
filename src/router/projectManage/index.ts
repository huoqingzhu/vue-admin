import Layout from "@/Layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import { AddLocation } from "@element-plus/icons-vue";

// 项目管理子系统-路由页面
const router: RouteRecordRaw[] = [
  {
    path: "/projectManage",
    component: Layout,
    props: {
      rootRoutePath: "/projectManage",
      systemTitle: "信息化项目全流程管理",
    },
    redirect: "/projectManage/workStage",
    children: [
      {
        path: "workStage",
        component: () => import("@/views/projectManage/index.vue"),
        name: "首页",
        meta: {
          icon: AddLocation,
          title: "首页",
          roles: [],
        },
      },
      {
        path: "projectApply",
        component: () => import("@/views/projectManage/pinia.vue"),
        props: {
          mode: "add",
        },
        name: "pinia",
        meta: {
          icon: AddLocation,
          disabled: true,
          title: "pinia",
          roles: [],
        },
      },
      {
        path: "draftBox",
        component: () => import("@/views/projectManage/index.vue"),
        name: "草稿箱",
        meta: {
          icon: AddLocation,
          disabled: true,
          title: "草稿箱",
          roles: [],
        },
      },
      {
        path: "processManage",
        component: () => import("@/views/projectManage/index.vue"),
        name: "项目过程管理",
        meta: {
          icon: AddLocation,
          disabled: true,
          title: "项目过程管理",
          roles: [],
        },
      },
      {
        path: "todo",
        component: () => import("@/views/projectManage/index.vue"),
        name: "待办项目",
        meta: {
          icon: AddLocation,
          disabled: false,
          title: "待办项目",
          roles: [],
        },
      },
      {
        path: "alreadyDone",
        component: () => import("@/views/projectManage/index.vue"),
        name: "已办项目",
        meta: {
          icon: AddLocation,
          disabled: false,
          title: "已办项目",
          roles: [],
        },
      },
      {
        path: "search",
        component: () => import("@/views/projectManage/index.vue"),
        name: "项目库检索",
        meta: {
          icon: AddLocation,
          roles: [],
          title: "项目库检索",
          // disabled: true,
        },
      },
    ],
  },
];

export default router;
