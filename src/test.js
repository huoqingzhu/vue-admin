import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store, { key } from "@/store"
import ElementPlus from 'element-plus'
// 按需引入element组件
import ant from './utils/ant'
//element公共样式
import 'element-plus/dist/index.css'
// 自定义全局样式
import '@/styles/index.scss'
// 路由钩子
import "@/utils/permission"
// 自动注册全局组件
import globComponent from './utils/globComponent'
const app = createApp(App)
app.use(ElementPlus)
globComponent(app)
