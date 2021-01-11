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
  scrollBehavior(to, from, savedPosition) {
    if (to) {
      return{x:0, y:0}
    }
  },
  routes
})

export default router
