import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    username: '',
  },
  mutations: {
    logIn: (state, username) => { state.logged = true; state.username = username; },
    logOut: (state) => { state.logged = false }
  },
  actions: {
  },
  modules: {
  }
})
