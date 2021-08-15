import {defineComponent} from "vue"
import {useStore} from "vuex"
export default defineComponent(()=>{
  const store =useStore()
    return ()=><div>
      <a-button onclick={()=>store.dispatch('login/login',{username:"admin",password:123456})}> 
          登录
      </a-button>
    </div>
})