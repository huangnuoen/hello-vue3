import * as types from './mutation-types'

const mutations = {
  [types.SET_LOADING](state, flag) {
    if (state.loading !== flag) {
      state.loading = flag
    }
  },
  [types.SET_TITLE_BAR](state, bar) {
    state.titleBar = bar
  },
  [types.UPDATE_TITLE_BAR_TITLE](state, title) {
    state.titleBar = {
      ...state.titleBar,
      title
    }
  },
  [types.SET_KEEPALIVEPAGES](state, data) {
    !state.keepAlivePages.includes(data) && state.keepAlivePages.push(data)
  },
  [types.DELETE_KEEPALIVEPAGES](state, data) {
    const index = state.keepAlivePages.indexOf(data)
    index !== -1 && state.keepAlivePages.splice(index, 1)
  },
  [types.SET_LOCAL_CITY](state, city) {
    state.localCity = city
  },
  [types.SET_LOCAL_POINT](state, val) {
    state.localPoint = val
  },
  [types.SET_CITY_LIST](state, list) {
    state.cityList = list
  },
  [types.SET_CUR_CITY](state, city) {
    // 个检需要城市信息
    localStorage.setItem(
      'myLocationInfo',
      JSON.stringify({
        city_name: city.area_name.replace('市', ''),
        city_id: city.id,
        area_code: city.area_code,
        date: Math.floor(new Date().getTime() / 1000)
      })
    )

    state.currentCity = city
  },

  [types.PARTNER_CITY_SELECT](state, city) {
    state.partnerCity = city
  },
  [types.SET_AGENT_INFO](state, info) {
    state.agentCardInfo = info
  },

}

export default mutations
