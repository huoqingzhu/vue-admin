export default {
  path: "examine",
  component: () =>import("@/views/resources/examine/index.vue"),
  name: "资源审核",
  sort:2,
  meta: {
    title:  "资源审核",
    iocn: "icon-React",
    role: [1],
  },
}