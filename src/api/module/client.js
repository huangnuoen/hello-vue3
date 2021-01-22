import http from '../config'
const client = {
  authenticatorToken() {
    return http({
      prefix: 'authenticator/api/',
      url: 'client/token'
    })
  }
}
export default client
