import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: {
      user: '',
      access_token:''
    },
    products: {
      data: '',
      last_page: 1
    },
    savedFilters: {}
  },
  plugins: [createPersistedState()],
  getters:{
    authUser: state => {
      return state.session.user
    }
  },
  mutations: {
    LOG_IN(state, data){
      state.session = data
    },
    GET_PRODUCTS(state, data){
      state.products = data
    },
    SAVE_FILTERS(state, data){
      state.savedFilters = data
    }
  },
  actions: {
    LOG_IN({commit}, data){
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `http://dummy-api.d0.acom.cloud/api/auth/login`,
          data: data
        })
        .then(result => {
          commit('LOG_IN', result.data)
          resolve(result)
        })
        .catch(err =>{
          reject(err)
        })
      })
    },
    GET_PRODUCTS({commit}, data){
      const token = this.state.session.access_token
      axios({
        method: 'get',
        url: `http://dummy-api.d0.acom.cloud/api/products?page=${data.page}&from=${data.from}&to=${data.to}&price_from=${data.price_from}&price_to=${data.price_to}&title=${data.title}`,
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      .then(result => {
        commit('GET_PRODUCTS', result.data)
      })
    },
    SAVE_FILTERS({commit}, filters){
      commit('SAVE_FILTERS', filters)
    }
  },
  modules: {
  }
})
