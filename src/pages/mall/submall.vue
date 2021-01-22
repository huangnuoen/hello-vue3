<template>
  <div class="submall">
    <div class="banner" v-if="submallDetail.img_banner&&!showDropMenu">
      <img :src="submallDetail.img_banner" alt="">
    </div>
    <!-- <van-dropdown-menu :active-color="variable.theme">
      <van-dropdown-item v-model="curCity" :title="curCity?'':currentCity.area_name" @change="chooseCity"
        :options="cityList" />
      <van-dropdown-item v-model="curOrg" :options="orgList" @change="chooseOrg" />
    </van-dropdown-menu> -->
    <van-dropdown-menu :active-color="variable.theme" v-if="showDropMenu">
      <van-dropdown-item v-model="searchParams.order_type" :options="sortList" @change="chooseSort" />
      <van-dropdown-item :title="cate_name" ref="classePanel" v-model="searchParams.cate_id"  >
        <DropMenu :list="cateList" @change="chooseClass" v-model="searchParams.cate_id"></DropMenu>
      </van-dropdown-item>
    </van-dropdown-menu>

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
import goodsListMixin from '@/mixins/goodsListMixin'
import loadingMixin from '@/mixins/loadingMixin'
import DropMenu from '@/components/mall/DropMenu'
import { SUBMALL_TYPE } from '@/config/common'
export default {
  name: 'submall',
  mixins: [loadingMixin, goodsListMixin],
  components: {
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Divider.name]: Divider,
    [List.name]: List,
    GoodsItem,
    Empty,
    DropMenu
  },
  data() {
    return {
      variable,
      SUBMALL_TYPE,
      curOrg: { text: '全部机构', value: 0 },
      curCity: undefined,
      orgList: [],
      submallDetail: {},
      cityList: [],
      curSort: '',
      cateList: []
    }
  },
  mounted() {
    this.getCateList()
    this.getOrgList(this.currentCity.id)
    // 商城详情
    this.getSubmall()
    this.getCities()
  },
  methods: {
    getCateList() {
      this.$api.store.productCate().then((res) => {
        this.cateList = res.data.cateList.map((item) => {
          return { value: item.id, text: item.name }
        })
        this.cateList.unshift({ value: '', text: '全部分类' })
      })
    },
    // 子商城城市列表
    getCities() {
      // 设置默认值为全局city id
      // this.curCity = this.currentCity.id
      this.$api.hmp.supplier_cities(this.$route.query).then((res) => {
        this.cityList = res.data.map((item) => {
          return { text: item.city_name, value: +item.city_id }
        })
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
        // this.searchParams.city_id = city_id
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
    showDropMenu() {
      return +this.submallDetail.type === SUBMALL_TYPE.DRUG
    },
    currentCity() {
      return this.$store.state.currentCity
    }
  },
  watch: {},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.submallDetail.name && vm.$store.commit('UPDATE_TITLE_BAR_TITLE', vm.submallDetail.name)
    })
    // ...
  }
}
</script>
<style lang="less" scoped>
.submall {
  background-color: #fff;
  flex: 1;
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
