import http from '../config'
const api = {
  get_cityId_by_name(params) {
    return http({
      baseURL: window.tijianApi,
      prefix: window.prefix_tijian + 'wechat/',
      url: 'api/get_cityId_by_name',
      params
    })
  }
}
export default api
