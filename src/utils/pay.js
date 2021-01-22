// const WeixinJSBridge = window.WeixinJSBridge
// console.log(WeixinJSBridge)

function onBridgeReady({ config, success, fail }) {
  // return new Promise((resolve) => {
  WeixinJSBridge.invoke('getBrandWCPayRequest', config, (res) => {
    if (res.err_msg === 'get_brand_wcpay_request:ok') {
      success(res)
    } else {
      fail(res)
    }
  })
  // })
}
// 微信支付
export function wechatpay({ config = {}, success = () => {}, fail = () => {} }) {
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
    fail()
  } else {
    onBridgeReady({ config, success, fail })
  }
}
