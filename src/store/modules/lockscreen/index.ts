/**
 * 锁屏
 */

import { state } from './state'
import { mutations } from './mutations'
import {Module,ActionContext} from "vuex"
import {State,ILockscreenState} from "../../type"
export default {
  namespaced: true,
  state,
  mutations
} as Module<ILockscreenState,State>
