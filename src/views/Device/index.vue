<template>
  <div>
    <button @click="show=!show">切换</button>
    <transition name="slide-fade">
      <div class="card" v-show="show" >
        我是卡片
      </div>
    </transition>
  </div>
</template> 
<script lang="ts" setup>
import { ref} from "vue"
const show=ref(false)

</script>
<style lang="scss" scoped>
.card{
  width: 400px;
  height: 600px;
  background-color: pink;
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
  opacity: 0;
}
</style>