// 弹窗模块管理
const state = {
  // 记录子商城弹窗信息，store_id为key,date为value
  submall: {},
  // 记录订单发货操作 order_no为key,date为value
  dispatched: {},
  // 切换城市弹窗 存过期时间
  toggleCityExpires: '',
  // 定位城市的有效期
  localCityExpires: ''
}
const SET_SUBMALL_POPUP = 'SET_SUBMALL_POPUP'
const SET_STORE_ORDER_DISPATCHED = 'SET_STORE_ORDER_DISPATCHED'
const SET_TOGGLE_CITY_EXPIRES = 'SET_TOGGLE_CITY_EXPIRES'
const SET_LOCAL_CITY_EXPIRES = 'SET_LOCAL_CITY_EXPIRES'
const mutations = {
  [SET_STORE_ORDER_DISPATCHED](state, val) {
    state.dispatched = { ...state.dispatched, ...val }
  },
  [SET_SUBMALL_POPUP](state, val) {
    state.submall = { ...state.submall, ...val }
  },
  [SET_TOGGLE_CITY_EXPIRES](state, timestamp) {
    state.toggleCityExpires = timestamp
  },
  [SET_LOCAL_CITY_EXPIRES](state, timestamp) {
    state.localCityExpires = timestamp
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
