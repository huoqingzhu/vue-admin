export default    {
  path: "/holographic",
  name: "Holographic",
  sort:3,
  meta: {
    title: "全息台",
    keepAlive: true,
    iocn: "icon-React",
  },
  component: () => import("@/views/Holographic/index.vue"),
}