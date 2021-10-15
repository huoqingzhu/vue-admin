import { IS_LOCKSCREEN } from '@/store/mutation-types'
import { Storage } from '@/utils/Storage'
import {ILockscreenState} from '../../type'
// 长时间不操作默认锁屏时间
const initTime = 60 * 60

const isLock = Storage.get(IS_LOCKSCREEN, false)



export const state: ILockscreenState = {
  isLock: isLock === true, // 是否锁屏
  lockTime: isLock == 'true' ? initTime : 0
}
