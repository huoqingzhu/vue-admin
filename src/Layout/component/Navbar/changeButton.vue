<template>
  <icon-svg :type="type" :style="{fontSize: '22px',color:variables.menuText}"  @click="change" />
</template>
<script lang="ts" >
  import { defineComponent } from "vue";
  import {variables} from "@/cofing/index"
  export default defineComponent({
    data(){
      return { 
        
      }
    },
    methods:{
      change(){
        this.$store.commit("app/changeCollapse")
      }
    },
    computed:{
      type(){
        return this.$store.state.app.isCollapse?'icon-toggle-right':'icon-toggle-left';
      }
    },
    setup(){
      return {variables}
    }
  });
  </script>