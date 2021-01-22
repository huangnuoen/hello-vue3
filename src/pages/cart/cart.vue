<template>
  <div class="cart">
    <van-tabs v-model="curTab" :color="variable.theme" :title-active-color="variable.theme">
      <van-tab :title="allCartsCnt[item.type]?`${item.text}(${allCartsCnt[item.type]})`:item.text"
        v-for="(item,index) in tabs" :key="index" :name="item.type"></van-tab>
    </van-tabs>
    <div class="cart-content" v-if="!loading">
      <div class="title-bar" v-if="filterCarts.length"><span @click="toggleStatus" class="text"
          :class="{active:buying!==1}">{{buying===1? '管理':'完成'}}</span></div>
      <van-list v-model="smallLoading" :immediate-check="false" :finished="finished" @load="loadmore">
        <ul class="group-list" v-if="filterCarts.length">
          <GroupItem v-for="(group,index) in filterCarts" :key="index" :item="group" :chosen="chosenGoods"
            @select="selectCurGroup">
            <template>
              <CartItem :chosen="chosenGoods" v-for="(item,k) in group.products" :key="k" :item="item"
                @checked="selectGoodItem" @select="toGoodsDetail" @changeNum="updateCart"
                @delete="deleteGoods(item,k,group.products)">
              </CartItem>
            </template>
          </GroupItem>
        </ul>
        <LoadingV2 v-if="invalidLoading"></LoadingV2>
        <div class="invalid-list" v-if="invalidList.length">
          <div class="title">
            <h2>失效商品 {{invalidList.length}} 件</h2>
            <button @click="clearInvailds">
              <svg-icon icon-class="cart_icon_del"></svg-icon>清除失效商品
            </button>
          </div>
          <InvalidItem v-for="(item,idx) in invalidList" :item="item" :key="item.id"
            @delete="deleteGoods(item,idx,invalidList)"></InvalidItem>
        </div>
      </van-list>

      <CartSubmitBar v-if="filterCarts.length">
        <BaseCheckbox v-model="checkall" @change="selectAllGroup">全选</BaseCheckbox>
        <template slot="price">
          <div v-if="buying===1">
            <div class="price-top">
              <span>合计：</span>
              <span class="point"><em>{{pointSum}}</em> 积分</span>
            </div>
            <div class="price-bottom">或 &yen; {{priceSum | G_formatPrice}}</div>
            <!-- <BasePrice price="8888"></BasePrice> -->
          </div>
        </template>
        <template slot="btns">
          <div>
            <button v-if="false" class="theme">移入收藏夹</button>
            <button v-if="buying!==1" @click="batchDelete(chosenGoods)" class="red">删除</button>
            <button v-else
              @click="submit">{{this.curTab===GOODS_TYPE.PRESCRIPTION?'申请购药':'去结算'}}({{chosenGoods.length}})</button>
          </div>
        </template>
      </CartSubmitBar>
    </div>
    <Empty v-if="showEmpty" desc="购物车还没有商品哦~" img="oder_img_empty" style="paddingTop:93px;">
      <button v-waves @click="$router.push('/favorites')">查看收藏</button>
      <button class="theme" @click="$router.push('/mall')" v-waves>去逛逛</button>
    </Empty>
  </div>
</template>
<script>
import variable from '@/style/variable.less'
import { List, Tab, Tabs } from 'vant'
import CartItem from '@/components/cart/CartItem'
import GroupItem from '@/components/cart/GroupItem'
import InvalidItem from '@/components/cart/InvalidItem'
import CartSubmitBar from '@/components/cart/CartSubmitBar'
import BasePrice from '@/base/BasePrice/BasePrice'
import LoadingV2 from '@/base/loading/LoadingV2'
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import Empty from '@/base/Empty/Empty'
import loadingMixin from '@/mixins/loadingMixin'
import { removeInFlatArr, jumpLink } from '@/utils/tool'
import { mapState } from 'vuex'
import { GOODS_TYPE } from '@/config/common'
// 福利商城类型 1,2
const COMMON_TYPE = GOODS_TYPE.SERVICE + ',' + GOODS_TYPE.PHYSICAL
export default {
  name: 'cart',
  mixins: [loadingMixin],
  components: {
    [List.name]: List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    CartItem,
    GroupItem,
    BasePrice,
    CartSubmitBar,
    LoadingV2,
    Empty,
    BaseCheckbox,
    InvalidItem
  },
  data() {
    return {
      GOODS_TYPE,
      buying: 1,
      checked: true,
      // 所有tab的有效商品列表
      allCarts: {
        [COMMON_TYPE]: [],
        [GOODS_TYPE.NON_PRESCRIPTION]: [],
        [GOODS_TYPE.PRESCRIPTION]: []
      },
      // 所有tab的无效商品列表
      allInvalidList: {
        [COMMON_TYPE]: [],
        [GOODS_TYPE.NON_PRESCRIPTION]: [],
        [GOODS_TYPE.PRESCRIPTION]: []
      },
      // 所有tab的选中商品列表
      allChosenGoods: {
        [COMMON_TYPE]: [],
        [GOODS_TYPE.NON_PRESCRIPTION]: [],
        [GOODS_TYPE.PRESCRIPTION]: []
      },
      // 所有tab的商品总数量
      allCartsCnt: {
        [COMMON_TYPE]: 0,
        [GOODS_TYPE.NON_PRESCRIPTION]: 0,
        [GOODS_TYPE.PRESCRIPTION]: 0
      },
      finished: false,
      smallLoading: false,
      invalidLoading: false,
      page: 1,
      pointSum: 0,
      priceSum: 0,
      curTab: +this.$route.query.tab || COMMON_TYPE,
      tabs: [
        {
          type: COMMON_TYPE,
          text: '福利商城'
        },
        {
          type: GOODS_TYPE.NON_PRESCRIPTION,
          text: '非处方药'
        },
        {
          type: GOODS_TYPE.PRESCRIPTION,
          text: '处方药'
        }
      ]
      // checkall: false
    }
  },
  mounted() {
    this.$store.dispatch('cart/getTotal').then((res) => {
      // 拿到购物车每个type的数量
      this.allCartsCnt[COMMON_TYPE] = res.data.store_total
      this.allCartsCnt[GOODS_TYPE.NON_PRESCRIPTION] = res.data.non_prescription_total
      this.allCartsCnt[GOODS_TYPE.PRESCRIPTION] = res.data.prescription_total
    })

    this.setLoading(true)
    window.addEventListener('pageshow', this.onPageshow)
  },
  methods: {
    onPageshow(e) {
      if (e.persisted || (window.performance && +window.performance.navigation.type === 2)) {
        location.reload()
      }
    },
    loadmore() {
      this.getInvalid()
    },
    getInvalid() {
      if (this.filterCarts.length) {
        this.invalidLoading = true
      }
      this.$api.shopping_cart
        .getInvalid({ types: this.curTab.toString().split(','), pageSize: 200 })
        .then((res) => {
          if (res.code === 200) {
            this.allInvalidList[this.curTab] = res.data.data
          }
        })
        .finally(() => {
          this.invalidLoading = false
        })
    },
    showDeletePopup(list) {
      if (!list.length) {
        return Promise.resolve({ message: '您还未选择商品' })
      }
      return new Promise((resolve) => {
        this.$dialog
          .confirm({
            message: `确定删除这${list.length}个商品？`,
            // message: `确定删除这${list.length}个商品？`,
            confirmButtonText: '删除',
            cancelButtonText: '再想想'
          })
          .then(async () => {
            this.$toast.loading('正在删除...')
            const res = await this.$api.shopping_cart.deleteCart({ ids: list })
            this.allCartsCnt[this.curTab] = this.allCartsCnt[this.curTab] - list.length
            this.$toast.clear()
            resolve(res)
          })
          .catch(() => {})
      })
    },
    // 批量删除
    async batchDelete(list) {
      const res = await this.showDeletePopup(list)
      if (res.code === 200) {
        this.$toast('删除成功')
        list.forEach((id) => {
          let itemIndex
          let i
          // 找到对应id并从列表中删除
          this.allCarts[this.curTab].forEach((item, idx) => {
            itemIndex = item.products.findIndex((item) => {
              return item.id === id
            })
            if (itemIndex > -1) {
              i = idx
            }
          })
          this.allCarts[this.curTab][i].products.splice(itemIndex, 1)
          this.toggleStatus()
        })
        this.allChosenGoods[this.curTab] = []
      } else {
        this.$toast(res.message)
      }
    },
    // 删除单个商品
    async deleteGoods(item, k, products) {
      const res = await this.showDeletePopup([item.id])
      if (res.code === 200) {
        this.$toast('删除成功')
        products.splice(k, 1)
        removeInFlatArr(this.chosenGoods, item.id)
      } else {
        this.$toast(res.message)
      }
    },
    // 更新数量
    updateCart({ item, num }) {
      const originNum = item.num
      if (item.num === num) return
      this.$toast.loading({
        message: '正在加载...'
      })
      this.$api.shopping_cart
        .cartServer({ id: item.id, data: { num }, method: 'put' })
        .finally(() => {
          this.$toast.clear()
        })
        .then((res) => {
          if (res.code === 200) {
            item.num = num
            // 复制chosenGoods 为了触发watch 重新计算总额
            this.chosenGoods = this.chosenGoods.slice(0, this.chosenGoods.length)
          } else {
            item.num = originNum
            this.$toast(res.message)
          }
        })
    },
    getCarts(types) {
      this.smallLoading = true
      this.$api.shopping_cart.cartServer({ params: { types: types.toString().split(','), page: this.page, pageSize: 200 } }).then((res) => {
        this.setLoading(false)
        this.smallLoading = false
        if (res.code === 200) {
          // 复制chosenGoods 为了触发watch 重新计算总额
          this.chosenGoods = this.chosenGoods.slice(0, this.chosenGoods.length)
          this.allCarts[types] = this.allCarts[types].concat(res.data.data)
          if (this.allCarts[types].length >= res.data.total) {
            this.getInvalid()
            this.finished = true
          } else {
            this.page++
          }
        }
      })
    },
    clearInvailds() {
      this.$dialog
        .confirm({
          message: '确定清空失效商品？',
          confirmButtonText: '删除',
          cancelButtonText: '再想想'
        })
        .then(async () => {
          this.$toast.loading({
            message: '正在清空...'
          })
          const res = await this.$api.shopping_cart.empty_invalids({ types: this.curTab.toString().split(',') })
          this.$toast.clear()
          if (res.code === 200) {
            this.$toast('清空成功')
            this.allCartsCnt[this.curTab] = this.allCartsCnt[this.curTab] - this.invalidList.length
            this.invalidList = []
          }
        })
        .catch(() => {})
    },
    // 全选
    selectAllGroup(checked) {
      this.filterCarts.forEach((group, i) => {
        group.products.forEach((goods) => {
          if (checked) {
            this.chosenGoods.push(goods.id)
            this.chosenGoods = [...new Set(this.chosenGoods)]
          } else {
            this.chosenGoods = []
          }
        })
      })
    },
    // 选择当前组
    selectCurGroup(group, checked) {
      group.products.forEach((goods) => {
        if (checked) {
          this.chosenGoods.push(goods.id)
          this.chosenGoods = [...new Set(this.chosenGoods)]
        } else {
          removeInFlatArr(this.chosenGoods, goods.id)
        }
      })
    },
    // 选择当前商品
    selectGoodItem(item, group, index) {
      const i = this.chosenGoods.indexOf(item.id)
      if (i > -1) {
        removeInFlatArr(this.chosenGoods, item.id)
      } else {
        this.chosenGoods.push(item.id)
        this.chosenGoods = [...new Set(this.chosenGoods)]
      }
    },
    checkChild(group, checked) {
      group.products.forEach((goods, idx) => {
        goods.checked = checked
      })
    },

    toggleStatus() {
      this.buying = this.buying === 1 ? 0 : 1
    },
    submit() {
      if (!this.chosenGoods.length) {
        this.$toast('您还没有做选择哦')
        return
      }
      const cartIds = this.chosenGoods.join(',')
      // 处方药跳互联网项目，其他跳提交订单页
      if (this.curTab === GOODS_TYPE.PRESCRIPTION) {
        const drugs = []
        const nums = []
        this.filterCarts.forEach((item) => {
          item.products.forEach((item) => {
            if (this.chosenGoods.indexOf(item.id) > -1) {
              drugs.push(item.drug_id)
              nums.push(item.num)
            }
          })
        })
        jumpLink({ url: `${window.internalHospitalUrl}user/open?drugs=${drugs.join(',')}&nums=${nums.join(',')}&cartIds=${cartIds}` })
      } else {
        this.$router.push({
          name: 'order-confirm',
          query: {
            cartIds: cartIds
          }
        })
      }
    },
    toGoodsDetail(item) {
      this.$router.push(`/goods/${item.platform_product_id}`)
    }
  },
  computed: {
    filterCarts() {
      // 商品删除后父级还在 需要过滤掉
      const list = this.allCarts[this.curTab].filter((item) => {
        return item.products.length
      })
      return list
    },
    invalidList: {
      get() {
        return this.allInvalidList[this.curTab]
      },
      set(val) {
        this.allInvalidList[this.curTab] = val
        return val
      }
    },
    checkall: {
      get() {
        // 检查是否全选
        let goodsLength = 0
        this.filterCarts.forEach((group) => {
          goodsLength += group.products.length
        })
        return this.chosenGoods.length === goodsLength
      },
      set(val) {
        return val
      }
    },
    showEmpty() {
      return !this.loading && !this.filterCarts.length && !this.invalidList.length && !this.invalidLoading
    },
    variable() {
      return variable
    },
    chosenGoods: {
      get() {
        return this.allChosenGoods[this.curTab]
      },
      set(val) {
        this.allChosenGoods[this.curTab] = val
        return val
      }
    },
    ...mapState('cart', {
      chosenGoodsInStore: (state) => state.chosenGoods
    })
  },
  watch: {
    curTab: {
      handler(val, old) {
        // 更换路由为了回退时能记住tab
        if (old) {
          this.$router.replace(`${this.$route.path}?tab=${val}`)
        }
        if (!this.allCarts[val].length) {
          this.page = 1
          this.setLoading(true)
          this.getCarts(val)
        }
      },
      immediate: true
    },
    chosenGoods: {
      handler(arr, old) {
        this.pointSum = 0
        this.priceSum = 0
        this.filterCarts.forEach((item) => {
          item.products.forEach((goods) => {
            if (arr.includes(goods.id)) {
              // 计算选中商品的总额
              this.pointSum += goods.score * goods.num
              this.priceSum += goods.price * goods.num
            }
          })
        })
        // chosenGoods有变化时，同步更新chosenGoodsInStore
        this.$store.commit('cart/SET_CHOSEN_GOODS', arr)
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('pageshow', this.onPageshow)
    next()
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.cart {
  position: relative;
  padding-bottom: 120px;
  .safe-padding-bottom(120px);
  &-content {
    .title-bar {
      display: inline;
      text-align: right;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 100;
      background-color: #fff;
      .text {
        font-size: 28px;
        width: 100%;
        color: @black-m;
        // height: 88px;
        padding: 20px 30px 15px;
        &.active {
          color: @theme;
        }
      }
    }
    .group-list {
      margin-top: 16px;
    }
    .invalid-list {
      background-color: #fff;
      padding: 30px;
      border-radius: 16px;
      margin-bottom: 26px;
      .title {
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;
        h2 {
          color: @black-d;
          font-size: 32px;
        }
        button {
          font-size: 22px;
          color: @grey;
          svg {
            font-size: 32px;
            margin-right: 6px;
          }
        }
      }
    }
    .cart-submit-bar {
      .price-top {
        .point {
          color: @orange;
          em {
            font-size: 32px;
            font-weight: 500;
            line-height: 34px;
            vertical-align: bottom;
          }
        }
      }
      .price-bottom {
        text-align: right;
        color: @grey;
      }
    }
  }
  .empty {
    button {
      width: 310px;
      height: 88px;
      background: rgba(240, 242, 242, 1);
      border-radius: 44px;
      font-size: 30px;
      margin-right: 10px;
      color: #606266;
      &.theme {
        color: @theme;
        background-color: @theme;
        color: #fff;
      }
    }
  }
}
.van-tabs {
  position: sticky;
  top: 80px;
  background-color: #fff;
  z-index: 10;
}
</style>
