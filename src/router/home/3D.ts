
export default    {
  path: "/three",
  name: "Three",
  sort:6,
  meta: {
    title: "3D",
    keepAlive: true,
    iocn: "icon-bim_donghua",
  },
  component: () => import("@/views/3D/index.vue"),
  children:[{
    path: "/maps",
    name: "Maps",
    sort:1,
    meta: {
      title: "中国地图",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/3D/page/Map/index.vue"),
  },
  {
    path: "/particle",
    name: "Particle",
    sort:1,
    meta: {
      title: "粒子",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/3D/page/Particle/index.vue"),
  },
  {
    path: "/sky",
    name: "Sky",
    sort:1,
    meta: {
      title: "天空盒",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/3D/page/Sky/index.vue"),
  },
  {
    path: "/slow",
    name: "Slow",
    sort:1,
    meta: {
      title: "缓动系统",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/3D/page/Slow/index.vue"),
  },
  {
    path: "/tarck",
    name: "Tarck",
    sort:1,
    meta: {
      title: "轨迹",
      keepAlive: true,
      iocn: "icon-React",
    },
    component: () => import("@/views/3D/page/Track/index.vue"),
  }
]

}