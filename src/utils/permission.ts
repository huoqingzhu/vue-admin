import router from '../router/index'
import { useStore } from 'vuex'
import store from '@/store/index'

const whiteList = ['/login', '/register'] // 白名单列表
router.beforeEach(async (to, from, next) => {
    // 设置页面标题
    document.title = `${to.meta.title}`
    const hasToken = window.localStorage.getItem('accessToken')
    if (hasToken || to.query.token) {
        if (to.path === '/login') {
            next() // 已经登录，跳转到首页
        } else {
            // 获取用户信息
            const hasGetUserInfo = '12'
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    next()
                } catch (error) {
                    // 清除用户信息，退出登录，跳转登录页
                    next('/login')
                }
            }
        }
    } else {
    /* has no token */
    // eslint-disable-next-line no-lonely-if
        if (whiteList.indexOf(to.path) !== -1) {
            // 白名单中，无需验证
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next('/login')
        }
    }
})

router.afterEach((to, from) => {})
