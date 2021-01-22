import http from '../config'
const store = {
  hot_keywords() {
    return http({
      url: 'store/product/hot_keywords'
    })
  },
  productCate() {
    return http({
      url: 'store/product/cate'
    })
  },
  addBrowse(id) {
    return http({
      url: `store/products/${id}/browse`,
      method: 'post'
    })
  },
  syncBrowse(data) {
    return http({
      url: 'store/product/browse_import',
      data,
      method: 'post'
    })
  },

  reserve(data) {
    return http({
      url: 'store/order_reservation/reserve',
      method: 'post',
      data
    })
  },
  createOrder(data) {
    return http({
      url: 'store/orders',
      data,
      method: 'post'
    })
  },
  collectProduct(data) {
    return http({
      url: 'store/product/collect',
      method: 'post',
      data
    })
  },
  products({ params, id }) {
    const url = id ? `store/products/${id}` : 'store/products'
    return http({
      url,
      params
    })
  },
  orderInvoice(data) {
    return http({
      url: 'store/order_invoices',
      data,
      method: 'post'
    })
  },
  stores({ id }) {
    return http({
      url: `store/stores/${id}`
    })
  },
  shopping_carts(data) {
    return http({
      url: 'store/shopping_carts',
      data,
      method: 'post'
    })
  },
  home_layout(params) {
    return http({
      url: 'store/home_layout',
      params
    })
  },
  home_product(params) {
    return http({
      url: 'store/home_product',
      params
    })
  },
  sub_orders(order_no) {
    return http({
      url: `store/sub_orders/${order_no}`
    })
  },
  orderReceived(data) {
    return http({
      url: 'store/order_delivery/receive',
      method: 'post',
      data
    })
  },
  orderRefund(data) {
    return http({
      url: 'store/sub_order/ask_refund',
      data,
      method: 'post'
    })
  },
  cancelRefund(data) {
    return http({
      url: 'store/sub_order/cancel_refund',
      data,
      method: 'post'
    })
  },
  category(params) {
    return http({
      url: 'store/suggests',
      params
    })
  }
}
export default store
