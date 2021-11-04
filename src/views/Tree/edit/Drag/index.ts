import { reactive, ref,computed,} from "vue";
import {boxData,overall,edit} from '../type'
import {useStore,mapActions} from "vuex"
import {useRoute,useRouter } from "vue-router";
import { PercentageData} from "./config";
import html2canvas from "html2canvas"
import {deepUntie,deepDelete} from "@/utils/methods"
import {ElMessage} from "element-plus"
import { key } from "@/store";
export default  (context:any)=>{
  const route=useRoute()
  const router = useRouter();
  const store = useStore(key);
  interface state {
    mousedown:boolean,
    clientX:number,//鼠标距离屏幕距离
    clientY:number,
    direction:null|string,//拖拽的方向
    over:{//一个中间变量
      width:number,
      height:number
      left:number,
      top:number,
    },
  }
  const state:state=reactive({
    mousedown:false,
    clientX:0,//鼠标距离屏幕距离
    clientY:0,
    direction:null,//拖拽的方向
    over:{//一个中间变量
      width:0,
      height:0,
      left:0,
      top:0
    },
  })
  const treeData=store.state.edit.treeData

  // const selectData=store.state.edit.seletData
      /**
   * 寻找父组件
   * @param ID 
   * @returns 
   */
  const getParent=(ID:number): boxData|undefined=>{
        const data =deepUntie(treeData).find((item:any)=>item.id===ID);
        if(data&&!data.parent){
          return data;
        }else{
          return getParent(data.parent);
        }
      }
    /**
  * 子组件按下事件
  * @param id 
  * @param target 
  * @param direction 
  */
  const selectMousedown=(type:{id:number,target:any,direction:string|null})=>{
      if(type.target.button===0){//点击有效
        const data=getParent(type.id);
        state.direction=type.direction
        deepUntie(treeData).forEach((item: any) => {
          item!.select=false;
        })
        if(data){
          data.select=true
          store.commit('edit/changeSeleteData',data)
          store.commit("edit/setControl", 1);
          state.over.height=data.style.height
          state.over.width=data.style.width
          state.over.left=data.style.left
          state.over.top=data.style.top
          state.mousedown=true
        }
        // 将选中元素,位置生成快照
        state.clientX=type.target.clientX
        state.clientY=type.target.clientY
      }
    }
    /**
   * 父组件移动事件
   */
  const mousemove=(e:any)=>{
    const zoom=store.state.edit.zoom
    if(state.mousedown){//如果选中了物体
      let nowX = e.clientX/zoom;
      let nowY = e.clientY/zoom;
      let disX = nowX - state.clientX/zoom;
      let disY = nowY - state.clientY/zoom;
      const style=store.state.edit.seletData!.style;
      const ox=state.clientX/zoom - state.over.left
      const oy=state.clientY/zoom - state.over.top
      // debugger;
      if(state.direction){
        switch (state.direction) {
          // 左边
          case "w":
            style.width = Math.ceil(state.over.width) - disX;
            style.left = Math.ceil(state.over.left) + disX;
            break;
          // 右边
          case "e":
            style.width = Math.ceil(state.over.width) + disX;
            break;
          // 上边
          case "n":
            style.height = Math.ceil(state.over.height) - disY;
            style.top = Math.ceil(state.over.top) + disY;
            break;
          // 下边
          case "s":
            style.height = Math.ceil(state.over.height) + disY;
            break;
          // 左上
          case "nw":
            style.width = Math.ceil(state.over.width) - disX;
            style.left = Math.ceil(state.over.left) + disX;
            style.height = Math.ceil(state.over.height) - disY;
            style.top = Math.ceil(state.over.top) + disY;
            break;
          // 左下
          case "sw":
            style.width = Math.ceil(state.over.width) - disX;
            style.left = Math.ceil(state.over.left) + disX;
            style.height = Math.ceil(state.over.height) + disY;
            break;
          // 右上
          case "ne":
            style.height = Math.ceil(state.over.height) - disY;
            style.top = Math.ceil(state.over.top) + disY;
            style.width = Math.ceil(state.over.width) + disX;
            break;
          // 右下
          case "se":
            style.height = Math.ceil(state.over.height) + disY;
            style.width = Math.ceil(state.over.width) + disX;
            break;
          default:
            break;
        }
      }else{
        //计算移动后的左偏移量和顶部的偏移量
        const nl = nowX - ox;
        const nt = nowY - oy;
        style.left = nl;
        style.top = nt;
      }
    }
  }
  /**
   * 点击空白
   * @param e 
   */
const drawclick=(e:MouseEvent) =>{
  store.commit("edit/setControl", 0);
  deepUntie(treeData).forEach((item:any)=>{
    item.select=false;
  })
  store.commit('edit/changeSeleteData',undefined);
}
/**
 * 弹起触发
 */
const mouseup=()=>{
    state.mousedown=false;
  }
return {selectMousedown,mousemove,drawclick,mouseup}
}