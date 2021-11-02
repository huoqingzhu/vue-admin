
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const modules = import.meta.globEager('./home/*.ts')
const tree= {
  path: "/tree",
  name: "Tree",
  meta: {
    title: "拖拽",
    keepAlive: true,
    iocn: "icon-tree",
    blank:true
  },
  component: () => import("@/views/Tree/index.vue"),
}
const routerList = Object.values(modules).map((item:any)=>item.default).sort((a,b)=>a.sort-b.sort);
export type List =typeof routerList;
const redirect=localStorage.getItem('active')||"/main"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect,
    meta: {
      title: "首页",
      keepAlive: true
    },
    component: () => import("../Layout/index.vue"),
    children:routerList
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录页",
      keepAlive: true
    },
    component: () => import("../views/Login/index"),
  },

];
routes.push(tree)
routerList.push(tree)
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export {routerList};
export default router;