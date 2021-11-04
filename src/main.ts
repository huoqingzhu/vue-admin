import { createApp } from 'vue'
import App from '@/App.vue'
import router  from '@/router'
import store,{key}from "@/store";
// 按需引入element组件
import ant from './utils/ant'
//element公共样式
import "element-plus/packages/theme-chalk/src/base.scss"
// 自定义全局样式
import '@/styles/index.scss'
// 路由钩子
import "@/utils/permission"
// 这个nprogress样式必须引入
import 'nprogress/nprogress.css' 
// 自动注册全局组件
import globComponent from './utils/globComponent'
const app =createApp(App)

globComponent(app)
app
.use(router)
.use(store,key)
.use(ant).mount('#app')

