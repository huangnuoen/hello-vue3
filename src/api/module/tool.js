import http from '../config'
const prefix = 'auth/api/'
const tool = {
  captcha() {
    return http({
      url: 'tool/captcha',
      prefix
    })
  },
  verify_code(params) {
    return http({
      prefix,
      url: 'tool/verify_code',
      params
    })
  }
}
export default tool
