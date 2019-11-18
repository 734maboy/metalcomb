import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let Store = new Vuex.Store({
  state: {
    logged: true,
    username: '',

    orders: [],
  },
  mutations: {
    logIn: (state, username) => { state.logged = true; state.username = username; },
    logOut: (state) => { state.logged = false },
    fillOrders: (state, orders) => { state.orders = orders; },
  },
  actions: {
  },
  modules: {
  }
});

export default Store; 
