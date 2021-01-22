import http from '../config'
const pay = {
  order(id, params) {
    return http({
      url: `pay/order/${id}`,
      params
    })
  }
}
export default pay
