import axios from "axios";
// import NProgress from 'nprogress' // 引入nprogress插件
let baseURL = "/api";
const service = axios.create({
  baseURL,
  timeout: 5000, // request timeout
});
// 发起请求之前的拦截器
service.interceptors.request.use(
  (config) => {
    // 如果有token 就携带tokon
    // NProgress.start() // 设置加载进度条(开始..)

    return config;
  },
  (error) => Promise.reject(error)
);
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      // NProgress.done() // 设置加载进度条(结束..)
      return res;
    }
  },
  (error) => {
    // NProgress.done() // 设置加载进度条(结束..)
    return Promise.reject(error);
  }
);
export default service;
