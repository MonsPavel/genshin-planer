import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth'
import Drops from '../views/Drops'
import firebase from 'firebase/app'
import Heroes from '../views/Heroes'
import Banners from '../views/Banners'
import Weapons from '../views/Weapons'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Drops',
    component: Drops,
    meta: { auth: true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: Heroes
  },
  {
    path: '/banners',
    name: 'Banners',
    component: Banners
  },
  {
    path: '/weapons',
    name: 'Weapons',
    component: Weapons
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser) {
    next('/auth')
  } else {
    next()
  }
})

export default router
