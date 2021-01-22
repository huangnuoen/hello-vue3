import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/pages/Index.vue'
import store from '@/store'
import wechatSDK from '@/utils/wechatSDK'
import {
  authNeed
} from '@/utils/auth'
import * as types from '@/store/mutation-types'
import {
  setDefaultCity
} from '@/utils/init'
import {
  getUrlSpecifiedParam
} from '@/utils/tool'
import {
  defaultMenu
} from '@/config/common'
import customerService from '@/utils/customerService'
import {
  _MTA
} from '@/utils/umengMTA'
Vue.use(VueRouter)
// 路由meta信息
const routes = [{
    path: '/',
    name: 'index',
    component: Index,
    redirect: to => {
      // if (store.state.comefrom) {
      //   window.location.href = store.state.comefrom.home
      //   return;
      // }
      return "/home"
    },
    meta: {
      keepAlive: []
    },
    children: [{
        path: '/home',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '@/pages/home/public-home.vue'),
        meta: {
          keepAlive: []
        }
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import( /* webpackChunkName: "mall" */ '@/pages/mall/mall.vue'),
        meta: {
          login: true,
          keepAlive: []
        }
      },
      {
        path: '/health',
        name: 'health',
        component: () => import( /* webpackChunkName: "mall" */ '@/pages/home/health.vue'),
        meta: {
          keepAlive: []
        }
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import( /* webpackChunkName: "mine" */ '@/pages/mine/mine.vue'),
        meta: {
          login: true
        }
      }
    ]
  },
  {
    path: '/redirect/:path*',
    component: () => import('@/pages/redirect')
  },
  {
    path: '/physical-examination',
    name: 'physical-examination',
    component: () => import( /* webpackChunkName: "physicalExamination" */ '@/pages/home/physical-examination'),
    meta: {
      title: '健康体检'
    }
  },
  {
    path: '/authenticator',
    component: () => import('@/pages/authenticator'),
    meta: {
      login: true
    }
  },
  {
    path: '/clear',
    component: () => import('@/pages/clear/clear')
  },
  {
    path: '/get-coupon',
    name: 'get-coupon',
    component: () => import( /* webpackChunkName: "cityList" */ '@/pages/activity/coupon'),
    meta: {
      title: '福利大放送',
      login: true
    }
  },
  {
    path: '/city-list',
    name: 'city-list',
    component: () => import( /* webpackChunkName: "cityList" */ '@/pages/city/city-list.vue'),
    meta: {
      titleBar: {
        title: '选择城市',
        hasMenu: true
      },
      keepAlive: []
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "loginIndex" */ '@/pages/login/index.vue'),
    children: [{
        path: '',
        name: 'login',
        component: () => import( /* webpackChunkName: "loginForm" */ '@/pages/login/form.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: 'agreement',
        name: 'login-agreement',
        component: () => import( /* webpackChunkName: "loginAgreement" */ '@/pages/login/agreement.vue')
      },
      {
        path: 'privacy',
        name: 'login-privacy',
        component: () => import( /* webpackChunkName: "loginPrivacy" */ '@/pages/login/privacy.vue')
      }
    ]
  },
  // 购物车
  {
    path: '/cart',
    name: 'cart',
    component: () => import( /* webpackChunkName: "cart" */ '@/pages/cart/cart.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '购物车',
        hasMenu: true
      }
    }
  },
  // 子商城
  {
    path: '/submall',
    name: 'submall',
    component: () => import( /* webpackChunkName: "submall" */ '@/pages/mall/submall.vue'),
    meta: {
      titleBar: {
        title: '',
        hasMenu: true
      },
      keepAlive: []
    }
  },
  {
    path: '/mall/drug',
    name: 'mall-drug',
    component: () => import( /* webpackChunkName: "drug" */ '@/pages/mall/drug.vue'),
    meta: {
      titleBar: {
        title: '药品商城',
        hasMenu: true
      },
      keepAlive: []
    }
  },
  {
    path: '/search/drug',
    name: 'search-drug',
    component: () => import( /* webpackChunkName: "drug" */ '@/pages/search/drug.vue'),
    meta: {
      titleBar: {
        title: '药品商城',
        hasMenu: true
      },
      keepAlive: []
    }
  },
  // 商品详情-预约类，暂时命名
  {
    path: '/goods/:id',
    name: 'goods',
    component: () => import( /* webpackChunkName: "goods" */ '@/pages/store/goods.vue'),
    meta: {
      titleBar: {
        title: '商品详情',
        hasMenu: true
      }
    }
  },
  // 商城订单详情
  {
    path: '/store/order',
    name: 'store-order',
    component: () => import( /* webpackChunkName: "storeorder" */ '@/pages/store/order.vue'),
    meta: {
      titleBar: {
        title: '订单详情',
        hasMenu: true,
        login: true
      }
    }
  },
  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: () => import( /* webpackChunkName: "orderconfirm" */ '@/pages/order/confirm.vue'),
    meta: {
      login: true,
      keepAlive: [],
      titleBar: {
        title: '确认订单',
        hasMenu: false
      }
    }
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import( /* webpackChunkName: "orderbooking" */ '@/pages/order/booking.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '预约服务',
        hasMenu: true
      }
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import( /* webpackChunkName: "pay" */ '@/pages/pay/pay.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '支付订单',
        hasMenu: false
      }
    }
  },
  {
    path: '/pay-suc',
    name: 'pay-suc',
    component: () => import( /* webpackChunkName: "paysuc" */ '@/pages/pay/pay-suc.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '支付订单',
        hasMenu: false
      }
    }
  },
  {
    path: '/order-list',
    name: 'order-list',
    component: () => import( /* webpackChunkName: "order-list" */ '@/pages/order/list.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '订单中心',
        hasMenu: true
      }
    }
  },
  {
    path: '/order-detail',
    name: 'order-detail',
    component: () => import( /* webpackChunkName: "order-detail" */ '@/pages/order/detail.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '订单详情',
        hasMenu: true
      }
    }
  },
  {
    path: '/address',
    name: 'address-list',
    component: () => import( /* webpackChunkName: "addresslist" */ '@/pages/address/list.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '地址管理',
        hasMenu: false
      }
    }
  },
  {
    path: '/address-edit',
    name: 'address-edit',
    component: () => import( /* webpackChunkName: "addressedit" */ '@/pages/address/edit.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '编辑地址',
        hasMenu: true
      }
    }
  },
  {
    path: '/health-records',
    name: 'health-records',
    component: () => import( /* webpackChunkName: "healthrecords" */ '@/pages/health-records/index.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '健康档案'
        // hasMenu: true
      }
    }
  },
  {
    path: '/add-edit',
    name: 'add-edit',
    component: () => import( /* webpackChunkName: "addedit" */ '@/pages/health-records/add-edit.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '新增档案'
        // hasMenu: true
      }
    }
  },
  {
    path: '/health-self-test',
    name: 'health-self-test',
    component: () => import( /* webpackChunkName: "health-self-test" */ '@/pages/health-self-test/health-self-test.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '健康自测',
        hasMenu: true
      }
    }
  },
  {
    path: '/test-introduce',
    name: 'test-introduce',
    component: () => import( /* webpackChunkName: "test-introduce" */ '@/pages/health-self-test/test-introduce.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '健康自测',
        hasMenu: true
      }
    }
  },
  {
    path: '/test-result',
    name: 'test-result',
    component: () => import( /* webpackChunkName: "test-result" */ '@/pages/health-self-test/test-result.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '测试结果',
        hasMenu: true
      }
    }
  },
  {
    path: '/test-record',
    name: 'test-record',
    component: () => import( /* webpackChunkName: "test-record" */ '@/pages/health-self-test/test-record.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '自测记录',
        hasMenu: true
      }
    }
  },
  {
    path: '/answer-page',
    name: 'answer-page',
    component: () => import( /* webpackChunkName: "answer-page" */ '@/pages/health-self-test/answer-page.vue'),
    meta: {
      titleBar: {
        title: '健康自测',
        hasMenu: true
      }
    }
  },
  {
    path: '/article-detail',
    name: 'article-detail',
    component: () => import( /* webpackChunkName: "article-detail" */ '@/pages/article/article-detail.vue'),
    meta: {
      titleBar: {
        title: '健康资讯',
        hasMenu: true
      }
    }
  },
  {
    path: '/article-list',
    name: 'article-list',
    component: () => import( /* webpackChunkName: "article-list" */ '@/pages/article/article-list.vue'),
    meta: {
      titleBar: {
        title: '健康资讯',
        hasMenu: true
      },
      keepAlive: []
    }
  },
  {
    path: '/video-list',
    name: 'video-list',
    component: () => import( /* webpackChunkName: "videos" */ '@/pages/video/video-list.vue'),
    meta: {
      titleBar: {
        title: '科普视频',
        hasMenu: true
      },
      keepAlive: []
    }
  },
  {
    path: '/video-detail',
    name: 'video-detail',
    component: () => import( /* webpackChunkName: "video-detail" */ '@/pages/video/video-detail.vue'),
    meta: {
      titleBar: {
        title: '视频详情',
        hasMenu: true
      }
    }
  },
  {
    path: '/question-list',
    name: 'question-list',
    component: () => import( /* webpackChunkName: "question-list" */ '@/pages/question/question-list.vue'),
    meta: {
      titleBar: {
        title: '健康问答',
        hasMenu: true
      }
    }
  },
  {
    path: '/question-detail',
    name: 'question-detail',
    component: () => import( /* webpackChunkName: "question-detail" */ '@/pages/question/question-detail.vue'),
    meta: {
      titleBar: {
        title: '问答详情',
        hasMenu: true
      }
    }
  },
  {
    path: '/topic',
    name: 'topic',
    component: () => import( /* webpackChunkName: "topic" */ '@/pages/topic/index.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/ill',
    name: 'ill',
    component: () => import( /* webpackChunkName: "ill" */ '@/pages/ill-drug/ill.vue'),
    meta: {
      titleBar: {
        title: '疾病百科',
        hasMenu: true
      }
    }
  },
  {
    path: '/ill-search',
    name: 'ill-search',
    component: () => import( /* webpackChunkName: "ill-search" */ '@/pages/ill-drug/illSearch.vue'),
    meta: {
      titleBar: {
        title: '疾病百科',
        hasMenu: true
      }
    }
  },
  {
    path: '/drug-search',
    name: 'drug-search',
    component: () => import( /* webpackChunkName: "drug-search" */ '@/pages/ill-drug/drugSearch.vue'),
    meta: {
      titleBar: {
        title: '药品百科',
        hasMenu: true
      }
    }
  },
  // 药品百科详情,同时带id
  {
    path: '/drug-detail/:id',
    name: 'drug-detail',
    component: () => import( /* webpackChunkName: "drug-detail" */ '@/pages/ill-drug/children/drug-detail.vue'),
    meta: {
      titleBar: {
        title: '药品百科',
        hasMenu: true
      }
    }
  },
  // 疾病详情,同时带id
  {
    path: '/ill-detail/:id',
    name: 'ill-detail',
    component: () => import( /* webpackChunkName: "ill-detail" */ '@/pages/ill-drug/children/ill-detail.vue'),
    meta: {
      titleBar: {
        title: '疾病百科',
        hasMenu: true
      }
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import( /* webpackChunkName: "favorites" */ '@/pages/mine/favorites.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '我的收藏',
        hasMenu: true
      }
    }
  },
  {
    path: '/footmark',
    name: 'footmark',
    component: () => import( /* webpackChunkName: "footmark" */ '@/pages/mine/footmark.vue'),
    meta: {
      login: true,
      titleBar: {
        title: '我的足迹',
        hasMenu: true
      }
    }
  },
  {
    path: '/sz-metro/report',
    name: 'sz-metro-eport',
    component: () => import( /* webpackChunkName: "footmark" */ '@/pages/sz-metro/report-comtrast.vue')
  },
  {
    path: '/sz-metro/history',
    name: 'sz-metro-history',
    component: () => import( /* webpackChunkName: "footmark" */ '@/pages/sz-metro/health-history.vue')
  },
  {
    path: '/cmb-home',
    name: 'cmb-home',
    component: () => import( /* webpackChunkName: "home" */ '@/pages/third-party/cmb-home.vue')
  },
  {
    path: '/chinese-medicine',
    name: 'chinese-medicine',
    component: () => import( /* webpackChunkName: "chinese-medicine-index" */ '@/pages/chinese-medicine/index.vue'),
    redirect: '/chinese-medicine/list',
    children: [{
        path: 'list',
        name: 'chinese-medicine-list',
        component: () => import( /* webpackChunkName: "chinese-medicine" */ '@/pages/chinese-medicine/list.vue'),
        meta: {
          title: '中医医典',
          titleBar: {
            title: '中医医典',
            hasMenu: true
          }
        }
      },
      {
        path: 'detail',
        name: 'chinese-medicine-detail',
        component: () => import( /* webpackChunkName: "chinese-medicine-detail" */ '@/pages/chinese-medicine/detail.vue'),
        meta: {
          title: '中医医典',
          titleBar: {
            title: '中医医典',
            hasMenu: true
          }
        }
      },
    ]
  },



  /*健康合伙人*/
  //申请成为合伙人
  {
    path: '/partner',
    name: 'partner',
    component: () => import( /* webpackChunkName: "partner" */ '@/pages/partner/index.vue'),
    meta: {
      title: '健康合伙人',
      titleBar: {
        title: '健康合伙人',
        hasMenu: true
      },
      keepAlive: []
    }
  },
  //已经成为合伙人
  {
    path: '/is-partner',
    name: 'is-partner',
    component: () => import( /* webpackChunkName: "ispartner" */ '@/pages/partner/is-partner.vue'),
    meta: {
      title: '健康合伙人',
      titleBar: {
        title: '健康合伙人',
        hasMenu: true
      },
      keepAlive: []
    }
  },

  {
    path: '/project-agent',
    name: 'project-agent',
    component: () => import( /* webpackChunkName: "project-agent" */ '@/pages/project-agent/home.vue'),
    meta: {
      title: '健康合伙人',
    }
  }
]

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.documentElement.scrollTop || document.body.scrollTop
      }

      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes
})

// 在路由完成初始化
router.onReady(() => {
  // 关闭友盟自动统计
  window._czc && _czc.push(["_setAutoPageview", false]);

  // 获取其他项目的城市定位
  let city = localStorage.getItem("myLocationInfo") ? JSON.parse(localStorage.getItem("myLocationInfo")) : null
  if (city) {
    setDefaultCity(city.city_name, city.area_code)
  }
  // 如果url上带了城市名那就默认选中
  if (getUrlSpecifiedParam("city_name"))
    setDefaultCity(decodeURIComponent(getUrlSpecifiedParam("city_name")))
})

router.beforeEach((to, from, next) => {
  document.title = store.state.thirdParty === '10000002' ? '华润e润保' : to.meta.title || '健康管理平台'
  store.commit(types.SET_LOADING, false)
  // keep-alive
  if ((to.meta || {}).keepAlive) {
    // 判断是否有父级路由，将父级路由也加入缓存
    // 没有做父级delete的逻辑，可能有bug~
    if (to.matched.length > 1) {
      const list = to.matched.slice(0, to.matched.length - 1)
      list.forEach((item) => {
        store.commit(types.SET_KEEPALIVEPAGES, item.name)
      })
    }
    store.commit(types.SET_KEEPALIVEPAGES, to.name)
  }
  // titleBar
  if (to.meta.titleBar) {
    if (to.meta.titleBar.hasMenu && !to.meta.titleBar.menu) {
      // 设置默认菜单
      to.meta.titleBar.menu = defaultMenu
    }
    store.commit(types.SET_TITLE_BAR, to.meta.titleBar)
  }
  // 微信分享
  wechatSDK()
  // store.commit(types.SET_CUR_CITY, {})
  // 授权判断
  if (!store.state.user.authStatus && (to.meta.login || to.meta.auth)) {
    authNeed({
      route: to,
      next
    })
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  const keepAlive = (from.meta || {}).keepAlive
  if (keepAlive && keepAlive.length && keepAlive.indexOf(to.name) === -1) {
    store.commit(types.DELETE_KEEPALIVEPAGES, from.name)
  }

  // 友盟移动分析
  setTimeout(function () {
    _MTA()
  }, 1500)
  // 设置袋鼠客服所需的页面参数
  // setCustomerServiceOptions(to, from)
})

function setCustomerServiceOptions(to, from) {
  let name
  if (to.meta && to.meta.titleBar) {
    name = to.meta.titleBar.title || to.name
  }
  customerService.setOptions({
    page: {
      name: name ? encodeURIComponent(name) : '',
      url: window.location.href
    }
  })
}

export default router
