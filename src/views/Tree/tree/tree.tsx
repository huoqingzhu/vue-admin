import {defineComponent} from "vue"
import {basicProps,treeData} from './props'
import './tree.less'
export default defineComponent({
  name:'BasicTree',
  props:basicProps,
  setup(props){
    const {treeData} =props
    console.log(treeData)
    const recursion=(treeData:treeData[])=>{
          return treeData.map((item=>{
            if(!item.children)return <div class='box'>{item.name}</div>
            return <div class="person">
                    {recursion(item.children)}
              </div>
          }))
    }
      return ()=><div class="draw">
                  <h1>递归树</h1>
                  {treeData?recursion(treeData):null}
              </div>
    }
})