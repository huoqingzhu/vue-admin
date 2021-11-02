import { reactive,onMounted,onUnmounted,watch, ref,computed, nextTick} from "vue";
import {boxData,overall,edit} from '../type'
import {useStore,} from "vuex"
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
  const state:edit = reactive({
    id:0,
    offsetX: 0,//鼠标距离盒子
    offsetY: 0,
    clientX:0,//鼠标距离屏幕距离
    clientY:0,
    drawingOffsetX:0,//画布的偏移量
    drawingOffsetY:0,
    data: [],
    seletName: "box1",
    mousedown:false,
    position:{x:0,y:0},
    scaleShow:false,
    isOffset:true,
    seletData:undefined,
    box:{width:0,height:0},//外面大盒子的实际宽和高
    drawBox:{width:0,height:0},//画布的大小 经过配置后的
    layout:true,
    direction:null,//类型
    width:0,
    height:0,
    top:0,
    left:0,
    rightData:{left:0 ,top:0,id:''},//粘贴的位置
    clickPiont:{x:0,y:0,width:0,height:0},
    bgPint:{x:0,y:0,width:0,height:0},//吸附盒子
    isClick:false,
    multipleChoice:[],
    change:false,//是否改变数据
    title:'',
    ctrlKey:false,
  });
  const drawing={x:0,y:0}//计算drawing的偏移量
  // store.commit("changeIsEmpty", 0);
  let idList:number[]=[];//维护本地id库
  //获取数据
  const getList=()=>{
    state.data = []
  }
  // 拖动触发
  const mousemove = (e:any) => {
    if(state.mousedown){//如果选中了物体
      const space=Number(store.state.overall.adsorbent.space);
      const Maxheight=Number(store.state.overall.adsorbent.height)
      let nowX = e.clientX;
      let nowY = e.clientY;
      let disX = nowX - state.clientX;
      let disY = nowY - state.clientY;
      const style=state.seletData!.style;//seletData里非空且值为style里的值
      state.change=true;
      const width=boxs.value.width;
      const height=boxs.value.height;
      if(state.direction){
        switch (state.direction) {
          // 左边
          case "w":
            style.width = Math.ceil(state.width) - disX;//math.ceil()--向上取整有小数直接加1
            style.left = Math.ceil(state.left) + disX;
            console.log(style.width)
            break;
          // 右边
          case "e":
            style.width = Math.ceil(state.width) + disX;
            break;
          // 上边
          case "n":
            style.height = Math.ceil(state.height) - disY;
            style.top = Math.ceil(state.top) + disY;
            break;
          // 下边
          case "s":
            style.height = Math.ceil(state.height) + disY;
            break;
          // 左上
          case "nw":
            style.width = Math.ceil(state.width) - disX;
            style.left = Math.ceil(state.left) + disX;
            style.height = Math.ceil(state.height) - disY;
            style.top = Math.ceil(state.top) + disY;
            break;
          // 左下
          case "sw":
            style.width = Math.ceil(state.width) - disX;
            style.left = Math.ceil(state.left) + disX;
            style.height = Math.ceil(state.height) + disY;
            break;
          // 右上
          case "ne":
            style.height = Math.ceil(state.height) - disY;
            style.top = Math.ceil(state.top) + disY;
            style.width = Math.ceil(state.width) + disX;
            break;
          // 右下
          case "se":
            style.height = Math.ceil(state.height) + disY;
            style.width = Math.ceil(state.width) + disX;
            break;
          default:
            break;
        }
        const maxw=Math.ceil(style.width/width);
        const minw=Math.floor(style.width/width);//Math.floor向下取整有小数直接去掉
        if(Math.abs(style.width-maxw*width)>Math.abs(style.width-minw*width)){
          state.bgPint.width=minw*width-space;
        }else{
          state.bgPint.width=maxw*width-space;
        }
        const maxh=Math.ceil(style.height/height);
        const minh=Math.floor(style.height/height);
        if(Math.abs(style.height-maxh*height)>Math.abs(style.height-minh*height)){
          state.bgPint.height=minh*height-space;
        }else{
          state.bgPint.height=maxh*height-space;
        }
      }else{
        const nx = e.clientX;
        const ny = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        const nl = nx - (state.clientX - state.left);
        const nt = ny - (state.clientY - state.top);
        style.left = nl;
        style.top = nt;
        const l=nl/(width);
        const bl=Math.ceil(l)*width;
        const sl=Math.floor(l)*width;
        if(Math.abs(bl-nl)>Math.abs(sl-nl)){
          if(Math.floor(l)>0){
            state.bgPint.x=sl;
          }else{
            state.bgPint.x=0;
          }
        }else{
          if(Math.ceil(l)>0){
            state.bgPint.x=bl;
          }else{
            state.bgPint.x=0;
          }
        }
        const t=nt/(height);
        const bt=Math.ceil(t)*height;
        const st=Math.floor(t)*height;
        const k=Math.ceil(t)+Math.ceil(style.height/height);
        if(k>Maxheight){
          // store.commit("changeAdsorbentSize",k)
        }
        else{
          // store.commit("changeAdsorbentSize",Maxheight)
        }
        if(Math.abs(nt-bt)>Math.abs(nt-st)){
          if(Math.floor(t)>0){
            state.bgPint.y=st;
          }else{
            state.bgPint.y=0;
          }
        }else{
          if(Math.ceil(t)>0){
            state.bgPint.y=bt;
          }else{
            state.bgPint.y=0;
          }
        }
      }
    }else{
      if(state.isClick){
        const nx = e.clientX;
        const ny = e.clientY;
        state.change=true;
        //计算移动后的左偏移量和顶部的偏移量
        state.clickPiont.width =(nx - drawing.x)-state.clickPiont.x;
        state.clickPiont.height =(ny - drawing.y)-state.clickPiont.y;
      }
    }
};

  // 弹起触发
  const mouseup=()=>{
    state.mousedown=false;
    state.scaleShow=false;
    state.isClick=false;
    if(!state.ctrlKey){
      state.seletData!.style.left=state.bgPint.x;
      state.seletData!.style.top=state.bgPint.y;
      state.seletData!.style.width=state.bgPint.width;
      state.seletData!.style.height=state.bgPint.height;
    }
    state.ctrlKey=false;
    // 按照最大高度排序
    // if(state.data.length>0){
    //   const space=store.state.overall.adsorbent.space;
    //   const height=store.state.overall.adsorbent.height;
    //   const row=store.state.overall.adsorbent.row;
    //   state.data.sort((a,b)=>(b.style.top+b.style.height)-(a.style.top+a.style.height));
    //   const heightMax=state.data[0].style.top+state.data[0].style.height;
    //   const h=Math.ceil(heightMax/(boxs.value.height+store.state.overall.adsorbent.space));
    //   if(h<height){
    //     nextTick(()=>{
    //     if(h>row){
    //       // store.commit("changeAdsorbentSize",h)
    //     }else{
    //       // store.commit("changeAdsorbentSize",row)
    //     }
    //     })
    //   }else{
    //     // store.commit("changeAdsorbentSize",h)
    //   }
    // }
  }

  // 修改子组件id
  const changeID=(data:boxData[],id:string|number)=>{
      data.forEach(item=>{
          item.id=`${setID()}`
          item.parent=`${id}`
          if(item!.children){
            changeID(item!.children,Number(item.id))
          }
      })
}
  //组合组数添加
  const addMultipleChoice=(data:boxData)=>{
    if(!state.multipleChoice.find(item=>item.id===data.id)){
      data!.select=true
      state.multipleChoice.push(data)
    }
  }
  /**
   * 寻找父组件
   * @param ID 
   * @returns 
   */
  const getParent2=(ID:string): boxData|undefined=>{
    const data =deepUntie(state.data).find((item:any)=>item.id===ID);
    if(data&&!data.parent){
      return data;
    }else{
      return getParent2(`${data.parent}`);
    }
  }
  // 
  // 选中的box触发事件 按下触发的事件
  const selectMousedown=(params:{id:string,target:any,node:any,direction:string|null})=>{
    if(params.target.button===0){
      right.value = false;
    // 如果是组合
        if(params.target.ctrlKey){
            const data=getParent2(`${params.id}`);
            state.ctrlKey=true;
            if(data){
              state.bgPint.x=data.style.left;
              state.bgPint.y=data.style.top;
              state.bgPint.width=data.style.width;
              state.bgPint.height=data.style.height;
              addMultipleChoice(data)
            }
        }else{
          state.seletName=params.id;
          state.direction=params.direction;
          state.mousedown=true;
          //获取x坐标和y坐标
          state.clientX= params.target.clientX;
          state.clientY= params.target.clientY;
          deepUntie(state.data).forEach((item: any) => {
            item!.select=false;
          })
          const data=getParent2(`${params.id}`);
          console.log(data);
          if(data){
            state.bgPint.x=data.style.left;
            state.bgPint.y=data.style.top;
            state.bgPint.width=data.style.width;
            state.bgPint.height=data.style.height;
            state.seletData = data;
            data.select=true;
            addMultipleChoice(data);
          }
          state.scaleShow=true;
          state.width=state.seletData?.style.width||0;
          state.height=state.seletData?.style.height||0;
          state.top=state.seletData?.style.top||0;
          state.left=state.seletData?.style.left||0;
      }
    }
  }

// 拿到画布的位置
  const positionInt=()=>{
    const node=(document.getElementById("board") as any).getBoundingClientRect();
    const ow=store.state.overall.width;
    const oh=store.state.overall.height;
    state.clientX=state.drawingOffsetX= node.left;
    state.clientY=state.drawingOffsetY= node.top;
    state.box.width=state.drawBox.width=node.width
    state.box.height=node.height
    const height =(state.box.width * store.state.overall.height) /ow;
    state.drawBox.height=height;
    const then = state.box.width / ow;
    state.data.forEach((item: any) => {
      item.style.width =item.style.width/store.state.then/ow*node.width
      item.style.left =item.style.left/store.state.then/ow*node.width;
      item.style.height =item.style.height/store.state.then/oh*height; 
      item.style.top =item.style.top/store.state.then /oh*height; 
    });
    // store.commit('changeThan',then);
  }
  // 生成唯一ID id递增
  const setID=():number =>{
      const list= deepUntie(state.data).map((item: any) =>Number(item.id))
      let list2:number[]=[...list,...idList]
      if(list2.length!==0){
        list2= list2.sort((a, b) => b-a)
        idList.push(list2[0]+1)
        return list2[0]+1
      }else{
        idList.push(1)
        return 1
      }
  }
  /**
   * 根据id查找数据
   * @param id 
   */
const getDate=(ID:string,data=state.data):boxData|undefined=>{
    return deepUntie(data).find((item: any) =>item.id === ID);
  }
  //drawing点击
const drawingMousedown = (e:MouseEvent) => {
  if(!state.mousedown){
    const node=document.getElementById('drawing')!.getBoundingClientRect();
    drawing.x=node.x;
    drawing.y=node.y;
    state.clickPiont.x = e.clientX-node.x;
    state.clickPiont.y = e.clientY-node.y;
    state.isClick=true;
  }
};
//点击空白
const drawclick=(e:MouseEvent) =>{
  console.log("点击了我")
  // store.commit("changeIsEmpty", 0);
  deepUntie(state.data).forEach((item:any)=>{
    item.select=false;
  })
  state.mousedown=false;
  state.scaleShow=false;
  state.isClick=false;
  state.clickPiont.width=0;
  state.clickPiont.height=0;
  right.value = false;
  state.multipleChoice=[];
}
// 删除组件
const deleteBox = (ID: string | number,data=state.data) => {
    if(state.seletData){
      deepDelete(state.data,state.seletData.id)
      right.value = false;
    }else if(state.multipleChoice){
      state.multipleChoice.forEach(item=>{
        deepDelete(state.data,item.id)
      })
    }
    else{
    }
  };
  // 保存参数加截图
const preserve = (param: boolean,goBack:boolean=false) => {
    if (param) {
      // store.commit("changeLoad",1);
      state.layout = false;
      setTimeout(() => {
        html2canvas(document.getElementById("board") as HTMLElement, {
          backgroundColor: store.state.overall.background,
          useCORS: true,
        }).then((canvas) => {
            // 压缩
            let src = canvas.toDataURL("image/jpeg",0.1);
            postPreserve(goBack,src);
          })
          .catch(() => {
        });
      }, 100);
    } else {
      postPreserve(goBack)
    }
};
// 保存
const postPreserve=(goBack?:boolean,src?:string)=>{
    const then = Number(store.state.then);
    const data = JSON.parse(JSON.stringify(state.data));
    let forms:any[]=[];
    let paths:any[]=[];
    deepUntie(data).forEach((item: any) => {
        item.style.width = item.style.width / then;
        item.style.left = item.style.left / then;
        item.style.height = item.style.height / then;
        item.style.top = item.style.top / then;
        if(item.options.from){
          forms.push(item.options.from)
        }
        if(item.style.src){
          paths.push(item.style.src)
        }
      });
      let params={
        id: state.id,
        forms:Array.from(new Set(forms)).toString(),
        paths:Array.from(new Set(paths)).toString(),
        data: JSON.stringify(data),
        overall: JSON.stringify(store.state.overall),
        
      }
      if(src){
        Object.assign(params,{src})
      }
  }
    // 创建组件组件
const addData = (type: string, name: string) => {
      //初始化对象
      const data = initialization(type, name);
      state.data.push(data);
      if(state.seletData){
        state.seletData!.select=false;
      }
      // store.commit("changeIsEmpty", 1);
      const selet=getDate(`${data.id}`)
      if(selet){
        state.seletData=selet
      }
};
    // 复制组件
const copy = () => {
      if(state.seletData?.select){
        // store.commit("setCopyData",state.seletData)
        ElMessage.success("复制成功！")
      }else{
        ElMessage.warning("请选择需要复制的组件!")
      }
};
const right = ref(false);
// 粘贴
const ok = () => {
      right.value = false;
      const n = store.state?.copyData;
      if (!n) {
        ElMessage.warning("请选择需要复制的对象!");
      } else {
        const data: any =JSON.parse(JSON.stringify(n));
        data.id = setID() + "";
        if(data.children){
          changeID(data.children,data.id)
        }
        data.style.left = state.rightData.left;
        data.style.top = state.rightData.top ;
        state.data.push(data);
      }
  };
// 组合
const gropOk=()=>{
  if(state.multipleChoice.length<=1){
    ElMessage.warning("请选择两个及以上组件！")
    return
  }
  const children:boxData[]=[]
  const node={right:0,bottom:0,left:10000,top:10000};
  const data=initialization("person","组合")
  data.style.background="transparent";

  let ids:any[]=[];
  for(let item of state.multipleChoice){
    item.parent=`${data.id}`;
    if(item.style.left<node.left){
      node.left=item.style.left;
    }
    if(item.style.top<node.top){
      node.top=item.style.top;
    }
    if(item.style.left+item.style.width>node.right){
      node.right=item.style.left+item.style.width;
    }
    if(item.style.top+item.style.height>node.bottom){
      node.bottom=item.style.top+item.style.height;
    }
    if(item.id!==data.id){
      ids.push(item.id)
      children.push(item);
    }
  }
  const list:any=[]
  state.data.forEach((item,index) =>{
    if(!ids.includes(item.id)){
      list.push(item)
    }
  })
  state.data=list;
  const person ={
    width:node.right-node.left,
    height:node.bottom-node.top,
    top:node.top,
    left:node.left
  }
  children.forEach(item=>{
    item.style.left=item.style.left-person.left;
    item.style.top=item.style.top-person.top;
  })
  Object.assign(data.style,person)
  data.children=children;
  state.data.push(data);
  state.multipleChoice=[]
}
//取消组合
const cancel=()=>{
  if(state.seletData?.children&&state.seletData){
    const child=state.seletData.children;
    child.forEach(item=>{
      item.parent=undefined;
      item.style.left=item.style.left+state.seletData!.style.left;
      item.style.top=item.style.top+state.seletData!.style.top;
    })
    deleteBox(state.seletData!.id)
    state.data.push(...child);
  }else{
    ElMessage.warning("请选择组合组件!")
  }
}
const rightClick = () => {
      right.value = false;
    };
const contextmenu = (e: any) => {
  e.preventDefault(); //做一些兼容性的处理
    if(!e.ctrlKey){
      right.value = true;
      state.isClick=false
      const node=document.getElementById('drawing')!.getBoundingClientRect();
      state.rightData.left = e.clientX-node.x;
      state.rightData.top = e.clientY-node.y;
      console.log(e)
      // if(node.height-state.rightData.top<170){
      //   state.rightData.top=node.height-170;
      // }
      // if(node.width-state.rightData.left<100){
      //   state.rightData.left=node.width-100;
      // }
    }
  };
      //初始化参数
const initialization = (type: string, name: string): boxData => {
        const data = [];
        //@ts-ignore
        data[0] = [name];
        //@ts-ignore
        data[1] = [""];
        let obj: boxData = {
          id: setID()+'',
          style: {
            left: 400,
            top: 400,
            width: 100,
            height: 100,
            color: '#fff',
            zIndex: 1,
            fontSize: 16,
            justifyContent: "center",
            alignItems: "center",
            borderColor:'',
            borderWidth:1,
            background:'#333',
            src:'',
            radius:0,
            display:true,
            opacity:1
          },
          type,
          name,
          data,
          table:"",
          title:name,
          X:"1",
          code:'',
          select:true,
          options:JSON.parse(JSON.stringify(PercentageData))
        };
        return obj;
      };
// 计算每个格子的大小
const boxs=computed(()=>{
  let width=0;
  let height=0;
  const {space,row,column}=store.state.overall.adsorbent;
  width=(state.drawBox.width-(space*(column-1)))/column;
  height=(state.drawBox.height-(space*(row-1)))/row;
  return {width,height}
})
const layoutSize=computed(()=>{
  let w=state.drawBox.width;
  let h=state.drawBox.height;
  const space=store.state.overall.adsorbent.space;
  const height=store.state.overall.adsorbent.height;
  const row=store.state.overall.adsorbent.row;
  if(Number(height)>Number(row)){
    h=Number(height)*(boxs.value.height+Number(space))-Number(space);
  }
  
  return {width:w,height:h}
})
  return {state,mousemove,selectMousedown,mouseup,setID,addData,copy,drawingMousedown,deleteBox,preserve,contextmenu,right,ok,rightClick,drawclick,gropOk,cancel,layoutSize}
}