export interface appType{
  device:device,
  isCollapse:boolean,
  active:string,//当前路径
  show:boolean,
}
export enum device {
  desktop,
  move
}
export interface State {
  num:number;
  app:appType
}