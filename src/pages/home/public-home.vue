<template>
  <div class="home" v-if="pageShow">
    <!-- 搜索栏 -->
    <!-- <div class="search">
      <div class="city" @click="$router.push('city-list')">
        {{ currentCity.area_name }}
        <svg-icon class="city_select" iconClass="icon_arrow_down"></svg-icon>
      </div>
      <div class="search-input" @click="toSearch"><svg-icon class="city_select" iconClass="icon_ser"></svg-icon><span>入职体检</span></div>
      <svg-icon class="customer-service" iconClass="icon_service" @click="toCustomer"></svg-icon>
      <div class="consulting-service" @click="toInternalHospitalUrl">
        <svg-icon class="consulting-svg" iconClass="icon_news"></svg-icon>
      </div>
    </div>-->

    <!-- 搜索栏 -->
    <TopSearchBar @toSearch="toSearch" placeholder="关爱父母健康体检">
      <template #left>
        <div class="city" @click="$router.push('city-list')">
          {{ currentCity.area_name }}
          <svg-icon icon-class="icon_arrow_down"></svg-icon>
        </div>
      </template>
      <template #right>
        <van-icon @click="$customerService.link_to()">
          <svg-icon icon-class="icon_service"></svg-icon>
        </van-icon>
        <van-icon dot @click="toInternalHospitalUrl">
          <svg-icon class="consulting-svg" iconClass="icon_news"></svg-icon>
        </van-icon>
      </template>
    </TopSearchBar>

    <div class="banner">
      <div class="banner-box">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(banner_item, index) in banner_list" :key="index" @click="linkto(banner_item)">
            <img :src="banner_item.pic_url" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <!-- 去预约 去体检 -->
    <div class="go">
      <div v-for="(operation_2_item, index) in operation_2" :key="index" @click="linkto(operation_2_item)">
        <img :src="operation_2_item.pic_url" alt />
      </div>
      <!-- <div>
        <svg-icon class="go_1" iconClass="home_img_1"></svg-icon>
      </div>
      <div>
        <svg-icon class="go_2" iconClass="home_img_2"></svg-icon>
      </div>-->
    </div>

    <!-- 一级运营位 -->
    <div class="first-entry">
      <div>
        <div class="item" v-for="(operation_1_item, index) in get_operation_1" :key="index" @click="linkto(operation_1_item)">
          <img :src="operation_1_item.pic_url" alt />
          <p>{{ operation_1_item.title }}</p>
        </div>

        <div class="item" v-if="operation_1.length > 10">
          <svg-icon class="all-service" iconClass="home_icon_10" @click="$router.push('/physical-examination')"></svg-icon>
          <p>所有服务</p>
        </div>
      </div>

      <!-- <div>
        <div class="item" v-for="(operation_2_item, index) in operation_2.slice(5, 9)" :key="index" @click="linkto(operation_2_item)">
          <img :src="operation_2_item.pic_url" alt="" />
          <p>{{ operation_2_item.title }}</p>
        </div>
      </div>-->
    </div>

    <!-- 健康卡 -->
    <partner-card />

    <!-- 三级运营位 -->
    <div class="second-entry">
      <div class="titles">
        <div>健康管理</div>
        <div @click="toInternalHospitalHome" class="all">
          互联网医院
          <svg-icon class="all_svg" iconClass="icon_arrow_rig"></svg-icon>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="(operation_3_item, index) in operation_3" :key="index" v-waves @click="linkto(operation_3_item)">
          <img :src="operation_3_item.pic_url" class="icon" />
        </div>
      </div>
    </div>

    <div class="titles" v-if="orgList.length">
      <div>推荐机构</div>
      <div @click="linkto(moreOrg)" class="all">
        查看全部
        <svg-icon class="all_svg" iconClass="icon_arrow_rig"></svg-icon>
      </div>
    </div>

    <!-- 推荐机构 -->
    <org-list :orgs="orgList" @linkto="linkto" />

    <!-- 推荐套餐 -->
    <package-list :packages="packageList" @linkto="linkto" :more="morePackage" />

    <div class="footer">
      <div class="tips">已经到底了哦</div>
    </div>
    <!-- 优惠券弹框 -->
    <van-popup v-model="couponShow">
      <div class="coupon-bg">
        <img class="coupon-btn" :src="require('@/images/sz-metro/img_btn@2x.png')" @click="checkCoupon" />
      </div>
    </van-popup>

    <!-- 提醒登录 -->
    <tips-login />
  </div>
</template>

<script>
import { Icon, Swipe, SwipeItem, Popup } from 'vant'
import OrgList from '@/components/public-home/OrgList'
import PackageList from '@/components/public-home/PackageList'
import customerService from '@/utils/customerService'
import TopSearchBar from '@/components/mall/TopSearchBar'
import PartnerCard from '@/components/public-home/PartnerCard'
import TipsLogin from '@/components/public-home/TipsLogin'
import { jumpLink, getFlatternDistance, GetQueryString } from '@/utils/tool'
import { ENV } from '@/config/env.js'
import { CHANNEL } from '@/config/common.js'
import store from '@/store'
export default {
  name: 'home',
  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Popup.name]: Popup,
    OrgList,
    PackageList,
    TopSearchBar,
    PartnerCard,
    TipsLogin
  },
  data() {
    return {
      couponShow: false,
      pageShow: false,
      banner_list: [],
      operation_1: [],
      operation_2: [],
      operation_3: [],
      infos: 1,
      orgList: [],
      packageList: [],
      moreOrg: null,
      morePackage: null
    }
  },
  computed: {
    currentCity() {
      return this.$store.state.currentCity
    },
    get_operation_1() {
      return this.operation_1.length > 10 ? this.operation_1.slice(0, 9) : this.operation_1
    }
  },
  created() {
    this.init()

    this.$store.dispatch('user/getUserInfo', { withoutLogin: true }).then((res) => {
      if (res.code === 200) {
        if (!res.data.has_labels && !this.$store.state.user.skipDraw) {
          this.$router.push('/topic')
        }
      }
    })
  },
  watch: {
    $route(cur, pre) {
      if (pre.path === '/city-list') {
        setTimeout(() => {
          this.getRecommendList()
        }, 500)
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.openCoupon()
    })
  },
  methods: {
    // 优惠券弹框
    openCoupon() {
      // 有优惠券channel存起来,避免登录返回丢失参数
      const channel = CHANNEL
      // 带了优惠券channel,并且没领取过,弹框
      if (store.state.channel === channel && localStorage.getItem('isGetCoupon') !== '1') {
        this.couponShow = true
      }
    },
    // 判断优惠券
    async checkCoupon() {
      const res = await this.$api.shopping_cart.checkCoupon()
      if (res.code === 200) {
        this.getCoupon()
      } else {
        res.message !== '未登陆' && this.$toast(res.message)
      }
    },
    // 获取优惠券
    async getCoupon() {
      const res = await this.$api.shopping_cart.getCoupon()
      if (res.code === 200) {
        // 领取标记
        this.$toast('领取成功')
        localStorage.setItem('isGetCoupon', 1)
      } else if (res.code === 201) {
        //增加一个已经领取标识
        localStorage.setItem('isGetCoupon', 1)
        this.$toast(res.message)
      } else {
        this.$toast(res.message)
      }
      this.couponShow = false
    },

    //看到这里 再看看下面的getRecommendList 很多相同的代码
    //原因是轮播图的加载 和 下面机构轮播图的加载 会出现很多奇怪的问题 尽量别动
    init() {
      this.$store.commit('SET_LOADING', true)

      Promise.all([
        this.$api.home.org_list({ isHome: 1, area_code: this.currentCity.city_code }),
        this.$api.home.get_hot_package({ area_code: this.currentCity.city_code }),
        this.$api.home.home_operation()
      ]).then((res) => {
        setTimeout(() => {
          const res1 = res[0]
          const res2 = res[1]
          const res3 = res[2]

          const localPoint = this.$store.state.localPoint

          if (res1.code === 200 && !Array.isArray(res1.data)) {
            if (localPoint && localPoint.lat && localPoint.lng) {
              res1.data.list.forEach((item) => {
                const distance = getFlatternDistance(item.lon_lat.split(',')[1], item.lon_lat.split(',')[0], localPoint.lat, localPoint.lng)

                item.distance = distance.toFixed(2)
              })
            }

            const orgList = []
            const orgList1 = res1.data.list.slice(0, 3) || []
            const orgList2 = res1.data.list.slice(3, 6) || []
            const orgList3 = res1.data.list.slice(6, 9) || []

            orgList1.length ? orgList.push(orgList1) : ''
            orgList2.length ? orgList.push(orgList2) : ''
            orgList3.length ? orgList.push(orgList3) : ''

            this.orgList = orgList
            this.moreOrg = res1.data.more

            // console.log(this.orgList)
          }

          if (res2.code === 200 && !Array.isArray(res2.data)) {
            this.packageList = res2.data.list || []
            this.morePackage = res2.data.more
          }

          if (res3.code === 200) {
            this.banner_list = res3.data.banner_list || []
            this.operation_1 = res3.data.home_operation_1 || []
            this.operation_2 = res3.data.home_operation_2 || []
            this.operation_3 = res3.data.home_operation_3 || []
          }

          this.$store.commit('SET_LOADING', false)
          this.pageShow = true
        }, 1000)
      })
    },
    // getConfig() {
    //   this.$api.home.home_operation().then((res) => {
    //     if (res.code === 200) {
    //       this.banner_list = res.data.banner_list || []
    //       this.operation_1 = res.data.home_operation_1 || []
    //       this.operation_2 = res.data.home_operation_2 || []
    //       this.operation_3 = res.data.home_operation_3 || []
    //     }
    //   })
    // },

    getRecommendList() {
      this.$store.commit('SET_LOADING', true)

      Promise.all([
        this.$api.home.org_list({ isHome: 1, area_code: this.currentCity.city_code }),
        this.$api.home.get_hot_package({ area_code: this.currentCity.city_code })
      ]).then((res) => {
        const res1 = res[0]
        const res2 = res[1]

        const localPoint = this.$store.state.localPoint

        if (res1.code === 200 && !Array.isArray(res1.data)) {
          if (localPoint && localPoint.lat && localPoint.lng) {
            res1.data.list.forEach((item) => {
              const distance = getFlatternDistance(item.lon_lat.split(',')[1], item.lon_lat.split(',')[0], localPoint.lat, localPoint.lng)

              item.distance = distance.toFixed(1)
            })
          }

          const orgList = []
          const orgList1 = res1.data.list.slice(0, 3) || []
          const orgList2 = res1.data.list.slice(3, 6) || []
          const orgList3 = res1.data.list.slice(6, 9) || []

          orgList1.length ? orgList.push(orgList1) : ''
          orgList2.length ? orgList.push(orgList2) : ''
          orgList3.length ? orgList.push(orgList3) : ''

          this.orgList = orgList
          this.moreOrg = res1.data.more

          // console.log(this.orgList)
        }

        if (res2.code === 200 && !Array.isArray(res2.data)) {
          this.packageList = res2.data.list || []
          this.morePackage = res2.data.more
        }

        this.$store.commit('SET_LOADING', false)
      })
    },

    //去搜索页面
    toSearch() {
      jumpLink({ url: window.daishuUrl + 'search' })
    },

    //去客服页面
    toCustomer() {
      customerService.link_to()
    },

    //去互联网医院咨询页面
    toInternalHospitalUrl() {
      jumpLink({ url: window.internalHospitalUrl + 'user/record' })
    },

    //去互联网医院首页
    toInternalHospitalHome() {
      if (ENV === 'dev') {
        jumpLink({ url: 'http://dev.daishu-component.com/' + window.pathname + 'to_app/1028?attach[to]=home' })
        return
      }
      jumpLink({ url: window.baseUrl + window.pathname + 'to_app/1028?attach[to]=home' })

      // jumpLink({ url: window.internalHospitalUrl + 'user/home?isHome=1' })
    },

    linkto(item) {
      if (!item.target_url && !item.redirect_url) {
        // this.$toast('暂未开放，敬请期待')
        return
      } else if (item.target_url) {
        jumpLink({ url: item.target_url })
      } else if (item.redirect_url) {
        jumpLink({ url: item.redirect_url })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/mixin.less');

.home {
  /deep/.van-popup {
    background: transparent;
  }
  background-color: #f8f9fa;
  .coupon-bg {
    width: 542px;
    height: 760px;
    background: url('~@/images/sz-metro/coupon@3x.png') no-repeat center center / 100% 100%;
  }
  .coupon-btn {
    position: absolute;
    bottom: 40px;
    left: 106px;
    width: 330px;
    height: 92px;
    display: block;
  }
  // .search {
  //   width: 100%;
  //   height: 120px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   padding: 0px 30px;

  //   .city {
  //     font-size: 28px;
  //     font-family: @Medium;
  //     // font-weight: 500;
  //     color: #303233;
  //     line-height: 28px;
  //     .ellipsis-line(150px, 1);
  //     svg {
  //       font-size: 24px;
  //       vertical-align: baseline;
  //     }
  //   }

  //   .search-input {
  //     width: 418px;
  //     height: 72px;
  //     background: #ffffff;
  //     box-shadow: 0px 8px 16px 0px rgba(155, 167, 178, 0.08);
  //     border-radius: 36px;
  //     font-size: 28px;
  //     font-family: @Regular;
  //     color: #85898c;
  //     line-height: 28px;
  //     display: flex;
  //     align-items: center;
  //     justify-content: flex-start;
  //     padding-left: 40px;
  //     .city_select {
  //       width: 32px;
  //       width: 32px;
  //       margin-right: 8px;
  //     }
  //   }

  //   .customer-service,
  //   .consulting-service {
  //     width: 52px;
  //     height: 52px;
  //     position: relative;

  //     &::after {
  //       content: '';
  //       position: absolute;
  //       right: 0;
  //       top: 0;
  //       width: 15px;
  //       height: 15px;
  //       border-radius: 50%;
  //       background: #f53134;
  //     }

  //     .consulting-svg {
  //       width: 100%;
  //       height: 100%;
  //     }

  //     .info {
  //       width: 30px;
  //       height: 30px;
  //       position: absolute;
  //       top: -25%;
  //       right: -25%;
  //       background: #f53134;
  //       border-radius: 50%;
  //       color: #fff;
  //       font-size: 12px;
  //       text-align: center;
  //       line-height: 30px;
  //     }
  //   }
  // }

  .top-search-bar {
    .city {
      font-size: 28px;
      color: @black-d;
      svg {
        font-size: 24px;
        vertical-align: baseline;
      }
      .ellipsis-line(150px, 1);
    }
    .van-icon {
      &:last-child {
        margin-left: 20px;
      }
      svg {
        font-size: 52px;
      }
      /deep/ .van-info--dot {
        top: 6px;
        right: 8px;
      }
    }
  }

  .banner {
    margin-bottom: 8px;

    .banner-box {
      padding: 16px 30px;
      position: relative;

      /deep/ .my-swipe {
        border-radius: 24px;
        overflow: hidden;
        .van-swipe-item {
          width: 100%;
          img {
            height: 192px;
            width: 100%;
            border-radius: 24px;
            box-shadow: 0px 16px 24px 0px rgba(160, 169, 178, 0.06);
            object-fit: cover;
          }
        }

        .van-swipe__indicators {
          bottom: 32px;

          .van-swipe__indicator {
            background-color: #dfe2e6 !important;

            &.van-swipe__indicator--active {
              background-color: #ffb01a !important;
            }
          }
        }
      }
    }
  }

  .go {
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      width: 336px;
      height: 174px;

      img {
        width: 336px;
        height: 174px;
        object-fit: cover;
      }
      .go_1,
      .go_2 {
        width: 100%;
        height: 100%;
      }
    }
  }

  .first-entry {
    padding: 40px 46px 20px;

    > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;

      &:first-child {
        margin-bottom: 40px;
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        width: 20%;

        &:nth-child(n + 6) {
          margin-top: 30px;
        }

        img {
          width: 80px;
          height: 80px;
          margin-bottom: 18px;
          object-fit: cover;
        }

        .all-service {
          width: 80px;
          height: 80px;
          margin-bottom: 18px;
        }

        p {
          width: 96px;
          height: 24px;
          font-size: 24px;
          font-family: @Regular;
          color: #3d3e40;
          white-space: nowrap;
        }
      }
    }
  }

  .titles {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    color: #303233;
    font-size: 32px;

    .all {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #85898c;
      font-size: 24px;

      .all_svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  .second-entry {
    margin-bottom: 10px;

    .content {
      height: 400px;
      padding: 0 30px;
      .item {
        font-size: 0;
        display: inline-block;
        float: left;
        &:first-child {
          width: 218px;
          height: 368px;
          margin-right: 16px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        &:nth-child(2) {
          width: 456px;
          height: 176px;
          margin-right: 0;
          margin-bottom: 16px;
        }

        &:nth-child(3),
        &:nth-child(4) {
          width: 218px;
          height: 176px;
        }
        &:nth-child(3) {
          margin-right: 18px;
        }
      }
    }
  }

  .footer {
    background-color: @bg;
    padding: 32px 0;
    .tips {
      text-align: center;
      color: @grey-l;
      font-size: 26px;
    }
  }
}
</style>
