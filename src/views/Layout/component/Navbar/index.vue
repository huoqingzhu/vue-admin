<template>
  <div class="navbar">
    <div class="center shen">
      <change-button></change-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import changeButton from "./changeButton.vue";
export default defineComponent({
  components:{
    changeButton
  },
  setup() {},
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
  padding:8px;
  .shen{
    width: 30px;
    height: 100%;
  }
}
</style>
