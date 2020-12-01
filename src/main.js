// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
// import { VueAxios } from './utils/request'

// mock
// import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import i18n from './locales'

Vue.config.productionTip = false

import proxyScript from '@/api/ServiceProxyScript'
Vue.prototype.$proxyScript = proxyScript;

//挂载千分符算法
import accounting from 'accounting'
Vue.prototype.moneyFormat = function(num) {
    return accounting.formatNumber(num)
}



new Vue({
    router,
    store,
    i18n,
    created: bootstrap,
    render: h => h(App)
}).$mount('#app')