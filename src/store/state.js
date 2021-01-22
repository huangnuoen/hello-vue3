import {
  initChannel,
  initThirdParty,
  initAppId
} from '@/utils/init'
import comefromConfig from '@/utils/comefromConfig'
/* 初始状态 */
const state = {
  loading: false,
  keepAlivePages: [],
  titleBar: {},
  channel: initChannel(),
  thirdParty: initThirdParty(),
  appId: initAppId(),
  currentCity: {
    area_name: '深圳市',
    id: 1959,
    city_code: '0755'
  },
  locationCity: '',
  localPoint: '',
  cityList: [],

  //申请成为合伙人的选择城市 不影响全局 单独起一个
  partnerCity: {
    area_name: '深圳市',
    id: 1959,
    city_code: '0755'
  },

  agentCardInfo: {
    got: false, //是否已经请求过了
    homeShow: 0, //首页是否展示健康卡 1展示，0不展示
    end_day: '',
    phone: '',
    centerPartnerStatus: null, //个人中心健康卡状态 1 没有购买卡，2 购买了未激活 ，3 购买了已激活 ，4 已经成为合伙人
  },


  comefrom: (sessionStorage.getItem("comefrom") && comefromConfig[sessionStorage.getItem("comefrom")]) ? comefromConfig[sessionStorage.getItem("comefrom")] : null, // 第三方跳转信息
}
export default state
