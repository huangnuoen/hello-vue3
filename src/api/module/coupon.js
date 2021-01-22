import http from '../config'
const coupon = {
  list(params) {
    return http({
      url: 'coupon/list',
      params
    })
  },
  get(id) {
    return http({
      url: 'coupon/get/' + id, method: 'post'
    })
  }
}
export default coupon
