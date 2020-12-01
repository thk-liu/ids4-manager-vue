import Vue from 'Vue'
import Vuex from 'Vuex'

const payment = {
    state: {
        paymentSetting: undefined
    },
    mutations: {
        SET_PaymentSetting: (state, paymentSetting) => {
            state.paymentSetting = paymentSetting
        }
    },
    actions: {
        // 设置支付配置信息
        SetPaymentSetting({ commit }, paymentSetting) {
            commit('SET_PaymentSetting', paymentSetting)
        }
    }
}

export default payment