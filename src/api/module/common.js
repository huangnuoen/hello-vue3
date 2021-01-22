import http from '../config'
const common = {
  wechatConfig() {
    const arr = document.URL.split('#')
    const url = arr[0]
    return http({
      url: `common/wechatConfig?url=${encodeURIComponent(url)}`
    })
  }
}
export default common
