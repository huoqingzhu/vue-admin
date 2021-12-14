const dev=import.meta.env?.DEV||false;
/**
 * svg线上地址
 */
export const IconUrl="//at.alicdn.com/t/font_2666006_0nw2mxl76xfi.js"
/** 
 * 配置url路径
 */
export const url=dev?'http://localhost:8888':window.location.origin;

export const variables={
  menuText: "#fff",
  menuActiveText:"#fff",
  subMenuActiveText: '#f4f4f5',
  menuBg:'#3f8cff',
  menuHover: '#263445',
  subMenuBg: '#1f2d3d',
  subMenuHover: '#001528',
  sideBarWidth: '210px',
  navbarBg:'#3f8cff',
  navbarText:'#fff'
}