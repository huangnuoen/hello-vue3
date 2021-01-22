import api from '@/api'

const state = {
  user: {},
  address: {},
  skipDraw: false,
  authStatus: false,
  footmarkList: []
}
const SET_USER = 'SET_USER'
const SET_ADDRESS = 'SET_ADDRESS'
const SET_AUTH_STATUS = 'SET_AUTH_STATUS'
const SET_SKIP_DRAW = 'SET_SKIP_DRAW'
const ADD_FOOTMARK_LIST = 'ADD_FOOTMARK_LIST'
const CLEAR_FOOTMARK_LIST = 'CLEAR_FOOTMARK_LIST'
const CLEAR = 'CLEAR'
const mutations = {
  [SET_AUTH_STATUS](state, val) {
    state.authStatus = val
  },
  [SET_USER](state, val) {
    state.user = val
  },
  [SET_ADDRESS](state, val) {
    state.address = val
  },
  [SET_SKIP_DRAW](state, val) {
    state.skipDraw = val
  },
  [CLEAR_FOOTMARK_LIST](state) {
    state.footmarkList = []
  },
  [ADD_FOOTMARK_LIST](state, val) {
    if (state.footmarkList.indexOf(val) === -1) {
      state.footmarkList.push(val)
    }
  },
  [CLEAR](state) {
    state.authStatus = false
    state.user = {}
    state.address = {}
    state.skipDraw = false
  }
}

const actions = {
  getUserInfo({ commit }, { params = {}, withoutLogin = false } = {}) {
    return new Promise((resolve) => {
      api.user.info({ params, withoutLogin }).then((res) => {
        if (res.code === 200) {
          commit(SET_USER, res.data)
        }
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
