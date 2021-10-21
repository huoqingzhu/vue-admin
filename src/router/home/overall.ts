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
  
  },
  {
    path: "/m3u8",
    name: "m3u8",
    sort:1,
    meta: {
      title: "m3u8",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/Overall/page/M3u8.vue"),
  
  },
  {
    path: "/evalute",
    name: "evalute",
    sort:1,
    meta: {
      title: "evalute",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/Overall/page/evaluate.vue"),
  },
  {
    path: "/test",
    name: "test",
    sort:1,
    meta: {
      title: "test",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/Overall/page/test.vue"),
  }
]

}