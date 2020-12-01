import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    //规格属性模板
    productId:undefined,
    ppsId:undefined
}
const mutations={
  SET_PPSId:(state,payload)=>{
    state.ppsId=payload;
  },
  SET_ID:(state,payload)=>{
    state.productId=payload;
  }
}
const actions={
  SET_PPSId:(context,payload)=>{
    context.commit('SET_PPSId', payload)
  },
  SET_ID:(context,payload)=>{
    context.commit('SET_ID', payload)
  }
}

const getters={
  ppsId: state => state.ppsId,
  productId: state => state.productId,
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
