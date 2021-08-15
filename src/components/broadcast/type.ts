export enum messageType {
  chat,
  user
}
export type user ={id:number, name: string}
export type msg={ id:string,type:messageType,data: string,user?:user[]}
export interface state{
  reqList:msg[],
  user:user[],
  myShow:boolean,
}