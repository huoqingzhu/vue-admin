<template>
  <div class="navbar">
    <div class="center shen">
      <change-button></change-button>
      <icon-svg type="form"  />
    </div>
    <div class="center user">
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
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import changeButton from "./changeButton.vue";
import {useRouter} from "vue-router"
export default defineComponent({
  components:{
    changeButton
  },
  setup() {
    const router=useRouter()
    const signOut=()=>{
      localStorage.removeItem('accessToken')
      router.push('/login')
    }
    return {
      signOut
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
    width: 100px;
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
