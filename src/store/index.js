import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getter'
import mutations from './mutations'
import actions from './actions'
import user from './module/user'
import saveLocal from './plugin/saveLocal'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user
  },
  plugins: [saveLocal]
})
