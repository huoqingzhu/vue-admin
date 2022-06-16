import { Store } from "vuex";
import { State } from "@/store/type";
import type { RouteRecordRaw } from "vue-router";
declare module "@vue/runtime-core" {
  // declare your own store states
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

interface CONFIG {
  ipPrefix1: string;
  ipPrefix2: string;
  ipPrefix3: string;
  ipPrefix11: string;
  ipPrefix4: string;
  ipPrefix5: string;
  ipPrefix6: string;
  ipPrefix7: string;
  ipPrefix8: string;
  ipPrefix9: string;
  ipPrefix10: string;
  ipPrefix: string;
  helpDocUrl: string;
  // 文案配置
  title: string;
  abbreviateTitle: string;
  // 环境配置 部署不同的路由
  ENVType: string;
}
interface zzdOfConfig {
  ipPrefix: string;
  addr: string;
  client_id: string;
  redirect_uri: string;
}
interface YunweiSettings {
  ip: string;
  port: string;
}
declare global {
  //设置全局属性
  interface Window {
    //window对象属性
    CONFIG: CONFIG; //加入对象
    zzdOfConfig: zzdOfConfig;
    YunweiSettings: YunweiSettings;
    asyncRouteAlreadyAddedFlag: boolean;
  }
}
