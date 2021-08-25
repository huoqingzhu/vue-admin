export default    {
  path: "/overall",
  name: "Overall",
  sort:3,
  meta: {
    title: "组件",
    keepAlive: true,
    iocn: "icon-React",
  },
  component: () => import("@/views/Overall/index.vue"),
  children:[{
    path: "/page1",
    name: "page1",
    sort:1,
    meta: {
      title: "vue3.2新特性",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/Overall/page/page.vue"),
  },
  {
    path: "/page2",
    name: "page2",
    sort:1,
    meta: {
      title: "小组件",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/Overall/page/page2.vue"),
  
  }
]

}