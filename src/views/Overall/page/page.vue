<template>
    <div>
    <suspense>
        <template #default>
            <Totil ref="child" :age="state.age" @change="change" name="一樽" />
        </template>
        <template #fallback>
            <h1>Loadding...</h1>
        </template>
        </suspense>
    </div>
</template>
<script lang="ts" setup>
import {reactive,ref} from "vue"
import Totil from "./totil.vue"
const state=reactive({
  age:10,
})
const child=ref()
const change=(value:number)=>{
    state.age+=value
    child.value.test()
}
</script>
