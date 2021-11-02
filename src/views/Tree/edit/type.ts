
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
/**
 * 单个组件设置
 */
 export interface boxData{
  id:string|number,//组件id
  name:string,//组件名称
  title:string,//表格的标题
  style:style,//样式
  type:string,//绑定图例
  data:any[][],//第一个数组代表 颜色 或者名称 第二个数组代表对应的点位值 
  options:options,
  table:string,//定义表格
  X:string,
  select:boolean,//当前是否被选中
  code:"",//代码
  children?:boxData[]
  parent?:string
  data2?:[string,string,string][],//多类表
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
  search?:search//跨组件搜索
  hideGrid?:boolean//隐藏背景线
  transverse?:boolean//是否是横向
  show?:boolean//是否显示值
  point?: number//小数点
}
export interface search{
  type:string,//搜索关联数据源 0是关联表格 1是关联组件
  assemblyId:string,//搜索关联的组件id
  mode:string,//查询的方式 0 模糊查询 2 数值区间查询 1 时间区间查询
  row:string[],//搜索关联的数据 1逗号隔开
}
/**
 * 本地保存的数据
 */
export interface list{
  id:number,
  name:string,
  data:boxData[],
  overall:overall,
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
  colorList:string[],//不同风格的不同颜色组合width:number,height:number 代表格子数量
  adsorbent:{row:number,column:number,space:number,width:number,height:number},
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

export interface state {
  role:number,
  title:string;
  isshowTab:number,
  num:number,
  design:any,
  isLoading:number,
  rightClick:{
    show:boolean,
    ID:number,
    position:{x:number,y:number}
  },
  dataCount:{ //管理员界面tab对应的数量
    kanbanCount:number,
    shujuCount:number,
    ziyuanCount:number,
    huishouCount:number,
    },
    seletBoxData:boxData,
    overall:overall,
    data:any,
    projectId:number,
    pageList:any,
    isEmpty:number,//点击是否为空 0 代表是全局  1 代表是组件配置 2 代表是设备配置
    then:number,//缩放
    searchLish:any[],//搜索框需要绑定的列表
    searchData:{key:string,assemblyId:string,mode:string,value:string,time_st:string,time_ed:string},//key 查询的列  assemblyId 绑定组件的id,way是方法 mode查询的方式 0 模糊查询 1 时间区间查询 2 数值区间查询  value 查询
    colorList:{value:string}[],//全局的颜色配置
    httpsrc:string,//嵌入网址
    operate:{show:boolean},
    boxSize:{width:number,height:number}//新创建组件的默认大小
    size:{a:number[],b:number[]},//a是新的值 b是旧值 中间变量
    copyData?:object,//复制数据
    load:number,//0隐藏 1 加载成功 2加载失败
}
export interface edit{
  id:number,//页面id
  offsetX: number;//鼠标距离盒子
  offsetY: number
  clientX:number//鼠标距离屏幕距离
  clientY:number
  drawingOffsetX:number,//画布的偏移量
  drawingOffsetY:number,
  data: boxData[],
  seletName: string,
  mousedown:boolean,
  scaleShow:boolean,
  isOffset:boolean,
  seletData:boxData|undefined,
  box:{width:number,height:number},
  layout:boolean,//控制辅助背景的加载
  direction:string|null,//拖动类型
  width:number,
  height:number,
  top:number,
  left:number,
  rightData:{left:number ,top:number,id:string},
  drawBox:{width:number,height:number},//画布实际的宽和高
  clickPiont:{x:number,y:number,width:number,height:number}//点击的位置变化
  bgPint:{x:number,y:number,width:number,height:number}//背景吸附盒子大小
  isClick:boolean //判断鼠标是否点击
  multipleChoice:boxData[]
  change:boolean,
  ctrlKey:boolean//是否是多选
}