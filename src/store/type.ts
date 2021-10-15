export interface appType{
  device:device,
  isCollapse:boolean,
  active:string,//当前路径
  show:boolean,
}
export type ILockscreenState = {
  isLock: boolean // 是否锁屏
  lockTime: number
}
export enum device {
  desktop,
  move
}
export interface State {
  num:number
  app:appType
  lockscreen:ILockscreenState
}