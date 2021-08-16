export default    {
  path: "/holographic",
  name: "Holographic",
  sort:3,
  meta: {
    title: "图表",
    keepAlive: true,
    iocn: "icon-tubiao",
  },
  component: () => import("@/views/Holographic/index.vue"),
}