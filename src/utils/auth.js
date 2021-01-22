import api from '@/api'
import {
  jumpLink
} from '@/utils/tool'
import store from '@/store'
import router from '@/router'
import {
  Toast
} from 'vant'
// 授权是否登录通用route.meta.login或者传入login来判断
export function authNeed({
  route,
  next = () => {}
}) {
  Toast.loading({
    message: '登录中...'
  })
  const login = route.meta.login
  api.login
    .status()
    .finally(() => {
      Toast.clear()
    })
    .then((res) => {
      switch (res.code) {
        case 200:
          store.commit('user/SET_AUTH_STATUS', true)
          next()
          break
        case 510:
          // 只有授权信息没有用户信息时
          if (login) {
            toAuthAndLogin(route, res.data)
          } else {
            next()
          }
          break
        case 511:
          // 没有授权信息 也没有用户信息时
          toAuthAndLogin(route, res.data)
          break
        default:
          next()
          break
      }

    })
}
/* 去登录方法
 * 当接口返回510，且去登录时调这个方法，场景：收藏，加购，评论等
 * route 一般是当前页面route, 用于登录回跳地址
 * url 接口返回的登录地址 一般是res.data, 不传的话会自动去接口拿，由authNeed去走剩下流程
 */
export function toLogin(route, url) {
  let temp
  if (route) {
    temp = {
      ...route,
      meta: {
        login: true
      }
    }
  } else {
    // 没有路由时默认当前路由
    const curRoute = router.history.current
    temp = {
      ...curRoute,
      meta: {
        login: true
      }
    }
  }

  // 没有传url时去授权接口获取一下
  if (!url) {
    authNeed({
      route: temp
    })
  } else {
    toAuthAndLogin(temp, url)
  }
}
export function toAuthAndLogin(route, url) {
  // 开发环境账号登录手机号 16601126817
  if (process.env.NODE_ENV === 'development') {
    jumpLink({
      url: location.origin + '/#/login'
    })
    return
  }
  // 获取跳转的url
  let beforeUrl = location.href.split('#')[0] + '#' + route.fullPath
  beforeUrl = encodeURIComponent(beforeUrl)
  const bind_phone = route.meta.login ? 1 : 0
  // 跳完后端授权地址
  jumpLink({
    url: `${url}?redirect=${beforeUrl}&bind_phone=${bind_phone}`
  })
}
