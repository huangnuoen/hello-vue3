import { getUrlSpecifiedParam, setCookie } from './tool'
import store from '@/store'
import { cityList } from '@/config/cityList'
export function initChannel() {
  const channel = getUrlSpecifiedParam('channel')
  if (channel) {
    sessionStorage.setItem('channel', channel)
    setCookie('channel-code', channel)
  }
  getUrlSpecifiedParam('token') && setCookie('dmiddle_sso_token', getUrlSpecifiedParam('token')) // 保存token
  return channel
}

export function initThirdParty() {
  return getUrlSpecifiedParam('src')
}

// 初始化appid 从其他项目跳过来时会带上，在修改地址或优惠券等通用页面需要带给后端
export function initAppId() {
  return getUrlSpecifiedParam('app_id') ? getUrlSpecifiedParam('app_id') : '10001'
}
// 只设置一次
export function setDefaultCity(area_name, city_code) {
  if (!area_name && !city_code) return
  if (store.state.currentCity.area_name === area_name || store.state.currentCity.city_code === city_code) return
  for (const key in cityList) {
    const list = cityList[key]
    for (let i = 0; i < list.length; i++) {
      if (list[i].area_name === area_name || list[i].city_code === city_code) {
        store.commit('SET_CUR_CITY', list[i])
        return Promise.resolve()
      }
    }
  }
}
