import http from '../config'
const index = {
  layout() {
    return http({
      url: 'index/layout'
    })
  }
}

export default index
