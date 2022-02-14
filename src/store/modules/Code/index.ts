/**
 * 锁屏
 */
import {Module,ActionContext} from "vuex"
import { State,Code } from "../../type"
const state:Code={
    code:  `
    <template>
        <div class="code">
          <!-- 侧边栏 -->
          <div class="sidebar"></div>
          <div class="code-content">
            <!-- 头部 -->
            <div class="code-header"></div>
            <div class="code-body">
              <div class="code-code">
                <Editor v-model="code"></Editor>
              </div>
              <div class="code-navigation"></div>
            </div>
            <div class="code-footer"></div>
          </div>
    
        </div>
    <style lang="scss">
    @import './index.scss'
    </style>
    `,
    filename:'html'
}
const mutations={ 
  changeCode(states: Code, value: Code){
    states.code = value.code;
    states.filename = value.filename;
    console.log("我是vuex 我改变了")
  }
}
export default {
    namespaced: true,
    mutations,
    state,
} as Module<Code,State>