import { ORDER_STATUS } from '@/config/order'
import { PHONE_NUM } from '@/config/common'

export const PAY = 8
export const USE = 3
export const RECEIVED = 4
export const CALL = 2
export const CANCEL = 9
export const DISPATCH = 7
export const AFTER = 5
export const BUY = 1
export const CANCEL_AFTER = 6
// 每个订单按钮的处理函数
export const BTN_HANDLER = {
  [PAY](order) {
    this.$router.push({
      path: `/pay?order_no=${order.order_info.main_order_no}`
    })
  },
  [USE](item) {
    this.$router.push({ path: `/booking?id=${item.reservation.id}` })
  },
  [BUY](item) {
    console.log('buy', item)
  },
  [RECEIVED]() {
    this.$api.store.orderReceived({ id: this.delivery.id }).then((res) => {
      this.refresh()
      if (res.code === 200) {
        this.$toast('已确认收货')
      }
    })
  },
  [CALL]() {
    location.href = `tel:${PHONE_NUM}`
  },
  [DISPATCH]() {
    // 确认收货按钮 纯前端控制
    if (this.disabledBtns.indexOf(DISPATCH) > -1) {
      return
    }
    this.$toast('已提醒商家发货')
    this.$store.commit('popup/SET_STORE_ORDER_DISPATCHED', { [this.$route.query.order_no]: new Date().getDate() })
    this.disabledBtns.push(DISPATCH)
  },
  [AFTER]() {
    this.showApplyRefund = true
  },
  [CANCEL]() {
    this.$dialog
      .confirm({
        message: '确定取消该订单？',
        cancelButtonText: '再想想'
      })
      .finally(() => {
        this.$toast.clear()
      })
      .then(() => {
        this.$toast.loading('正在取消...')
        this.$api.user
          .orderCancel({
            main_order_no: this.$route.query.order_no
          })
          .then((res) => {
            if (res.code === 200) {
              this.$toast('订单取消成功')
              this.$router.replace({ path: '/redirect' + this.$route.fullPath })
            }
          })
      })
      .catch(() => {})
  },
  [CANCEL_AFTER]() {
    this.$dialog
      .confirm({
        message: '确定取消售后？',
        cancelButtonText: '再想想'
      })
      .then(() => {
        this.$api.store.cancelRefund({ sub_order_no: this.$route.query.order_no }).then((res) => {
          this.refresh()
          if (res.code === 200) {
            this.$toast(res.message)
          }
        })
      })
      .catch(() => {})
  }
}
// 各个订单状态的状态文案，按钮组(按钮现在只有订单中心列表在用)
export const ORDER_STATUS_CONFIG = {
  [ORDER_STATUS.WAIT_PAY]: {
    text: '待支付',
    statusTitle: '待支付',
    desc: '',
    imgSrc: require(`@/images/order/${'To_be_paid.png'}`),
    btns: [{ text: '立即支付', code: PAY }]
  },
  [ORDER_STATUS.WAIT_RESERVATION]: {
    text: '待使用',
    statusTitle: '待使用',
    desc: '立即预约服务，享受健康之旅',
    imgSrc: require(`@/images/order/${'To_be_used.png'}`),
    btns: []
  },
  [ORDER_STATUS.WAIT_DISPATCH]: {
    text: '待发货',
    statusTitle: '待发货',
    imgSrc: require(`@/images/order/${'To_be_delivered.png'}`),
    btns: []
  },
  [ORDER_STATUS.DISPATCHED]: {
    text: '待收货',
    statusTitle: '待收货',
    imgSrc: require(`@/images/order/${'To_be_received.png'}`),
    btns: []
  },
  [ORDER_STATUS.DONE_RESERVATION]: {
    text: '进行中',
    statusTitle: '进行中',
    imgSrc: require(`@/images/order/${'To_be_used.png'}`),
    btns: []
  },
  [ORDER_STATUS.DONE]: {
    text: '已完成',
    statusTitle: '已完成',
    imgSrc: require(`@/images/order/${'complete.png'}`),
    btns: []
    // btns: [{ text: '再次购买', code: BUY }]
  },
  [ORDER_STATUS.AFTER]: {
    text: '售后中',
    statusTitle: '售后中',
    desc: '稍后客服可能与您电话联系，请保持手机畅通',
    imgSrc: require(`@/images/order/${'Customer_service.png'}`),
    btns: []
  },
  [ORDER_STATUS.CLOSED]: {
    text: '已关闭',
    statusTitle: '已关闭',
    imgSrc: require(`@/images/order/${'cancel.png'}`),
    // btns: [{ text: '再次购买', code: BUY }]
    btns: []
  }
}
