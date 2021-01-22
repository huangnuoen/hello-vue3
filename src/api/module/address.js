import http from '../config'
const address = {
  // 地址列表，新增，修改，删除
  shipping_addresses({ params = {}, data = {}, id, method = 'get' } = {}) {
    const url = id ? `address/shipping_addresses/${id}` : 'address/shipping_addresses'
    return http({
      url,
      params,
      data,
      method
    })
  }
}
export default address
