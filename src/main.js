import brandConfig from '@/utils/brandConfig'
import '@/utils/comefrom'
import '@/config/global'
import Vue from 'vue'
import App from './App.vue'
import '@/style/index.less'
import store from './store'
import router from './router'
import api from '@/api'
import waves from '@/directives/waves'
import '@/icons'
import { Toast, Dialog } from 'vant'
import Blur from '@/directives/blur/index'
import Change from '@/directives/change'
import VConsole from 'vconsole'
import '@/utils/umengMTA'
import '@/utils/components'
import { formatPrice } from '@/utils/filters'
import '@/utils/event'
import customerService from '@/utils/customerService'
console.log('glo')

Vue.use(waves, {
  duration: 500,
  delay: 100
})
Vue.use(Blur)
Vue.use(Change)
Vue.use(Toast)
Toast.setDefaultOptions('loading', { forbidClick: true, duration: 1000 * 10, loadingType: 'spinner' })
Vue.use(Dialog)
Vue.config.productionTip = false
Vue.filter('G_formatPrice', formatPrice)
// Vue.config.errorHandler = function(err, vm, info) {
//   console.log(err, vm, info)
// }
Vue.prototype.$api = api
Vue.prototype.$customerService = customerService
Vue.prototype.$brandConfig = brandConfig
new Vue({
  router,
  store,
  render: (render) => render(App)
}).$mount('#app')
if (location.href.match(/console=1/)) {
  /* eslint-disable */
  new VConsole()
  /* eslint-disable */
}
