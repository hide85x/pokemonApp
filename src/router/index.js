import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CatchEmAll from '../views/CatchEmAll.vue'

import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      store.dispatch('clearData')
      next()
    }
  },
  {
    path: '/catch-m-all',
    name: 'CatchEmAll',
    component: CatchEmAll
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
