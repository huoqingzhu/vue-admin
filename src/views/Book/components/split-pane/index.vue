<template>
  <div :style="{ cursor, userSelect}" class="vue-splitter-container clearfix" @mouseup="onMouseUp" @mousemove="onMouseMove">

    <pane class="splitter-pane splitter-paneL" :split="split" :style="{ [type]: percent+'%'}">
      <slot name="paneL"></slot>
    </pane>

    <resizer 
    :className="className" 
    :style="{ [resizeType]: percent+'%'}" 
    :split="split" 
    @mousedown.native="onMouseDown" 
    :active="active"
    @click.native="onClick"></resizer>

    <pane class="splitter-pane splitter-paneR" :split="split" :style="{ [type]: 100-percent+'%'}">
      <slot name="paneR"></slot>
    </pane>
    <div class="vue-splitter-container-mask" v-if="active"></div>
  </div>
</template>

<script lang="ts">
  import Resizer from './resizer.vue'
  import Pane from './pane.vue'

  export default {
    name: 'splitPane',
    components: { Resizer, Pane },
    props: {
      minPercent: {
        type: Number,
        default: 10
      },
      defaultPercent: {
        type: Number,
        default: 15
      },
      split: {
        required: true
      },
      className: String
    },
    computed: {
      userSelect() {
        return this.active ? 'none' : ''
      },
      cursor() {
        return this.active ? (this.split === 'vertical' ? 'col-resize' : 'row-resize') : ''
      }
    },
    watch: {
      defaultPercent(newValue: any,oldValue: any){
        this.percent = newValue
      }
    },
    data() {
      return {
        active: false,
        hasMoved: false,
        height: null,
        percent: this.defaultPercent,
        type: this.split === 'vertical' ? 'width' : 'height',
        resizeType: this.split === 'vertical' ? 'left' : 'top',
        select:false,
      }
    },
    methods: {
      onClick() {
        if (!this.hasMoved) {
          this.percent = 50
          this.$emit('resize', this.percent)
        }
      },
      onMouseDown() {
        this.active = true
        this.hasMoved = false
      },
      onMouseUp() {
        this.active = false
      },
      onMouseMove(e: { buttons: number; which: number; currentTarget: { offsetWidth: any; offsetHeight: any }; pageX: any; pageY: any }) {
        if (e.buttons === 0 || e.which === 0) {
          this.active = false
        }

        if (this.active) {
          let offset = 0
          let target = e.currentTarget
          if (this.split === 'vertical') {
            while (target) {
              offset += target.offsetLeft
              target = target.offsetParent
            }
          } else {
            while (target) {
              offset += target.offsetTop
              target = target.offsetParent
            }
          }

          const currentPage = this.split === 'vertical' ? e.pageX : e.pageY
          const targetOffset = this.split === 'vertical' ? e.currentTarget.offsetWidth : e.currentTarget.offsetHeight
          const percent = Math.floor(((currentPage - offset) / targetOffset) * 10000) / 100
          if (percent > this.minPercent && percent < 100 - this.minPercent) {
              if (this.split === 'vertical') {
                    percent<8?this.percent = 0: this.percent = percent
            }else{
                    percent>92?this.percent = 100: this.percent = percent
              }      
          }
          this.$emit('resize', this.percent)
          this.hasMoved = true
        }
      }
    }
  }
</script>

<style scoped>
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.vue-splitter-container {
  height: 100%;
  position: relative;
}

.vue-splitter-container-mask {
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
