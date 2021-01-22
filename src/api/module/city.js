import http from '../config'
const city = {
  tree() {
    return http({
      url: 'city/tree'
    })
  },
  areas() {
    return http({
      url: 'city/areas'
    })
  },
  position(params) {
    return http({
      url: 'city/position',
      params
    })
  }
}
export default city
