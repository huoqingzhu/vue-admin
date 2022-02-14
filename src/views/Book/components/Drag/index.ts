import { reactive, ref,computed,} from "vue";
export default  ()=>{
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
    dom:HTMLElement|null
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
    dom:null
  })

    /**
  * 子组件按下事件
  * @param id 
  * @param target 
  * @param direction 
  */
  const selectMousedown=(type:{dom:HTMLElement|null,target:any,direction:string|null})=>{
        // 将选中元素,位置生成快照
        state.clientX=type.target.clientX
        state.clientY = type.target.clientY
    state.dom = type.dom
    console.log(state.dom?.style)
    console.log(type)
    }
    /**
   * 父组件移动事件
   */
  const mousemove=(e:any)=>{
    const zoom = 1//缩放
    // console.log(e)
    if(state.mousedown){//如果选中了物体
      let nowX = e.clientX/zoom;
      let nowY = e.clientY/zoom;
      let disX = Math.ceil(nowX - state.clientX/zoom);
      let disY = Math.ceil(nowY - state.clientY/zoom);
      const ox=state.clientX/zoom - state.over.left
      const oy=state.clientY/zoom - state.over.top
      const style=state.dom?.style
      // debugger;
      if(state.direction){
        switch (state.direction) {
          // 左边
          case "w":
            style!.width = Math.ceil(state.over.width) - disX+'px';
            style!.left = Math.ceil(state.over.left) + disX+'px'
            break;
          // 右边
          case "e":
            style!.width = Math.ceil(state.over.width) + disX+'px';
            break;
          // 上边
          case "n":
            style!.height = Math.ceil(state.over.height) - disY+'px';
            style!.top = Math.ceil(state.over.top) + disY+'px';
            break;
          // 下边
          case "s":
            style!.height = Math.ceil(state.over.height) + disY+'px';
            break;
        }
      }
    }
  }
  /**
   * 点击空白
   * @param e 
   */
const drawclick=(e:MouseEvent) =>{
    console.log(e)
}
/**
 * 弹起触发
 */
const mouseup=()=>{
    state.mousedown=false;
  }
return {selectMousedown,mousemove,drawclick,mouseup}
}