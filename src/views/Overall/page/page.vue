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
      // this.getList();
    },
    methods:{
      add(){
        this.num=this.num+10
      },
      getList(){
        axios.post('http://10.101.1.193:10087/api/ningBoData/postTest',{
          beginDate:"20200901",
          busiType:"01",
          txType:"104",
          type:"2"
        })
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
        axios.post('http://10.101.1.193:10087/api/ningBoData/postTest',{
          beginDate:"20200901",
          busiType:"01",
          txType:"103",
          type:"2"
        })
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
