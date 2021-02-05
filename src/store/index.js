import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authData: {},
    authUser: '',
    userProfile: {},
    products: [],
  },
  mutations: {
    LOG_IN(state, data){
      state.authData = data
      state.authUser = data.user
    },
    GET_PRODUCTS(state, data){
      state.products = data
    }
  },
  actions: {
    LOG_IN({commit}, data){
      return new Promise(resolve => {
        axios({
          method: 'post',
          url: 'http://dummy-api.d0.acom.cloud/api/auth/login',
          data: data
        })
        .then(result => {
          commit('LOG_IN', result.data)
          resolve()
        })
      })
    },
    GET_PRODUCTS({commit}){
      axios({
        method: 'post',
        url: 'http://dummy-api.d0.acom.cloud/api/products',
        headers:{}
      })
      .then(result => {
        commit('GET_PRODUCTS', result.data)
      })
    }
  },
  modules: {
  }
})
