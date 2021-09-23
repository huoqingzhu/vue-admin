<template>
  <h1>vue3.2 新特性</h1>
  <ul>
    <li>withDefaults</li>
    <li>defineEmits</li>
    <li>effectScope</li>
    <li>defineExpose</li>
  </ul>
  <h2>我的名字是-{{name}}</h2>
  <h2>我的年龄是-{{age}}</h2>
  <h2>{{name}}的魅力是{{charm}}</h2>
  <button  @click="add(10)">+</button>
  <button @click="getList">请求数据</button>
</template>
<script lang="ts" setup>
import {getTest} from '@/api/index'
import {computed,effectScope,watch,ref} from "vue"
import service from '@/utils/request'
import { mgop } from '@aligov/jssdk-mgop';
// 定义props
const props= withDefaults(defineProps<{
  name?: string
  age: number
}>(), {
  name: 'Niko',
})
// 定义emit事件
const emit = defineEmits(['change'])
//向外部暴露对象
defineExpose({
  test
})
function test(){
  console.log(props.name)
}
// 消除响应式对象的副作用
const scope=effectScope()
const data=await getTest()
const charm=ref(props.age*1000)
scope.run(()=>{
  watch(()=>props.age,(a)=>{
      if(a>50){
        scope.stop()
      }
      charm.value=a*1000
  })
})
const add=(value:number)=>{
  emit('change',value)
}
const getList=()=>{
  service({
    url: 'forward/test',
    method:"post",
    data:{name:'huo'},
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  })
  .then((res)=>{
    console.log(res)
  })


mgop({
  api: 'mgop.h5.http.getnews', // 必须
  host: 'https://mapi.zjzwfw.gov.cn/',
  dataType:'JSON',
  type: 'POST',
  data:JSON.stringify({'uuid':123}),
  appKey: '6xxfslcv+200600801+tlkciqg', // 必须
  onSuccess: data => { 
  	  console.log('data', data)
  },
  onFail: err => {
  	 console.log(err, 'err')
  }
});
}
</script>
