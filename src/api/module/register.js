import http from '../config'
const register = {
  send_tel_code(data) {
    return http({
      url: 'register/send_tel_code',
      prefix: 'auth/user/',
      data,
      method: 'post'
    })
  },
  save(data) {
    return http({
      prefix: 'auth/user/',
      url: 'register/save',
      data,
      method: 'post'
    })
  }
}
export default register
