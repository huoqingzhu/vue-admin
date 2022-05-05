import Layout from "@/Layout/index.vue";
// 项目管理子系统-路由页面
let router = [
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
        component: () =>
          import("@/views/projectManage/index.vue"),
        name: "首页",
        meta: {
          elIcon: "el-icon-s-home",
          roles: [],
        },
      },
      {
        path: "projectApply",
        component: () =>
        import("@/views/projectManage/index.vue"),
        props: {
          mode: "add",
        },
        name: "项目申报",
        meta: {
          elIcon: "el-icon-s-order",
          disabled: true,
          roles: [],
        },
      },
      {
        path: "draftBox",
        component: () =>
        import("@/views/projectManage/index.vue"),
        name: "草稿箱",
        meta: {
          elIcon: "el-icon-s-cooperation",
          disabled: true,
          roles: [],
        },
      },
      {
        path: "processManage",
        component: () =>
        import("@/views/projectManage/index.vue"),
        name: "项目过程管理",
        meta: {
          elIcon: "el-icon-s-cooperation",
          disabled: true,
          roles: [],
        },
      },
      {
        path: "todo",
        component: () =>
        import("@/views/projectManage/index.vue"),
        name: "待办项目",
        meta: {
          elIcon: "el-icon-s-release",
          disabled: false,
          roles: [],
        },
      },
      // {
      //   path: "reviewManage",
      //   name: "评审会管理",
      //   component: () =>
      //     import(
      //       "@/views/application-factory/projectManage/reviewManage/index"
      //     ),
      //   meta: {
      //     elIcon: "el-icon-s-grid",
      //     disabled: false,
      //   },
      // },
      // // process
      // {
      //   path: "process",
      //   name: "项目过程管理",
      //   component: () =>
      //     import("@/views/application-factory/projectManage/process/index"),
      //   meta: {
      //     elIcon: "el-icon-s-grid",
      //     disabled: false,
      //   },
      // },
      // evaluate
      // {
      //   path: "opinion",
      //   name: "立项意见管理",
      //   component: () =>
      //     import("@/views/application-factory/projectManage/opinion/index"),
      //   meta: {
      //     elIcon: "el-icon-s-grid",
      //     disabled: false,
      //   },
      // },
      // {
      //   path: "evaluate",
      //   name: "绩效评价管理",
      //   component: () =>
      //     import("@/views/application-factory/projectManage/evaluate/index"),
      //   meta: {
      //     elIcon: "el-icon-s-grid",
      //     disabled: false,
      //   },
      // },
      // maintenance
      // {
      //   path: "maintenance",
      //   name: "项目运维管理",
      //   component: () =>
      //     import("@/views/application-factory/projectManage/maintenance/index"),
      //   meta: {
      //     elIcon: "el-icon-s-grid",
      //     disabled: false,
      //   },
      // },
      {
        path: "alreadyDone",
        component: () =>
        import("@/views/projectManage/index.vue"),
        name: "已办项目",
        meta: {
          elIcon: "el-icon-s-claim",
          disabled: false,
          roles: [],
        },
      },
      {
        path: "search",
        roles: ["xhqxmglce-sjjgly"],
        component: () =>
        import("@/views/projectManage/index.vue"),
        name: "项目库检索",
        meta: {
          elIcon: "el-icon-s-grid",
          roles: [],
          // disabled: true,
        },
      },
    ],
  },
];

export default router;
