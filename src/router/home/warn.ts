export default    {
  path: "/warn",
  name: "Warn",
  sort:2,
  meta: {
    title: "地图",
    keepAlive: true,
    iocn: "icon-React",
  },
  component: () => import("@/views/Warn/index.vue"),
}