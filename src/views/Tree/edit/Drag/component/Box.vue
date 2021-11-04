<template>
  <div
    class="box ellipsis"
    ref="box"
    :id="name"
    @click.stop="boxClick"
    @mouseover="() => mouseover(true)"
    @mouseout="() => mouseover(false)"
    :style="styles"
    @mousedown.stop="mousedown"
    @mouseup="mouseup"
  >
    <div v-show="select" style="z-index: 3;">
      <div class="operate-hor-line"></div>
      <div class="operate-ver-line"></div>
      <div class="scale scale-nw" data-direction="nw"></div>
      <div class="scale scale-ne" data-direction="ne"></div>
      <div class="scale scale-sw" data-direction="sw"></div>
      <div class="scale scale-se" data-direction="se"></div>
      <div class="scale scale-n"  data-direction="n"></div>
      <div class="scale scale-e"  data-direction="e"></div>
      <div class="scale scale-s"  data-direction="s"></div>
      <div class="scale scale-w"  data-direction="w"></div>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { useStore } from "vuex";
import {key} from "@/store"
import { style } from "../../type";
export default defineComponent({
  emits: {
    mousedown: null,
    mouseover: null,
    delete: null,
    copy: null,
    mouseup:null
  },
  props: {
    style: {
      type: Object as PropType<style>,
      required: true,
    },
    type: {
      type: String,
      default: "card",
    },
    select:{
      type:Boolean,
      default: false,
    },
    name: {
      type: String||Number,
      required: true,
    },
  },
  setup(props, ctx) {
    const store = useStore(key);
    const box = ref(null);
    const delIcons = ref(false);
    const mousedown = (e: any) => {
      const direction = e.target.getAttribute("data-direction");
      ctx.emit("mousedown", {
        id: props.name,
        target: e,
        node: box,
        direction,
      });
    };
    const styles=computed(()=>{
      return {
      marginLeft: `${props.style.left}px`,
      marginTop: `${props.style.top}px`,
      zIndex: props.style.zIndex,
      borderWidth: `${props.style.borderWidth}px`,
      width: `${props.style.width}px`,
      height: `${props.style.height}px`,
      borderColor: props.style.borderColor,
      background: props.style.background,
      color: props.style.color,
      justifyContent: props.style.justifyContent,
      alignItems: props.style.alignItems,
      fontSize: `${props.style.fontSize}px`,
      borderRadius: `${props.style.radius}px`,
    }
    })
    const mouseover = (status: boolean) => {
      delIcons.value = status;
      ctx.emit("mouseover", { id: props.name, status });
    };
    const mouseup=()=>{
      ctx.emit("mouseup");
    }
    const boxClick = () => {
      // store.commit("changeIsEmpty", 1);
    };
    return { mousedown, mouseover, box, boxClick, delIcons,mouseup,styles };
  },
});
</script>
<style lang="scss" scoped>
.box {
  position: absolute;
  // overflow: hidden;
  border: 0px solid #313239;
  display: flex;
  z-index: 2;
  // overflow: hidden;
  // box-sizing:border-box;
// -moz-box-sizing:border-box; /* Firefox */

}
.box:hover {
  // border: 1px solid #e2bc11;
  cursor: move;
}
.deleleIcon {
  position: absolute;
  top: -10px;
  right: 0px;
}
.box-boder {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.four-sides {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.operate-hor-line::before,
.operate-hor-line::after,
.operate-ver-line::before,
.operate-ver-line::after {
  content: "";
  position: absolute;
  border-color: #3a89fe;
  border-style:solid;
  border-width: 0px;
  z-index: 99;
}
.operate-hor-line::before {
  left: 0;
  top: 0;
  width: 100%;
  border-top-width: 1px;
}
.operate-hor-line::after {
  left: 0;
  bottom: 0;
  width: 100%;
  border-bottom-width: 1px;
}
.operate-ver-line::before {
  left: 0;
  top: 0;
  height: 100%;
  border-left-width: 1px;
}
.operate-ver-line::after {
  right: 0;
  top: 0;
  height: 100%;
  border-right-width: 1px;
}
.scale {
  position: absolute;
  background: #fff;
  border: 1px solid #00a6ac;
  width: 8px;
  height: 8px;
  z-index: 5;
  border-radius: 50%;
}
.scale-nw {
  top: -3px;
  left: -2px;
  cursor: nw-resize;
}
.scale-ne {
  top: -3px;
  right: -2px;
  cursor: ne-resize;
}
.scale-sw {
  bottom: -3px;
  left: -2px;
  cursor: sw-resize;
}
.scale-se {
  bottom: -3px;
  right: -2px;
  cursor: se-resize;
}
.scale-n {
  top: -3px;
  left: 50%;
  margin-left: -5px;

  cursor: n-resize;
}
.scale-e {
  right: -3px;
  top: 50%;
  margin-top: -5px;
  cursor: e-resize;
}
.scale-s {
  bottom: -3px;
  left: 50%;
  margin-left: -5px;
  cursor: s-resize;
}
.scale-w {
  left: -3px;
  top: 50%;
  margin-top: -5px;
  cursor: w-resize;
}
</style>
