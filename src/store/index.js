import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import auth from './modules/auth'
import user from './modules/user'
import drops from './modules/drops'
import heroes from './modules/heroes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    drops,
    heroes
  },
  getters
})
