import http from '../config'

const home = {
  home_operation(params) {
    return http({
      url: 'pageconfig/home_operation',
      params
    })
  },
  org_list(params) {
    return http({
      baseURL: window.tijianApi,
      prefix: window.prefix_tijian + 'api/',
      url: 'org/list',
      params
    })
  },
  get_hot_package(params) {
    return http({
      baseURL: window.tijianApi,
      prefix: window.prefix_tijian + 'wechat/',
      url: 'api/get_hot_package',
      params
    })
  }
}
export default home
