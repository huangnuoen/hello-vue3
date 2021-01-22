import http from '../config'
const category = {
  list(params) {
    return http({
      url: 'category/list',
      params
    })
  }
}
export default category
