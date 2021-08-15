export default    {
  path: "/overall",
  name: "Overall",
  sort:3,
  meta: {
    title: "总览图",
    keepAlive: true,
    iocn: "icon-React",
  },
  component: () => import("@/views/Overall/index.vue"),
  children:[{
    path: "/page1",
    name: "page1",
    sort:1,
    meta: {
      title: "页面1",
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
      title: "页面2",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/Overall/page/page2.vue"),
  
  }
]

}