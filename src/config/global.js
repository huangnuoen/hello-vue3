import {
  ENV,
  ENV_URL_PREFIX
} from './env'
global.ENV = ENV
if (process.env.NODE_ENV === 'development') {
  global.baseUrl = '/proxy_api/'
  global.tijianApi = '/tijian_api/'
} else {
  global.baseUrl = location.href.split('health')[0]
  global.tijianApi = ENV_URL_PREFIX.tijian
}
global.daishuUrl = ENV_URL_PREFIX.daishu + 'wechat/h5#/' // 个检链接
global.internalHospitalUrl = ENV_URL_PREFIX.internalHospital + 'frontend/h5/#/' // 在线问诊
global.fuliUrl = ENV_URL_PREFIX.fuli
global.health = ENV_URL_PREFIX.health
global.prefix_tijian = ENV === 'prod' ? '' : 'apps/'
global.pathname = 'api/frontend/'
global.defaultAvatar = 'this.src="' + require('@/images/global_defaultavatar.png') + '"'
global.defaultDoctorAvatar = 'this.src="' + require('@/images/global_doctor_default.png') + '"'
global.defaultlogo = 'this.src="' + require('@/images/global_defaultlogo.png') + '"'
global.defaultGoods = require('@/images/global_goods_default.png')
