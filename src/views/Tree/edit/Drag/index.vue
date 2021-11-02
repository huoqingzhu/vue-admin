<template>
    <div class="Drag" :style="$store.getters['edit/style']"
    @mousedown="drawingMousedown"
    @click="drawclick"
    @mousemove="mousemove"
    id="drawing"
    >
        <Tree :data="$store.state.edit.treeData" />
    </div>
</template>
<script lang="ts">
import { defineComponent,provide} from "vue";
import Tree from "./component/tree.vue";
import hooks from "./hooks";
import Bus from "@/Bus"
export default defineComponent({
    components: {
    Tree,
    },
    setup(props,context) {
    // const {
    //     state,
    //     mousemove,
    //     selectMousedown,
    //     mouseup,
    //     addData,
    //     copy,
    //     drawclick,
    //     deleteBox,
    //     preserve,
    //     contextmenu,
    //     right,
    //     ok,
    //     drawingMousedown,
    //     gropOk,
    //     cancel,
    //     rightClick,
    //     layoutSize
    //     } = hooks(context);
    //     //依赖注入
    //     provide('selectMousedown',selectMousedown);
    //     provide('mouseup',mouseup);
    //     Bus.$on('add',()=>{
    //         console.log("我接受到了请求")
    //         addData("Title",'标题')
    //     })
    // return {
    //     state,
    //     mousemove,
    //     drawclick,
    //     addData,
    //     preserve,
    //     contextmenu,
    //     right,
    //     ok,
    //     drawingMousedown,
    //     gropOk,
    //     cancel,
    //     copy,
    //     deleteBox,
    //     rightClick,
    //     layoutSize
    //     };
    }
})
</script>
<style lang='scss' scoped>
.Drag{
    width: 1920px;
    height: 1080px;
    // transform:scale(3,3);
    transform-origin: 0px 0px 0;
    position: absolute;
    left: 40px;
    top:40px;
    background-image: linear-gradient(
45deg, #404040 25%, transparent 0, transparent 75%, #404040 0), linear-gradient(
45deg, #404040 25%, transparent 0, transparent 75%, #404040 0);
    // background-color: pink;
    background-size: 20px 20px;
    background-position: 5px 5px,15px 15px;
    display: unset;
    pointer-events: auto;
}
</style>