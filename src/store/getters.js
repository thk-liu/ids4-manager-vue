import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const getters = {
    device: state => state.app.device,
    theme: state => state.app.theme,
    color: state => state.app.color,

    token: state => {
        // console.log('token', state.user.token);
        // console.log('ACCESS_TOKEN', Vue.ls.get(ACCESS_TOKEN));
        //修复一个问题state.user.token 存储Storage后第一次 token获取为空（不能Vue.ls.get(ACCESS_TOKEN)）
        return state.user.token ? state.user.token : Vue.ls.get(ACCESS_TOKEN)
    },
    avatar: state => state.user.avatar,
    nickname: state => state.user.name,
    welcome: state => state.user.welcome,
    roles: state => state.user.roles,
    userInfo: state => state.user.info,
    addRouters: state => state.permission.addRouters,
    multiTab: state => state.app.multiTab,
    lang: state => state.i18n.lang,
    logo: state => state.user.logo,

    client: state => state.client.clientInfo,
    apiResources: state => state.client.apiResources
}

export default getters