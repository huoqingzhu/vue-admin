export default {
  path: "my",
  component: () =>import("@/views/resources/my/index.vue"),
  name: "我的资源",
  sort:1,
  meta: {
    title:  "我的资源",
    iocn: "icon-React",
    role: [1],
  },
}