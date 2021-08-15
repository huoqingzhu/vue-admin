
import {Module,ActionContext} from "vuex"
import {login} from "@/api/user"
import router from "@/router"
const state:user = {
  username:'admin',
  password:'123456',
  token:''
}
const mutations={ 
  login(states:user,value:user){
      Object.assign(states,value)
  }
}
const actions={
  login({commit}:ActionContext<any,any>,value:user){
    login(value).then((res:any)=>{
      if(res.token){
        localStorage.setItem('accessToken',res.token)
        router.push('/')
      }
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}