import { createStore,Store } from "vuex";
import {InjectionKey} from "vue"
import login from "./modules/login"
import app from "./modules/app"
import {State} from "./type"
export const key:InjectionKey<Store<State>>=Symbol();
export default createStore({
  //@ts-ignore
  state: {
    num:10,
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
    app
  }
});