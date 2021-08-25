<template>
  <div class="App">
    <div
      v-if="$store.state.app.device && $store.state.app.show"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <transition name="slide-fade" v-if="$store.state.app.device ">
      <Sidebar 
      v-show="$store.state.app.show"
      :class="[$store.state.app.device?'sidebar-container':'']"  />
    </transition>
    <Sidebar 
      v-else
      :class="[$store.state.app.device?'sidebar-container':'']"  />
    <AppMain />
  </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
import Sidebar from "./component/Sidebar/index.vue"
import AppMain from "./component/AppMain.vue";
import size from "./size"
export default defineComponent({
  components:{
    Sidebar,
    AppMain
  },
  methods:{
    handleClickOutside(){
      this.$store.commit('app/changeShow',false)
    }
  },
  setup() {
    size()
  },
});
</script>
<style lang="scss" scoped>
.App{
  width: 100%;
  height: 100%;
  // background-color: pink;
  display: flex;
  overflow: hidden;
  overflow-x: auto;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-200px);
  // opacity: 0;
}
</style>
