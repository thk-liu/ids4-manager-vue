import Vue from 'vue'
import { login, getInfo, logout, tenantLogin } from '@/api/login'
import { byName } from '@/api/administration/tenancy'
import { ACCESS_TOKEN, TENANT_ID } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import signalR from '@/api/message-signalR'

const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        roles: [],
        info: {},
        setting: {},
        logo: ""
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_NAME: (state, { name, welcome }) => {
            state.name = name
            state.welcome = welcome
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_INFO: (state, info) => {
            state.info = info
        },
        SET_LOGO: (state, logo) => {
            state.logo = logo;
        },
        GET_SETTING: (state) => {

        },
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            var remember = userInfo.rememberMe;
            return new Promise((resolve, reject) => {
                    tenantLogin(userInfo).then(response => {
                        commit('SET_TOKEN', response.access_token)
                        console.log('remember', remember);
                        if (remember) {
                            Vue.ls.set(ACCESS_TOKEN, response.access_token, response.expires_in)
                        }
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
                // return new Promise((resolve, reject) => {
                //     login(userInfo).then(response => {
                //         Vue.ls.set(ACCESS_TOKEN, response.accessToken, 7 * 24 * 60 * 60 * 1000)
                //         console.log(Vue.ls.get(ACCESS_TOKEN));
                //         commit('SET_TOKEN', response.accessToken)
                //         resolve()
                //     }).catch(error => {
                //         reject(error)
                //     })
                // })
        },
        GetTenantByName({ commit }, name) {
            return new Promise((resolve, reject) => {
                byName(name).then(res => {
                    if (res.success) {
                        Vue.ls.set(TENANT_ID, res.tenantId)
                        resolve()
                    } else {
                        reject()
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //多租户的登录
        TenantLogin() {
            return new Promise((resolve, reject) => {
                tenantLogin(userInfo).then(response => {
                    Vue.ls.set(ACCESS_TOKEN, response.access_token, response.expires_in)
                    console.log(Vue.ls.get(ACCESS_TOKEN));
                    commit('SET_TOKEN', response.access_token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetSetting({ state }, item) {
            return state.setting[item]
        },
        SignalR() {
            console.log('-----SignalR------');

            var scope = this;
            signalR.start();
            signalR.connection.on('NoticeMessage', (message) => {
                scope.$notification.open({
                    message: '有新的订单',
                    description: message
                })
            })
        },
        // 获取用户信息
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    if (response.currentUser.isAuthenticated == false) {
                        throw Exception("未授权");
                    }
                    const result = response;
                    // const result = response.result
                    commit('SET_INFO', result.currentUser)
                        // if (result.auth && result.auth.grantedPolicies.length > 0) {
                        //   const role = result.auth
                        //   role.permissions = result.auth.grantedPolicies
                        //   role.permissions.map(per => {
                        //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                        //       const action = per.actionEntitySet.map(action => { return action.action })
                        //       per.actionList = action
                        //     }
                        //   })
                        //   role.permissionList = role.permissions.map(permission => { return permission.permissionId })
                        //   commit('SET_ROLES', result.role)
                        //   commit('SET_INFO', result)
                        // } else {
                        //   // reject(new Error('getInfo: roles must be a non-null array !'))
                        // }
                    commit('SET_NAME', { name: result.currentUser.userName, welcome: welcome() })
                    commit('SET_AVATAR', result.currentUser.avatarUrl)
                    commit('SET_LOGO', result.setting.values['CorpManagement.Logo'])
                    commit('SET_SETTING', result.setting.values)
                    signalR.start();
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout({ commit, state }) {
            return new Promise((resolve) => {
                logout(state.token).then(() => {
                    //清理路由权限信息

                    resolve()
                }).catch(() => {
                    resolve()
                }).finally(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_TENANT', '')
                    Vue.ls.remove(ACCESS_TOKEN)
                    Vue.ls.remove(TENANT_ID)
                })
            })
        }

    }
}

export default user