import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth';
import Drops from '../views/Drops'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Drops',
    component: Drops
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
