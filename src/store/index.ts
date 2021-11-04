import { createStore,Store } from "vuex";
import {InjectionKey} from "vue"
import login from "./modules/login"
import app from "./modules/app"
import lockscreen from './modules/lockscreen'
import edit from "./modules/Edit/edit"
import {State} from "./type"
export const key:InjectionKey<Store<State>>=Symbol();
export default createStore({
  //@ts-ignore
  state: {
    num:10,
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
  },
  mutations: { 
    addNum(state,value:number){
      state.num=value;
    }
  },
  actions: {
  },
  modules: {
    login,
    app,
    edit,
    lockscreen
  }
});