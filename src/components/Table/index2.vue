<template>
  <div  class="v-table" >
    <div style="width: 100%;font-size:18px;" >
      <slot name="title"></slot>
    </div>
    <div  style="width: 100%;">
        <div class="thead">
            <div  class="table-header" >
              <div 
              v-for="item in columns" 
              :key="item.dataIndex"
              :style="{width:item.width,flex:item.width?undefined:'1'}"
              class="table-row-cell ellipsis">
                {{item.title}}
              </div>
            </div>
        </div>
        <div class="table-boday" :style="{height:bodayHeight}" ref="node" >
              <div 
                v-for="(item,index) in list" :key="index" 
                class="row"
                :style="{height:`${rowHeight}px`,background:index%2===0?zebraColor[0]:zebraColor[1]}"
              >
                <div 
                v-for="(value,key) in columns " 
                :key="key" class="table-row-cell ellipsis"
                :style="{width:value.width,flex:value.width?undefined:'1',}"
                >
                  <slot :name="value.key" :row="item"> {{item[value.key]}}</slot>
                </div>
            </div>
          </div>
    </div>
    <div class="table-footer" v-if="pagination">
      <pagination :pagination="pagination" @changeCurrent="change" />
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent,PropType} from "vue";
import {columns,Pagination} from "./type"
import pagination from "./pagination.vue"
export default defineComponent({
  props: {
    columns:{
      type:Object as PropType<columns[]>,
      required: true,
    },
    dataSource:{
      type:Array as PropType<{}[]>,
      required: true,
    },
    pagination:{
      type:Object as PropType<Pagination>,
    },
    rowHeight:{//默认行高
      type:Number,
      default:40
    },
    rowNumber:{//默认行数
      type:Number,
      default:10
    },
    zebraColor:{//斑马线颜色
      type:Array,
      default:['rgb(192, 253, 255)','rgb(192, 212, 255)']
    },
    roll:{
      type:Boolean,
      default:false,
    }
  },
  data(){
    return{
      visible:false,
      name:'',
      value:'',
      id:0,
      node:null
    }
  },
  computed:{
      list(){
        return this.dataSource
      },
      bodayHeight(){
        return `${this.rowHeight*this.rowNumber}px`
      }
  },
  mounted(){
    console.log(this.$refs.node)
      if(this.$refs.node&&this.roll){
        this.autoScroll(this.rowHeight,100,1000,this.$refs.node)
      }
  },
  methods:{
    change(value:number){
      console.log(value)
      this.$emit("change",value)
    },
    handleOk(){},
    clear(){
      this.id=0;
      this.value='';
      this.name='';
      this.visible=false;
    },
    /**
     * @param stepLength 每次滑动高度,
     * @param speed 滑动1px需要时间
     * @param delay 停留时间
     * @param element dom元素
     */
    autoScroll(stepLength: number, speed: number , delay: number, element: { scrollTop: number; scrollHeight: number; offsetHeight: number; }) {
          let interval:any
          let step = 1
          element.scrollTop = 0
          const start=()=> {
              interval = setInterval(scrolling, speed)
              element.scrollTop += step
          }
          const scrolling=()=>{
              if (element.scrollTop % stepLength !== 0) {
                element.scrollTop += step
              } else {
                if (element.scrollTop === 0 || element.scrollTop === (element.scrollHeight - element.offsetHeight)) { // 触顶或触底
                  step *= -1 // 转换方向
                }
                clearInterval(interval)
                setTimeout(start, delay)
              }
          }
          if (element.offsetHeight !== element.scrollHeight) { // 元素内容没有溢出时，不触发
              setTimeout(start, delay)
          }
    }
  },
  components: {
    pagination
  }
})
</script>
<style lang="scss" scoped>
.v-table{
  width: 100%;
}
.v-table::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.thead{
  background: linear-gradient(180deg, #4186f2 0%, #20367f 100%);
  font-size: 28px;
  color: #ffffff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 10;
}
.table-header{
    width: 100%;
    display: flex;
    height:50px;
    justify-content:space-between;
    align-items: center;
}
.table-boday{
  width: 100%;
  font-size: 24px;
  overflow-y: auto;
  z-index: 1;
}
.table-boday::-webkit-scrollbar {
        display: none;/*隐藏滚动条*/
    }
.row{
  width: 100%;
  display: flex;
  justify-content:space-between;
}
.bmx2{
  width: 100%;
  background-color: rgb(192, 212, 255);
  display: flex;
  justify-content:space-between;
}
.table-row-cell{
  text-align: center;
  height:100%;

  line-height:50px ;
  // flex: 1;
}
.table-footer{
  width: 100%;
  // height:10%;
  display: flex;
  margin-top: 5px;
  justify-content: flex-end;
  overflow:auto;
}
.subTab{
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>