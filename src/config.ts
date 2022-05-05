const dev = import.meta.env?.DEV || false;

// 后端接口（ip、端口）关联表
const ipPortArr = [
  // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 外部环境 ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
  {
    // 政务网-富阳
    ip: "10.32.250.228",
    port: "9999",
  },
  {
    // 政务网-衢州
    ip: "10.27.169.175",
    port: "80",
  },
  {
    // 政务网-西湖
    ip: "10.71.119.107",
    port: "9999",
  },
  {
    // 政务网-横店
    ip: "10.45.206.5",
    port: "9999",
  },
  {
    // 政务网-丽水
    ip: "183.246.198.179",
    port: "9999",
  },

  // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 内部环境 ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
  {
    // 公司局域网-演示环境
    ip: "10.101.2.206",
    port: "9999",
  },
  {
    // 公司局域网-开发环境
    ip: "10.101.5.244",
    port: "9999",
  },
  {
    // 公司局域网-测试环境
    // ip: "10.101.2.112",
    ip: "10.101.5.231",
    port: "9999",
  },
  {
    // 公司局域网-测试环境-遗留
    ip: "10.101.2.112",
    // ip: "10.101.5.231",
    port: "9999",
  },
];

let ipPrefix = null;
if (dev) {
  // 测试环境
  ipPrefix = "http://10.101.2.112:9999";
  // ipPrefix = "http://10.101.5.231:9999";
  // 开发环境
  // ipPrefix = "http://10.101.5.244:9999";
  // 本地
  // ipPrefix = "http://10.101.1.135:9999";
} else {
  // 生产环境
  let protocol = window.location.protocol;
  // let hostname = window.location.hostname;
  let hostname = window.YunweiSettings?.ip || window.location.hostname;

  let port =
    window.YunweiSettings?.port ||
    ipPortArr.find((x) => x.ip === hostname)?.port ||
    "80";

  ipPrefix = `${protocol}//${hostname}:${port}`; // 动态设置
}

window.CONFIG = {
  ipPrefix1: ipPrefix + "/cube-module-directory",
  ipPrefix2: ipPrefix + "/cube-module-portal",
  ipPrefix3: ipPrefix + "/minitor",
  ipPrefix11: ipPrefix + "/minitor/monitor",
  ipPrefix4: ipPrefix + "/cube-module-warehouse-simulator",
  ipPrefix5: ipPrefix + "/cube-module-console",
  ipPrefix6: ipPrefix + "/cube-module-component-center",
  ipPrefix7: ipPrefix + "/cube-module-component-factory",
  ipPrefix8: ipPrefix + "/resource-access-subsystem-ysj",
  ipPrefix9: ipPrefix + "/performance-evaluation-subsystem",
  ipPrefix10: ipPrefix + "/project-manage",
  // ipPrefix999: "/ysj",

  // // 环境配置
  // ...MyConfig,
  ipPrefix,

  // 【帮助中心】的文档地址
  helpDocUrl: "http://10.101.0.10:18880/helpcenter",

  // 文案配置
  title: "数字化应用支撑平台",
  abbreviateTitle: "",
  // 环境配置 部署不同的路由
  ENVType: "base",
};

// 专有钉钉
window.zzdOfConfig = {
  // 接口地址前缀
  ipPrefix: window.CONFIG.ipPrefix,

  // 专有钉钉
  addr: "https://login.dg-work.cn/oauth2/auth.htm", // 二维码url
  client_id: "Brand_dingoa", // 应用标识
  redirect_uri: "http://192.168.1.102:9528", // 回调地址

  // // 浙政钉
  // addr: "https://login-pro.ding.zj.gov.cn/oauth2/auth.htm", // 二维码url
  // client_id: "yingyongzhichengxitong_dingoa", // 应用标识
  // redirect_uri: "http://10.71.119.107:30025/loginback", // 回调地址
};
