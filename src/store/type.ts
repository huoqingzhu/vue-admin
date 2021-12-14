export interface appType{
  device:device,
  isCollapse:boolean,
  active:string,//当前路径
  show:boolean,
}
export enum control{
  whole,//全局
  local//单个组件
}
export interface style {
  left:number,
  top:number,
  width:number,
  height:number,
  zIndex:number,
  color:string,
  background?:string,
  borderWidth?:string|number,
  borderColor?:string,
  fontSize:number,
  justifyContent:string,
  alignItems:string,
  current?:number|string,
  src?:string,
  opacity:number,
  radius:number
  display:boolean,
  vertical?:boolean//信号字换行,
}

export interface options{
  fontSize:number,
  fontColor:string,
  legendColor:string,
  background:string,
  total:number,//统计最大量
  min:number,//统计最小量
  navigation:object|null,//导航连接
  pro_width:number,//进度条的粗细
  extra?:any[],// 额外的数据 仪表盘和信号灯要用 表格
  x:string,//x轴的名字
  from:string//组件绑定的表格id
  num?:number,//柱状图和折线图的数据量
  hideGrid?:boolean//隐藏背景线
  transverse?:boolean//是否是横向
  show?:boolean//是否显示值
  point?: number//小数点
}
export interface boxData{
  id:string|number,//组件id
  name:string,//组件名称
  title:string,//表格的标题
  style:style,//样式
  type:string,//绑定图例
  select:boolean,//当前是否被选中
  code:"",//代码
  children?:boxData[]
  parent?:string
}
export interface Edit{
  zoom:number,//页面的缩放比例
  control:control,//
  overall:overall,
  treeData:boxData[],
  seletData:boxData|undefined,
}
export type ILockscreenState = {
  isLock: boolean // 是否锁屏
  lockTime: number
}
export enum device {
  desktop,
  move
}
export interface overall{
  background:string,
  fontSize:number,
  color:string,
  width:number,
  height:number,
  size:number,//全局的大小方案
  design:string,//全局风格样式
  assemblyBg:string,//子组件的背景颜色
  assemblyBd:string,//子组件边框颜色
  assemblyBw:number,//子组件边框大小
  full:boolean,//预览是否全局展示
  layout:string,//背景布局
  search:string,
  mode:number,//预览方式 1 是电脑 2 是手机 3是电视
  adsorbent:{row:number,column:number,space:number,width:number,height:number},
}
export interface State {
  overall:overall,
  app:appType
  lockscreen:ILockscreenState,
  edit:Edit
}