<template>
  <div class="order-confirm">
    <div class="content" v-if="!loading">
      <section class="goods-list">
        <header></header>
        <!-- 地址 -->
        <AddressCard v-if="showAddress" :item="delivery" @select="chosenAddress"></AddressCard>
        <!-- 商品 -->
        <div class="goods-content">
          <GoodsCard v-for="(item,index) in goodsList" :item="item" :key="index"></GoodsCard>
        </div>
      </section>
      <!-- 预约 -->
      <section class="book" v-if="canFillBookInfo">
        <header>
          <h3>
            <div class="title">预约信息</div>
            <div class="tips">可在购买后90天内填写预约信息</div>
          </h3>
          <button :class="{down:showBookInfo}" @click="expandBookInfo">
            {{showBookInfo?'暂不填写': '继续填写'}}
            <svg-icon icon-class="order_icon_fold_up"></svg-icon>
          </button>
        </header>
        <CollapseTransition>
          <div class="form" ref="wrapper" v-show="showBookInfo">
            <FormSelect label="预约时间" placeholder="请选择时间" v-model="bookForm.reservation_time"
              @select="showCalendar=true">
            </FormSelect>
            <FormBtn label="预约人信息" placeholder="选择预约人" v-show="familyList.length" @select="showFamilyPicker"></FormBtn>
            <FormInput label="预约人" placeholder="请填写预约人真实姓名" v-model="bookForm.name" maxlength="20"></FormInput>
            <FormInput type="tel" maxlength="11" label="手机号码" v-model="bookForm.phone" placeholder="请填写11位手机号码">
            </FormInput>
            <FormSelect v-if="false" label="证件类型" placeholder="身份证" v-model="curIdCard.text"
              @select="showIdPicker=true">
            </FormSelect>
            <FormInput v-if="false" label="证件号码" placeholder="请填写预约人证件号码" @blur="verityIdCard"
              v-model="curFamily.id_number">
            </FormInput>
            <FormRadioGrp v-if="false" label="性别" @change="chosenSex" v-model="bookForm.sex" :option="SEX_TYPE_ARR">
            </FormRadioGrp>
            <FormRadioGrp v-if="false" label="婚否" @change="chosenMarriage" v-model="bookForm.marriage"
              :option="MARRIAGE_TYPE_ARR">
            </FormRadioGrp>
            <FormSelect v-if="false" label="出生日期" placeholder="请选择出生日期" v-model="bookForm.birthday"
              @select="showBirthdayPicker=true">{{age}}</FormSelect>
            <FormSelect v-if="false" label="体检报告" @select="showReport=true" placeholder="机构自取"></FormSelect>
          </div>
        </CollapseTransition>
      </section>
      <!-- 优惠 -->
      <section class="form" v-if="false">
        <FormSelect label="优惠券" placeholder="优惠券" @select="showCouponList=true"></FormSelect>
        <FormItem class="form-switch">
          <div class="label">D米卡</div>
          <div class="value">
            <span>
              可抵扣&yen;20.00 </span>
            <van-switch v-model="useDmi" size="16px" :active-color="variable.theme" inactive-color="#BFBFBF" />
          </div>
        </FormItem>

        <FormSelect label="推广码" placeholder="若有推广码请填写" v-model="promocode" @select="showPromoCode=true"></FormSelect>
      </section>
      <!-- 发票 -->
      <section class="invoice form" v-if="false">
        <FormSelect label="发票信息" placeholder="不开发票" @select="showInvoice=true"></FormSelect>
        <div class="tips">服务完成后仍支持免费补开发票</div>
      </section>
      <!-- 流程 -->
      <!-- <section class="flow">
        <img src="@/images/order/order_process_img.png">
      </section> -->
      <!-- 订单总额 -->
      <section class="price-list">
        <div class="price-item">
          <div class="label">订单总额</div>
          <div class="price">&yen;{{goods_sum_price|G_formatPrice}}</div>
        </div>
        <!--<div class="price-item">
          <div class="label">优惠券</div>
          <div class="price">&yen;33</div>
        </div>
        <div class="price-item">
          <div class="label">D米卡</div>
          <div class="price">&yen;33</div>
        </div>
        <div class="price-item">
          <div class="label">推广码</div>
          <div class="price">&yen;33</div>
        </div> -->
        <div class="price-item" v-show="showDelivery">
          <div class="label">运费</div>
          <div class="price"> &yen;{{delivery_fee|G_formatPrice}}</div>
        </div>
        <div class="price-item" v-show="usePoint>0">
          <div class="label">福利积分</div>
          <div class="price">- &yen;{{usePoint|G_formatPrice}}</div>
        </div>
        <div class="price-item bold">
          <div class="label">实付金额</div>
          <!-- <div class="price">&yen;33</div> -->
          <BasePrice :price="pay_amount"></BasePrice>
        </div>
      </section>
      <!-- 协议 -->
      <!-- submit bar -->
      <footer>
        <div class="agreement" v-if="false">
          <BaseCheckbox v-model="agreed" @change="submit">我已阅读并同意</BaseCheckbox>
          <em>《用户授权协议》</em>
        </div>
        <CartSubmitBar>
          <div>共{{goodsCount}}件</div>
          <template #price>
            <div>
              <span>实付金额：</span>
              <BasePrice :price="pay_amount"></BasePrice>
            </div>
          </template>
          <template #btns>
            <div class="btns">
              <button class="orange" @click="submitOrder">提交订单</button>
            </div>
          </template>
        </CartSubmitBar>
      </footer>
    </div>
    <!-- 证件类型 -->
    <IdCardPicker v-model="showIdPicker" @confirm="chosenIdCard"></IdCardPicker>
    <!-- 出生日期选择 -->
    <BirthdayPicker v-model="showBirthdayPicker" @confirm="chosenBirthday"></BirthdayPicker>
    <!-- 日期选择 -->
    <van-calendar v-model="showCalendar" :min-date="minBookDate" :max-date="maxBookDate" :formatter="formatter"
      title="选择预约日期" :color="variable.theme" @confirm="chosenBookDate" safe-area-inset-bottom
      :style="{ height: '80%' }" />
    <!-- 时间选择 -->
    <!-- <BookTimePicker title="选择预约时间" v-model="showBookTime" @confirm="chosenBookTime" @back="backtoCalendar" ></BookTimePicker> -->
    <!-- 常用体检人 -->
    <FamilyList v-model="showFamily" title="选择体检人" :active="curFamily" :list="familyList" @confirm="chosenFamily">
    </FamilyList>
    <!-- 报告 -->
    <ReportList v-model="showReport" title="选择领取报告方式" @confirm="chosenReport"></ReportList>
    <!-- 优惠券 -->
    <CouponList title="选择优惠券" v-model="showCouponList" @confirm="chosenCoupon"></CouponList>
    <!-- 发票 -->
    <InvoicePopup title="发票信息" v-model="showInvoice"></InvoicePopup>
    <!-- 推广码 -->
    <van-dialog v-model="showPromoCode" class="promocode" title="填写推广码" show-cancel-button @confirm="submitPromocode">
      <input type="tel" maxlength="4" v-model="selfPromocode" placeholder="请输入推广码" v-blur>
      <div class="error">
        <svg-icon icon-class="order_pop_icon_error"></svg-icon>请输入正确的6位推广码
      </div>
    </van-dialog>
  </div>
</template>
<script>
import GoodsCard from '@/components/order/GoodsCard'
import FormSelect from '@/components/order/FormSelect'
import FormItem from '@/components/order/FormItem'
import FormInput from '@/components/order/FormInput'
import FormBtn from '@/components/order/FormBtn'
import CollapseTransition from '@/base/Transition/CollapseTransition'
import CartSubmitBar from '@/components/cart/CartSubmitBar'
import AddressCard from '@/components/order/AddressCard'
import CouponList from '@/components/order/CouponList'
import FamilyList from '@/components/order/FamilyList'
// import BookTimePicker from '@/components/order/BookTimePicker'
import ReportList from '@/components/order/ReportList'
import InvoicePopup from '@/components/order/InvoicePopup'
import BasePrice from '@/base/BasePrice/BasePrice'
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import bookingMixin from '@/mixins/bookingMixin'
// import { formatDate } from '@/utils/tool'
import * as types from '@/store/mutation-types'
import { Switch, Dialog, Popup, Calendar, DatetimePicker, Field } from 'vant'
import loadingMixin from '@/mixins/loadingMixin'
import { GOODS_TYPE } from '@/config/common'
import { PAY_STATUS } from '@/config/order'
// shoppingType的类型，也是api调用的变量
const store = 'store' // 商店直接下单
const shopping_cart = 'shopping_cart' // 购物车下单
export default {
  name: 'order-confirm',
  mixins: [bookingMixin, loadingMixin],
  components: {
    GoodsCard,
    FormSelect,
    FormItem,
    FormInput,
    FormBtn,
    [Switch.name]: Switch,
    [Popup.name]: Popup,
    [Calendar.name]: Calendar,
    [Dialog.Component.name]: Dialog.Component,
    [DatetimePicker.name]: DatetimePicker,
    [Field.name]: Field,
    CollapseTransition,
    AddressCard,
    BasePrice,
    CartSubmitBar,
    BaseCheckbox,
    CouponList,
    FamilyList,
    ReportList,
    // BookTimePicker,
    InvoicePopup
  },
  data() {
    return {
      useDmi: false,
      agreed: false,
      showPromoCode: false,
      promocode: '', // 通过验证的推广码
      selfPromocode: '', // 未通过验证的推广码
      showCouponList: false,
      showInvoice: false,
      goodsList: [],
      goodsCount: 0,
      showAddress: false,
      showDelivery: false,
      canFillBookInfo: false
    }
  },
  mounted() {
    this.setLoading(true)
    this.$store.dispatch('user/getUserInfo', { params: { with_point: 1 } })
    this.getGoods()
  },
  methods: {
    async getGoodsInCart() {
      const res = await this.$api.shopping_cart.getCartDetail({ ids: this.$route.query.cartIds.split(',') })
      this.setLoading(false)
      if (res.code === 200) {
        this.goodsList = res.data
      }
    },
    async getGoodsInStore() {
      const res = await this.$api.store.products({ id: this.$route.query.goodsId })
      this.setLoading(false)
      if (res.code === 200) {
        // 转成与购物车模式一样的格式
        this.goodsList.push({
          supplier_name: res.data.supplier.name,
          carts: [
            {
              num: 1, // 数量设为1
              price: res.data.selling_price2, // 价格转成分
              ...res.data
            }
          ]
        })
      }
    },
    getGoods() {
      if (this.shoppingType === shopping_cart) {
        this.getGoodsInCart()
      } else {
        this.getGoodsInStore()
      }
    },
    submit() {},
    submitOrder() {
      // 检查预约信息
      if (this.canFillBookInfo && this.showBookInfo) {
        if (!this.checkBookForm()) {
          return
        }
      }
      if (this.showAddress && !this.delivery.id) {
        this.$toast('请先添加收货地址')
        return
      }
      // 检查其他信息
      // 下单
      this.createOrder()
    },
    createOrder() {
      this.$toast.loading({
        message: '提交中...'
      })
      const data = {
        total_amount: this.total_amount,
        score: this.usePoint,
        pay_amount: this.pay_amount
      }
      if (this.shoppingType === shopping_cart) {
        data.ids = this.$route.query.cartIds.split(',')
      } else {
        data.product_id = this.$route.query.goodsId
      }
      if (this.showAddress) {
        data.delivery = { id: this.delivery.id }
      }
      if (this.showBookInfo) {
        data.reservation = {
          name: this.bookForm.name,
          phone: this.bookForm.phone,
          reservation_time: this.bookForm.reservation_time
        }
      }
      this.$api[this.shoppingType]
        .createOrder(data)
        .finally(() => {
          this.$toast.clear()
        })
        .then((res) => {
          if (res.code === 200) {
            if (res.data.order_payment_status === PAY_STATUS.DONE) {
              // 不需要支付的直接去订单列表也
              this.$router.replace('/order-list')
            } else {
              this.$router.replace(`/pay?order_id=${res.data.id}&order_no=${res.data.order_no}`)
            }
          } else {
            this.$toast(res.message)
          }
        })
    },
    submitPromocode() {
      this.promocode = this.selfPromocode
    },
    chosenCoupon() {
      this.showCouponList = false
    },
    chosenAddress() {
      this.$router.push('/address')
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'address-list') {
      this.$store.commit(types.DELETE_KEEPALIVEPAGES, from.name)
    }
    next()
  },
  computed: {
    // 运费 分
    delivery_fee() {
      let delivery_fee = 0
      this.goodsList.forEach((item) => {
        item.carts.forEach((item) => {
          if (+item.delivery_fee > delivery_fee) {
            delivery_fee = item.delivery_fee
          }
        })
      })
      return delivery_fee * 100
    },
    // 使用的积分数
    usePoint() {
      if (+this.user.point > 0) {
        return this.user.point > this.total_amount ? this.total_amount : this.user.point
      } else {
        return 0
      }
    },
    // 商品总额
    goods_sum_price() {
      let sum = 0
      this.goodsList.forEach((item) => {
        item.carts.forEach((item) => {
          sum += item.price * item.num
        })
      })
      return sum
    },
    // 实付金额
    pay_amount() {
      return this.total_amount - this.usePoint
    },
    // 总金额
    total_amount() {
      let sum = 0
      this.goodsList.forEach((item) => {
        item.carts.forEach((item) => {
          sum += item.price * item.num
        })
      })
      sum += +this.delivery_fee
      return sum
    },
    shoppingType() {
      return this.$route.query.cartIds ? shopping_cart : store
    },
    delivery() {
      return this.$store.state.user.address
    },
    user() {
      return this.$store.state.user.user
    }
  },
  watch: {
    goodsList(list) {
      if (!list.length) return
      // 计算商品总数sku
      this.goodsCount = 0
      this.canFillBookInfo = true
      list.forEach((item) => {
        for (let index = 0; index < item.carts.length; index++) {
          const goods = item.carts[index]
          // 计算选中商品的总额
          this.goodsCount += goods.num
          if (goods.type !== GOODS_TYPE.SERVICE) {
            this.showAddress = true
            this.showDelivery = true
          }
          if (!this.canFillBookInfo) {
            continue
          }
          // 判断是否可以填写预约信息
          if (this.goodsCount > 1 || goods.type !== GOODS_TYPE.SERVICE) {
            this.canFillBookInfo = false
            this.showBookInfo = false
            continue
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
@import './booking.less';
.order-confirm {
  .content {
    padding-bottom: 196px;
    .safe-padding-bottom(196px);
    .goods-list {
      margin-top: 0;
      header {
        background: linear-gradient(360deg, rgba(255, 255, 255, 1) 0%, @theme 100%);
        height: 332px;
        margin-bottom: -316px;
      }
      .goods-content {
        min-height: 100px;
      }
      background-color: #fff;
      padding-bottom: 32px;
      margin-bottom: 0;
    }
    section {
      margin-top: 20px;
      background-color: #fff;
      &.flow {
        img {
          width: 100%;
        }
      }
      &.book {
        margin-top: 0;
      }
      &.form {
        padding: 0 32px;
        background-color: #fff;
        .form-switch {
          .value {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            span {
              padding-right: 16px;
            }
          }
        }
      }
      &.invoice {
        background-color: #fff;
        padding: 0 32px;
        padding-bottom: 32px;
        .tips {
          text-align: right;
          font-size: 24px;
          color: @black-m;
          margin-top: -10px;
        }
      }
      &.price-list {
        padding: 18px 0;
      }
      .form-item {
        font-size: 28px;
      }
      .price-item {
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        padding: 14px 32px;
        &.bold {
          font-size: 32px;
        }
      }
    }
    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      .agreement {
        display: flex;
        font-size: 26px;
        align-items: center;
        padding: 22px 32px;

        em {
          color: @theme;
          font-size: 26px;
        }
      }
      .cart-submit-bar {
        position: relative;
        .btns {
          button.orange {
            background-color: @orange;
          }
        }
      }
    }
  }
}
.van-dialog {
  width: 540px;
  &.promocode {
    input {
      width: 456px;
      height: 72px;
      background: @bg;
      border-radius: 8px;
      border: 1px solid @border;
      margin: 0 auto;
      display: block;
      padding: 0 16px;
      .placeholder(@grey-l);
    }
  }
  .error {
    position: absolute;
    left: 48px;
    color: @red;
    padding-top: 4px;
    font-size: 22px;
    svg {
      margin-right: 10px;
    }
  }
}
.van-calendar {
  /deep/ &__top-info {
    color: transparent;
    left: auto;
    width: 40px;
    height: 28px;
    background: url('@{images}/order/order_icon_full.png') center / contain no-repeat;
  }
  /deep/ &__day {
    height: 102px;
    font-size: 28px;
    &.full {
      color: @red;
    }
  }
  /deep/ &__selected-day {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    box-shadow: 0px 8px 16px 0px rgba(255, 244, 223, 1);
  }
}
</style>
