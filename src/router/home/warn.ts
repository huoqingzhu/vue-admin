export default    {
  path: "/map",
  name: "Map",
  sort:2,
  meta: {
    title: "地图",
    keepAlive: true,
    iocn: "icon-ditu",
  },
  component: () => import("@/views/Map/index.vue"),
}