// 订单中心-流转状态
export const ORDER_STATUS = {
  ALL: 0, // 前端自己加的
  WAIT_PAY: 1,
  WAIT_RESERVATION: 2,
  WAIT_DISPATCH: 3,
  DISPATCHED: 4,
  DONE_RESERVATION: 5,
  DONE: 6,
  AFTER: 7,
  CLOSED: 8
}
// 支付状态
export const PAY_STATUS = {
  WAIT: 1,
  DONE: 5,
  OVER: 6,
  REFUNDING_PART: 7,
  REFUNDING_ALL: 8,
  REFUNDED_PART: 9,
  REFUNDED_ALL: 10
}
// 商城订单-流转状态
// 预约类子订单状态枚举
export const STORE_ORDER_STATUS = {
  CLOSED: -2, // 已关闭
  CANCELED: -1, // 已取消
  WAIT_PAY: 1, // 待支付
  PAYED: 2, // 待预约 待发货
  SUBMITTED: 3, // 待使用
  REFUNDING: 7, // 售后中
  REFUND_FAIL: 8, // 售后失败
  REFUND_SUCCESS: 9, // 售后成功
  SENDED: 10, // 待收货
  DONE: 11 // 已完成
}
export const STORE_ORDER_CLOSE_TYPE = {
  0: '',
  1: '订单已取消',
  2: '支付超时',
  3: '退款已完成'
}
