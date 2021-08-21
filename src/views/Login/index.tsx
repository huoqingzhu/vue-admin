import {defineComponent} from "vue"
import {useStore} from "vuex"
import {key} from "@/store";
import "./index.css";
export default defineComponent(()=>{
  const store =useStore(key)
    return ()=><div class="login">
      <a-button onclick={()=>store.dispatch('login/login',{username:"admin",password:123456})}> 
          登录
      </a-button>
    </div>
})