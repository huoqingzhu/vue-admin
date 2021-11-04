
import {Module,ActionContext} from "vuex"
import {login} from "@/api/user"
import router from "@/router"
import { Edit,State,control,boxData} from "@/store/type"
import {deepUntie,deepDelete} from "@/utils/methods"
const state:Edit = {
  zoom:1,
  treeData:[],
  seletData:undefined,
  control:control.whole,
  overall:{
    background:'#04142B',
    fontSize:16,
    color:"#ffffff",
    width:1920,
    height:1080,
    size:2,
    design:"",
    layout:'Layout4',
    adsorbent:{row:12,column:12,space:5,width:12,height:12},
    assemblyBg:"#12273C",
    assemblyBd:"#60A9C1",
    assemblyBw:2,
    search:'1',
    mode:1,
    full:true,
  },
}
let idList:number[]=[];//维护本地id库
/**
 * 生产全局唯一id
 * @returns number
 */
const setID=():number =>{
  const list= deepUntie(state.treeData).map((item: any) =>Number(item.id))
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
 * 初始化组件
 * @param type 
 * @param name 
 * @returns boxData
 */
const initialization = (type: string, ): boxData => {

  let obj: boxData = {
    id: setID()+'',
    style: {
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      color: '#fff',
      zIndex: 1,
      fontSize: 16,
      justifyContent: "center",
      alignItems: "center",
      borderColor:'',
      borderWidth:0,
      background:'#333',
      src:'',
      radius:0,
      display:true,
      opacity:1
    },
    type,
    title:type,
    name:type,
    code:'',
    select:true,
  };
  return obj;
};
const getters={
  /**
   * 根据缩放比例，返回画布scale属性
   * @param state 
   * @returns 
   */
  style(state:Edit){
    return {
      width: state.overall.width+'px',
      height: state.overall.height+'px',
      background: state.overall.background,
      transform:`scale(${state.zoom},${state.zoom})`
    }
  }
}
const mutations={ 
  /**
   * 改变缩放大小
   * @param state 
   * @param type 
   */
  changeZoom(state:Edit,type:boolean){
    if(type){
      state.zoom=state.zoom+0.05
    }else{
      state.zoom=state.zoom-0.05
    }
  },
  /**
   * 根据屏幕实际大小，计算出画布的缩放比例
   * @param state 
   * @param type 
   */
  regression(state:Edit,type:{width:number,height:number}){
    console.log(type)
    const x=Math.min(type.width/state.overall.width,type.height/state.overall.height)
    state.zoom=x
  },
  /**
   * 改变选中对象
   * @param state 
   * @param data 
   */
  changeSeleteData(state:Edit,data:Edit['seletData']){
      state.seletData=data
  },
  /**
   * 根据添加组件
   * @param state 
   * @param type 
   */
  addBox(state:Edit, type:string){
      const data = initialization(type);
      state.treeData.push(data);
      if(state.seletData){
        state.seletData!.select=false;
      }
      data.select=true;
      state.seletData=data
  },
  /**
   * 修改control
   * @param state 
   * @param type control
   */
  setControl(state:Edit, type:control){
      state.control=type;
  }
}
const actions={

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as Module<Edit,State>