import api from './index'
// import * as _axios from 'axios'
import { axios } from '@/utils/request'
import server from '@/utils/server'


/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */

export function login(parameter) {
    let loginModel = { userNameOrEmailAddress: parameter.username, password: parameter.password };
    return axios.post('/api/account/GetAccessToken', loginModel, {
        baseURL: server.AuthUrlApi,
        //headers: {'Content-Type': 'application/x-www-form-urlencoded'} 
        headers: { 'Content-Type': 'application/json' }
    });
    // return axios({
    //   url: '/auth/login',
    //   method: 'post',
    //   data: parameter
    // })
}
// axios.defaults.baseURL = '/api';

export function getSmsCaptcha(parameter) {
    return axios({
        url: api.SendSms,
        method: 'post',
        data: parameter

    })
}

export function getInfo() {
    return new Promise(resolve => {
        axios.get(api.configuration).then(configuration => {
            resolve(configuration)
        })
    });
}

export function logout() {
    return axios({
        url: '/api/account/logout',
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step(parameter) {
    return axios({
        url: api.twoStepCode,
        method: 'post',
        data: parameter
    })
}

export function tenantLogin(parameter) {
    let formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("scope", "BackendAdminAppGateway OrderService ProductService PriceService AgentService CorpService");
    formData.append("username", parameter.username);
    formData.append("password", parameter.password)
    formData.append("client_id", "authserver");
    formData.append("client_secret", "1q2w3e*");

    return axios.post('/connect/token', formData, {
        baseURL: server.AuthUrlApi,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
}