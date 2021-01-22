import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

import cart from './modules/cart'
import user from './modules/user'
import popup from './modules/popup'
import search from './modules/search'

Vue.use(Vuex)

const localVuex = createPersistedState({
  storage: window.localStorage,
  reducer(val) {
    return {
      currentCity: val.currentCity,
      localCity: val.localCity,
      localPoint: val.localPoint,
      user: {
        footmarkList: val.user.footmarkList
      },
      popup: val.popup,
      search: {
        drugHistory: val.search.drugHistory
      },
      partnerCity: val.partnerCity
    }
  }
})
const sessionVuex = createPersistedState({
  storage: window.sessionStorage,
  reducer(val) {
    return {
      cart: val.cart,
      channel: val.channel,
      thirdParty: val.thirdParty,
      agentCardInfo: val.agentCardInfo,
      user: {
        skipDraw: val.user.skipDraw,
        address: val.user.address,
        authStatus: val.user.authStatus
      }
    }
  }
})

// 开发环境时开启debug
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    cart,
    user,
    popup,
    search
  },
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [sessionVuex, localVuex, createLogger()] : [sessionVuex, localVuex]
})
