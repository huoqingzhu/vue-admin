// import Cookies from "js-cookie";
import { addAsyncRouteByRole } from "@/router";

const Key1 = "application_factory_token";
const Key2 = "application_factory_userInfo";

// export function getToken() {
//   return Cookies.get(Key1);
// }
//
// export function setToken(token) {
//   return Cookies.set(Key1, token);
// }
//
// export function removeToken() {
//   return Cookies.remove(Key1);
// }
export function getToken() {
  return localStorage.getItem(Key1);
}

export function setToken(token: string) {
  return localStorage.setItem(Key1, token);
}

export function removeToken() {
  return localStorage.removeItem(Key1);
}

export function getUserInfo() {
  let val = localStorage.getItem(Key2);
  return JSON.parse(val);
}

export function removeUserInfo() {
  // 复原 动态新增路由表标志位
  window.asyncRouteAlreadyAddedFlag = false;

  return localStorage.removeItem(Key2);
}

// export function setUserInfo(userInfo) {
//   let userRole = {
//     isAdmin: false,
//     isTenant: false,
//     isNormalUser: false,
//   };
//
//   if (userInfo.username === "admin") {
//     userRole.isAdmin = true;
//   } else if (userInfo.relTenantIds) {
//     userRole.isTenant = true;
//   } else {
//     userRole.isNormalUser = true;
//   }
//
//   userInfo = {
//     ...userInfo,
//     ...userRole,
//   };
//   userInfo = JSON.stringify(userInfo);
//   localStorage.setItem(Key2, userInfo);
//
//   // 动态新增路由表（根据角色）
//   addAsyncRouteByRole();
// }

export function setUserInfo(userInfo: any, roles = []) {
  let userRole = {
    isAdmin: false,
    isTenant: false,
    // isNormalUser: false,
  };

  if (userInfo.username === "admin") {
    userRole.isAdmin = true;
  } else if (userInfo.relTenantIds) {
    userRole.isTenant = true;
  }
  //  else {
  //   userRole.isNormalUser = true;
  // }

  userInfo = {
    ...userInfo,
    ...userRole,
    roleCodeArr: roles.map((x) => x.roleCode),

    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 关于roleCodeArr中的角色code的描述 ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    // 【共有】角色
    // "admin":              "超级管理员",
    // "zuhu":               "isv租户",
    //
    // 【项目管理子系统】的角色
    // "xhqxmglce-sjjgly":   "西湖区项目管理测试-数据局管理员",
    // "gov_jwb_admin":      "其他局委办管理员",
    // "xhqxmglce-bmgly":    "西湖区项目管理测试-部门管理员",
    // "basic_zzd_user":     "浙政钉普通用户",
    // "xhqxmglce-zj":       "西湖区项目管理测试-专家",
    // "xhqxmglce-bmpfy":    "西湖区项目管理测试-部门评分员",
    //
    // 【应用管理子系统】的角色
    // "gov_db_admin":       "大数据局管理员",
    //
  };

  userInfo = JSON.stringify(userInfo);
  localStorage.setItem(Key2, userInfo);

  // 动态新增路由表（根据角色）
  addAsyncRouteByRole();
}
