<template>
  <div v-show="pageShow">
    <!--<mine-search>
      <template v-slot:header>
        <van-icon name="cross" />
      </template>
      <template v-slot:default>袋鼠健康</template>
      <template v-slot:footer>
        <van-icon name="ellipsis" />
      </template>
    </mine-search>-->
    <!-- 个人用户 -->
    <user-info v-if="!userInfo.company || userInfo.company.length === 0" :userInfo="userInfo" @linkDoctor="linkDoctor" />
    <!-- 团检用户 -->
    <companyUserInfo v-else :userInfo="userInfo" @linkDoctor="linkDoctor" />
    <my-order />

    <mine-section class="services" :sectionConent="getServices" />
    <mine-section :sectionConent="tools" />
    <div v-if="showLogout" class="logout" @click="$router.replace('/clear')">退出</div>
    <!-- <recommend /> -->
  </div>
</template>

<script>
import { Icon } from 'vant'
import { jumpLink } from '@/utils/tool'
import store from '@/store'
import MineSearch from '@/components/mine/MineSearch'
import userInfo from '@/components/mine/userInfo'
import companyUserInfo from '@/components/mine/companyUserInfo'
import myOrder from '@/components/mine/myOrder'
import mineSection from '@/components/mine/mineSection'
import recommend from '@/components/mine/Recommend'
import { ENV } from '@/config/env.js'
import { CHANNEL } from '@/config/common.js'
// const daishuUrl = window.daishuUrl
// const internalHospitalUrl = window.internalHospitalUrl
export default {
  name: 'mine',
  data() {
    return {
      tools: {
        titles: '常用工具',
        items: [
          {
            iconClass: 'icon_cart',
            text: '购物车',
            itemLink: '/cart',
            className: 'link_icon1',
            total: this.$store.state.cart.total,
            mode: 0,
            show: true
          },
          {
            iconClass: 'icon_coll',
            text: '收藏',
            itemLink: 'favorites',
            className: 'link_icon1',
            mode: 0,
            show: true
          },
          {
            iconClass: 'icon_coo',
            text: '地址',
            itemLink: '/address',
            className: 'link_icon1',
            mode: 0,
            show: true
          },
          {
            iconClass: 'icon_card',
            text: '卡密兑换',
            itemLink: 'to_app/1?attach[to]=login-card',
            className: 'link_icon1',
            mode: 1,
            show: brandConfig.medicalCard
          },
          {
            iconClass: 'icon_help',
            text: '帮助反馈',
            itemLink: 'to_app/1?attach[to]=feedback-help',
            className: 'link_icon1',
            mode: 1,
            show: true
          },
          {
            iconClass: 'icon_his',
            text: '浏览历史',
            itemLink: 'to_app/1?attach[to]=history-package',
            className: 'link_icon1',
            mode: 1,
            show: true
          }
        ]
      },
      services: {
        titles: '健康服务',
        items: [
          {
            iconClass: 'mine_icon_examination',
            text: '体检订单',
            className: 'link_icon2',
            itemLink: 'to_app/1?attach[to]=order-list',
            mode: 1,
            show: true
          },
          {
            iconClass: 'mine_icon_report',
            text: '体检报告',
            className: 'link_icon2',
            itemLink: 'to_app/1?attach[to]=report',
            mode: 1,
            show: true
          },

          {
            iconClass: 'mine_icon_inquiry',
            text: '我的咨询',
            className: 'link_icon2',
            itemLink: 'user/record',
            mode: 2,
            show: true
          },
          {
            iconClass: 'mine_icon_list',
            text: '处方单',
            className: 'link_icon2',
            itemLink: 'to_app/1028?attach[to]=prescription',
            mode: 1,
            show: true
          },
          {
            iconClass: 'mine_icon_drug',
            text: '好医生服务',
            className: 'link_icon2',
            itemLink: 'to_app/1?attach[to]=good-doc',
            mode: 1,
            show: brandConfig.goodDoctor
          },
          {
            iconClass: 'mine_icon_file',
            text: '健康档案',
            className: 'link_icon2',
            itemLink: '/health-records',
            mode: 0,
            show: true
          }
        ]
      },

      userInfo: {},

      pageShow: false
    }
  },
  components: {
    [Icon.name]: Icon,
    MineSearch,
    userInfo,
    myOrder,
    mineSection,
    recommend,
    companyUserInfo
  },
  created() {
    this.$store.commit('SET_LOADING', true)

    this.$store.dispatch('cart/getTotal').then((res) => {
      this.$set(this.tools.items[0], 'total', this.$store.state.cart.total)
    })
    this.getUserInfo()
  },
  methods: {
    linkDoctor() {
      if (ENV === 'dev') {
        jumpLink({ url: 'http://dev.daishu-component.com/' + window.pathname + 'to_app/1?attach[to]=good-doc' })
        return
      }

      jumpLink({
        url: window.baseUrl + window.pathname + 'to_app/1?attach[to]=good-doc'
      })
    },
    getUserInfo() {
      let params
      if (store.state.channel === CHANNEL) {
        params = {
          with_point: 1,
          with_tijian: 1,
          channel: CHANNEL
        }
      } else {
        params = {
          with_point: 1,
          with_tijian: 1
        }
      }
      this.$store.dispatch('user/getUserInfo', { params: params }).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data

          this.$store.commit('SET_LOADING', false)
          this.pageShow = true
        }
      })
    }
  },
  computed: {
    showLogout() {
      return location.href.match(/console=1/)
    },
    getServices() {
      //这里处理合伙人入口是否展示 3 / 4 表示已经激活了 可以展示
      const status = this.$store.state.agentCardInfo.centerPartnerStatus
      let services = this.services

      if (status === 3 || status === 4) {
        services.items.push({
          iconClass: 'mine_icon_comp',
          text: '健康合伙人',
          className: 'link_icon2',
          itemLink: '/partner',
          mode: 3,
          show: true
        })
      }

      return services
    }
  },
  beforeRouteEnter(to, form, next) {
    if (store.state.thirdParty === '10000002') {
      next('/cmb-home')
      return
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.services {
  /deep/ svg {
    font-size: 64px;
  }
}
.logout {
  position: fixed;
  right: 20px;
  bottom: 120px;
  width: 60px;
  height: 60px;
  background-color: @theme;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
}
</style>
