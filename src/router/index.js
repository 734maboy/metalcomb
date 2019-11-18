import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Export from '../views/Export.vue'
import Import from '../views/Import.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/import',
    name: 'import',
    component: Import,
    beforeEnter: (to, from, next) => {      
      if (Store.state.logged) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/export',
    name: 'export',
    component: Export,
    beforeEnter: (to, from, next) => {
      if (Store.state.logged) {
        next();
      } else {
        next('/login');
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
