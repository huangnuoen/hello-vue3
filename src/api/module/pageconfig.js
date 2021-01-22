import http from '../config'
const pagecofing = {
  getList(params) {
    return http({
      url: 'pageconfig/getList',
      params
    })
  },

  getList2() {
    return http({
      url: 'pageConfig/getList',
      params
    })
  }
}
export default pagecofing
