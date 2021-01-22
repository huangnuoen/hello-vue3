<template>
  <div class="order-detail" v-if="pageShow">
    <!-- 头部订单状态 -->
    <DetailTop :showObj="showObj" :item="details">
      <van-count-down v-if="showCountDown" @finish="timeOver" :time="details.order_info.remain_time*1000"
        format="请在 mm : ss 内完成支付" />
    </DetailTop>
    <!-- 订单预约方信息 -->
    <AppointmentPerson :reservation="details.reservation" v-if="details.hasOwnProperty('reservation')" />
    <!-- 订单商品 -->
    <OrderProducts :item="details">
    </OrderProducts>
    <!-- 发票 -->
    <!--<invoice-section v-if="details.order_info.order_status !== order_status.WAIT_PAY" />-->
    <!-- 订单号 -->
    <OrderNo :item="details" />
    <!-- 底部按钮 -->
    <div class="btn-box" v-if="details.order_info.actions.length">
      <BottomBtn v-for="btn in details.order_info.actions" :key="btn.code" :btnText="btn.text" :code="btn.code"
        @click.native="handleBtn(btn)">
      </BottomBtn>
      <!-- <BottomBtn :btnText="'取消订单'"
        v-if="details.order_info.order_status !== `${order_status.DONE}` && details.order_info.order_status !== `${order_status.CLOSED}` && details.order_info.order_status !== `${order_status.AFTER}`"
        @click.native="cancelOrder" /> -->
    </div>

  </div>
</template>

<script>
import DetailTop from '@/components/order/DetailTop'
import AppointmentPerson from '@/components/order/AppointmentPerson'
import AppointmentLocation from '@/components/order/AppointmentLocation'
import OrderNo from '@/components/order/OrderNo'
import BottomBtn from '@/components/order/BottomBtn'
import OrderProducts from '@/components/order/OrderProducts'
import InvoiceSection from '@/components/order/InvoiceSection'
import AfterSales from '@/components/order/AfterSales'
import AppointmentInformation from '@/components/order/AppointmentInformation'
import loadingMixin from '@/mixins/loadingMixin'
import { BTN_HANDLER, ORDER_STATUS_CONFIG } from '@/utils/orderList'
import { CountDown } from 'vant'
import { PHONE_NUM } from '@/config/common'
import { ORDER_STATUS, PAY_STATUS } from '@/config/order'

export default {
  name: 'order-detail',
  components: {
    DetailTop,
    AppointmentPerson,
    AppointmentLocation,
    OrderNo,
    BottomBtn,
    InvoiceSection,
    AfterSales,
    OrderProducts,
    AppointmentInformation,
    [CountDown.name]: CountDown
  },
  mixins: [loadingMixin],
  data() {
    return {
      pageShow: false,
      details: {},
      showApplyRefund: false,
      ORDER_STATUS: ORDER_STATUS,
      phone_num: PHONE_NUM,
      showBookInfo: false,
      times: 0,
      showObj: {}
    }
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    handleBtn(btn) {
      BTN_HANDLER[btn.code].call(this, this.details)
    },
    getOrderDetail() {
      this.setLoading(true)
      const params = { main_order_no: this.$route.query.order_no }
      this.$api.user
        .orderDetail(params)
        .then((res) => {
          if (res.code === 200) {
            // res.data.order_info.order_status = ORDER_STATUS.CLOSED
            if (res.data.order_info.order_status === PAY_STATUS.DONE) {
              this.$router.replace('/order-list')
            } else {
              this.getObj(res.data.order_info)
              this.details = res.data
              this.pageShow = true
            }
          }
        })
        .finally(() => {
          this.setLoading(false)
        })
    },
    timeOver() {
      this.refresh()
    },
    refresh() {
      this.$router.replace({ path: '/redirect' + this.$route.fullPath })
    },

    getObj(data) {
      // console.log('data', data)
      this.showObj = ORDER_STATUS_CONFIG[data.order_status]
    }
  },
  computed: {
    showCountDown() {
      return +this.details.order_info.order_status === +ORDER_STATUS.WAIT_PAY
    }
  }
}
</script>

<style lang="less" scoped>
@import './booking.less';
@import url('~@/style/mixin');

.order-detail {
  padding-bottom: 124px;
  > div:nth-child(2) {
    border-radius: 24px 24px 0px 0px;
  }

  .btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px 28px;
    .safe-padding-bottom(20px);
    border-top: 1px solid #eee;
  }
  .van-count-down {
    font-size: 24px;
    color: #fff;
  }
}
</style>
