export default {
  path: "market",
  name: "数据资源",
  sort:0,
  meta: {
    title: "数据资源",
    keepAlive: true,
    iocn: "icon-React",
    role: [0, 1],
  },
  component: () => import("@/views/resources/market/index.vue"),
  children:[{
    
      path: "record",
      name: "数据资源",
      meta: {
        role: [0, 1],
        title: "数据资源",
        iocn: "icon-React",
      },
      component: () =>
        import("@/views/resources/market/record/index.vue"),
    },
    {
      path: "assembly",
      name: "组件资源",
      meta: {
        role: [0, 1],
        title: "组件资源",
        iocn: "icon-React",
      },
      component: () =>import("@/views/resources/market/assembly/index.vue"),
    },
  ]
}