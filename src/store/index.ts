import { createStore,Store } from "vuex";
import {InjectionKey} from "vue"
import login from "./modules/login"
import app from "./modules/app"
import lockscreen from './modules/lockscreen'
import edit from "./modules/Edit/edit"
import {State} from "./type"
export const key:InjectionKey<Store<State>>=Symbol();
export default createStore({
  modules: {
    login,
    app,
    edit,
    lockscreen
  }
});