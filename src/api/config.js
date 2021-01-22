import axios from 'axios'
import qs from 'qs'
import { debounce } from '@/utils/tool'
import { toLogin } from '@/utils/auth'
import router from '@/router'
const baseUrl = window.baseUrl
const toAuthPage = debounce((route, url) => {
  // 跳完后端授权地址
  toLogin(route, url)
})
console.log('base')

const service = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: true
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
service.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

// http request 拦截器
service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('channel')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['Channel-Code'] = token // 请求头加上token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { withoutLogin } = response.config
    const curRoute = router.history.current
    // 不希望510跳去登录的话 传 withoutLogin=true
    if (!withoutLogin && response.data.code === 510) {
      toAuthPage(curRoute, response.data.data)
    }
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  }
)

function http({ baseURL, prefix = window.pathname, url = '', method = 'get', params = {}, data = {}, withoutLogin = false }) {
  // 去掉为空的params,纯亮答应保证接口没有必填但是为空的参数，出错了找他~
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      if (!params[key]) {
        delete params[key]
      }
    }
  }
  if (!(data instanceof FormData)) {
    data = qs.stringify(data)
  }

  return service({
    baseURL,
    url: prefix + url,
    params,
    method,
    data,
    withoutLogin
  }).then((res) => {
    return res.data
  })
}

export function uploadImg({ url, params = {}, file }) {
  const data = new FormData()
  data.append('userfield', file)
  return service({
    url,
    method: 'post',
    data,
    params
  })
    .then((res) => {
      return res.data
    })
    .catch((res) => { })
}

export default http
