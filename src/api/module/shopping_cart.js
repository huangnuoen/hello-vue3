/*
 * @Description: 
 * @Date: 2020-07-20 11:36:53
 * @LastEditors: gengzhong
 * @LastEditTime: 2020-12-17 17:36:05
 */
import http from '../config'
// 后端突然换接口风格。。原来的写法hold不住了3 4 5 层的接口 ，后面想想办法.
// 文件名、变量名和url 路径第一级同名，接口调用的方法名和接口用法对应即可，不需要同名
const shopping_cart = {
  getTotal(params) {
    return http({
      url: 'shopping_cart/client/total',
      params,
      withoutLogin: true
    })
  },
  createOrder(data) {
    return http({
      url: 'shopping_cart/server/orders',
      data,
      method: 'post'
    })
  },
  checkCoupon() {
    return http({
      url: 'coupon/checkMetroCoupon'
    })
  },
  getCoupon() {
    return http({
      url: 'coupon/getMetroCoupon'
    })
  },
  getCartDetail(params) {
    return http({
      url: 'shopping_cart/server/details',
      params
    })
  },
  getInvalid(params) {
    return http({
      url: 'shopping_cart/server/invalid_products',
      params
    })
  },
  // 操作购物车 新增 更新 删除
  cartServer({
    params = {},
    id,
    method = 'get',
    data = {}
  } = {}) {
    const url = id ? `shopping_cart/server/carts/${id}` : 'shopping_cart/server/carts'
    return http({
      url,
      params,
      data,
      method // put or patch or delete or get
    })
  },
  // 操作购物车  删除
  deleteCart(params) {
    return http({
      url: 'shopping_cart/server/cart/batch_delete',
      method: 'delete',
      params
    })
  },
  // 清空失效商品
  empty_invalids(params) {
    return http({
      url: 'shopping_cart/server/empty_invalids',
      params,
      method: 'delete' // or patch or delete
    })
  },
  addCart(data) {
    return http({
      url: 'shopping_cart/client/store',
      data,
      method: 'post' // or patch or delete
    })
  }
}
export default shopping_cart
