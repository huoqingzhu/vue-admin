<template>
  <div class="configuration">
        <div class="content">
            <Whole v-if="$store.state.edit.control==0" />
            <Local v-else  />
        </div>
  </div>
</template>
<script lang="ts" setup>
import Local from "./local.vue"
import Whole from "./whole.vue"
</script>
<style lang="scss" scoped>
.configuration{
  width: 350px;

}
</style>