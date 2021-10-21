import { createApp } from 'vue'
import App from '@/App.vue'
import router  from '@/router'
import store,{key}from "@/store";
import './icons/index'
// 全局组册ant的组件
import ant from './utils/ant'
// 全局样式
import "element-plus/packages/theme-chalk/src/base.scss"
import '@/styles/index.scss'
import "@/utils/permission"
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
import globComponent from './utils/globComponent'
const app =createApp(App)
console.log(app)
globComponent(app)
app
.use(router)
.use(store,key)
.use(ant).mount('#app')

