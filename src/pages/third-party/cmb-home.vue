<template>
  <div class="mall" data-mtakey="welfareAppClient">
    <div class="cmb_bg">
      <!-- 搜索栏 -->
      <TopSearchBar @toSearch="toSearch" placeholder="关爱父母健康体检">
        <template #left>
          <div class="city" @click="$router.push('city-list')">
            <span>{{ currentCity.area_name }}</span>
            <img :src="require('@/images/third-party/cmb/icon_arrow@2x.png')" alt />
          </div>
        </template>
        <template #right>
          <van-icon :badge="total" @click="$router.push('/cart')">
            <img class="card-icon" :src="require('@/images/third-party/cmb/icon_cart@2x.png')" alt />
          </van-icon>
        </template>
      </TopSearchBar>
      <Carousel :banners="banner" @link="toLink"></Carousel>
      <div class="cmb-body">
        <!-- 一级运营位 -->
        <FirstEntry :list="firstEntries" @link="toLink" data-areaname="一级运营位"></FirstEntry>
        <!-- 二级运营位 -->
        <ThirdEntry :list="healthLifeMain" @link="toLink" data-areaname="健康生活"></ThirdEntry>
      </div>
    </div>
    <div class="footer">
      <div class="tips">已经到底了哦</div>
    </div>
  </div>
</template>
<script>
import { Icon, Divider, DropdownMenu, DropdownItem, Skeleton } from 'vant'
import FirstEntry from '@/components/third-party/cmb/FirstEntry'
import TopSearchBar from '@/components/mall/TopSearchBar'
import SecondEntry from '@/components/mall/SecondEntry'
import ThirdEntry from '@/components/third-party/cmb/ThirdEntry'
import Carousel from '@/components/third-party/cmb/banner'
import Recommend from '@/components/mall/Recommend'
import MyPoints from '@/components/mall/MyPoints'
import MyDoctor from '@/components/mall/MyDoctor'
import LiveEntry from '@/components/mall/LiveEntry'
import AdvertEntry from '@/components/mall/AdvertEntry'
import { jumpLink } from '@/utils/tool'
// import loadingMixin from '@/mixins/loadingMixin'
export default {
  // mixins: [loadingMixin],
  components: {
    Recommend,
    Carousel,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Divider.name]: Divider,
    [Skeleton.name]: Skeleton,
    FirstEntry,
    SecondEntry,
    MyPoints,
    MyDoctor,
    ThirdEntry,
    LiveEntry,
    AdvertEntry,
    TopSearchBar
  },
  data() {
    return {
      banner: [],
      advert: {},
      firstEntries: [],
      subOp: [],
      healthLifeMain: [],
      healthLifeSub: [],
      live_banner: {},
      products: []
    }
  },
  mounted() {
    this.loading = true
    this.init()
  },
  methods: {
    toSearch() {
      jumpLink({ url: window.daishuUrl + 'search' })
    },
    toFuli() {
      jumpLink({ url: window.fuliUrl + 'integral' })
    },
    toLink(item) {
      if (!item.target_url) {
        this.$toast(item.title == '企业团检' ? '暂无权限~' : '即将开放，敬请期待')
        return
      }
      jumpLink({ url: item.target_url, replace: true })
    },
    init() {
      this.$api.store
        .home_layout({
          src: this.$store.state.thirdParty
        })
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.advert = res.data.ad
            this.live_banner = res.data.live_banner
          }
        })
      // 运营位配置
      this.$api.pageconfig.getList({ type: 2, src: this.$store.state.thirdParty }).then((res) => {
        if (res.code === 200) {
          this.banner = res.data.banner_mall || []
          this.firstEntries = res.data.mall_operation_1 || []
          this.subOp = res.data.mall_operation_2 || []
          this.healthLifeMain = res.data.mall_operation_3 || []
          this.healthLifeSub = res.data.mall_operation_4 || []
        }
      })

      this.$api.store.home_product().then((res) => {
        if (res.code === 200) {
          this.products = res.data
        }
      })

      this.$store.dispatch('user/getUserInfo', { params: { with_point: 1 } })
      this.$store.dispatch('cart/getTotal')
    },
    onConfirm() {},
    onLoad() {}
  },
  computed: {
    total() {
      return this.$store.state.cart.total
    },
    user() {
      return this.$store.state.user.user
    },
    currentCity() {
      return this.$store.state.currentCity
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.mall {
  background-color: #fff;
  .cmb_bg {
    background-image: linear-gradient(#ffa513, #ffffff);
    padding: 0 20px;
  }
  .cmb-body {
    background-color: #fff;
    margin-top: 32px;
    border-radius: 20px;
  }
  .top-search-bar {
    padding: 24px 8px 30px 8px;
    .city {
      font-size: 32px;
      color: @black-d;
      span {
        color: #fff;
        max-width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img {
        width: 30px;
        margin-left: 5px;
        vertical-align: baseline;
      }
      //   .ellipsis-line(150px, 1);
      display: flex;
      align-items: center;
    }
    .van-icon {
      .card-icon {
        width: 48px;
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
