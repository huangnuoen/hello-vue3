import http from '../config'
const login = {
  status() {
    return http({
      url: 'login/status'
    })
  }
}
export default login
