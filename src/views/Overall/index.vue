<template>
  <router-view
        v-slot="{ Component }"
      >
        <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
          </transition>
      </router-view>
</template>
<script lang="ts" >
import { defineComponent } from "vue";
export default defineComponent({
  created(){
    console.log("我是父组件我执行了,created")
    // window.onbeforeunload = event => {
    //         console.log('onbeforeload！！！！！')
    //         if (event) {
    //             event.returnValue = '关闭提示';
    //         }
    //     }
  },
  mounted(){
    console.log("我是父组件我执行了,mounted")
  }
})
</script>