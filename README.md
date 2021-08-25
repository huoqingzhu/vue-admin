# Vue 3 + Typescript + Vite

## 基于vue3.x、Element+ Typescript + Vite构建的极其精简的后台管理系统

## 主要特色

* 集成最新的开发配置和特性vue3.2+vite2.5
* 更全面的类型推断包括模版类型推断和vuex的类型推断(module里面的数据都可以推断)
* 兼容移动端
* 配置tsx和template两种写法
* 更完善的setup 开发体验
* 路由动态配置
* 全局组件动态加载
* 兼容ie11

## vite 打包配置

* 默认打包面向支持es Module特性的浏览器（这样打出的包小),如果想兼容低版本浏览器 将esModule 设为false,如果想兼容ie,将Polyfill设为true

## 注意

* 需要将 veter 换成 volar，不然没有模版类型推断
* 一级路由默认都开启了keepAlive,keepAlive可以在路由对象meta里面配置
* icon 的使用方式除了Element自带的图标外 还引入了 iconfont
  将iconfont的线上地址在根目录下cofing/index.ts里面配置就可以了,有两种使用方式
  * ` <v-Icon type="icon-baojing"  /> `
  * `<icon-svg type="icon-baojing"  />`

# <https://xiaohuo.online/admin>
