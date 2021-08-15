import {Module,ActionContext} from "vuex"
import {appType,State,device} from "../type"
const state:appType = {
  device:device.desktop,//是否为手机端
  isCollapse: false,//是否关闭  ，false 为展开的意思
  active:localStorage.getItem('active')||"/main",//默认路由位置
  show:true,//侧边蓝是否隐藏
}
const getters={
  className(state:appType){
    if(state.device===device.move){
      return ['main','moveMain']
    }else{
      return state.isCollapse?['main','sideMain']:['main']
    }
  }
}
const mutations = {
  changeDevice(state:appType, device:device){
    console.log(device)
    state.device=device;
    if(device){
      state.show=false;
      console.log("移动端关闭",state.show)
    }
  },
  changeShow(state:appType,show:boolean):void {
    state.show=show;
  },
  changeCollapse(state:appType){
    if(state.device){
      state.show=!state.show;
    }else{
      state.isCollapse=!state.isCollapse;
      localStorage.setItem('isCollapse',state.isCollapse+'')
    }

  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} as Module<appType,State>
