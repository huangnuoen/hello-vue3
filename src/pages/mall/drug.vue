<template>
  <div class="submall">
    <TopSearchBar @toSearch="toSearch" placeholder="搜索药品">
      <template #left>
        <svg-icon class="service" @click="toCall" iconClass="home_icon_service"></svg-icon>
      </template>
      <template #right>
        <van-icon :badge="total" @click="$router.push('/cart')">
          <svg-icon icon-class="welfare_icon_cart"></svg-icon>
        </van-icon>
      </template>
    </TopSearchBar>
    <Carousel :banners="banners" v-if="banners.length" @link="toLink"></Carousel>
    <DrugClassEntry :list="cateList" @link="toGoodsList"></DrugClassEntry>
    <PlateTitle :info="{name: '精选商品', tip: '', url: `/submall?store_id=${$route.query.store_id}`}"></PlateTitle>
    <van-list v-if="goodsList.length" v-model="smallLoading" :immediate-check="false" :finished="finished"
      :finished-text="finishText" @load="onLoad">
      <GoodsItem v-for="item in goodsList" :item="item" :key="item.id" @click.native="toGoods(item)"></GoodsItem>
    </van-list>
    <Empty v-if="!smallLoading&&!goodsList.length" desc="暂无商品~" img="oder_img_empty" style="paddingTop:93px;">
    </Empty>
  </div>
</template>
<script>
import { Icon, Divider, DropdownMenu, DropdownItem, List } from 'vant'
import GoodsItem from '@/components/mall/GoodsItem'
import variable from '@/style/variable.less'
import * as types from '@/store/mutation-types'
import Empty from '@/base/Empty/Empty'
import loadingMixin from '@/mixins/loadingMixin'
import TopSearchBar from '@/components/mall/TopSearchBar'
import Carousel from '@/components/home/Carousel'
import DrugClassEntry from '@/components/mall/DrugClassEntry'
import { PHONE_NUM } from '@/config/common'
import { jumpLink } from '@/utils/tool'
import PlateTitle from '@/components/home/PlateTitle'
export default {
  name: 'submall',
  mixins: [loadingMixin],
  components: {
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Divider.name]: Divider,
    [List.name]: List,
    GoodsItem,
    Empty,
    TopSearchBar,
    Carousel,
    DrugClassEntry,
    PlateTitle
  },
  data() {
    return {
      variable,
      smallLoading: true,
      finished: false,
      value: 0,
      curOrg: { text: '全部机构', value: 0 },
      curCity: undefined,
      goodsList: [],
      orgList: [],
      submallDetail: {},
      cityList: [],
      page: 1,
      searchParams: {},
      finishText: '',
      banners: [],
      cateList: []
    }
  },
  mounted() {
    this.getBanner()
    this.getOrgList(this.currentCity.id)
    // 商城详情
    this.getSubmall()
    this.getCateList()
    this.$store.dispatch('cart/getTotal')
  },
  methods: {
    getBanner() {
      this.$api.pageconfig.getList({ type: 3 }).then((res) => {
        if (res.code === 200) {
          this.banners = res.data.banner_drug_mall || []
        }
      })
    },
    getCateList() {
      this.$api.store.productCate().then((res) => {
        this.cateList = res.data.cateList
      })
    },

    getSubmall() {
      this.$api.store.stores({ id: this.$route.query.store_id }).then((res) => {
        this.submallDetail = res.data
        this.$store.commit('UPDATE_TITLE_BAR_TITLE', res.data.name)
      })
    },
    // 当前城市供应商列表
    getOrgList(city_id) {
      this.$api.hmp.suppliers({ ...this.$route.query }).then((res) => {
        const list = []
        this.orgList = res.data.map((item) => {
          // 格式化成vant需要的格式
          list.push(item.name)
          return { text: item.name, value: item.id }
        })
        // 全部机构作为第一筛选项
        this.orgList.unshift({ text: '全部机构', value: 0 })
        this.curOrg = this.orgList[0].value
        // 重新获取当前选择城市的商品列表
        this.goodsList = []
        this.page = 1
        this.searchParams.city_id = city_id
        this.searchParams.supplier_id = this.curOrg
        // this.getGoodsList(this.searchParams)
        this.getGoodsList()
        // 免责声明弹窗
        this.showDisclaimer(list)
      })
    },
    showDisclaimer(list) {
      // 用户当日首次进入子商城，触发弹窗；
      const popupInfo = this.$store.state.popup.submall
      const store_id = this.$route.query.store_id
      const today = new Date().getDate()
      if (popupInfo) {
        const date = popupInfo[store_id]
        // 检查是否弹出过
        if (date && date === today) {
          return
        }
      }
      this.$dialog
        .alert({
          title: '免责声明',
          message: `本服务由${list.join('、')}提供，相关责任将由以上供应商承担，如有问题请咨询客服。`,
          confirmButtonText: '知道了',
          messageAlign: 'left'
        })
        .then(() => {
          // 记录子商城弹窗信息，store_id为key,date为value
          this.$store.commit('popup/SET_SUBMALL_POPUP', { [store_id]: today })
        })
    },
    getGoodsList(params) {
      this.finished = false
      this.smallLoading = true
      if (!this.goodsList.length) {
        this.setLoading(true)
      }
      this.$api.store.products({ params: { ...this.$route.query, is_recommend: 1, ...params, page: this.page } }).then((res) => {
        this.setLoading(false)
        this.smallLoading = false
        if (res.code === 200) {
          this.goodsList = res.data.data.map((item) => {
            return { ...item, is_recommend: 1 }
          })
          this.finished = true
        }
      })
    },
    onLoad() {
      this.getGoodsList()
      // this.getGoodsList(this.searchParams)
    },
    toGoods(item) {
      this.$router.push(`/goods/${item.id}`)
    },
    toGoodsList(item) {
      this.$router.push(`/submall?store_id=${this.$route.query.store_id}&cate_id=${item.id}`)
    },
    toLink(item) {
      jumpLink({ url: item.target_url })
    },
    toCall() {
      location.href = `tel:${PHONE_NUM}`
    },
    toSearch() {
      this.$router.push('/search/drug?store_id=' + this.$route.query.store_id)
    },
    chooseCity(id) {
      this.getOrgList(id)
    },
    chooseOrg(id) {
      this.goodsList = []
      this.searchParams.supplier_id = id
      this.page = 1

      this.getGoodsList(this.searchParams)
    }
  },
  computed: {
    currentCity() {
      return this.$store.state.currentCity
    },
    total() {
      return this.$store.state.cart.total
    }
  },
  watch: {},
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'goods') {
      this.$store.commit(types.DELETE_KEEPALIVEPAGES, from.name)
    }
    next()
  }
}
</script>
<style lang="less">
.van-search .van-cell {
  padding: 0;
}
</style>
<style lang="less" scoped>
.submall {
  background-color: #fff;
  flex: 1;
  .top-search-bar {
    svg {
      font-size: 48px;
    }
  }

  .banner {
    // height: 538px;
    width: 100%;
    margin-bottom: 16px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: @bg;
    }
  }
  .van-dropdown-menu {
    position: sticky;
    top: 82px;
    background-color: #fff;
    z-index: 10;
  }
  .van-list {
    padding: 0 30px;
  }
}
</style>
