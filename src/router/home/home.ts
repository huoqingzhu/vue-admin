export default    {
  path: "/main",
  name: "Main",
  sort:0,
  meta: {
    title: "工业数字化平台",
    keepAlive: true,
    iocn: "icon-React",
  },
  component: () => import("@/views/Main/index.vue"),
}