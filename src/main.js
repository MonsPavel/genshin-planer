import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '../src/styles/index.scss' // global css

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Element)

const firebaseConfig = {
  apiKey: "AIzaSyBuGteG7_2JKlXipO7cXXpBhwjdH8oEcCo",
  authDomain: "genshin-planer.firebaseapp.com",
  projectId: "genshin-planer",
  storageBucket: "genshin-planer.appspot.com",
  messagingSenderId: "459184684865",
  appId: "1:459184684865:web:da60f740f2713e29576bc0",
  measurementId: "G-0YSSHM18Q4"
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
