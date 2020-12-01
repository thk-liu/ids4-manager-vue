import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN, DEFAULT_Lang, TENANT_ID } from '@/store/mutation-types'
import server from '@/utils/server'

// 创建 axios 实例
const service = axios.create({
    // baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
    baseURL: server.BaseUrlApi,
    timeout: 30000 // 请求超时时间
})

const err = (error) => {
    if (error.response) {
        const data = error.response.data
        const token = Vue.ls.get(ACCESS_TOKEN)
            // if (error.response.status === 403) {
            //   notification.error({
            //     message: 'Forbidden',
            //     description: data.error.message
            //   })
            // } 
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed'
            })
            if (token) {
                store.dispatch('Logout').then(() => {
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)
                })
            }
        }
        if (error.response.status === 500) {
            // 对响应错误做点什么
            // this.$message.error
            console.log(error.response.data.error.message)
            notification.error({
                message: '出现错误',
                description: error.response.data.error.message,
            });
        }
        //由于权限不足 或业务不允许
        else if (error.response.status === 403) {
            notification.error({
                message: '校验失败',
                description: error.response.data.error.message,
            });
        }
    }
    return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
    const token = store.getters.token;
    // const lang=
    const lang = Vue.ls.get(DEFAULT_Lang);
    if (lang) {
        if (lang == 'zh-CN') {
            //zh-CN对应后台的语言代码为zh-Hands
            config.headers["Accept-Language"] = "zh-Hans";
        } else {
            config.headers["Accept-Language"] = lang;
        }
    }
    const tenant = Vue.ls.get(TENANT_ID);
    if (tenant) {
        config.headers["__tenant"] = tenant;
    }
    if (token) {
        // config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
        config.headers.Authorization = "Bearer " + token;
    }
    return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
    if (response.data) {
        return response.data
    }
    return response;

}, err)

const installer = {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, service)
    }
}

export {
    installer as VueAxios,
    service as axios
}