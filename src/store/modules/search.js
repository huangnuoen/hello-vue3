// 搜索模块
const state = {
  // 药品的历史记录
  drugHistory: []
}
const ADD_DRUG_HISTORY = 'ADD_DRUG_HISTORY'
const CLEAR_DRUG_HISTORY = 'CLEAR_DRUG_HISTORY'
const mutations = {
  [CLEAR_DRUG_HISTORY](state, val) {
    state.drugHistory = []
  },
  [ADD_DRUG_HISTORY](state, val) {
    const i = state.drugHistory.indexOf(val)
    if (i > -1) {
      state.drugHistory.splice(i, 1)
    }
    state.drugHistory.unshift(val)
    if (state.drugHistory.length > 8) {
      state.drugHistory.pop()
    }
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
