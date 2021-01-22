import api from '@/api'

const state = {
  total: null,
  prescription_total: null,
  // 记录购物车里选择的商品id
  chosenGoods: []
}
const SET_TOTAL = 'SET_TOTAL'
const SET_PRESCRIPTION_TOTAL = 'SET_PRESCRIPTION_TOTAL'
const SET_CHOSEN_GOODS = 'SET_CHOSEN_GOODS'
const ADD_CHOSEN_GOODS = 'ADD_CHOSEN_GOODS'
const mutations = {
  [SET_CHOSEN_GOODS](state, val) {
    state.chosenGoods = [...val]
  },
  [ADD_CHOSEN_GOODS](state, val) {
    if (state.chosenGoods.indexOf(val) === -1) {
      state.chosenGoods.push(val)
    }
  },
  [SET_TOTAL](state, val) {
    if (val > 0) {
      state.total = val
    } else {
      state.total = null
    }
  },
  [SET_PRESCRIPTION_TOTAL](state, val) {
    if (val > 0) {
      state.prescription_total = val
    } else {
      state.prescription_total = null
    }
  }
}

const actions = {
  getTotal({ commit, state }) {
    commit(SET_TOTAL, state.total)
    return new Promise((resolve) => {
      api.shopping_cart.getTotal().then((res) => {
        if (res.code === 200) {
          commit(SET_TOTAL, res.data.total)
          commit(SET_PRESCRIPTION_TOTAL, res.data.prescription_total)
          resolve(res)
        }
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
