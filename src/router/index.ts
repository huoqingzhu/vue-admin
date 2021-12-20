
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import adminbLayout from "../Layout/index.vue";
/**
 * 路由权限 sole字段采取数组格式 如果用户命中sole，则代表有权限,
 * 没有sole字段的路由则代表任何用户都能访问,子路由就不会做权限判断了
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "main",
    meta: {
      title: "首页",
      keepAlive: true
    },
    component: () => import("../views/Book/index.vue"),
  },
  {
    path: "/resources",
    component: adminbLayout,
    name: "资源接入子系统",
    meta: {
      title: "资源接入子系统",
      keepAlive: true,
      sole:[0,1]
    },
    redirect: "/resources/market",
    children:getList(import.meta.globEager('./resources/*.ts'))
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
  {
    path: "/404",
    component: () => import("../views/404.vue"),
  },
  // 404 page must be placed at the end !!!
  { 
    path: "/:pathMatch(.*)",
    redirect: "/404" 
  },

];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
function getList(modules: any){
  return Object.values(modules).map((item:any)=>item.default).filter(item=>item).sort((a,b)=>a.sort-b.sort);
}
export default router;