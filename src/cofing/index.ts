const dev=import.meta.env?.DEV||false;
/**
 * svg线上地址
 */
export const IconUrl="//at.alicdn.com/t/font_2666006_2uz4xmqvi33.js"
/** 
 * 配置url路径
 */
export const url=dev?'http://localhost:8888':window.location.origin;

export const variables={
  menuText: "#bfcbd9",
  menuActiveText: '#409eff',
  subMenuActiveText: '#f4f4f5',
  menuBg:'#304156',
  menuHover: '#263445',
  subMenuBg: '#1f2d3d',
  subMenuHover: '#001528',
  sideBarWidth: '210px',
}