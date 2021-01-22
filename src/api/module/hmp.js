import http from '../config'
const hmp = {
  suppliers(params) {
    return http({
      url: 'hmp/suppliers',
      params
    })
  },
  supplier_cities(params) {
    return http({
      url: 'hmp/supplier_cities', params
    })
  }
}
export default hmp
