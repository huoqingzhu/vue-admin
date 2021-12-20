<template>
  <div class="_1BxC6">
      <div>
        <span class="_1H_q0">视图调整</span><span class="_1H_q0">帮助</span><span class="_1H_q0">设置</span>
      </div>
      <div>
          {{$store.state.edit.overall.width}}x{{$store.state.edit.overall.height}} {{Math.round($store.state.edit.zoom*100)}}%
      </div>
      <div>
        <span class="_1H_q0">
          <v-Icon type="icon-suoxiao" style="font-size: 18px;" @click="$store.commit('edit/changeZoom',false)"></v-Icon>
          </span>
        <span class="_1H_q0">
            <v-Icon type="icon-fangda" style="font-size: 18px;" @click="$store.commit('edit/changeZoom',true)"></v-Icon>
        </span>
        <span class="_1H_q0">
                <v-Icon type="icon-Fullscreen" style="font-size: 18px;" @click="regression"></v-Icon>
          </span>
        </div>
      </div>
</template>
<script lang="ts" setup>
import {key} from '@/store/index'
import { useStore } from 'vuex';
const emit = defineEmits(['regression'])
const store = useStore(key)
const regression=()=>{
    emit("regression")
}
</script>