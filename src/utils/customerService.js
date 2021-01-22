import Vue from 'vue'
import CustomerService from 'daishu-customer-service-entry'
import { toLogin } from '@/utils/auth'
import store from '@/store'

function link_to() {
  // eventBus.$on('customerServiceTap',function(data){});
  // eventBus.$emit('customerServiceTap');
  store.dispatch('user/getUserInfo').then((res) => {
    if (res.code === 510) {
      // toLogin()
    } else {
      customerService.setOptions({
        user: {
          user_name: res.data.nickname ? encodeURIComponent(res.data.nickname) : '',
          user_id: res.data.id,
          avatar_url: res.data.avatar_url,
          mobile_phone: res.data.mobile_phone
        }
      })
      customerService.link()
    }
  })
}

window.eventBus = new Vue() // 注册全局事件对象
var customerService = new CustomerService({
  options: {
    app: 'customerservice',
    app_id: '10001'
  },
  onTap() {
    link_to()
  }
})

customerService.link_to = link_to

customerService.hide()

export default customerService
