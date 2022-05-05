
import { createRouter, createWebHashHistory,  } from "vue-router";
import type { RouteRecordRaw} from "vue-router"
import { getToken, getUserInfo} from "@/utils/auth"; // get token from cookie
import projectManage from "./projectManage"



/**
 * 路由权限 sole字段采取数组格式 如果用户命中sole，则代表有权限,
 * 没有sole字段的路由则代表任何用户都能访问,子路由就不会做权限判断了
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    redirect: "/login",
  },
  // {
  //   path: "/resources",
  //   component: adminbLayout,
  //   name: "资源接入子系统",
  //   meta: {
  //     title: "资源接入子系统",
  //     keepAlive: true,
  //     sole:[0,1]
  //   },
  //   props: { rootRoutePath: "/resources", systemTitle: "资源接入子系统" },
  //   redirect: "/resources/market",
  //   children:getList(import.meta.globEager('./resources/*.ts'))
  // },
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
/**
 * 动态加载文件下的子路由
 * @param modules 
 * @returns 
 */
function getList(modules: any){
  return Object.values(modules).map((item:any)=>item.default).filter(item=>item).sort((a,b)=>a.sort-b.sort);
}
// lijunqi，过滤出 当前用户可访问的路由页面（根据用户具有的角色列表）
let filterRouterByRoles = (router:RouteRecordRaw[] = []) => {
  let userInfo = getUserInfo();

  let filteredRouter:RouteRecordRaw[] = [];
  for (let x of router) {
    let isPermitted = userInfo?.roleCodeArr?.some((code:string) => {
      return !x.meta?.roles || !x.meta?.length || (x.meta as {roles:string[]})?.roles.includes(code);
    });
    // console.log(x.path, isPermitted);
    if (isPermitted) {
      if (x?.children?.length) {
        x.children = filterRouterByRoles(x.children);
      }
      filteredRouter.push(x);
    }
  }

  // console.log(333, filteredRouter);
  return filteredRouter;
};
export function addAsyncRouteByRole() {
  // console.log(44);
  return new Promise(async (resolve) => {
    // 还未动态新增路由
    if (!window.asyncRouteAlreadyAddedFlag && getToken()) {
      // console.log(33, !window.asyncRouteAlreadyAddedFlag, getToken());
      // 已动态新增路由
      window.asyncRouteAlreadyAddedFlag = true;

      // if (userInfo?.roleCodeArr) {
      //   await store.dispatch("user/getUserInfo");
      // }
      let asyncRouteMap = filterRouterByRoles([// 项目管理子系统
          ...projectManage,
      ]);
      // console.log(999, asyncRouteMap);
      router.addRoute(asyncRouteMap as unknown as RouteRecordRaw);
      router.options.routes.push(...asyncRouteMap);
    }
    resolve([]);
  });
}
export default router;