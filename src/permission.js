import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist


router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
        // if (Vue.ls.get(ACCESS_TOKEN)) {
    if (store.getters.token) {
        /* has token */
        console.log(to.path);
        if (to.path === '/user/login' || to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            //
            // if (store.getters.roles.length === 0) {
            if (!store.getters.userInfo || !store.getters.userInfo.isAuthenticated) {
                // if (store.getters.userInfo.isAuthenticated == false) {
                //   //未授权登出当前token 跳转到登录页面
                //   store.dispatch('Logout').then(() => {
                //     next({ path: '/user/login', query: { redirect: to.fullPath } })
                //   })
                // }
                store
                    .dispatch('GetInfo')
                    .then(res => {

                        const roles = res.auth.grantedPolicies;

                        // const roles = res && res.result.role;

                        store.dispatch('GenerateRoutes', { roles }).then(() => {
                            // 根据roles权限生成可访问的路由表
                            // 动态添加可访问路由表
                            var routers = store.getters.addRouters;
                            router.addRoutes(routers)
                            const redirect = decodeURIComponent(from.query.redirect || to.path)
                            console.log(to.path, redirect);
                            if (to.path === redirect) {
                                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                                next({...to, replace: true })
                            } else {
                                // 跳转到目的路由
                                next({ path: redirect })
                            }
                        })
                    })
                    .catch(() => {
                        notification.error({
                            message: '错误',
                            description: '请求用户信息失败，请重试'
                        })
                        store.dispatch('Logout').then(() => {
                            next({ path: '/user/login', query: { redirect: to.fullPath } })
                        })
                    })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.name)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            // next({ path: '/login', query: { redirect: to.fullPath } })
            next({ path: '/user/login', query: { redirect: to.fullPath } })

            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})