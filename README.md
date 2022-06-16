# Vue 3 + Typescript + Vite

## 基于 vue3.x、Element+ Typescript + Vite 构建的极其精简的后台管理系统

## 主要特色

- 集成最新的开发配置和特性 vue3.2+vite2.5
- 更全面的类型推断包括模版类型推断和 vuex 的类型推断(module 里面的数据都可以推断)
- 兼容移动端
- 配置 tsx 和 template 两种写法
- 更完善的 setup 开发体验
- 路由动态配置
- 全局组件动态加载
- 兼容 ie11

## vite 打包配置

- 默认打包面向支持 es Module 特性的浏览器（这样打出的包小),如果想兼容低版本浏览器 将 esModule 设为 false,如果想兼容 ie,将 Polyfill 设为 true

## 注意

- 需要将 veter 换成 volar，不然没有模版类型推断
- 一级路由默认都开启了 keepAlive,keepAlive 可以在路由对象 meta 里面配置
- icon 的使用方式除了 Element 自带的图标外 还引入了 iconfont
  将 iconfont 的线上地址在根目录下 cofing/index.ts 里面配置就可以了,有两种使用方式
  - `<v-Icon type="icon-baojing" />`
  - `<icon-svg type="icon-baojing" />`

# <https://xiaohuo.online/admin>
