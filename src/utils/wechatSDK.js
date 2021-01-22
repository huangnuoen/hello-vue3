import api from '@/api'
import { isWeChat } from '@/utils/tool'
import wx from 'weixin-js-sdk'
const shareConfig = {
  title: `${brandConfig.companyName}管理平台`,
  desc:
    '一个有温度的健康管理服务平台。提供全国公立医院及体检机构的个人/团体体检预约，在线健康咨询、体检报告查询；体检报告解读；及其他企业健康福利预约服务。',
  imgUrl: brandConfig.shareImg,
  link: document.URL,
  success: function () { }
}

function addChannel(payload) {
  let channel = sessionStorage.getItem('channel')
  if (!channel || payload.link.indexOf("channel") !== -1) {
    return payload
  }
  payload.link = `${payload.link}${payload.link.indexOf("?") !== -1 ? '&' : '?'}channel=${channel}`
  return payload
}

function wechatSDK(payload = {}) {
  // payload = Object.assign({}, shareConfig, { link: document.URL }, payload)
  payload = {
    title: payload.title || shareConfig.title,
    desc: payload.desc || shareConfig.desc,
    imgUrl: payload.imgUrl || shareConfig.imgUrl,
    link: payload.link || shareConfig.link,
    success: payload.success || shareConfig.success
  }
  // 访问渠道为非微信浏览器不调用微信sdk
  if (!isWeChat()) {
    return
  }

  // 微信分享前带上channel
  payload = addChannel(payload)

  // 带hasSign参数时，不执行请求，直接设置分享参数
  if (payload.hasSign) {
    delete payload.hasSign
    // wechatShare(wx, payload)
    wx.ready(function () {
      // 访问渠道为小程序webview时，不调用微信分享
      // if (!window.IS_WEBVIEW) {
      wechatShare(wx, payload)
      // }
    })
    wx.error(function (res) {
      console.log(res)
    })
    return
  }
  api.common.wechatConfig().then((res) => {
    const jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData']
    const { appId, timestamp, signature, nonceStr } = res.data
    wx.config({
      debug: false,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList
    })
    wx.ready(function () {
      // 访问渠道为小程序webview时，不调用微信分享
      // if (!window.IS_WEBVIEW) {
      wechatShare(wx, payload)
      // }
    })
    wx.error(function (res) {
      console.log('err', res)
    })
  })
}
function wechatShare(wx, payload) {
  wx.updateTimelineShareData(payload)
  wx.updateAppMessageShareData(payload)
}
export default wechatSDK
