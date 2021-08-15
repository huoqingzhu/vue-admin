export default    {
  path: "/device",
  name: "Device",
  sort:1,
  meta: {
    title: "设备全息",
    keepAlive: true,
    iocn: "icon-React",
  },
  component: () => import("@/views/Main/index.vue"),
}