import http from '../config'
const user = {
  // 常用体检人
  medical_examiners({
    method = 'get',
    params = {},
    data = {},
    id
  } = {}) {
    const url = id ? `user/medical_examiners/${id}` : 'user/medical_examiners'
    return http({
      url,
      params,
      data,
      method
    })
  },
  // 地址列表，新增，修改，删除
  address({
    params = {},
    data = {},
    id,
    method = 'get'
  } = {}) {
    const url = id ? `address/shipping_addresses/${id}` : 'address/shipping_addresses'
    return http({
      url,
      params,
      data,
      method
    })
  },

  user_info_v2() {
    return http({
      url: 'user/user_info_v2'
    })
  },
  bind(data) {
    const prefix = 'auth/api/'
    return http({
      prefix,
      url: 'user/bind',
      data,
      method: 'post'
    })
  },
  collects(params) {
    return http({
      url: 'user/collects',
      params
    })
  },
  collectSet(data) {
    return http({
      url: 'user/collects/set',
      method: 'post',
      data
    })
  },
  collectUnset(data) {
    return http({
      url: 'user/collects/unset',
      method: 'post',
      data
    })
  },
  info({
    params = {},
    withoutLogin
  }) {
    return http({
      url: 'user/info',
      params,
      withoutLogin
    })
  },
  likeSet(data) {
    return http({
      url: 'user/likes/set',
      method: 'post',
      data
    })
  },
  likeUnset(data) {
    return http({
      url: 'user/likes/unset',
      method: 'post',
      data
    })
  },

  orderList(params) {
    return http({
      url: 'user/order/list',
      params
    })
  },

  orderDetail(params) {
    return http({
      url: 'user/order/detail',
      params
    })
  },

  orderCancel(data) {
    return http({
      url: 'user/order/cancel',
      method: 'post',
      data
    })
  },

  //健康合伙人 是否购买了卡 是否有激活
  agent_is_buy_card() {
    return http({
      url: 'user/agent/is_buy_card',
    })
  },
  //首页 健康卡 是否展示
  agent_active_card_show() {
    return http({
      url: 'user/agent/active_card_show',
    })
  },
  //发送短信验证码
  agent_send_msg() {
    return http({
      url: 'user/agent/send_msg',
      method: "post"
    })
  },
  agent_apply_partner(data) {
    return http({
      url: 'user/agent/apply_partner',
      method: "post",
      data
    })
  },


}
export default user
