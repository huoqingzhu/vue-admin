<template>
  <div class="navbar">
    <div class="center shen">
      <change-button></change-button>
    </div>
    <div class="center user">
      <Switch :list="['icon-quanping','icon-quxiaoquanping']" @change="screen" />
      <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="@/assets/user.gif" alt="">
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <a target="_blank" href="https://github.com/huoqingzhu/vue3-element-admin"> <v-Icon type="icon-github" style="margin-right: 10px;" /> 仓库</a>
              </el-dropdown-item>
              <el-dropdown-item divided @click="signOut">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
import changeButton from "./changeButton.vue";
import Switch from "@/components/Switch/index.vue";
import {useRouter} from "vue-router"
export default defineComponent({
  components:{
    changeButton,
    Switch
  },
  setup() {
    const router=useRouter()
    const signOut=()=>{
      localStorage.removeItem('accessToken')
      router.push('/login')
    }
    const screen=(type:Boolean)=>{
        let element = document.documentElement; //设置后就是   id==con_lf_top_div 的容器全屏
        if(!type){
            element?.requestFullscreen()
        }else{
          document
          .exitFullscreen()
        }
    }
    return {
      signOut,
      screen
    }
  },
});
</script>
<style lang="scss" scoped>
.navbar{
  width: 100%;
  background: #fff;
  height: 50px;
  overflow: hidden;
  -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .shen{
    width: 30px;
    height: 100%;
  }
  .user{
    width: 110px;
    justify-content:space-around;
    img{
      cursor: pointer;
      right: 0px;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
}
</style>
