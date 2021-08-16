export default    {
  path: "/device",
  name: "Device",
  sort:1,
  meta: {
    title: "动画",
    keepAlive: true,
    iocn: "icon-bim_donghua",
  },
  component: () => import("@/views/Device/index.vue"),
}