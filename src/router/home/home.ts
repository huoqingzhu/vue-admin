export default    {
  path: "/main",
  name: "Main",
  sort:0,
  meta: {
    title: "主页",
    keepAlive: true,
    iocn: "icon-React",
  },
  component: () => import("@/views/Main/index.vue"),
}