import {defineComponent} from "vue"
import {useStore} from "vuex"
import {key} from "@/store";
import loginImg from "./img/login_pic.png"
import LoginForm from "./LoginForm.vue"
import "./index.scss";
export default defineComponent(()=>{
    const store =useStore(key)
    const login=(value:any)=>{
      store.dispatch('login/login',{username:value.username,password:value.password})
    }
    return ()=><div class="login center">
      <div class="login-weaper">
        {/* <a-button onclick={()=>> 
              登录
        </a-button> */}
        <div class="login-left center">
          <img src={loginImg} alt="图片" />
        </div>
        <div class="login-right center">
          <div class="login-form">
              <LoginForm onOk={login} />
          </div>
          
        </div>
      </div>
    </div>
})