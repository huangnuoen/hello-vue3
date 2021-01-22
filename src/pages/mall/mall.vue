<template>
  <div class="mall" data-mtakey="welfareAppClient">
    <!-- 搜索栏 -->
    <TopSearchBar @toSearch="toSearch" placeholder="关爱父母健康体检">
      <template #left>
        <div class="city" @click="$router.push('city-list')">
          {{ currentCity.area_name }}
          <svg-icon icon-class="icon_arrow_down"></svg-icon>
        </div>
      </template>
      <template #right>
        <van-icon :badge="total" @click="$router.push('/cart')">
          <svg-icon icon-class="welfare_icon_cart"></svg-icon>
        </van-icon>
      </template>
    </TopSearchBar>
    <!-- <Carousel :banners="banner" @link="toLink"></Carousel> -->
    <MyPoints :item="user" @toFuli="toFuli"></MyPoints>
    <!-- 一级运营位 -->
    <FirstEntry :list="firstEntries" :loading="loadingFirstEntry" @link="toLink" data-areaname="一级运营位"></FirstEntry>
    <!-- 商品推荐 -->
    <van-tabs
      sticky
      :border="false"
      :ellipsis="false"
      line-width="24px"
      :background="variable.bg"
      v-model="curTab"
      :color="variable.theme"
      title-active-color="#303233"
    >
      <van-tab :title="item.title" v-for="item in categoryList" :key="item.id" :name="item.id">
        <van-list v-model="smallLoading" loading-text=" " :immediate-check="false" :finished="finished[item.id]" @load="loadmore">
          <GoodsRecommend :loading="goodsLoading[item.id]" :list="goodsList[item.id]"></GoodsRecommend>
        </van-list>
      </van-tab>
    </van-tabs>
    <BackTop :bottom="75" :right="12"></BackTop>

    <!-- 二级运营位 -->
    <!-- <SecondEntry :list="subOp" @link="toLink" data-areaname="一级运营位"></SecondEntry> -->
    <!-- 三级运营位 -->
    <!-- <ThirdEntry :list="healthLifeMain" @link="toLink" data-areaname="健康生活"></ThirdEntry> -->
    <!-- 二级运营位 -->
    <!-- <SecondEntry :list="healthLifeSub" @link="toLink" data-areaname="健康生活"></SecondEntry> -->
    <!-- 我的医生 -->
    <!-- <MyDoctor></MyDoctor> -->
    <!-- 直播预告 -->
    <!-- <LiveEntry :item="live_banner" @link="toLink"></LiveEntry> -->
    <!-- 今日特惠 -->
    <!-- <Recommend :list="products" @link="toLink"></Recommend> -->
    <!-- <AdvertEntry :item="advert" @link="toLink"></AdvertEntry> -->
    <!-- <div class="footer">
      <div class="tips">已经到底了哦</div>
    </div> -->
  </div>
</template>
<script>
import { Icon, Divider, DropdownMenu, DropdownItem, Tab, Tabs, List } from 'vant'
import store from '@/store'
import FirstEntry from '@/components/mall/FirstEntry'
import TopSearchBar from '@/components/mall/TopSearchBar'
import SecondEntry from '@/components/mall/SecondEntry'
import ThirdEntry from '@/components/mall/ThirdEntry'
import Carousel from '@/components/home/Carousel'
import GoodsRecommend from '@/components/mall/GoodsRecommend'
import MyPoints from '@/components/mall/MyPoints'
import MyDoctor from '@/components/mall/MyDoctor'
import LiveEntry from '@/components/mall/LiveEntry'
import AdvertEntry from '@/components/mall/AdvertEntry'
import variable from '@/style/variable.less'
import BackTop from '@/base/BackTop/BackTop'
import * as types from '@/store/mutation-types'
import { jumpLink, waitLoading } from '@/utils/tool'
export default {
  name: 'mall',
  components: {
    GoodsRecommend,
    Carousel,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Divider.name]: Divider,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Tab.name]: Tab,
    FirstEntry,
    SecondEntry,
    MyPoints,
    MyDoctor,
    ThirdEntry,
    LiveEntry,
    AdvertEntry,
    BackTop,
    TopSearchBar
  },
  data() {
    return {
      variable,
      banner: [],
      advert: {},
      firstEntries: [],
      loadingFirstEntry: true,
      subOp: [],
      healthLifeMain: [],
      healthLifeSub: [],
      live_banner: {},
      products: [],
      categoryList: [],
      curTab: '',
      // 储存几个tab的数据，key为tab.id
      goodsList: {},
      goodsLoading: {},
      finished: {},
      smallLoading: false,
      page: {}
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
        this.$toast('即将开放，敬请期待')
        return
      }
      jumpLink({ url: item.target_url })
    },
    init() {
      // this.$api.store.home_layout().then((res) => {
      //   this.loading = false
      //   if (res.code === 200) {
      //     this.advert = res.data.ad
      //     this.live_banner = res.data.live_banner
      //   }
      // })
      // 运营位配置
      this.$api.pageconfig
        .getList({ type: 2 })
        .then((res) => {
          if (res.code === 200) {
            this.banner = res.data.banner_mall || []
            this.firstEntries = res.data.mall_operation_1 || []
            this.subOp = res.data.mall_operation_2 || []
            this.healthLifeMain = res.data.mall_operation_3 || []
            this.healthLifeSub = res.data.mall_operation_4 || []
          }
        })
        .finally(() => {
          this.loadingFirstEntry = false
        })
      this.$api.store.category().then((res) => {
        if (res.code === 200) {
          this.categoryList = res.data
          this.curTab = res.data[0].id
          // 初始化goodslist
          this.categoryList.forEach((item) => {
            this.$set(this.goodsList, item.id, [])
          })
        }
      })

      this.$store.dispatch('user/getUserInfo', { params: { with_point: 1 } })
      this.$store.dispatch('cart/getTotal')
    },

    getGoodsList(store_category_id) {
      if (!this.page[store_category_id]) {
        this.$set(this.goodsLoading, store_category_id, true)
        this.$set(this.page, store_category_id, 0)
      }
      this.page[store_category_id]++
      // 至少loading 1s
      // waitLoading(this.$api.store.products({ params: { store_category_id } }), 500)
      waitLoading(this.$api.store.products({ params: { page: this.page[store_category_id], suggest_id: store_category_id } }), 500)
        .then((res) => {
          if (res.code === 200) {
            const list = this.goodsList[store_category_id].concat(res.data.data)
            this.goodsList[store_category_id] = list
            if (list.length >= res.data.total) {
              this.$set(this.finished, store_category_id, true)
            }
          }
        })
        .finally(() => {
          this.smallLoading = false
          this.goodsLoading[store_category_id] = false
        })
    },
    loadmore() {
      console.log(this.curTab)
      this.getGoodsList(this.curTab)
    },
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
  },
  watch: {
    curTab(val) {
      if (!this.page[val]) {
        this.smallLoading = true
        this.getGoodsList(val)
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'goods') {
      this.$store.commit(types.DELETE_KEEPALIVEPAGES, from.name)
    }
    next()
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.thirdParty === '10000002') {
      next('/cmb-home')
      return
    }
    next()
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.mall {
  .safe-padding-bottom(50px);
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
      svg {
        font-size: 48px;
      }
    }
  }
  .van-tabs {
    // padding: 0;
    // position: sticky;
    // top: 0;
    // padding-bottom: 30px;
    // z-index: 10;
    .van-list {
      padding-top: 20px;
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
