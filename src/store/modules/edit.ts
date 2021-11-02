
import {Module,ActionContext} from "vuex"
import {login} from "@/api/user"
import router from "@/router"
import { Edit,State,control} from "../type"
const state:Edit = {
  zoom:1,
  treeData:[],
  seletData:undefined,
  control:control.whole,
  overall:{
    background:'#04142B',
    fontSize:16,
    color:"#ffffff",
    width:1920,
    height:1080,
    size:2,
    design:"",
    layout:'Layout4',
    adsorbent:{row:12,column:12,space:5,width:12,height:12},
    assemblyBg:"#12273C",
    assemblyBd:"#60A9C1",
    assemblyBw:2,
    search:'1',
    mode:1,
    full:true,
  },
}
const getters={
  /**
   * 根据缩放比例，返回画布scale属性
   * @param state 
   * @returns 
   */
  style(state:Edit){
    return {
      width: state.overall.width+'px',
      height: state.overall.height+'px',
      background: state.overall.background,
      transform:`scale(${state.zoom},${state.zoom})`
    }
  }
}
const mutations={ 
  /**
   * 改变缩放大小
   * @param state 
   * @param type 
   */
  changeZoom(state:Edit,type:boolean){
    if(type){
      state.zoom=state.zoom+0.05
    }else{
      state.zoom=state.zoom-0.05
    }
  },
  /**
   * 根据屏幕实际大小，计算出画布的缩放比例
   * @param state 
   * @param type 
   */
  regression(state:Edit,type:{width:number,height:number}){
    console.log(type)
    const x=Math.min(type.width/state.overall.width,type.height/state.overall.height)
    state.zoom=x
  }
}
const actions={

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as Module<Edit,State>