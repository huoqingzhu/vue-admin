 //@ts-ignore
const dev=import.meta.env.DEV
export const url=dev?'http://localhost:8888':window.location.origin;
export const wsUrl="ws://127.0.0.1:8080/"
// 配置 图表库地址
export const IconfontURL=`//at.alicdn.com/t/font_2666006_cgrdym0alqw.js`
