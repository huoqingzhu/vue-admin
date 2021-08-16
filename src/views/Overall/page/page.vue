<template>
    <div>
      page1
      {{num}}
      <button @click="add">+</button>
    </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { mapState } from 'vuex';
  import axios from 'axios'
  export default defineComponent({
    computed: {
    ...mapState([ 'num']),
    },
    created(){
    },
    methods:{
      add(){
        this.num=this.num+10
      },
      getList(){
        axios.post('https://szzm.hhtz.gov.cn:10087/api/electronPort/realTimetradeVolume')
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
      }
    }
  });
</script>
