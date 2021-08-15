<template>
  <div class="App">
    <div
      v-if="$store.state.app.device && $store.state.app.show"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar 
      v-show="$store.state.app.show"
      :class="[$store.state.app.device?'sidebar-container':'']"  />
    <AppMain />
  </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
import Sidebar from "./component/Sidebar/index.vue"
import AppMain from "./component/AppMain.vue";
import size from "./hooks"
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
</style>
