<template>
  <icon-svg :type="type" style="font-size: 22px;" @click="change" />
</template>
<script lang="ts">
  import { defineComponent } from "vue";
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
    }
  });
  </script>