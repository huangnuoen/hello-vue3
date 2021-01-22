<template>
  <div class="goods">
    <GoodsInfo :item="goodsDetail"></GoodsInfo>
    <Notice v-if="false" :list="notice"></Notice>
    <Flows v-if="false" :list="flows"></Flows>
    <QuestionAnswer v-if="false" :list="QA"></QuestionAnswer>
    <GoodsAction v-show="goodsDetail.id">
      <GoodsActionIcon icon="global_icon_service" text="客服" @click="call"></GoodsActionIcon>
      <GoodsActionIcon icon="global_icon_collect_nor" :class="{ active: goodsDetail.is_collected }" text="收藏" @click="toCollect"> </GoodsActionIcon>
      <GoodsActionIcon
        :icon="goodsDetail.type === GOODS_TYPE.PRESCRIPTION ? 'global_icon_drug_cart' : 'global_icon_cart'"
        :text="goodsDetail.type === GOODS_TYPE.PRESCRIPTION ? '需求清单' : '购物车'"
        :badge="total"
        @click="toCart"
      >
      </GoodsActionIcon>
      <GoodsActionButton
        :text="goodsDetail.type === GOODS_TYPE.PRESCRIPTION ? '加入需求清单' : '加入购物车'"
        v-if="goodsDetail.is_shopping_cart"
        @click="checkTreated(addCart)"
      ></GoodsActionButton>
      <!-- 处方药的不能购买，只能去问诊 -->
      <GoodsActionButton :text="goodsDetail.type === GOODS_TYPE.PRESCRIPTION ? '问诊开药' : '立即购买'" class="orange" @click="checkTreated(toBuy)">
      </GoodsActionButton>
    </GoodsAction>
    <AskPopup v-model="showAskPopupFlag" :list="askList" title="是否线下就诊过？" @confirm="confirmInquiry"> </AskPopup>
  </div>
</template>
<script>
import { Icon } from 'vant'
import loadingMixin from '@/mixins/loadingMixin'
import Notice from '@/components/goods/Notice'
import Flows from '@/components/goods/Flows'
import QuestionAnswer from '@/components/goods/QuestionAnswer'
import GoodsInfo from '@/components/goods/GoodsInfo'
import GoodsAction from '@/components/goods/GoodsAction'
import AskPopup from '@/components/goods/AskPopup'
import GoodsActionIcon from '@/components/goods/GoodsActionIcon'
import { GOODS_TYPE, PHONE_NUM } from '@/config/common'
import { jumpLink } from '@/utils/tool'
import GoodsActionButton from '@/components/goods/GoodsActionButton'
import { toLogin } from '@/utils/auth'
import wechatSDK from '@/utils/wechatSDK'
import customerService from '@/utils/customerService'
export default {
  name: 'goods',
  mixins: [loadingMixin],
  components: { Notice, Flows, QuestionAnswer, GoodsInfo, GoodsAction, GoodsActionIcon, AskPopup, GoodsActionButton, [Icon.name]: Icon },
  data() {
    return {
      GOODS_TYPE,
      notice: ['预约服务时请您认真核对预约人的身份信息。', '体验服务当天请务必携带本人身份证件。'],
      flows: [
        { title: '选择服务', text: '选择合适的套餐及机构后，点击立即预约。' },
        { title: '填写预约信息', text: '进入预约界面，按步骤填写购买信息。' },
        { title: '完成预约', text: '预约成功后，工作日24小时内客服人员将与您联系，安排医生及确认详细预约时间。' },
        { title: '体检服务', text: '到达预约日期后，凭身份证到所选的机构参与体检服务' }
      ],
      QA: [
        {
          question: '想要更改预约时间怎么办？',
          answer:
            '企业福利助手平台上的套餐均支持在未付款或付款后的预约日期前两天随时更改预约时间，进入企业福利助手平台直接联系客服进行人工修改，客服电话：400-1075-570 '
        },
        {
          question: '退款费用到账情况？',
          answer: '预约订单取消后，费用自审核通过后7个工作日内会按原路径返回到您的账户。'
        }
      ],
      goodsDetail: {},
      showAskPopupFlag: false,
      askList: ['就诊过', '未就诊']
    }
  },
  mounted() {
    this.setLoading(true)
    this.getGoodsDetail()
    this.addBrowse() // 增加一条足迹
    this.$store.dispatch('cart/getTotal')
  },
  methods: {
    addBrowse() {
      const id = this.$route.params.id
      this.$api.store.addBrowse(id).then((res) => {
        if (res.code !== 200) {
          this.$store.commit('user/ADD_FOOTMARK_LIST', id)
        } else {
          // 客服信息
          customerService.setOptions({
            page: {
              name: this.$route.meta.titleBar.title ? encodeURIComponent(this.$route.meta.titleBar.title) : '',
              url: window.location.href,
              sku_id: res.data.app_resource_id,
              supplier_id: res.data.id,
              extende: {
                sku_name: res.data.title ? encodeURIComponent(res.data.title) : '',
                supplier_name: res.data.supplier_name ? encodeURIComponent(res.data.supplier_name) : ''
              }
            }
          })
        }
      })
    },
    getGoodsDetail() {
      this.$api.store
        .products(this.$route.params)
        .then((res) => {
          if (res.code === 200) {
            this.goodsDetail = res.data
            // 为0隐藏袋鼠客服
            if (this.goodsDetail.supplier.customer_service_id !== 0) {
              this.$nextTick(() => {
                customerService.show()
              })
            }

            wechatSDK({
              title: this.goodsDetail.title,
              desc: `售价￥${this.goodsDetail.selling_price} ${this.goodsDetail.selling_point} ${brandConfig.companyName} 官方保证 微信专享`,
              imgUrl: this.goodsDetail.img_cover,
              hasSign: true
            })
          } else {
            this.$dialog
              .alert({
                closeOnPopstate: true,
                title: `${res.message}`
              })
              .then(() => {
                this.$router.back()
              })
          }
        })
        .finally(() => {
          this.setLoading(false)
        })
    },
    addCartRequest() {
      return this.$api.store.shopping_carts({
        product_id: this.goodsDetail.id
      })
    },
    checkTreated(callback) {
      // 处方药的话要检查下是否线下问诊过，其他的直接执行回调函数
      if (this.goodsDetail.type === GOODS_TYPE.PRESCRIPTION && !this.treated) {
        this.operation = callback
        this.showAskPopupFlag = true
      } else {
        callback()
      }
    },
    async addCart() {
      if (!this.goodsDetail.id) return
      this.$toast.loading({
        message: '加载中...'
      })
      const res = await this.addCartRequest()
      this.$toast.clear()
      if (res.code === 200) {
        this.$store.dispatch('cart/getTotal')
        this.$store.commit('cart/ADD_CHOSEN_GOODS', res.data.id)
        this.$toast('已成功加入购物车')
        // } else if (res.code === 510) {
        // toLogin(this.$route, res.data)
      } else if (res.code === 500) {
        this.$toast(res.message)
      }
    },
    toBuy() {
      if (!this.goodsDetail.id) return
      if (this.goodsDetail.type === GOODS_TYPE.PRESCRIPTION) {
        jumpLink({ url: `${window.internalHospitalUrl}user/open?drugs=${this.goodsDetail.drug_id}&nums=1` })
      } else {
        this.$router.push(`/order-confirm?goodsId=${this.goodsDetail.id}`)
      }
    },
    toCollect() {
      if (this.collectting) return
      this.collectting = true
      this.$api.store
        .collectProduct({ product_id: this.$route.params.id })
        .then((res) => {
          if (res.code === 200) {
            this.goodsDetail.is_collected = !this.goodsDetail.is_collected
            this.$toast(res.message)
            // } else if (res.code === 510) {
            // toLogin(this.$route, res.data)
          }
        })
        .finally(() => {
          this.collectting = false
        })
    },
    toCart() {
      // 区分2种商品，药品类要跳到对应的购物车tab
      if (this.goodsDetail.type === GOODS_TYPE.SERVICE || this.goodsDetail.type === GOODS_TYPE.PHYSICAL) {
        this.$router.push('/cart')
      } else {
        this.$router.push(`/cart?tab=${this.goodsDetail.type}`)
      }
    },

    confirmInquiry(val) {
      this.showAskPopupFlag = false
      if (val === '未就诊') {
        this.$dialog
          .alert({
            message: '很抱歉，根据国家互联网诊疗规定，没有线下就诊不得在线上开药，您前往医院就诊后，可以在平台进行在线开药。',
            confirmButtonText: '知道了',
            messageAlign: 'left'
          })
          .then(() => {})
      } else {
        // 就诊过的可以接着执行回调
        this.treated = true
        setTimeout(() => {
          this.operation()
        }, 500)
      }
    },
    call() {
      location.href = `tel:${PHONE_NUM}`
    }
  },
  computed: {
    total() {
      if (this.goodsDetail.type === GOODS_TYPE.PRESCRIPTION) {
        return this.$store.state.cart.prescription_total
      } else {
        return this.$store.state.cart.total
      }
    }
  },
  destroyed() {
    customerService.hide()
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.goods {
  padding-bottom: 110px;
  .safe-padding-bottom(110px);
  .banner {
    width: 100%;
    height: 300px;
    background: linear-gradient(135deg, rgba(240, 243, 250, 1) 0%, rgba(220, 227, 244, 1) 100%);
    object-fit: contain;
    font-size: 0;
    display: block;
  }
  section {
    padding: 32px 30px;
    background-color: #fff;
    margin-bottom: 24px;
  }
}
</style>
